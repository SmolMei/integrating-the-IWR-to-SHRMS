import { useState } from 'react';
import { BellRing, Clock3, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type NotificationSnackbarProps = {
    title: string;
    message: string;
    time: string;
    type?: 'info' | 'warning' | 'success';
};

export default function NotificationSnackbar({
    title,
    message,
    time,
    type = 'info',
}: NotificationSnackbarProps) {
    const [visible, setVisible] = useState(true);

    if (!visible) {
        return null;
    }

    const typeStyles: Record<NonNullable<NotificationSnackbarProps['type']>, string> = {
        info: 'border-primary/40 bg-primary/10',
        warning: 'border-chart-3/45 bg-chart-3/12',
        success: 'border-secondary/55 bg-secondary/16',
    };

    const iconStyles: Record<NonNullable<NotificationSnackbarProps['type']>, string> = {
        info: 'bg-primary/18 text-primary',
        warning: 'bg-chart-3/20 text-chart-3',
        success: 'bg-secondary/20 text-secondary-foreground',
    };

    return (
        <div className={`animate-fade-in-up w-full rounded-xl border p-4 text-foreground shadow-lg ${typeStyles[type]}`}>
            <div className="flex items-start gap-3">
                <div className={`mt-0.5 rounded-full p-2 ${iconStyles[type]}`}>
                    <BellRing className="size-4" />
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-sm text-muted-foreground">{message}</p>
                    <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock3 className="size-3.5" />
                        {time}
                    </p>
                </div>

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-7 text-muted-foreground hover:bg-card/70 hover:text-foreground"
                    onClick={() => setVisible(false)}
                    aria-label="Dismiss notification"
                >
                    <X className="size-4" />
                </Button>
            </div>
        </div>
    );
}
