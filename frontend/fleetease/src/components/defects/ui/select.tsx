import * as React from "react"
import { cn } from '../utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export function Select({ value, onValueChange, children, className, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}

export function SelectTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex items-center", className)}>{children}</div>
}

export function SelectValue({ children, placeholder }: { children?: React.ReactNode; placeholder?: string }) {
  return <span>{children || placeholder}</span>
}

export function SelectItem({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  return (
    <option value={value} className={cn("px-3 py-2 hover:bg-gray-100 cursor-pointer", className)}>
      {children}
    </option>
  )
}