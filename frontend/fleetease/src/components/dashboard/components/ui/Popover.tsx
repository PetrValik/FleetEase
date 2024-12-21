import React, { ReactNode } from 'react';
import { Popover as HeadlessPopover } from '@headlessui/react';

// Popover Trigger props definition
interface PopoverTriggerProps {
  children: ReactNode;
}

const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ children }) => {
  return (
    <HeadlessPopover.Button>
      {children}
    </HeadlessPopover.Button>
  );
};

// Popover Content (Panel) props definition
interface PopoverContentProps {
  children: ReactNode;
  className?: string; // Allow for additional custom styling
}

const PopoverContent: React.FC<PopoverContentProps> = ({ children, className }) => {
  return (
    <HeadlessPopover.Panel
      className={`absolute z-10 p-4 bg-white border rounded-lg shadow-lg w-auto ${className}`}
    >
      {children}
    </HeadlessPopover.Panel>
  );
};

// Popover wrapper component definition
interface PopoverProps {
  children: ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ children }) => {
  return <HeadlessPopover className="relative z-50">{children}</HeadlessPopover>;
};

export { Popover, PopoverTrigger, PopoverContent };
