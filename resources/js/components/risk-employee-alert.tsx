import { ShieldAlert, TriangleAlert } from 'lucide-react';
import { DoughnutChart } from '@/components/ui/doughnut-chart';

export default function RiskEmployeeAlert() {
    return (
        <div className="animate-fade-in-right flex w-full min-w-0 flex-1 flex-col rounded-xl border border-border bg-card/80 p-4 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
                <h1 className='my-6 ml-6 flex w-fit items-center gap-2 rounded-md px-2 py-1 font-bold'>
                    <ShieldAlert className="size-5 text-primary" />
                    Employee Risk Alert
                </h1>
                <div className="w-full px-2 sm:px-4">
                    <DoughnutChart />
                </div>
                <p className="mt-4 ml-6 flex items-center gap-2 text-sm">
                    <TriangleAlert className="size-4 text-muted-foreground" />
                    Snapshot of employees who may need immediate support based on recent performance patterns.
                </p>
        </div>
    );
}
