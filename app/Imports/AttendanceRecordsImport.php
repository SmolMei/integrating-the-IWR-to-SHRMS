<?php

namespace App\Imports;

use App\Models\AttendanceRecord;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use Throwable;

class AttendanceRecordsImport implements ToCollection, WithHeadingRow
{
    /**
     * @param  Collection<int, Collection<int|string, mixed>>  $rows
     */
    public function collection(Collection $rows): void
    {
        $rows
            ->map(function (Collection $row): ?array {
                $name = $this->valueFromRow($row, ['name']);
                $dateValue = $this->valueFromRow($row, ['date']);
                $date = $this->normalizeDate($dateValue);

                if ($name === null || $date === null) {
                    return null;
                }

                return [
                    'name' => $name,
                    'date' => $date,
                    'clock_in' => $this->valueFromRow($row, ['clock_in', 'clockin']),
                    'clock_out' => $this->valueFromRow($row, ['clock_out', 'clockout']),
                    'status' => $this->valueFromRow($row, ['status']) ?? 'Present',
                ];
            })
            ->filter()
            ->each(function (array $payload): void {
                AttendanceRecord::query()->create($payload);
            });
    }

    private function valueFromRow(Collection $row, array $expectedKeys): ?string
    {
        $normalizedExpectedKeys = array_map(
            fn (string $key): string => $this->normalizeHeader($key),
            $expectedKeys
        );

        foreach ($row as $key => $value) {
            $normalizedHeader = $this->normalizeHeader((string) $key);
            if (in_array($normalizedHeader, $normalizedExpectedKeys, true)) {
                $stringValue = trim((string) $value);

                return $stringValue === '' ? null : $stringValue;
            }
        }

        return null;
    }

    private function normalizeHeader(string $header): string
    {
        $headerWithoutBom = str_replace("\xEF\xBB\xBF", '', $header);
        $headerWithUnderscores = preg_replace('/[^a-z0-9]+/i', '_', trim($headerWithoutBom));

        return trim(strtolower((string) $headerWithUnderscores), '_');
    }

    private function normalizeDate(?string $dateValue): ?string
    {
        if ($dateValue === null || trim($dateValue) === '') {
            return null;
        }

        if (is_numeric($dateValue)) {
            return Carbon::instance(Date::excelToDateTimeObject((float) $dateValue))->toDateString();
        }

        try {
            return Carbon::parse($dateValue)->toDateString();
        } catch (Throwable) {
            return null;
        }
    }
}
