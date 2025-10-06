"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScanLine, Server, HardDrive, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const initialStats = {
  totalScans: 14820,
  devicesOnline: 4,
  storageUsage: 68,
  currentTime: new Date(),
};

export default function StatCards() {
  const [stats, setStats] = useState(initialStats);

  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prevStats => ({
        totalScans: prevStats.totalScans + Math.floor(Math.random() * 10),
        devicesOnline: Math.random() > 0.8 ? 3 : 4,
        storageUsage: Math.min(100, prevStats.storageUsage + Math.floor(Math.random() * 2)),
        currentTime: new Date(),
      }));
    }, 30000); // Auto-refresh every 30 seconds

    return () => clearInterval(timer);
  }, []);
  
  // Separate timer for the clock to update every second
  useEffect(() => {
    const clockTimer = setInterval(() => {
        setStats(prevStats => ({...prevStats, currentTime: new Date()}));
    }, 1000);
    return () => clearInterval(clockTimer);
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
          <ScanLine className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalScans.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Devices Online</CardTitle>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.devicesOnline} / 4</div>
          <p className="text-xs text-muted-foreground">All devices operational</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Storage Usage</CardTitle>
          <HardDrive className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.storageUsage}%</div>
          <p className="text-xs text-muted-foreground">Percentage of total capacity</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Hub Time (UTC)</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.currentTime.toLocaleTimeString('en-GB', { timeZone: 'UTC' })}</div>
          <p className="text-xs text-muted-foreground">Synchronized</p>
        </CardContent>
      </Card>
    </div>
  );
}
