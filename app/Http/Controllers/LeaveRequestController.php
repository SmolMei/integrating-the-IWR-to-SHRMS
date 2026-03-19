<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLeaveRequestRequest;
use App\Models\LeaveApplication;
use App\Models\LeaveRequest;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class LeaveRequestController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('leave-application');
    }

    public function store(StoreLeaveRequestRequest $request): RedirectResponse
    {
        $medicalCertificatePath = $request->hasFile('medicalCertificate')
            ? $request->file('medicalCertificate')->store('leave-request-documents', 'public')
            : null;

        $marriageCertificatePath = $request->hasFile('marriageCertificate')
            ? $request->file('marriageCertificate')->store('leave-request-documents', 'public')
            : null;

        $soloParentIdPath = $request->hasFile('soloParentId')
            ? $request->file('soloParentId')->store('leave-request-documents', 'public')
            : null;

        $leaveRequest = LeaveRequest::query()->create([
            'user_id' => $request->user()->id,
            'leave_type' => $request->string('leaveType')->toString(),
            'start_date' => $request->string('startDate')->toString(),
            'end_date' => $request->string('endDate')->toString(),
            'reason' => $request->string('reason')->toString(),
            'medical_certificate_path' => $medicalCertificatePath,
            'marriage_certificate_path' => $marriageCertificatePath,
            'solo_parent_id_path' => $soloParentIdPath,
        ]);

        // Create LeaveApplication for IWR routing
        $user = $request->user();
        $employeeId = $user->employee_id;

        if ($employeeId) {
            $startDate = Carbon::parse($request->string('startDate')->toString());
            $endDate = Carbon::parse($request->string('endDate')->toString());
            $daysRequested = $startDate->diffInDays($endDate) + 1;

            $leaveType = str_replace('-', '_', $request->string('leaveType')->toString());

            $application = LeaveApplication::query()->create([
                'leave_request_id' => $leaveRequest->id,
                'employee_id' => $employeeId,
                'leave_type' => $leaveType,
                'days_requested' => $daysRequested,
                'start_date' => $startDate,
                'has_medical_certificate' => $medicalCertificatePath !== null,
                'has_solo_parent_id' => $soloParentIdPath !== null,
                'has_marriage_certificate' => $marriageCertificatePath !== null,
                'dh_decision' => 0,
                'hr_decision' => 0,
                'has_rejection_reason' => 0,
            ]);

            $iwrController = app(IwrController::class);
            $iwrResult = $iwrController->routeLeaveApplication($application);

            $message = $iwrResult['notification'] ?? 'Leave request submitted successfully.';

            return to_route('leave-application')->with('success', $message);
        }

        return to_route('leave-application')->with('success', 'Leave request submitted successfully.');
    }
}
