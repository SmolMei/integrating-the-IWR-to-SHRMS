import { CalendarCheck2, ClipboardList } from 'lucide-react';
import { DailyAttendanceBarChart } from "./ui/daily-attendance-barchart";

export default function DailyAttendanceLogs() {
    return (
        <>
            <div className="animate-fade-in-left flex w-full flex-col rounded-xl border border-border bg-card/80 p-4 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
                <div className='flex flex-row items-center'>
                    <h1 className='my-6 ml-6 flex items-center gap-2 font-bold'>
                        <CalendarCheck2 className="size-5 text-primary" />
                        Daily Attendance Logs
                    </h1>
                </div>
                <div className="w-4/5 mx-auto px-2 sm:px-4">
                    <DailyAttendanceBarChart />
                </div>
                <div className="mx-6 mt-3 h-1 rounded-full bg-gradient-to-r from-secondary/40 via-primary/70 to-secondary/40" />
                <p className="mt-4 ml-6 flex items-center gap-2 text-sm">
                    <ClipboardList className="size-4 text-muted-foreground" />
                    Daily attendance summary for monitoring presence and time-in/time-out consistency.
                </p>
            </div>
        </>
    );
}
