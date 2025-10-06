import WifiConfig from '@/components/dashboard/wifi-config';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function WifiPage() {
    return (
        <div className="w-full max-w-2xl mx-auto">
            <Suspense fallback={<Skeleton className="h-[300px]" />}>
                <WifiConfig />
            </Suspense>
        </div>
    );
}
