import { Send } from "lucide-react";

export default function SubmitHeader() {
    return (
        <div className="flex items-center justify-between">
            <div className="animate-fade-in-down">
                <h1 className="flex items-center gap-2 text-3xl font-bold">
                    <Send className="h-8 w-8" />
                    Evaluation Form Submission
                </h1>
                <p className="mt-1 text-muted-foreground">Submit an employee evaluation form to the evaluator for review.</p>
            </div>
        </div>
    );
}