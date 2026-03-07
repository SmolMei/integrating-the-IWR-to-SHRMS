import { Head, Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, LogIn, ShieldCheck, Sparkles, UserPlus } from 'lucide-react';
import { dashboard, home, login, performanceDashboard, register } from '@/routes';
import * as admin from '@/routes/admin';
import type { User } from '@/types';

export default function HomepageHeader() {
    const { auth, canRegister } = usePage<{ auth: { user: User | null }; canRegister?: boolean }>().props;
    const user = auth?.user ?? null;
    const registrationEnabled = canRegister ?? false;

    const dashboardLink = user?.role === 'hr-personnel'
        ? admin.performanceDashboard()
        : user?.role === 'evaluator'
            ? performanceDashboard()
        : dashboard();

    return (
        <>
            <Head title='Smart HRMS'>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <header className="overflow-x-hidden">
                <nav className="relative bg-secondary p-6 dark:bg-background">
                    <Link
                        href={home()}
                        className="relative z-10 inline-flex items-center gap-2 text-2xl font-bold text-foreground animate-fade-in-left"
                    >
                        <ShieldCheck className="size-6 text-primary" />
                        SHRMS
                        <span className="inline-flex items-center gap-1 rounded-full border border-primary/35 bg-background/70 px-2 py-0.5 text-xs font-semibold text-primary">
                            <Sparkles className="size-3.5" />
                            Smart
                        </span>
                    </Link>
                    <div className="absolute right-6 top-6 z-10 flex items-center justify-end gap-3">
                        {user ? (
                            <Link
                                href={dashboardLink}
                                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary/90"
                            >
                                <LayoutDashboard className="size-4" />
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-flex animate-fade-in-right items-center gap-2 rounded-md border-2 border-primary bg-secondary px-4 py-2 font-semibold text-secondary-foreground transition-colors duration-300 ease-in-out hover:bg-primary hover:text-primary-foreground"
                                >
                                    <LogIn className="size-4" />
                                    Login
                                </Link>
                                {registrationEnabled && (
                                    <Link
                                        href={register()}
                                        className="inline-flex animate-fade-in-right items-center gap-2 rounded-md border-2 border-primary-foreground bg-primary px-4 py-2 font-semibold text-primary-foreground transition-colors duration-300 ease-in-out hover:bg-primary/90"
                                    >
                                        <UserPlus className="size-4" />
                                        Register
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </nav>
            </header>
        </>
    );
}
