import { Head } from '@inertiajs/react';
import EvaluationCard from '@/components/evaluation-card';
import AppHeaderLayout from '@/layouts/app/app-header-layout';

export default function EvaluationPage() {
    return (
        <AppHeaderLayout>
            <Head title="Evaluation Page" />
            <div className="animate-fade-in p-4">
                <EvaluationCard />
            </div>
        </AppHeaderLayout>
    );
}
