"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type DialogProps } from "@radix-ui/react-dialog";
import { type Device } from "./device-management";
import { useEffect, useState } from "react";
import { updateDevice } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const editDeviceSchema = z.object({
  deviceId: z.string().min(1, "Device ID is required."),
});

interface EditDeviceDialogProps extends DialogProps {
  device: Device;
  onDeviceUpdate: (updatedDevice: { deviceId: string }) => void;
}

export function EditDeviceDialog({
  device,
  onDeviceUpdate,
  ...props
}: EditDeviceDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof editDeviceSchema>>({
    resolver: zodResolver(editDeviceSchema),
    defaultValues: {
      deviceId: device.id,
    },
  });

  useEffect(() => {
    form.reset({ deviceId: device.id });
  }, [device, form]);

  async function onSubmit(values: z.infer<typeof editDeviceSchema>) {
    setIsSubmitting(true);
    try {
      const result = await updateDevice({
        deviceMac: device.mac,
        deviceId: values.deviceId,
      });

      if (result.message === "Failed to Update") {
        throw new Error("Failed to update device on the hub.");
      }
      
      onDeviceUpdate(values);
      props.onOpenChange?.(false);
      
    } catch (error) {
      console.error("Failed to update device:", error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description:
          (error as Error).message ||
          "An error occurred while updating the device.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog {...props}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Device</DialogTitle>
          <DialogDescription>
            Update the ID for device with MAC: {device.mac}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="deviceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device ID</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., ESP-01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
