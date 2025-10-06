"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { MoreHorizontal, Power, Download, Pencil } from "lucide-react";
import { useState } from "react";
import { EditDeviceDialog } from "./edit-device-dialog";

const devices = [
  { id: "ESP-01", mac: "30:AE:A4:07:0D:64", status: "Online", location: "Coimbatore" },
  { id: "ESP-02", mac: "30:AE:A4:07:0D:65", status: "Online", location: "Coimbatore" },
  { id: "ESP-03", mac: "30:AE:A4:07:0D:66", status: "Offline", location: "Coimbatore" },
  { id: "ESP-04", mac: "30:AE:A4:07:0D:67", status: "Online", location: "Coimbatore" },
];

export type Device = typeof devices[0];

export default function DeviceManagement() {
    const { toast } = useToast();
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

    const handleAction = (deviceId: string, action: "Update" | "Reboot") => {
        toast({
            title: `${action} action triggered`,
            description: `Action sent for device ${deviceId}.`,
        });
    }

    const handleEditClick = (device: Device) => {
      setSelectedDevice(device);
      setEditDialogOpen(true);
    }

    const onDeviceUpdate = (updatedDevice: {deviceId: string}) => {
      // Here you would typically update your state or re-fetch the device list
      console.log('Device updated:', updatedDevice);
      const updatedDevices = devices.map(d => d.mac === selectedDevice?.mac ? {...d, id: updatedDevice.deviceId} : d);
      // for now, we just close the dialog
      // setDevices(updatedDevices) // if you were managing state
      toast({
          title: "Device Updated",
          description: `Device ID has been successfully updated.`
      });
    }

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>Device Management</CardTitle>
        <CardDescription>View, manage, and edit your connected IoT devices.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device ID</TableHead>
              <TableHead>MAC Address</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.map((device) => (
              <TableRow key={device.id}>
                <TableCell className="font-medium font-code">{device.id}</TableCell>
                <TableCell className="font-code text-muted-foreground">{device.mac}</TableCell>
                <TableCell>{device.location}</TableCell>
                <TableCell>
                  <Badge variant={device.status === "Online" ? "default" : "destructive"}>
                    {device.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                       <DropdownMenuItem onClick={() => handleEditClick(device)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Device
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleAction(device.id, "Update")}>
                        <Download className="mr-2 h-4 w-4" />
                        Update Firmware
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction(device.id, "Reboot")} className="text-destructive">
                        <Power className="mr-2 h-4 w-4" />
                        Reboot Device
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
     {selectedDevice && (
        <EditDeviceDialog
          open={isEditDialogOpen}
          onOpenChange={setEditDialogOpen}
          device={selectedDevice}
          onDeviceUpdate={onDeviceUpdate}
        />
      )}
    </>
  );
}
