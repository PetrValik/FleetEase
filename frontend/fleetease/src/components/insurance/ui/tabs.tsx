import React from 'react';
import { cn } from '../utils';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export function Tabs({ value, onValueChange, children }: TabsProps) {
  return <div className="w-full">{children}</div>;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div className={cn("flex space-x-2 bg-gray-100 rounded p-1", className)}>
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  currentValue: string;
  onClick: (value: string) => void;
  children: React.ReactNode;
}

export function TabsTrigger({ value, currentValue, onClick, children }: TabsTriggerProps) {
  return (
    <button
      className={cn(
        "px-3 py-2 rounded",
        value === currentValue ? "bg-white shadow" : "hover:bg-white/50"
      )}
      onClick={() => onClick(value)}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  currentValue: string;
  children: React.ReactNode;
}

export function TabsContent({ value, currentValue, children }: TabsContentProps) {
  if (value !== currentValue) return null;
  return <div>{children}</div>;
}