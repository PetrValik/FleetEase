import * as React from "react";
import { cn } from '../utils';

export const Table: React.FC<React.HTMLAttributes<HTMLTableElement>> = ({ className, ...props }) => (
    <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
  );
  
  export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ className, ...props }) => (
    <thead className={className} {...props} />
  );
  
  export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ className, ...props }) => (
    <tbody className={className} {...props} />
  );
  
  export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({ className, ...props }) => (
    <tr className={cn("border-b transition-colors hover:bg-gray-50", className)} {...props} />
  );
  
  export const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({ className, ...props }) => (
    <th className={cn("px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", className)} {...props} />
  );
  
  export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ className, ...props }) => (
    <td className={cn("px-6 py-4 whitespace-nowrap", className)} {...props} />
  );