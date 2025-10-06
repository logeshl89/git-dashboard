
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DownloadCloud } from 'lucide-react';

export default function FirmwareManagementPage() {
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Firmware Management</CardTitle>
        <CardDescription>Manage and update the firmware of your IoT hub.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <DownloadCloud className="h-4 w-4" />
          <AlertTitle>Over-The-Air (OTA) Updates</AlertTitle>
          <AlertDescription>
            The hub supports OTA updates for seamless firmware upgrades. Clicking the button below will initiate the update process.
          </AlertDescription>
        </Alert>
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Ensure the device is connected to a stable power source and has a reliable Wi-Fi connection before starting the update.
          </p>
          <Button className="w-full">
            Trigger OTA Update
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
