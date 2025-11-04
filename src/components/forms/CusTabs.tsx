'use client'

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

export type tabTheme = "received" | "all-candidate" | "shortlisted" | "interview" | "selected" | "onboarded" | "rejected" | "chat" | "jd";

interface CustomTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  activeImage: string
  inactiveImage: string
  theme: tabTheme
  isActive: boolean  // Use the boolean `isActive` prop to control the active state externally
}

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  children,
  activeImage,
  inactiveImage,
  theme,
  isActive,  // Receive `isActive` as a prop
  ...props
}: CustomTriggerProps) {

  const colorVar = `--${theme}`

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out border cursor-pointer",
        "border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 hover:bg-teal-500",
        isActive
          ? `text-white border-transparent`
          : `bg-gray-100 text-gray-700 hover:bg-gray-200`,
        className
      )}
      style={isActive ? { backgroundColor: `var(${colorVar})` } : {}}
      {...props}
    >
      <img
        src={isActive ? activeImage : inactiveImage}
        alt=""
        className="w-5"
      />
      {children}
    </TabsPrimitive.Trigger>
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("mt-2", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
