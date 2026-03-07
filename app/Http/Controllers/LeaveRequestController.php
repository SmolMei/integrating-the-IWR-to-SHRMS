<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLeaveRequestRequest;
use App\Models\LeaveRequest;
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

        LeaveRequest::query()->create([
            'user_id' => $request->user()->id,
            'leave_type' => $request->string('leaveType')->toString(),
            'start_date' => $request->string('startDate')->toString(),
            'end_date' => $request->string('endDate')->toString(),
            'reason' => $request->string('reason')->toString(),
            'medical_certificate_path' => $medicalCertificatePath,
            'marriage_certificate_path' => $marriageCertificatePath,
            'solo_parent_id_path' => $soloParentIdPath,
        ]);

        return to_route('leave-application')->with('success', 'Leave request submitted successfully.');
    }
}
