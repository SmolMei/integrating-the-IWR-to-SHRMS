<?php

namespace App\Exports;

use App\Models\AttendanceRecord;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class AttendanceRecordsExport implements FromCollection, WithHeadings
{
    public function __construct(private readonly string $search = '')
    {
    }

    /**
     * @return Collection<int, array<string, int|string|null>>
     */
    public function collection(): Collection
    {
        return AttendanceRecord::query()
            ->when(trim($this->search) !== '', function ($query): void {
                $query->where(function ($subQuery): void {
                    $subQuery
                        ->where('name', 'like', '%'.trim($this->search).'%')
                        ->orWhere('date', 'like', '%'.trim($this->search).'%')
                        ->orWhere('clock_in', 'like', '%'.trim($this->search).'%')
                        ->orWhere('clock_out', 'like', '%'.trim($this->search).'%')
                        ->orWhere('status', 'like', '%'.trim($this->search).'%');
                });
            })
            ->orderByDesc('date')
            ->orderBy('name')
            ->get()
            ->map(fn (AttendanceRecord $attendanceRecord): array => [
                'id' => $attendanceRecord->id,
                'name' => $attendanceRecord->name,
                'date' => $attendanceRecord->date?->format('Y-m-d') ?? '',
                'clock_in' => $attendanceRecord->clock_in,
                'clock_out' => $attendanceRecord->clock_out,
                'status' => $attendanceRecord->status,
            ]);
    }

    /**
     * @return array<int, string>
     */
    public function headings(): array
    {
        return ['id', 'name', 'date', 'clock_in', 'clock_out', 'status'];
    }
}
