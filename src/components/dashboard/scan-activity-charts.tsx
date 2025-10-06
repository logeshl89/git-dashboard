"use client"

import { Bar, BarChart, Line, LineChart, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const hourlyData = [
  { hour: "00", scans: 186 }, { hour: "02", scans: 305 }, { hour: "04", scans: 237 },
  { hour: "06", scans: 73 }, { hour: "08", scans: 209 }, { hour: "10", scans: 214 },
  { hour: "12", scans: 345 }, { hour: "14", scans: 280 }, { hour: "16", scans: 190 },
  { hour: "18", scans: 320 }, { hour: "20", scans: 250 }, { hour: "22", scans: 210 },
]

const dailyData = [
  { date: "Mon", scans: 3200 }, { date: "Tue", scans: 3800 }, { date: "Wed", scans: 3500 },
  { date: "Thu", scans: 4100 }, { date: "Fri", scans: 4500 }, { date: "Sat", scans: 5200 },
  { date: "Sun", scans: 4800 },
]

const deviceData = [
  { device: "ESP-01", scans: 4000, color: "var(--color-chart-1)" },
  { device: "ESP-02", scans: 3000, color: "var(--color-chart-2)" },
  { device: "ESP-03", scans: 2000, color: "var(--color-chart-3)" },
  { device: "ESP-04", scans: 2780, color: "var(--color-chart-4)" },
];


const chartConfig = {
  scans: {
    label: "Scans",
    color: "hsl(var(--chart-1))",
  },
}

export default function ScanActivityCharts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan Activity</CardTitle>
        <CardDescription>Visualize scan activity over different time periods.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="hourly">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hourly">Hourly</TabsTrigger>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="device">By Device</TabsTrigger>
          </TabsList>
          <TabsContent value="hourly">
            <ChartContainer config={chartConfig} className="h-72 w-full">
              <BarChart data={hourlyData} accessibilityLayer>
                <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="scans" fill="var(--color-scans)" radius={4} />
              </BarChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="daily">
            <ChartContainer config={chartConfig} className="h-72 w-full">
              <LineChart data={dailyData} accessibilityLayer>
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="scans" stroke="var(--color-scans)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="device">
            <ChartContainer config={chartConfig} className="h-72 w-full">
                <BarChart layout="vertical" data={deviceData} accessibilityLayer>
                    <XAxis type="number" hide />
                    <YAxis dataKey="device" type="category" tickLine={false} axisLine={false} tickMargin={8} width={60} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="scans" radius={4}>
                    </Bar>
                </BarChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
