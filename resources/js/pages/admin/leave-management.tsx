import { Head, usePage } from '@inertiajs/react';
import HrLeaveManagementTable from '@/components/hr-leave-management-table';
import LeaveRequestTable from '@/components/leave-request-table';
import AppLayout from '@/layouts/app-layout';
import * as admin from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';
import type { User } from '@/types/auth';

type LeaveRequest = {
    id: number;
    name: string;
    leaveType: string;
    startDate: string;
    endDate: string;
    reason: string;
    status?: string;
    stage?: string;
    leaveApplicationId?: number;
};

type PaginationMeta = {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Leave Management',
        href: admin.leaveManagement().url,
    },
];

export default function LeaveManagement({
    leaveRequests,
    search,
    pagination,
}: {
    leaveRequests: LeaveRequest[];
    search: string;
    pagination: PaginationMeta;
}) {
    const { auth } = usePage<{ auth: { user: User } }>().props;
    const isHr = auth.user.role === 'hr-personnel';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Leave Management" />
            <div className="p-4 mx-auto flex w-full flex-col gap-6 lg:items-stretch">
                {isHr ? (
                    <HrLeaveManagementTable leaveRequests={leaveRequests} search={search} pagination={pagination} />
                ) : (
                    <LeaveRequestTable leaveRequests={leaveRequests} search={search} pagination={pagination} />
                )}
            </div>
        </AppLayout>
    );
}
