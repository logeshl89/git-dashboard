import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const logs = [
  { timestamp: "2023-10-27 10:00:01", level: "INFO", message: "Device ESP-01 connected." },
  { timestamp: "2023-10-27 10:00:05", level: "INFO", message: "Scan initiated on ESP-01." },
  { timestamp: "2023-10-27 10:01:20", level: "WARN", message: "Device ESP-03 responding slowly." },
  { timestamp: "2023-10-27 10:02:00", level: "INFO", message: "Firmware update started for ESP-02." },
  { timestamp: "2023-10-27 10:03:15", level: "ERROR", message: "Failed to connect to Wi-Fi." },
  { timestamp: "2023-10-27 10:05:00", level: "INFO", message: "Device ESP-04 rebooted successfully." },
];

const getBadgeVariant = (level: string) => {
    switch (level) {
        case 'ERROR': return 'destructive';
        case 'WARN': return 'default'; // Using 'default' which is orange-like in this theme
        default: return 'secondary';
    }
}

export default function LogsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Logs</CardTitle>
        <CardDescription>View real-time logs from the IoT Device Hub.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log, index) => (
              <TableRow key={index}>
                <TableCell className="font-code">{log.timestamp}</TableCell>
                <TableCell>
                    <Badge variant={getBadgeVariant(log.level)} className={log.level === 'WARN' ? 'bg-accent text-accent-foreground' : ''}>
                        {log.level}
                    </Badge>
                </TableCell>
                <TableCell>{log.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
