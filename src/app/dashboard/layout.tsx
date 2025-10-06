"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SidebarProvider, Sidebar, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { LayoutDashboard, Router as RouterIcon, Server, Wifi, FileText, Database, Clock, DownloadCloud } from "lucide-react";
import { Header } from "@/components/dashboard/header";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const ipAddress = localStorage.getItem("esp32-ip");
    if (!ipAddress) {
      router.replace("/");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }
  
  const menuButtonClasses = cn(
    buttonVariants({ variant: "ghost" }),
    "w-full justify-start gap-2"
  );

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
            <div className="flex items-center gap-2 p-2 justify-center">
                <RouterIcon className="text-primary h-7 w-7"/>
                <h2 className="text-xl font-semibold tracking-tight text-primary">IoT Device Hub</h2>
            </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/dashboard" className={cn(menuButtonClasses, { 'bg-accent text-accent-foreground': pathname === '/dashboard' })}>
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link href="/dashboard/devices" className={cn(menuButtonClasses, { 'bg-accent text-accent-foreground': pathname === '/dashboard/devices' })}>
                <Server />
                <span>Device Management</span>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/dashboard/wifi" className={cn(menuButtonClasses, { 'bg-accent text-accent-foreground': pathname === '/dashboard/wifi' })}>
                <Wifi />
                <span>Wi-Fi Configuration</span>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/dashboard/data" className={cn(menuButtonClasses, { 'bg-accent text-accent-foreground': pathname === '/dashboard/data' })}>
                <Database />
                <span>Data Management</span>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/dashboard/time" className={cn(menuButtonClasses, { 'bg-accent text-accent-foreground': pathname === '/dashboard/time' })}>
                <Clock />
                <span>Time Management</span>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/dashboard/firmware" className={cn(menuButtonClasses, { 'bg-accent text-accent-foreground': pathname === '/dashboard/firmware' })}>
                <DownloadCloud />
                <span>Firmware Management</span>
              </Link>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <Link href="/dashboard/logs" className={cn(menuButtonClasses, { 'bg-accent text-accent-foreground': pathname === '/dashboard/logs' })}>
                <FileText />
                <span>Logs</span>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col h-full">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                {children}
            </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
