<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LeaveApplication extends Model
{
    protected $fillable = [
        'leave_request_id',
        'employee_id',
        'leave_type',
        'days_requested',
        'start_date',
        'has_medical_certificate',
        'has_solo_parent_id',
        'has_marriage_certificate',
        'dh_decision',
        'hr_decision',
        'has_rejection_reason',
        'rejection_reason_text',
        'status',
        'stage',
        'routing_action',
        'approver_id',
        'confidence_pct',
        'notification',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'has_medical_certificate' => 'boolean',
            'has_solo_parent_id' => 'boolean',
            'has_marriage_certificate' => 'boolean',
            'dh_decision' => 'integer',
            'hr_decision' => 'integer',
            'has_rejection_reason' => 'integer',
            'confidence_pct' => 'decimal:2',
        ];
    }

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'employee_id', 'employee_id');
    }
}
