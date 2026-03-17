import { Clock } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useCurrentTime } from '@/hooks/use-current-time';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { ModeToggle } from './ui/mode-toggle';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
     const currentTime = useCurrentTime();
    return (
        <header className="flex h-16 w-full justify-between shrink-0 items-center gap-2 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2 ">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-primary px-4 py-2 text-primary-foreground">
                    <Clock className="mr-1 h-8 w-8" />
                    {currentTime}
            </Badge>
                <ModeToggle />
            </div>
        </header>
    );
}
