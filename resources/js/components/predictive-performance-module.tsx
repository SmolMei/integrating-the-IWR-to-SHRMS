import { usePage } from '@inertiajs/react';
import { Briefcase, ChartLine, TrendingUp, UserRound } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart } from '@/components/ui/line-chart';

export default function PredictivePerformance() {
    const { auth } = usePage().props;

    return (<>
        <div className="animate-fade-in-right flex w-full flex-col rounded-xl border border-border bg-secondary/80 p-4 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
            <h1 className='my-6 ml-6 flex items-center gap-2 font-bold'>
                <ChartLine className="size-5 text-primary" />
                Predictive Performance Analysis
            </h1>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Card className="h-full w-full min-w-0 bg-card/80 transition-shadow duration-300 hover:shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="size-4 text-primary" />
                            Historical Performance
                        </CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent className="min-w-0">
                        <div className="mx-auto my-auto w-full min-w-0">
                            <LineChart />
                        </div>
                    </CardContent>
                </Card>
                <Card className="h-full w-full min-w-0 bg-card/80 transition-shadow duration-300 hover:shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ChartLine className="size-4 text-primary" />
                            Projected Performance
                        </CardTitle>
                        <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent className="min-w-0">
                        <div className="mx-auto my-auto w-full min-w-0">
                            <LineChart />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 rounded-lg pt-2 sm:grid-cols-2'>
                <div className="space-y-1">
                    <p className="flex items-center gap-2 text-sm font-semibold">
                        <UserRound className="size-4 text-primary" />
                        Employee ID: EMP-00{auth.user.id}
                    </p>
                    <p className="flex items-center gap-2 text-sm font-semibold">
                        <UserRound className="size-4 text-primary" />
                        Name: {auth.user.name}
                    </p>
                </div>
                <div className='space-y-1 sm:text-right'>
                    <p className="flex items-center justify-start gap-2 text-sm font-semibold sm:justify-end">
                        <Briefcase className="size-4 text-primary" />
                        Position: {auth.user.role || 'N/A'}
                    </p>
                    <p className="flex items-center justify-start gap-2 text-sm font-semibold sm:justify-end">
                        Remarks: Consistent communicator with room to improve delivery under pressure.
                    </p>
                </div>
            </div>
        </div>
    </>);
}
