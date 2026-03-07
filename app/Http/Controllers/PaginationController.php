<?php

namespace App\Http\Controllers;

use App\Models\AttendanceRecord;
use App\Models\LeaveRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaginationController extends Controller
{
    public function attendanceManagement(Request $request): Response
    {
        $search = trim((string) $request->string('search'));
        $perPage = max(1, min(50, (int) $request->integer('perPage', 10)));

        $attendances = AttendanceRecord::query()
            ->when($search !== '', function ($query) use ($search): void {
                $query->where(function ($subQuery) use ($search): void {
                    $subQuery
                        ->where('name', 'like', '%'.$search.'%')
                        ->orWhere('date', 'like', '%'.$search.'%')
                        ->orWhere('clock_in', 'like', '%'.$search.'%')
                        ->orWhere('clock_out', 'like', '%'.$search.'%')
                        ->orWhere('status', 'like', '%'.$search.'%');
                });
            })
            ->latest('date')
            ->paginate($perPage)
            ->withQueryString()
            ->through(fn (AttendanceRecord $attendanceRecord): array => [
                'id' => $attendanceRecord->id,
                'name' => $attendanceRecord->name,
                'date' => $attendanceRecord->date?->format('Y-m-d') ?? '-',
                'clock_in' => $attendanceRecord->clock_in ?? '-',
                'clock_out' => $attendanceRecord->clock_out ?? '-',
                'status' => $attendanceRecord->status,
            ]);

        return Inertia::render('admin/attendance-management', [
            'search' => $search,
            'attendances' => $attendances->items(),
            'pagination' => [
                'currentPage' => $attendances->currentPage(),
                'lastPage' => $attendances->lastPage(),
                'perPage' => $attendances->perPage(),
                'total' => $attendances->total(),
            ],
        ]);
    }

    public function leaveManagement(Request $request): Response
    {
        $search = trim((string) $request->string('search'));
        $perPage = max(1, min(50, (int) $request->integer('perPage', 10)));

        $leaveRequests = LeaveRequest::query()
            ->with('user:id,name')
            ->when($search !== '', function ($query) use ($search): void {
                $query->where(function ($subQuery) use ($search): void {
                    $subQuery
                        ->where('leave_type', 'like', '%'.$search.'%')
                        ->orWhere('reason', 'like', '%'.$search.'%')
                        ->orWhereHas('user', function ($userQuery) use ($search): void {
                            $userQuery->where('name', 'like', '%'.$search.'%');
                        });
                });
            })
            ->latest()
            ->paginate($perPage)
            ->withQueryString()
            ->through(fn (LeaveRequest $leaveRequest): array => [
                'id' => $leaveRequest->id,
                'name' => $leaveRequest->user?->name ?? 'Unknown User',
                'leaveType' => $leaveRequest->leave_type,
                'startDate' => $leaveRequest->start_date?->format('Y-m-d') ?? '-',
                'endDate' => $leaveRequest->end_date?->format('Y-m-d') ?? '-',
                'reason' => $leaveRequest->reason,
            ]);

        return Inertia::render('admin/leave-management', [
            'search' => $search,
            'leaveRequests' => $leaveRequests->items(),
            'pagination' => [
                'currentPage' => $leaveRequests->currentPage(),
                'lastPage' => $leaveRequests->lastPage(),
                'perPage' => $leaveRequests->perPage(),
                'total' => $leaveRequests->total(),
            ],
        ]);
    }

    public function employeeDirectory(Request $request): Response
    {
        $search = trim((string) $request->string('search'));
        $perPage = max(1, min(50, (int) $request->integer('perPage', 10)));

        $employees = User::query()
            ->where('role', User::ROLE_EMPLOYEE)
            ->when($search !== '', function ($query) use ($search): void {
                $query->where(function ($subQuery) use ($search): void {
                    $subQuery
                        ->where('name', 'like', '%'.$search.'%')
                        ->orWhere('email', 'like', '%'.$search.'%');
                });
            })
            ->orderBy('name')
            ->paginate($perPage)
            ->withQueryString()
            ->through(fn (User $user): array => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'position' => 'Employee',
                'date_hired' => $user->created_at?->format('Y-m-d') ?? '-',
                'age' => 'N/A',
            ]);

        return Inertia::render('admin/employee-directory', [
            'search' => $search,
            'employees' => $employees->items(),
            'pagination' => [
                'currentPage' => $employees->currentPage(),
                'lastPage' => $employees->lastPage(),
                'perPage' => $employees->perPage(),
                'total' => $employees->total(),
            ],
        ]);
    }

    public function documentManagement(Request $request): Response
    {
        $search = trim((string) $request->string('search'));
        $perPage = max(1, min(50, (int) $request->integer('perPage', 10)));

        $employees = User::query()
            ->where('role', User::ROLE_EMPLOYEE)
            ->when($search !== '', function ($query) use ($search): void {
                $query->where(function ($subQuery) use ($search): void {
                    $subQuery
                        ->where('name', 'like', '%'.$search.'%')
                        ->orWhere('email', 'like', '%'.$search.'%');
                });
            })
            ->orderBy('name')
            ->paginate($perPage)
            ->withQueryString()
            ->through(fn (User $user): array => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'position' => 'Employee',
            ]);

        return Inertia::render('document-management', [
            'search' => $search,
            'employees' => $employees->items(),
            'pagination' => [
                'currentPage' => $employees->currentPage(),
                'lastPage' => $employees->lastPage(),
                'perPage' => $employees->perPage(),
                'total' => $employees->total(),
            ],
        ]);
    }
}
