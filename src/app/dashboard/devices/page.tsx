import { Suspense } from 'react';
import DeviceManagement from '@/components/dashboard/device-management';
import { Skeleton } from '@/components/ui/skeleton';

export default function DevicesPage() {
    return (
        <Suspense fallback={<Skeleton className="h-[450px]" />}>
            <DeviceManagement />
        </Suspense>
    );
}
