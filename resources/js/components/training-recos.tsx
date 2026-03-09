import { BookOpen, Clock3, MapPin, Mic, Target } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const recommendations = [
    {
        id: 1,
        title: 'Effective Communication',
        description: 'Enhance your ability to convey ideas clearly and collaborate effectively with colleagues.',
        date: '2026-04-15',
        time: '09:00 - 12:00',
        location: 'Online',
        speaker: 'Dr. Evelyn Reed',
        target_performance_area: 'Communication',
    },
    {
        id: 2,
        title: 'Advanced Time Management',
        description: 'Master techniques to prioritize tasks, manage workload, and boost overall productivity.',
        date: '2026-04-22',
        time: '13:00 - 16:00',
        location: 'Conference Room 3',
        speaker: 'Markus Vance',
        target_performance_area: 'Productivity',
    },
    {
        id: 3,
        title: 'Foundations of Leadership',
        description: 'Develop essential skills for leading teams, motivating others, and driving successful projects.',
        date: '2026-05-05',
        time: '09:00 - 16:00',
        location: 'Leadership Academy',
        speaker: 'Aria Montgomery',
        target_performance_area: 'Leadership',
    },
    {
        id: 4,
        title: 'Conflict Resolution Mastery',
        description: 'Learn strategies to navigate workplace disagreements and foster a positive environment.',
        date: '2026-05-12',
        time: '10:00 - 12:00',
        location: 'Online',
        speaker: 'Kenji Tanaka',
        target_performance_area: 'Teamwork',
    },
    {
        id: 5,
        title: 'Creative Problem-Solving',
        description: 'Unlock innovative solutions to complex challenges and drive continuous improvement.',
        date: '2026-05-20',
        time: '14:00 - 17:00',
        location: 'Innovation Hub',
        speaker: 'Dr. Lena Petrova',
        target_performance_area: 'Innovation',
    },
    {
        id: 6,
        title: 'Emotional Intelligence at Work',
        description: 'Improve self-awareness and interpersonal skills to build stronger professional relationships.',
        date: '2026-06-01',
        time: '09:30 - 12:30',
        location: 'Online',
        speaker: 'David Chen',
        target_performance_area: 'Emotional Intelligence',
    },
];

export default function TrainingRecommendations() {
    return (<>
        <div className="animate-fade-in col-span-2 h-full w-full overflow-hidden rounded-xl border border-border bg-card/80 p-4 shadow-xl transition-shadow duration-300 hover:shadow-2xl">
            <h1 className='my-6 ml-6 flex items-center gap-2 font-bold'>
                <BookOpen className="size-5 text-primary" />
                Training Recommendations
            </h1>
            <p className="ml-6 text-sm">Suggested learning programs based on current performance trends and priority skill gaps.</p>
            <div className="mx-6 mt-3 h-1 rounded-full bg-gradient-to-r from-primary/60 via-secondary/60 to-primary/60" />
            <div className='mt-4 mx-6'>
                <Carousel className="w-full max-w-none px-2 sm:px-4 lg:px-6">
                    <CarouselContent className='-ml-2 md:-ml-4'>
                        {recommendations.map((reco) => (
                            <CarouselItem key={reco.id} className='basis-full md:basis-1/2 lg:basis-1/3'>
                                <Card className="group h-full bg-card/80 transition-shadow duration-300 hover:shadow-lg">
                                    <CardHeader>
                                        <CardTitle>{reco.title}</CardTitle>
                                        <CardDescription className="flex items-center gap-2">
                                            <Clock3 className="size-4 text-muted-foreground" />
                                            {reco.date} | {reco.time}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2 text-sm">
                                        <p>{reco.description}</p>
                                        <p className="flex items-start gap-2">
                                            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                                            <span className="font-semibold">Location:</span> {reco.location}
                                        </p>
                                        <p className="flex items-start gap-2">
                                            <Mic className="mt-0.5 size-4 shrink-0 text-primary" />
                                            <span className="font-semibold">Speaker:</span> {reco.speaker}
                                        </p>
                                        <p className="flex items-start gap-2">
                                            <Target className="mt-0.5 size-4 shrink-0 text-primary" />
                                            <span className="font-semibold">Target Area:</span> {reco.target_performance_area}
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
            <p className="mt-4 ml-6 text-sm">Prioritize programs that align with your role goals and the most frequent coaching feedback.</p>
        </div>
    </>);
}
