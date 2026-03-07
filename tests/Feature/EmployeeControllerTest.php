<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('employee directory only returns users with employee role', function () {
    User::factory()->create([
        'name' => 'Employee One',
    ]);
    User::factory()->create([
        'name' => 'Employee Two',
    ]);
    User::factory()->asEvaluator()->create([
        'name' => 'Evaluator User',
    ]);

    $hrUser = User::factory()->asHrPersonnel()->create();

    $this->actingAs($hrUser)
        ->get(route('admin.employee-directory'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/employee-directory')
            ->has('employees', 2)
            ->where('employees.0.role', User::ROLE_EMPLOYEE)
            ->where('employees.1.role', User::ROLE_EMPLOYEE));
});

test('document management only returns users with employee role', function () {
    User::factory()->create([
        'name' => 'Employee One',
    ]);
    User::factory()->create([
        'name' => 'Employee Two',
    ]);
    User::factory()->asHrPersonnel()->create([
        'name' => 'HR User',
    ]);

    $evaluatorUser = User::factory()->asEvaluator()->create();

    $this->actingAs($evaluatorUser)
        ->get(route('document-management'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('document-management')
            ->has('employees', 2)
            ->where('employees.0.role', User::ROLE_EMPLOYEE)
            ->where('employees.1.role', User::ROLE_EMPLOYEE));
});
