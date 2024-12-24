import { cn } from "../utils"
import React from "react"

export function Select({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}

export function SelectTrigger({ children }: { children: React.ReactNode }) {
  return (
    <button className="relative flex items-center justify-center w-full rounded-md border bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
      {children}
    </button>
  )
}

export function SelectValue({ children }: { children: React.ReactNode }) {
  return <span>{children}</span>
}

export function SelectItem({ children, value }: { children: React.ReactNode; value: string }) {
  return (
    <button className="relative flex w-full items-center justify-between rounded-md px-3 py-2 text-sm leading-5 text-gray-900 hover:bg-gray-100" value={value}>
      {children}
    </button>
  )
}

export function SelectContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className)}>
      {children}
    </div>
  )
}