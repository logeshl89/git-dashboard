"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const wifiFormSchema = z.object({
  ssid: z.string().min(1, "SSID is required."),
  password: z.string().optional(),
});

export default function WifiConfig() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof wifiFormSchema>>({
    resolver: zodResolver(wifiFormSchema),
    defaultValues: {
      ssid: "MyHomeNetwork",
      password: ""
    },
  });

  function onSubmit(values: z.infer<typeof wifiFormSchema>) {
    toast({
        title: "Syncing Wi-Fi Settings",
        description: "New network configuration is being sent to the hub.",
    });
    console.log(values);
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Wi-Fi Configuration</CardTitle>
            <CardDescription>Update the hub's network settings. Only enter a new password if you wish to change it.</CardDescription>
        </CardHeader>
      <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
                <FormField
                control={form.control}
                name="ssid"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>SSID</FormLabel>
                    <FormControl>
                        <Input placeholder="Your Wi-Fi Name" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="Leave blank to keep current" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="w-full">Sync Now</Button>
            </form>
        </Form>
      </CardContent>
    </Card>
  );
}
