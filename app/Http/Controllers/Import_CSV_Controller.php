<?php

namespace App\Http\Controllers;

use App\Imports\AttendanceRecordsImport;
use App\Models\AttendanceRecord;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class Import_CSV_Controller extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'attendance_csv' => ['required', 'file', 'mimes:csv,txt'],
        ]);

        Excel::import(new AttendanceRecordsImport(), $validated['attendance_csv']);

        return to_route('admin.attendance-management')->with('success', 'Attendance CSV imported successfully.');
    }

    public function clearImported(): RedirectResponse
    {
        AttendanceRecord::query()->delete();

        return to_route('admin.attendance-management')->with('success', 'Imported attendance records were cleared.');
    }
}
