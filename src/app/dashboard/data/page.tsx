
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DataManagementPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Management</CardTitle>
        <CardDescription>Download or delete stored CSV data from the hub.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Download Data</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Download all barcode scanning data in a single CSV file. You can also specify a date.
          </p>
          <Button>Download Latest CSV</Button>
        </div>
        <div>
          <h3 className="font-medium mb-2">List Files</h3>
          <p className="text-sm text-muted-foreground mb-2">
            See a list of all available data files stored on the device.
          </p>
          <Button variant="secondary">List Available Files</Button>
        </div>
        <div>
          <h3 className="font-medium text-destructive mb-2">Delete Data</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Permanently delete CSV files from the device. This action cannot be undone.
          </p>
          <Button variant="destructive">Delete All Data</Button>
        </div>
      </CardContent>
    </Card>
  );
}
