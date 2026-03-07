import NotificationSnackbar from '@/components/notification-snackbar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function NotificationsTabs() {
    return (
        <Tabs defaultValue="all" className="w-full">
            <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">
                    Unread <Badge className="ml-2">5</Badge>
                </TabsTrigger>
                <TabsTrigger value="important">Important</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4 space-y-4">
                <NotificationSnackbar
                    title="Leave Request Approved"
                    message="Your leave request for March 18, 2026 has been approved."
                    time="2 minutes ago"
                    type="success"
                />

                <NotificationSnackbar
                    title="Evaluation Reminder"
                    message="Please complete your pending employee evaluations before Friday."
                    time="10 minutes ago"
                    type="warning"
                />

                <NotificationSnackbar
                    title="System Update"
                    message="New analytics widgets are now available in your performance dashboard."
                    time="Today, 8:40 AM"
                    type="info"
                />
            </TabsContent>

            <TabsContent value="unread" className="mt-4 space-y-4">
                <NotificationSnackbar
                    title="Pending Evaluation"
                    message="You still have 3 evaluation forms that require completion."
                    time="Today, 9:15 AM"
                    type="warning"
                />
                <NotificationSnackbar
                    title="New Document Submitted"
                    message="A new IPCR document was submitted for your review."
                    time="Today, 8:58 AM"
                    type="info"
                />
            </TabsContent>

            <TabsContent value="important" className="mt-4 space-y-4">
                <NotificationSnackbar
                    title="Policy Deadline Alert"
                    message="Submission deadline for quarterly compliance reports is tomorrow."
                    time="Yesterday, 4:20 PM"
                    type="warning"
                />
            </TabsContent>
        </Tabs>
    );
}
