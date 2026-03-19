<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('leave_applications', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id', 20);
            $table->string('leave_type', 50);
            $table->integer('days_requested');
            $table->date('start_date');
            $table->boolean('has_medical_certificate')->default(false);
            $table->boolean('has_solo_parent_id')->default(false);
            $table->boolean('has_marriage_certificate')->default(false);

            // Updated as approvers act
            $table->tinyInteger('dh_decision')->default(0); // 0=pending 1=approved 2=rejected
            $table->tinyInteger('hr_decision')->default(0);
            $table->tinyInteger('has_rejection_reason')->default(0);
            $table->text('rejection_reason_text')->nullable();

            // IWR response fields
            $table->string('status', 30)->nullable();
            $table->string('stage', 50)->nullable();
            $table->string('routing_action', 50)->nullable();
            $table->string('approver_id', 20)->nullable();
            $table->decimal('confidence_pct', 5, 2)->nullable();
            $table->text('notification')->nullable();

            $table->timestamps();

            $table->foreign('employee_id')
                ->references('employee_id')
                ->on('employees');
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leave_applications');
    }
};
