import NotificationSnackbar from '@/components/notification-snackbar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { NotificationItem } from '@/types';

type NotificationsTabsProps = {
    notifications?: NotificationItem[];
};

function getNotificationType(item: NotificationItem): 'info' | 'warning' | 'success' {
    if (item.isImportant) return 'warning';
    if (item.type.includes('completed') || item.type.includes('approved')) return 'success';
    return 'info';
}

export default function NotificationsTabs({ notifications = [] }: NotificationsTabsProps) {
    const unreadNotifications = notifications.filter((n) => !n.isRead);
    const importantNotifications = notifications.filter((n) => n.isImportant);

    return (
        <Tabs defaultValue="all" className="w-full">
            <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">
                    Unread {unreadNotifications.length > 0 && <Badge className="ml-2">{unreadNotifications.length}</Badge>}
                </TabsTrigger>
                <TabsTrigger value="important">Important</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4 space-y-4">
                {notifications.length === 0 ? (
                    <p className="py-8 text-center text-muted-foreground">No notifications yet.</p>
                ) : (
                    notifications.map((n) => (
                        <NotificationSnackbar
                            key={n.id}
                            id={n.id}
                            title={n.title}
                            message={n.message}
                            time={n.time}
                            type={getNotificationType(n)}
                        />
                    ))
                )}
            </TabsContent>

            <TabsContent value="unread" className="mt-4 space-y-4">
                {unreadNotifications.length === 0 ? (
                    <p className="py-8 text-center text-muted-foreground">All caught up!</p>
                ) : (
                    unreadNotifications.map((n) => (
                        <NotificationSnackbar
                            key={n.id}
                            id={n.id}
                            title={n.title}
                            message={n.message}
                            time={n.time}
                            type={getNotificationType(n)}
                        />
                    ))
                )}
            </TabsContent>

            <TabsContent value="important" className="mt-4 space-y-4">
                {importantNotifications.length === 0 ? (
                    <p className="py-8 text-center text-muted-foreground">No important notifications.</p>
                ) : (
                    importantNotifications.map((n) => (
                        <NotificationSnackbar
                            key={n.id}
                            id={n.id}
                            title={n.title}
                            message={n.message}
                            time={n.time}
                            type={getNotificationType(n)}
                        />
                    ))
                )}
            </TabsContent>
        </Tabs>
    );
}
