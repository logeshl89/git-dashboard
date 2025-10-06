"use client"

import { RadialBar, RadialBarChart } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const chartData = [
  { name: "Used", value: 174.08, fill: "var(--color-chart-1)" },
  { name: "Available", value: 81.92, fill: "var(--color-chart-2)" },
]

const chartConfig = {
  used: { label: "Used", color: "hsl(var(--chart-1))" },
  available: { label: "Available", color: "hsl(var(--chart-2))" },
}

export default function StorageManagement() {
  const { toast } = useToast();
  const totalStorage = chartData.reduce((acc, curr) => acc + curr.value, 0);
  const usedPercentage = (chartData[0].value / totalStorage) * 100;
  const availablePercentage = (chartData[1].value / totalStorage) * 100;

  const handleCleanData = () => {
    toast({
        title: "Cleaning Storage",
        description: "Old data is being removed. This may take a moment."
    });
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Storage Management</CardTitle>
        <CardDescription>Monitor and manage hub storage.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center pt-6">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-full max-h-[200px]">
          <RadialBarChart
            data={[{ name: 'used', value: usedPercentage, fill: 'var(--color-used)' }]}
            startAngle={90}
            endAngle={-270}
            innerRadius="70%"
            outerRadius="100%"
            barSize={20}
          >
            <RadialBar
              background={{ fill: 'hsl(var(--muted))' }}
              dataKey="value"
              cornerRadius={10}
            >
            </RadialBar>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent 
                formatter={(value) => `${Number(value).toFixed(0)}%`}
                hideLabel 
              />}
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex w-full items-center justify-between font-medium text-muted-foreground">
          <span>Used Storage</span>
          <span>{usedPercentage.toFixed(2)}%</span>
        </div>
        <div className="flex w-full items-center justify-between font-medium text-muted-foreground">
          <span>Available Space</span>
          <span>{availablePercentage.toFixed(2)}%</span>
        </div>
        <div className="w-full pt-4">
            <Button onClick={handleCleanData} className="w-full" variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Clean Old Data
            </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
