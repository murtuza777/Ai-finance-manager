"use client"

import * as React from "react"
import { ResponsiveContainer, Tooltip } from "recharts"
import type { ChartContainerProps, ChartTooltipProps } from "@/types/dashboard"

export function ChartContainer({
  children,
  config,
  className,
  ...props
}: ChartContainerProps) {
  return (
    <div className={className} {...props}>
      <ResponsiveContainer>
        {React.Children.only(children) as React.ReactElement}
      </ResponsiveContainer>
    </div>
  )
}

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">
            {label}
          </span>
          <span className="font-bold text-muted-foreground">
            {payload[0].value}
          </span>
        </div>
      </div>
    </div>
  )
}

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Tooltip
    content={<ChartTooltip {...props} />}
    cursor={{ fill: "transparent" }}
  />
))
ChartTooltipContent.displayName = "ChartTooltipContent"