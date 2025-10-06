import StatCards from '@/components/dashboard/stat-cards';
import ScanActivityCharts from '@/components/dashboard/scan-activity-charts';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import StorageManagement from '@/components/dashboard/storage-management';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <Suspense fallback={<Skeleton className="h-24" />}>
          <StatCards />
        </Suspense>
      </div>

      <div className="lg:col-span-1">
        <Suspense fallback={<Skeleton className="h-96" />}>
          <ScanActivityCharts />
        </Suspense>
      </div>

      <div className="lg:col-span-1">
        <Suspense fallback={<Skeleton className="h-[450px]" />}>
            <StorageManagement />
        </Suspense>
      </div>
    </div>
  );
}
