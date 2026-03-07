import { BarChart3, CalendarRange, ChevronDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { QuarterBarChart, type Quarter } from '@/components/ui/quarter-bar-chart';

export default function QuarterPerformanceTrends() {
    const [selectedQuarter, setSelectedQuarter] = useState<Quarter>('Q1');

    const selectedQuarterLabel = useMemo((): string => {
        const labels: Record<Quarter, string> = {
            Q1: '1st Quarter',
            Q2: '2nd Quarter',
            Q3: '3rd Quarter',
            Q4: '4th Quarter',
        };

        return labels[selectedQuarter];
    }, [selectedQuarter]);

    return (
        <div className="animate-fade-in-left flex w-full flex-col rounded-xl border border-border bg-card/80 p-4 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
            <div className='flex flex-row items-center'>
                <h1 className='my-6 ml-6 flex items-center gap-2 font-bold'>
                    <BarChart3 className="size-5 text-primary" />
                    Quarterly Performance Trends
                </h1>
                <div className='ml-auto mr-6 flex items-center gap-2'>
                    <label className='flex items-center gap-1 text-sm'>
                        <CalendarRange className="size-4 text-primary" />
                        Select Quarter:
                    </label>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-40 justify-between">
                                {selectedQuarterLabel}
                                <ChevronDown className="size-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedQuarter('Q1')}>1st Quarter</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedQuarter('Q2')}>2nd Quarter</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedQuarter('Q3')}>3rd Quarter</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSelectedQuarter('Q4')}>4th Quarter</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="w-4/5 mx-auto px-2 sm:px-4">
                <QuarterBarChart quarter={selectedQuarter} />
            </div>
            <div className="mx-6 mt-3 h-1 rounded-full bg-gradient-to-r from-primary/40 via-secondary/80 to-primary/40" />
            <p className="mt-4 ml-6 text-sm">
                Performance scores for the selected quarter, showing strengths and areas that may need coaching.
            </p>
            <p className="mt-2 ml-6 flex items-center gap-1 text-sm">
                <CalendarRange className="size-4 text-muted-foreground" />
                Viewing: {selectedQuarterLabel}.
            </p>
        </div>
    );
}
