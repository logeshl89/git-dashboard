"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Router as RouterIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ipAddressRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

const FormSchema = z.object({
  ipAddress: z.string().regex(ipAddressRegex, "Please enter a valid IP address."),
});

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ipAddress: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Simulate connection
    toast({
      title: "Connecting...",
      description: `Attempting to connect to ${data.ipAddress}`,
    });

    setTimeout(() => {
      // In a real app, you would verify the connection here.
      // For this demo, we'll assume it's always successful.
      localStorage.setItem("esp32-ip", data.ipAddress);
      
      toast({
        title: "Connection Successful",
        description: "Redirecting to your dashboard.",
      });

      router.push("/dashboard");
    }, 1000);
  }

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4">
            <RouterIcon className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Connect to IoT Device Hub</CardTitle>
        <CardDescription>Enter the IP address of your hub to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="ipAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hub IP Address</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 192.168.1.100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" variant="default">
              Connect
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
