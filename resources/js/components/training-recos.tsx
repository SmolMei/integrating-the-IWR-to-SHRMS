import { BookOpen, Brain, Handshake, Lightbulb, MessageSquareText, Timer } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

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
                        <CarouselItem className='basis-full md:basis-1/2 lg:basis-1/3'>
                            <Card className="group h-full overflow-hidden bg-card/80 transition-shadow duration-300 hover:shadow-lg">
                                <CardContent className="p-0">
                                    <div className="aspect-[16/9] w-full overflow-hidden">
                                        <img
                                            src="/images/Trainings-Seminars.avif"
                                            alt="Course Illustration"
                                            width={200}
                                            height={200}
                                            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                                        />
                                    </div>
                                </CardContent>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MessageSquareText className="size-4 text-primary" />
                                        Effective Communication Skills
                                    </CardTitle>
                                    <CardDescription>
                                        <p className="text-sm">Enhance your communication skills to improve workplace interactions and collaboration.</p>
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </CarouselItem>

                        <CarouselItem className='basis-full md:basis-1/2 lg:basis-1/3'>
                            <Card className="group h-full overflow-hidden bg-card/80 transition-shadow duration-300 hover:shadow-lg">
                                <CardContent className="p-0">
                                    <div className="aspect-[16/9] w-full overflow-hidden">
                                        <img
                                            src="/images/Trainings-Seminars2.jpeg"
                                            alt="Course Illustration"
                                            width={200}
                                            height={200}
                                            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                                        />
                                    </div>
                                </CardContent>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Timer className="size-4 text-primary" />
                                        Time Management Strategies
                                    </CardTitle>
                                    <CardDescription>
                                        <p className="text-sm">Learn effective time management techniques to boost productivity and meet deadlines.</p>
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </CarouselItem>

                        <CarouselItem className='basis-full md:basis-1/2 lg:basis-1/3'>
                            <Card className="group h-full overflow-hidden bg-card/80 transition-shadow duration-300 hover:shadow-lg">
                                <CardContent className="p-0">
                                    <div className="aspect-[16/9] w-full overflow-hidden">
                                        <img
                                            src="/images/Trainings-Seminars3.jpg"
                                            alt="Course Illustration"
                                            width={200}
                                            height={200}
                                            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                                        />
                                    </div>
                                </CardContent>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BookOpen className="size-4 text-primary" />
                                        Leadership Development
                                    </CardTitle>
                                    <CardDescription>
                                        <p className="text-sm">Develop leadership skills to take on more responsibilities and advance your career.</p>
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </CarouselItem>

                        <CarouselItem className='basis-full md:basis-1/2 lg:basis-1/3'>
                            <Card className="group h-full overflow-hidden bg-card/80 transition-shadow duration-300 hover:shadow-lg">
                                <CardContent className="p-0">
                                    <div className="aspect-[16/9] w-full overflow-hidden">
                                        <img
                                            src="/images/Trainings-Seminars4.jpeg"
                                            alt="Course Illustration"
                                            width={200}
                                            height={200}
                                            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                                        />
                                    </div>
                                </CardContent>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Handshake className="size-4 text-primary" />
                                        Conflict Resolution Techniques
                                    </CardTitle>
                                    <CardDescription>
                                        <p className="text-sm">Learn how to effectively resolve conflicts and maintain a positive work environment.</p>
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </CarouselItem>

                        <CarouselItem className='basis-full md:basis-1/2 lg:basis-1/3'>
                            <Card className="group h-full overflow-hidden bg-card/80 transition-shadow duration-300 hover:shadow-lg">
                                <CardContent className="p-0">
                                    <div className="aspect-[16/9] w-full overflow-hidden">
                                        <img
                                            src="/images/Trainings-Seminars5.jpeg"
                                            alt="Course Illustration"
                                            width={200}
                                            height={200}
                                            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                                        />
                                    </div>
                                </CardContent>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Lightbulb className="size-4 text-primary" />
                                        Problem Solving Techniques
                                    </CardTitle>
                                    <CardDescription>
                                        <p className="text-sm">Enhance your problem-solving skills to effectively address challenges and find innovative solutions.</p>
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </CarouselItem>

                        <CarouselItem className='basis-full md:basis-1/2 lg:basis-1/3'>
                            <Card className="group h-full overflow-hidden bg-card/80 transition-shadow duration-300 hover:shadow-lg">
                                <CardContent className="p-0">
                                    <div className="aspect-[16/9] w-full overflow-hidden">
                                        <img
                                            src="/images/Trainings-Seminars6.jpeg"
                                            alt="Course Illustration"
                                            width={200}
                                            height={200}
                                            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                                        />
                                    </div>
                                </CardContent>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Brain className="size-4 text-primary" />
                                        Emotional Intelligence Training
                                    </CardTitle>
                                    <CardDescription>
                                        <p className="text-sm">Develop emotional intelligence to better understand and manage your emotions and relationships.</p>
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="left-0 sm:-left-4" />
                    <CarouselNext className="right-0 sm:-right-4" />
                </Carousel>
            </div>
            <p className="mt-4 ml-6 text-sm">Prioritize programs that align with your role goals and the most frequent coaching feedback.</p>
        </div>
    </>);
}
