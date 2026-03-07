import { TriangleAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotificationsSummaryCards() {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="notif-summary-card border-primary/20 bg-card/80">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold text-muted-foreground">Unread</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-bold text-primary">5</CardContent>
            </Card>
            <Card className="notif-summary-card notif-delay-1 border-chart-3/30 bg-card/80">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold text-muted-foreground">Warnings</CardTitle>
                </CardHeader>
                <CardContent className="inline-flex items-center gap-2 text-2xl font-bold">
                    2
                    <TriangleAlert className="size-5 text-chart-3" />
                </CardContent>
            </Card>
            <Card className="notif-summary-card notif-delay-2 border-secondary/35 bg-card/80">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold text-muted-foreground">Today</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-bold text-secondary-foreground">8</CardContent>
            </Card>
        </div>
    );
}
