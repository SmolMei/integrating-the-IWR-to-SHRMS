<?php

use App\Models\User;

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertOk();
});

test('new users can register', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'role' => User::ROLE_EMPLOYEE,
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
    expect(auth()->user()?->role)->toBe(User::ROLE_EMPLOYEE);
});

test('hr personnel are redirected to hr dashboard after registration', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'HR User',
        'email' => 'hr@example.com',
        'role' => User::ROLE_HR_PERSONNEL,
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('admin.performance-dashboard', absolute: false));
    expect(auth()->user()?->role)->toBe(User::ROLE_HR_PERSONNEL);
});
