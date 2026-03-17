import { Head } from '@inertiajs/react';
import LeaveRequestForm from '@/components/leave-request-form';
import AppLayout from '@/layouts/app-layout';
import { leaveApplication } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Leave Application',
        href: leaveApplication().url,
    },
];

export default function LeaveApplication() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leave Application" />
             <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6">
               <LeaveRequestForm />
            </div>
        </AppLayout>
    );
}
