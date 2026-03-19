<?php

namespace App\Http\Controllers;

use App\Models\IpcrSubmission;
use App\Models\IwrAuditLog;
use App\Models\LeaveApplication;
use App\Services\IwrService;
use App\Services\NotificationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class IwrController extends Controller
{
    public function __construct(
        private IwrService $iwrService,
        private NotificationService $notificationService,
    ) {}

    /**
     * Show the evaluation page with employee context.
     */
    public function evaluationPage(Request $request): Response
    {
        $employeeId = $request->query('employee_id');
        $employee = null;
        $submission = null;

        if ($employeeId) {
            $employee = \App\Models\Employee::query()->find($employeeId);
            $submission = IpcrSubmission::query()
                ->where('employee_id', $employeeId)
                ->latest()
                ->first();
        }

        return Inertia::render('evaluation-page', [
            'employee' => $employee ? [
                'employee_id' => $employee->employee_id,
                'name' => $employee->name,
                'job_title' => $employee->job_title,
            ] : null,
            'submission' => $submission ? [
                'id' => $submission->id,
                'performance_rating' => $submission->performance_rating,
                'status' => $submission->status,
                'stage' => $submission->stage,
                'evaluator_gave_remarks' => $submission->evaluator_gave_remarks,
                'remarks' => $submission->rejection_reason,
                'notification' => $submission->notification,
            ] : null,
        ]);
    }

    /**
     * Employee submits IPCR form.
     */
    public function submitIpcr(Request $request): RedirectResponse
    {
        $request->validate([
            'employee_id' => 'required|string|exists:employees,employee_id',
            'period' => 'required|string',
        ]);

        $employeeId = $request->string('employee_id')->toString();

        $submission = IpcrSubmission::query()->create([
            'employee_id' => $employeeId,
            'is_first_submission' => true,
        ]);

        $iwrResult = $this->iwrService->routeIpcr([
            'employee_id' => $employeeId,
            'is_first_submission' => true,
            'performance_rating' => null,
            'evaluator_gave_remarks' => false,
        ]);

        $submission->update([
            'status' => $iwrResult['status'] ?? null,
            'stage' => $iwrResult['stage'] ?? null,
            'routing_action' => $iwrResult['routing_action'] ?? null,
            'evaluator_id' => $iwrResult['evaluator_id'] ?? null,
            'confidence_pct' => $iwrResult['confidence_pct'] ?? null,
            'notification' => $iwrResult['notification'] ?? null,
        ]);

        $this->logAudit($employeeId, 'ipcr', $submission->id, $iwrResult);

        $this->notificationService->createFromIwrResult(
            $iwrResult, 'ipcr', $submission->id, $employeeId,
        );

        $message = $iwrResult['notification'] ?? 'IPCR form submitted successfully.';

        return to_route('submit-evaluation')->with('success', $message);
    }

    /**
     * Evaluator saves evaluation rating.
     */
    public function saveEvaluation(Request $request): RedirectResponse
    {
        $request->validate([
            'employee_id' => 'required|string|exists:employees,employee_id',
            'performance_rating' => 'required|numeric|min:1|max:5',
            'evaluator_gave_remarks' => 'required|boolean',
            'remarks' => 'nullable|string|max:2000',
        ]);

        $employeeId = $request->string('employee_id')->toString();
        $rating = (float) $request->input('performance_rating');
        $gaveRemarks = (bool) $request->input('evaluator_gave_remarks');

        $submission = IpcrSubmission::query()
            ->where('employee_id', $employeeId)
            ->latest()
            ->firstOrFail();

        $submission->update([
            'performance_rating' => $rating,
            'is_first_submission' => false,
            'evaluator_gave_remarks' => $gaveRemarks,
            'rejection_reason' => $request->input('remarks'),
        ]);

        $iwrResult = $this->iwrService->routeIpcr([
            'employee_id' => $employeeId,
            'is_first_submission' => false,
            'performance_rating' => $rating,
            'evaluator_gave_remarks' => $gaveRemarks,
        ]);

        $updateData = [
            'status' => $iwrResult['status'] ?? null,
            'stage' => $iwrResult['stage'] ?? null,
            'routing_action' => $iwrResult['routing_action'] ?? null,
            'evaluator_id' => $iwrResult['evaluator_id'] ?? null,
            'confidence_pct' => $iwrResult['confidence_pct'] ?? null,
            'notification' => $iwrResult['notification'] ?? null,
        ];

        if (!empty($iwrResult['reason'])) {
            $updateData['rejection_reason'] = $iwrResult['reason'];
        }

        $submission->update($updateData);

        $this->logAudit($employeeId, 'ipcr', $submission->id, $iwrResult);

        $this->notificationService->createFromIwrResult(
            $iwrResult, 'ipcr', $submission->id, $employeeId,
        );

        $message = $iwrResult['notification'] ?? 'Evaluation saved.';

        return to_route('document-management')->with('success', $message);
    }

    /**
     * Evaluator/HR approves a leave application.
     */
    public function approveLeave(Request $request, LeaveApplication $leaveApplication): RedirectResponse
    {
        $user = $request->user();

        if ($user->hasRole('evaluator')) {
            $leaveApplication->update(['dh_decision' => 1]);
        } elseif ($user->hasRole('hr-personnel')) {
            $leaveApplication->update(['hr_decision' => 1]);
        }

        $iwrResult = $this->routeLeaveApplication($leaveApplication);

        $message = $iwrResult['notification'] ?? 'Leave application approved.';

        return to_route('admin.leave-management')->with('success', $message);
    }

    /**
     * Evaluator/HR rejects a leave application.
     */
    public function rejectLeave(Request $request, LeaveApplication $leaveApplication): RedirectResponse
    {
        $request->validate([
            'rejection_reason' => 'required|string|max:2000',
        ]);

        $user = $request->user();

        if ($user->hasRole('evaluator')) {
            $leaveApplication->update([
                'dh_decision' => 2,
                'has_rejection_reason' => 1,
                'rejection_reason_text' => $request->string('rejection_reason')->toString(),
            ]);
        } elseif ($user->hasRole('hr-personnel')) {
            $leaveApplication->update([
                'hr_decision' => 2,
                'has_rejection_reason' => 1,
                'rejection_reason_text' => $request->string('rejection_reason')->toString(),
            ]);
        }

        $rejectionReason = $request->string('rejection_reason')->toString();
        $iwrResult = $this->routeLeaveApplication($leaveApplication);

        $iwrNotification = $iwrResult['notification'] ?? 'Leave application rejected.';
        $message = $iwrNotification.' Reason: "'.$rejectionReason.'"';

        // Update the notification records to include the rejection reason
        $latestNotifications = \App\Models\Notification::query()
            ->where('document_type', 'leave')
            ->where('document_id', $leaveApplication->id)
            ->latest()
            ->take(2)
            ->get();

        foreach ($latestNotifications as $notification) {
            $notification->update([
                'message' => $notification->message.' Reason: "'.$rejectionReason.'"',
            ]);
        }

        return to_route('admin.leave-management')->with('success', $message);
    }

    /**
     * Route a leave application through IWR.
     */
    public function routeLeaveApplication(LeaveApplication $application): array
    {
        $payload = [
            'employee_id' => $application->employee_id,
            'leave_type' => $application->leave_type,
            'days_requested' => $application->days_requested,
            'start_date' => $application->start_date->toDateString(),
            'has_medical_certificate' => (bool) $application->has_medical_certificate,
            'has_solo_parent_id' => (bool) $application->has_solo_parent_id,
            'has_marriage_certificate' => (bool) $application->has_marriage_certificate,
            'dh_decision' => $application->dh_decision,
            'hr_decision' => $application->hr_decision,
            'has_rejection_reason' => $application->has_rejection_reason,
        ];

        $iwrResult = $this->iwrService->routeLeave($payload);

        $application->update([
            'status' => $iwrResult['status'] ?? null,
            'stage' => $iwrResult['stage'] ?? null,
            'routing_action' => $iwrResult['routing_action'] ?? null,
            'approver_id' => $iwrResult['approver_id'] ?? null,
            'confidence_pct' => $iwrResult['confidence_pct'] ?? null,
            'notification' => $iwrResult['notification'] ?? null,
        ]);

        $this->logAudit(
            $application->employee_id,
            'leave',
            $application->id,
            $iwrResult,
        );

        $this->notificationService->createFromIwrResult(
            $iwrResult, 'leave', $application->id, $application->employee_id,
        );

        return $iwrResult;
    }

    private function logAudit(string $employeeId, string $docType, int $docId, array $iwrResult): void
    {
        IwrAuditLog::query()->create([
            'logged_at' => now(),
            'employee_id' => $employeeId,
            'document_type' => $docType,
            'document_id' => $docId,
            'routing_action' => $iwrResult['routing_action'] ?? null,
            'confidence_pct' => $iwrResult['confidence_pct'] ?? null,
            'compliance_passed' => ($iwrResult['status'] ?? '') !== 'returned',
        ]);
    }
}
