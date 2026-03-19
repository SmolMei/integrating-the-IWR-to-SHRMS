<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class EmployeeUserSeeder extends Seeder
{
    public function run(): void
    {
        $employees = [
            ['employee_id' => 'EMP-001', 'name' => 'John Reyes', 'job_title' => 'Department Head', 'supervisor_id' => null, 'role' => 'evaluator', 'email' => 'john.reyes@shrms.test'],
            ['employee_id' => 'EMP-002', 'name' => 'Maria Santos', 'job_title' => 'Administrative Officer II', 'supervisor_id' => 'EMP-001', 'role' => 'employee', 'email' => 'maria.santos@shrms.test'],
            ['employee_id' => 'EMP-003', 'name' => 'Mark Bautista', 'job_title' => 'Administrative Officer II', 'supervisor_id' => 'EMP-001', 'role' => 'employee', 'email' => 'mark.bautista@shrms.test'],
            ['employee_id' => 'EMP-004', 'name' => 'Angela Cruz', 'job_title' => 'Administrative Officer II', 'supervisor_id' => 'EMP-001', 'role' => 'employee', 'email' => 'angela.cruz@shrms.test'],
            ['employee_id' => 'EMP-005', 'name' => 'Patricia Garcia', 'job_title' => 'Administrative Aide I', 'supervisor_id' => 'EMP-001', 'role' => 'employee', 'email' => 'patricia.garcia@shrms.test'],
            ['employee_id' => 'EMP-006', 'name' => 'Kevin Mendoza', 'job_title' => 'Administrative Aide I', 'supervisor_id' => 'EMP-001', 'role' => 'employee', 'email' => 'kevin.mendoza@shrms.test'],
            ['employee_id' => 'EMP-007', 'name' => 'Lorraine Flores', 'job_title' => 'Administrative Aide I', 'supervisor_id' => 'EMP-001', 'role' => 'employee', 'email' => 'lorraine.flores@shrms.test'],
            ['employee_id' => 'EMP-008', 'name' => 'Daniel Ramos', 'job_title' => 'Administrative Aide I', 'supervisor_id' => 'EMP-001', 'role' => 'employee', 'email' => 'daniel.ramos@shrms.test'],
            ['employee_id' => 'EMP-009', 'name' => 'Camille Navarro', 'job_title' => 'Administrative Aide I', 'supervisor_id' => 'EMP-001', 'role' => 'employee', 'email' => 'camille.navarro@shrms.test'],
            ['employee_id' => 'EMP-010', 'name' => 'Joshua Aquino', 'job_title' => 'Administrative Aide I', 'supervisor_id' => 'EMP-001', 'role' => 'employee', 'email' => 'joshua.aquino@shrms.test'],
            ['employee_id' => 'EMP-011', 'name' => 'Ana Dela Cruz', 'job_title' => 'Administrative Aide I', 'supervisor_id' => 'EMP-001', 'role' => 'employee', 'email' => 'ana.delacruz@shrms.test'],
            ['employee_id' => 'EMP-012', 'name' => 'Ramon Villanueva', 'job_title' => 'Administrative Aide I', 'supervisor_id' => 'EMP-001', 'role' => 'employee', 'email' => 'ramon.villanueva@shrms.test'],
            ['employee_id' => 'EMP-013', 'name' => 'Josephine Pascual', 'job_title' => 'Administrative Aide I', 'supervisor_id' => 'EMP-001', 'role' => 'employee', 'email' => 'josephine.pascual@shrms.test'],
            ['employee_id' => 'EMP-014', 'name' => 'Michael Torres', 'job_title' => 'Administrative Aide I', 'supervisor_id' => 'EMP-001', 'role' => 'employee', 'email' => 'michael.torres@shrms.test'],
            ['employee_id' => 'EMP-015', 'name' => 'Liza Castillo', 'job_title' => 'Administrative Aide I', 'supervisor_id' => 'EMP-001', 'role' => 'employee', 'email' => 'liza.castillo@shrms.test'],
            ['employee_id' => 'EMP-016', 'name' => 'Roberto Jimenez', 'job_title' => 'Administrative Aide I', 'supervisor_id' => 'EMP-001', 'role' => 'employee', 'email' => 'roberto.jimenez@shrms.test'],
            ['employee_id' => 'EMP-017', 'name' => 'Christine Morales', 'job_title' => 'Administrative Aide I', 'supervisor_id' => 'EMP-001', 'role' => 'employee', 'email' => 'christine.morales@shrms.test'],
            ['employee_id' => 'EMP-018', 'name' => 'Ferdinand Aguilar', 'job_title' => 'Administrative Aide I', 'supervisor_id' => 'EMP-001', 'role' => 'employee', 'email' => 'ferdinand.aguilar@shrms.test'],
            ['employee_id' => 'EMP-019', 'name' => 'Maricel Dela Rosa', 'job_title' => 'Administrative Aide I', 'supervisor_id' => 'EMP-001', 'role' => 'employee', 'email' => 'maricel.delarosa@shrms.test'],
            ['employee_id' => 'EMP-020', 'name' => 'Benedict Mercado', 'job_title' => 'Administrative Aide I', 'supervisor_id' => 'EMP-001', 'role' => 'employee', 'email' => 'benedict.mercado@shrms.test'],
            ['employee_id' => 'EMP-021', 'name' => 'Theresa Evangelista', 'job_title' => 'Administrative Aide I', 'supervisor_id' => 'EMP-001', 'role' => 'employee', 'email' => 'theresa.evangelista@shrms.test'],
        ];

        $password = Hash::make('Password1!');

        foreach ($employees as $data) {
            // Insert into employees table (supervisor_id=null first for EMP-001)
            Employee::query()->updateOrCreate(
                ['employee_id' => $data['employee_id']],
                [
                    'name' => $data['name'],
                    'job_title' => $data['job_title'],
                    'supervisor_id' => $data['supervisor_id'],
                ]
            );

            // Create or update user account linked to employee
            User::query()->updateOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'password' => $password,
                    'role' => $data['role'],
                    'employee_id' => $data['employee_id'],
                    'email_verified_at' => now(),
                ]
            );
        }
    }
}
