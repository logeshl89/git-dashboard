"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, LogOut, User } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { SidebarTrigger } from "../ui/sidebar";
import { useState } from "react";
import { ReportDialog } from "./report-dialog";

// Mock data for report generation
const devices = [
  { id: "ESP-01", mac: "30:AE:A4:07:0D:64", status: "Online" },
  { id: "ESP-02", mac: "30:AE:A4:07:0D:65", status: "Online" },
  { id: "ESP-03", mac: "30:AE:A4:07:0D:66", status: "Offline" },
  { id: "ESP-04", mac: "30:AE:A4:07:0D:67", status: "Online" },
];
const hourlyData = [
  { hour: "00", scans: 186 }, { hour: "02", scans: 305 }, { hour: "04", scans: 237 },
  { hour: "06", scans: 73 }, { hour: "08", scans: 209 }, { hour: "10", scans: 214 },
  { hour: "12", scans: 345 }, { hour: "14", scans: 280 }, { hour: "16", scans: 190 },
  { hour: "18", scans: 320 }, { hour: "20", scans: 250 }, { hour: "22", scans: 210 },
];
const dailyData = [
  { date: "Mon", scans: 3200 }, { date: "Tue", scans: 3800 }, { date: "Wed", scans: 3500 },
  { date: "Thu", scans: 4100 }, { date: "Fri", scans: 4500 }, { date: "Sat", scans: 5200 },
  { date: "Sun", scans: 4800 },
];
const deviceData = [
  { device: "ESP-01", scans: 4000 },
  { device: "ESP-02", scans: 3000 },
  { device: "ESP-03", scans: 2000 },
  { device: "ESP-04", scans: 2780 },
];

function generateMarkdownReport(stats: any, devices: any[], scanActivity: any) {
    const onlineDevices = devices.filter(d => d.status === "Online").length;
    const offlineDevices = devices.length - onlineDevices;

    const peakHour = scanActivity.hourly.reduce((max: any, hour: any) => hour.scans > max.scans ? hour : max, scanActivity.hourly[0]);
    const busiestDay = scanActivity.daily.reduce((max: any, day: any) => day.scans > max.scans ? day : max, scanActivity.daily[0]);
    const mostActiveDevice = scanActivity.byDevice.reduce((max: any, dev: any) => dev.scans > max.scans ? dev : max, scanActivity.byDevice[0]);

    return `
# Analytics Report

## 1. Overview
A brief summary of the hub's current status.
- **Total Scans**: ${stats.totalScans.toLocaleString()}
- **Devices Online**: ${stats.devicesOnline} / ${devices.length}
- **Storage Usage**: ${stats.storageUsage}%
- **Hub Time (UTC)**: ${stats.currentTime}

## 2. Device Status
A breakdown of online/offline devices.
- **Online**: ${onlineDevices}
- **Offline**: ${offlineDevices}
${offlineDevices > 0 ? `The following devices are offline: ${devices.filter(d => d.status === 'Offline').map(d => d.id).join(', ')}` : ''}

## 3. Scan Activity Analysis
Insights into hourly and daily scan trends.
- **Peak Hour**: ${peakHour.hour}:00 with ${peakHour.scans} scans.
- **Busiest Day**: ${busiestDay.date} with ${busiestDay.scans.toLocaleString()} scans.
- **Most Active Device**: ${mostActiveDevice.device} with ${mostActiveDevice.scans.toLocaleString()} scans.

## 4. Storage Insights
Comments on the current storage usage.
- Storage is at **${stats.storageUsage}%**.
${stats.storageUsage > 85 ? `- **Recommendation**: Storage usage is high. Consider cleaning old data.` : ''}

## 5. Recommendations
Actionable advice for the user based on the analysis.
${offlineDevices > 0 ? `- Investigate why ${offlineDevices} device(s) are offline.` : ''}
- Monitor activity during peak hours (${peakHour.hour}:00) to ensure system stability.
`;
}


export function Header() {
  const { toast } = useToast();
  const router = useRouter();
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');
  const [isReportOpen, setReportOpen] = useState(false);
  const [reportContent, setReportContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    setReportContent("");
    setReportOpen(true);
    
    try {
      // This is a stand-in for a real API call.
      await new Promise(resolve => setTimeout(resolve, 500));

      const stats = {
          totalScans: 14820,
          devicesOnline: 3,
          storageUsage: 68,
          currentTime: new Date().toUTCString(),
        };
      const scanActivity = {
          hourly: hourlyData,
          daily: dailyData,
          byDevice: deviceData,
        };
      
      const report = generateMarkdownReport(stats, devices, scanActivity);
      setReportContent(report);
    } catch (error) {
      console.error("Failed to generate report:", error);
      setReportContent("Failed to generate report. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate the report.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("esp32-ip");
    router.replace("/");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
          <SidebarTrigger className="md:hidden" />
        <div className="flex-1">
          <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleGenerateReport} variant="outline" disabled={isGenerating}>
            <FileText className="mr-2 h-4 w-4" />
            {isGenerating ? "Generating..." : "Generate Report"}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" data-ai-hint={userAvatar.imageHint} />}
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <ReportDialog 
        open={isReportOpen}
        onOpenChange={setReportOpen}
        reportContent={reportContent}
        isGenerating={isGenerating}
      />
    </>
  );
}
