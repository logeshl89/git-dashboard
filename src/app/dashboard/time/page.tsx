
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TimeManagementPage() {
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Time Management</CardTitle>
        <CardDescription>Manage the device's internal Real-Time Clock (RTC).</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium">Current Device Time</h3>
          <p className="text-2xl font-mono p-2 bg-muted rounded-md">25/12/2024 14:30:45</p>
          <Button variant="outline" className="w-full">Sync with Browser Time</Button>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">Set Device Time Manually</h3>
          <p className="text-sm text-muted-foreground">
            Enter an epoch timestamp to set the device time.
          </p>
          <div className="flex gap-2">
            <Input id="epoch" type="number" placeholder="e.g., 1735123445" />
            <Button>Set Time</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
