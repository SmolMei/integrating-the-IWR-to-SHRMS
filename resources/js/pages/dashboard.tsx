import { Head } from '@inertiajs/react';
import PredictivePerformance from '@/components/predictive-performance-module';
import QuarterPerformanceTrends from '@/components/quarter-performance-trends';
import TrainingRecommendations from '@/components/training-recos';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Personalized Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Personalized Dashboard" />
            <div className="p-4 mx-auto flex w-full flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-stretch">
                <QuarterPerformanceTrends />
                <TrainingRecommendations />
                <PredictivePerformance />
            </div>
        </AppLayout>
    );
}
