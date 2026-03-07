<?php

use App\Models\User;

dataset('employee-allowed-routes', [
    'dashboard',
    'leave-application',
]);

dataset('employee-forbidden-routes', [
    'performanceDashboard',
    'document-management',
    'admin.performance-dashboard',
    'admin.employee-directory',
    'admin.attendance-management',
    'admin.leave-management',
    'training-scheduling',
    'admin.training-scheduling',
]);

dataset('evaluator-allowed-routes', [
    'performanceDashboard',
    'dashboard',
    'document-management',
    'leave-application',
]);

dataset('evaluator-forbidden-routes', [
    'admin.performance-dashboard',
    'admin.employee-directory',
    'admin.attendance-management',
    'admin.leave-management',
    'training-scheduling',
    'admin.training-scheduling',
]);

dataset('hr-allowed-routes', [
    'admin.performance-dashboard',
    'admin.employee-directory',
    'admin.attendance-management',
    'admin.leave-management',
    'training-scheduling',
    'admin.training-scheduling',
]);

dataset('hr-forbidden-routes', [
    'performanceDashboard',
    'dashboard',
    'document-management',
    'leave-application',
]);

test('employee can access employee routes', function (string $routeName) {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route($routeName))
        ->assertOk();
})->with('employee-allowed-routes');

test('employee cannot access evaluator and hr personnel routes', function (string $routeName) {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route($routeName))
        ->assertForbidden();
})->with('employee-forbidden-routes');

test('evaluator can access evaluator routes', function (string $routeName) {
    $user = User::factory()->asEvaluator()->create();

    $this->actingAs($user)
        ->get(route($routeName))
        ->assertOk();
})->with('evaluator-allowed-routes');

test('evaluator cannot access hr personnel routes', function (string $routeName) {
    $user = User::factory()->asEvaluator()->create();

    $this->actingAs($user)
        ->get(route($routeName))
        ->assertForbidden();
})->with('evaluator-forbidden-routes');

test('hr personnel can access hr personnel routes', function (string $routeName) {
    $user = User::factory()->asHrPersonnel()->create();

    $this->actingAs($user)
        ->get(route($routeName))
        ->assertOk();
})->with('hr-allowed-routes');

test('hr personnel cannot access employee and evaluator routes', function (string $routeName) {
    $user = User::factory()->asHrPersonnel()->create();

    $this->actingAs($user)
        ->get(route($routeName))
        ->assertForbidden();
})->with('hr-forbidden-routes');
