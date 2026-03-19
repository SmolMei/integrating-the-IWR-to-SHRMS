<?php

namespace App\Services;

use App\Models\Employee;
use App\Models\Notification;
use App\Models\User;

class NotificationService
{
    /**
     * Create notifications from an IWR routing result.
     */
    public function createFromIwrResult(
        array $iwrResult,
        string $documentType,
        int $documentId,
        string $employeeId,
    ): void {
        $status = $iwrResult['status'] ?? 'unknown';
        $notification = $iwrResult['notification'] ?? '';
        $isImportant = in_array($status, ['returned', 'action_required']);

        // Notify the employee who submitted
        $employeeUser = User::query()->where('employee_id', $employeeId)->first();
        if ($employeeUser) {
            $this->create(
                $employeeUser->id,
                $this->typeFromStatus($status, $documentType),
                $this->titleFromResult($iwrResult, $documentType),
                $notification,
                $documentType,
                $documentId,
                $isImportant,
            );
        }

        // Notify the evaluator/approver if routed to someone
        $approverId = $iwrResult['evaluator_id'] ?? $iwrResult['approver_id'] ?? null;
        if ($approverId && $status === 'routed') {
            // Find the approver user — by employee_id, or by role if it's "HR"
            $approverUser = $approverId === 'HR'
                ? User::query()->where('role', User::ROLE_HR_PERSONNEL)->first()
                : User::query()->where('employee_id', $approverId)->first();

            if ($approverUser) {
                $employeeName = $iwrResult['employee_name'] ?? $employeeId;
                $this->create(
                    $approverUser->id,
                    $documentType.'_pending_evaluation',
                    "New {$documentType} awaiting your evaluation",
                    "{$employeeName}'s {$documentType} form has been routed to you for evaluation.",
                    $documentType,
                    $documentId,
                    false,
                );
            }
        }
    }

    private function create(
        int $userId,
        string $type,
        string $title,
        string $message,
        string $documentType,
        int $documentId,
        bool $isImportant,
    ): void {
        Notification::query()->create([
            'user_id' => $userId,
            'type' => $type,
            'title' => $title,
            'message' => $message,
            'document_type' => $documentType,
            'document_id' => $documentId,
            'is_important' => $isImportant,
        ]);
    }

    private function typeFromStatus(string $status, string $documentType): string
    {
        return match ($status) {
            'routed' => $documentType.'_routed',
            'completed' => $documentType.'_completed',
            'returned' => $documentType.'_returned',
            'action_required' => $documentType.'_action_required',
            default => $documentType.'_update',
        };
    }

    private function titleFromResult(array $result, string $documentType): string
    {
        $status = $result['status'] ?? 'unknown';
        $docLabel = $documentType === 'ipcr' ? 'IPCR' : 'Leave Application';

        return match ($status) {
            'routed' => "{$docLabel} has been routed",
            'completed' => "{$docLabel} has been completed",
            'returned' => "{$docLabel} has been returned",
            'action_required' => "{$docLabel} requires action",
            default => "{$docLabel} status update",
        };
    }
}
