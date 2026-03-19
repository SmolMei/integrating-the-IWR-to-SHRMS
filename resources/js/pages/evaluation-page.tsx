import { Head } from '@inertiajs/react';
import EvaluationCard from '@/components/evaluation-card';
import AppHeaderLayout from '@/layouts/app/app-header-layout';

type EvaluationPageProps = {
    employee: {
        employee_id: string;
        name: string;
        job_title: string;
    } | null;
    submission: {
        id: number;
        performance_rating: number | null;
        status: string | null;
        stage: string | null;
        evaluator_gave_remarks: boolean;
        remarks: string | null;
        notification: string | null;
    } | null;
};

export default function EvaluationPage({ employee, submission }: EvaluationPageProps) {
    return (
        <AppHeaderLayout>
            <Head title={employee ? `Evaluate ${employee.name}` : "Evaluation Page"} />
            <div className="animate-fade-in p-4">
                {employee ? (
                    <EvaluationCard
                        employeeId={employee.employee_id}
                        employeeName={employee.name}
                        submission={submission}
                    />
                ) : (
                    <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card/80 p-8 text-center shadow-xl">
                        <p className="text-lg text-muted-foreground">
                            No employee selected. Please select an employee from the Document Management page.
                        </p>
                    </div>
                )}
            </div>
        </AppHeaderLayout>
    );
}
