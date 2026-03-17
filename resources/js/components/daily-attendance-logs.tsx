import { CalendarCheck2, ClipboardList } from 'lucide-react';
import { DailyAttendanceBarChart } from "./ui/daily-attendance-barchart";

export default function DailyAttendanceLogs() {
    return (
        <div className="animate-fade-in-left flex w-full flex-col gap-4 rounded-xl border border-border bg-card/80 p-4 shadow-xl transition-shadow duration-300 hover:shadow-2xl sm:gap-5">
            <div className="flex items-center gap-2 text-base font-bold sm:text-lg">
                <CalendarCheck2 className="size-5 text-primary" />
                Daily Attendance Logs
            </div>
            <div className="mx-auto w-3/4 max-w-[22rem] sm:max-w-none sm:px-4">
                <DailyAttendanceBarChart />
            </div>
            <div className="mx-4 mt-2 h-1 rounded-full bg-gradient-to-r from-secondary/40 via-primary/70 to-secondary/40 sm:mx-6" />
            <div className="flex items-start gap-2 text-sm text-muted-foreground ml-6">
                <ClipboardList className="mt-0.5 size-4 shrink-0" />
                Daily attendance summary for monitoring presence and time-in/time-out consistency.
            </div>
        </div>
    );
}
