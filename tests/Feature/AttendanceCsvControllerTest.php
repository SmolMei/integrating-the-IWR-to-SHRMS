<?php

use App\Models\AttendanceRecord;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('hr personnel can import attendance csv', function () {
    Storage::fake('local');
    $hrUser = User::factory()->asHrPersonnel()->create();

    $csvContent = <<<CSV
name,date,clock_in,clock_out,status
Alice Employee,2026-03-07,08:00 AM,05:00 PM,Present
CSV;

    $file = UploadedFile::fake()->createWithContent('attendance.csv', $csvContent);

    $this->actingAs($hrUser)
        ->post(route('admin.attendance-management.import-csv'), [
            'attendance_csv' => $file,
        ])
        ->assertRedirect(route('admin.attendance-management'));

    $this->assertDatabaseHas('attendance_records', [
        'name' => 'Alice Employee',
        'status' => 'Present',
    ]);
});

test('hr personnel can import biometric csv with human-readable headers', function () {
    $hrUser = User::factory()->asHrPersonnel()->create();

    $csvContent = <<<CSV
ID ,Name,Date,Clock In,Clock Out,Status
1,Camille Navarro,3/15/26,8:00 AM,5:30 PM,Present
CSV;

    $file = UploadedFile::fake()->createWithContent('biometrics_attendance.csv', $csvContent);

    $this->actingAs($hrUser)
        ->post(route('admin.attendance-management.import-csv'), [
            'attendance_csv' => $file,
        ])
        ->assertRedirect(route('admin.attendance-management'));

    $this->assertDatabaseHas('attendance_records', [
        'name' => 'Camille Navarro',
        'date' => '2026-03-15 00:00:00',
        'clock_in' => '8:00 AM',
        'clock_out' => '5:30 PM',
        'status' => 'Present',
    ]);
});

test('hr personnel can export attendance csv', function () {
    $hrUser = User::factory()->asHrPersonnel()->create();
    AttendanceRecord::query()->create([
        'name' => 'Alice Employee',
        'date' => '2026-03-07',
        'clock_in' => '08:00 AM',
        'clock_out' => '05:00 PM',
        'status' => 'Present',
    ]);

    $response = $this->actingAs($hrUser)
        ->get(route('admin.attendance-management.export-csv'));

    $response->assertOk();
    $response->assertDownload('attendance-records-'.now()->format('Y-m-d').'.csv');
});

test('hr personnel can clear imported attendance records', function () {
    $hrUser = User::factory()->asHrPersonnel()->create();

    AttendanceRecord::query()->create([
        'name' => 'Alice Employee',
        'date' => '2026-03-07',
        'clock_in' => '08:00 AM',
        'clock_out' => '05:00 PM',
        'status' => 'Present',
    ]);

    $this->actingAs($hrUser)
        ->delete(route('admin.attendance-management.clear-imported'))
        ->assertRedirect(route('admin.attendance-management'));

    expect(AttendanceRecord::query()->count())->toBe(0);
});
