import { Head } from '@inertiajs/react';
import NotificationsHeader from '@/components/notifications-header';
import NotificationsSummaryCards from '@/components/notifications-summary-cards';
import NotificationsTabs from '@/components/notifications-tabs';
import AppLayout from '@/layouts/app-layout';
import { notifications } from '@/routes';
import type { BreadcrumbItem, NotificationItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Notifications',
        href: notifications().url,
    },
];

type NotificationsPageProps = {
    notifications?: NotificationItem[];
    unreadCount?: number;
    warningCount?: number;
    todayCount?: number;
};

export default function Notifications({
    notifications: notificationItems = [],
    unreadCount = 0,
    warningCount = 0,
    todayCount = 0,
}: NotificationsPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />

            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4">
                <NotificationsHeader />
                <NotificationsSummaryCards
                    unreadCount={unreadCount}
                    warningCount={warningCount}
                    todayCount={todayCount}
                />
                <NotificationsTabs notifications={notificationItems} />
            </div>
        </AppLayout>
    );
}
