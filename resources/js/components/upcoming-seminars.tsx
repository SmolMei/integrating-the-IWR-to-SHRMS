import { CalendarDays, Clock3, MapPin, Mic, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

type Seminar = {
    id: number;
    title: string;
    description: string;
    location: string;
    time: string;
    speaker: string;
    target_performance_area: string;
    date: string;
};

export default function UpcomingSeminars({ seminars }: { seminars: Seminar[] }) {
    const upcomingSeminars = seminars.slice(0, 10);

    return (
        <div className="animate-fade-in col-span-2 col-start-1 col-end-3 h-full w-full overflow-hidden rounded-xl border border-border bg-background/80 p-4 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
            <h1 className="my-6 ml-6 flex items-center gap-2 font-bold">
                <CalendarDays className="size-5 text-primary" />
                Upcoming Seminars and Trainings
            </h1>
            <p className="ml-6 text-sm">Scheduled learning events you can join in the coming weeks.</p>

            <div className="mx-6 mt-4">
                <Carousel className="w-full max-w-none px-2 sm:px-4 lg:px-6">
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {upcomingSeminars.length === 0 && (
                            <CarouselItem className="basis-full">
                                <Card className="h-full bg-card/80">
                                    <CardHeader>
                                        <CardTitle>No upcoming seminars</CardTitle>
                                        <CardDescription>Create seminar entries in Training Scheduling to populate this list.</CardDescription>
                                    </CardHeader>
                                </Card>
                            </CarouselItem>
                        )}

                        {upcomingSeminars.map((seminar) => (
                            <CarouselItem key={seminar.id} className="basis-full md:basis-1/2 lg:basis-1/3">
                                <Card className="group h-full bg-card/80 transition-shadow duration-300 hover:shadow-lg">
                                    <CardHeader>
                                        <CardTitle>{seminar.title}</CardTitle>
                                        <CardDescription className="flex items-center gap-2">
                                            <Clock3 className="size-4 text-muted-foreground" />
                                            {seminar.date} | {seminar.time}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2 text-sm">
                                        <p>{seminar.description}</p>
                                        <p className="flex items-start gap-2">
                                            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                                            <span className="font-semibold">Location:</span> {seminar.location}
                                        </p>
                                        <p className="flex items-start gap-2">
                                            <Mic className="mt-0.5 size-4 shrink-0 text-primary" />
                                            <span className="font-semibold">Speaker:</span> {seminar.speaker}
                                        </p>
                                        <p className="flex items-start gap-2">
                                            <Target className="mt-0.5 size-4 shrink-0 text-primary" />
                                            <span className="font-semibold">Target Area:</span> {seminar.target_performance_area}
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
        </div>
    );
}
