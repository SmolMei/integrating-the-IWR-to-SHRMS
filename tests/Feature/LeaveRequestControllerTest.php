<?php

use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('employee can submit a leave request', function () {
    Storage::fake('public');
    $employeeUser = User::factory()->create();

    $this->actingAs($employeeUser)
        ->post(route('leave-application.store'), [
            'leaveType' => 'force-leave',
            'startDate' => '2026-03-10',
            'endDate' => '2026-03-12',
            'reason' => 'Planned leave.',
        ])
        ->assertRedirect(route('leave-application'));

    $this->assertDatabaseHas('leave_requests', [
        'user_id' => $employeeUser->id,
        'leave_type' => 'force-leave',
        'start_date' => '2026-03-10 00:00:00',
        'end_date' => '2026-03-12 00:00:00',
        'reason' => 'Planned leave.',
    ]);
});

test('medical certificate is required for sick leave longer than 6 days', function () {
    $employeeUser = User::factory()->create();

    $this->actingAs($employeeUser)
        ->post(route('leave-application.store'), [
            'leaveType' => 'sick-leave',
            'startDate' => '2026-03-01',
            'endDate' => '2026-03-08',
            'reason' => 'Extended recovery.',
        ])
        ->assertSessionHasErrors(['medicalCertificate']);
});

test('paternity leave can upload marriage certificate', function () {
    Storage::fake('public');
    $employeeUser = User::factory()->create();

    $this->actingAs($employeeUser)
        ->post(route('leave-application.store'), [
            'leaveType' => 'paternity-leave',
            'startDate' => '2026-04-01',
            'endDate' => '2026-04-03',
            'reason' => 'Paternity support.',
            'marriageCertificate' => UploadedFile::fake()->create('marriage-certificate.pdf', 120, 'application/pdf'),
        ])
        ->assertRedirect(route('leave-application'));

    $this->assertDatabaseHas('leave_requests', [
        'user_id' => $employeeUser->id,
        'leave_type' => 'paternity-leave',
    ]);
});
