import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { submitEvaluation } from '@/routes';
import type { BreadcrumbItem, User } from '@/types';
import SubmitHeader from '@/components/submit-header';
import SubmitCard from '@/components/submit-card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Submit Evaluation',
        href: submitEvaluation().url,
    },
];

export default function SubmitEvaluation() {
    const { auth } = usePage<{ auth: { user: User } }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Submit Evaluation" /> 
            <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6">
                <SubmitHeader />
                <SubmitCard />
            </div>
        </AppLayout>
    );            
}
