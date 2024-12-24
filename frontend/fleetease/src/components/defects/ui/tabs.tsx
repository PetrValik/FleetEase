import React from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import { cn } from '../utils';

interface TabsProps extends RadixTabs.TabsProps {
  className?: string;
}

interface TabsListProps extends RadixTabs.TabsListProps {
  className?: string;
}

interface TabsTriggerProps extends RadixTabs.TabsTriggerProps {
  className?: string;
}

interface TabsContentProps extends RadixTabs.TabsContentProps {
  className?: string;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, ...props }, ref) => (
    <RadixTabs.Root
      ref={ref}
      className={cn("w-full", className)}
      {...props}
    />
  )
);
Tabs.displayName = "Tabs";

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => (
    <RadixTabs.List
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-lg bg-gray-100 p-1",
        className
      )}
      {...props}
    />
  )
);
TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, ...props }, ref) => (
    <RadixTabs.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5",
        "text-sm font-medium ring-offset-background transition-all",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:bg-white data-[state=active]:text-foreground",
        "data-[state=active]:shadow-sm",
        className
      )}
      {...props}
    />
  )
);
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, ...props }, ref) => (
    <RadixTabs.Content
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  )
);
TabsContent.displayName = "TabsContent";

export {
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps
};