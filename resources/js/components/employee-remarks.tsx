import { CalendarDays, FileText, MessageSquareText, UserRound } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

type Remark = {
    employeeId: string;
    date: string;
    remark: string;
};

type EmployeeRemarksProps = {
    remarks?: Remark[];
};

export default function EmployeeRemarks({ remarks = [] }: EmployeeRemarksProps) {

    return (
        <div className="animate-fade-in-right flex w-full min-w-0 flex-1 flex-col gap-4 rounded-xl border border-border bg-card/80 p-4 shadow-xl transition-shadow duration-300 hover:shadow-2xl sm:gap-5">
            <h1 className="flex items-center gap-2 text-base font-bold sm:text-lg">
                <MessageSquareText className="size-5 text-primary" />
                Employee Remarks
            </h1>
            <p className="text-sm text-muted-foreground">
                Recent evaluator comments that highlight behavior, output quality, and follow-up coaching needs.
            </p>
            {remarks.length === 0 ? (
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-border p-8">
                    <p className="text-sm text-muted-foreground">No evaluator remarks yet.</p>
                </div>
            ) : (
                <div className="relative">
                    <Carousel className="w-full max-w-none px-2 sm:px-4 lg:px-6">
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {remarks.map((remark, index) => (
                                <CarouselItem key={`${remark.employeeId}-${index}`} className="basis-full">
                                    <Card className="h-full w-full min-w-0 bg-card/80 transition-shadow duration-300 hover:shadow-lg">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <UserRound className="size-4 text-primary" />
                                                {remark.employeeId}
                                            </CardTitle>
                                            <CardDescription className="flex items-center gap-2">
                                                <CalendarDays className="size-4 text-muted-foreground" />
                                                {remark.date}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="flex items-start gap-2">
                                                <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                                {remark.remark}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-0 sm:-left-4" />
                        <CarouselNext className="right-0 sm:-right-4" />
                    </Carousel>
                </div>
            )}
            <p className="text-sm text-muted-foreground">
                Use these notes to guide one-on-one coaching plans and next-cycle development targets.
            </p>
        </div>
    );
}
