import { Head } from '@inertiajs/react';
import AttendanceCard from '@/components/attendance-card';
import AppLayout from '@/layouts/app-layout';
import { attendance } from '@/routes';
import type { BreadcrumbItem } from '@/types';

export default function Attendance() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Attendance',
            href: attendance().url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Attendance" />
            <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6">
                <AttendanceCard />
            </div>
        </AppLayout>
    );
}
