import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { DefectSeverityLevel, DefectStatus } from '../types';

interface DefectFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedSeverity: DefectSeverityLevel | 'all';
  onSeverityChange: (value: DefectSeverityLevel | 'all') => void;
  selectedStatus: DefectStatus | 'all';
  onStatusChange: (value: DefectStatus | 'all') => void;
}

export default function DefectFilters({
  searchTerm,
  onSearchChange,
  selectedSeverity,
  onSeverityChange,
  selectedStatus,
  onStatusChange
}: DefectFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Hledat podle SPZ..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>
      <div className="flex gap-4">
        <Select
          value={selectedSeverity}
          onValueChange={(value) => onSeverityChange(value as DefectSeverityLevel | 'all')}
        >
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Závažnost" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Všechny</SelectItem>
            <SelectItem value="Critical">Kritická</SelectItem>
            <SelectItem value="High">Vysoká</SelectItem>
            <SelectItem value="Medium">Střední</SelectItem>
            <SelectItem value="Low">Nízká</SelectItem>
            <SelectItem value="Minor">Minimální</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={selectedStatus}
          onValueChange={(value) => onStatusChange(value as DefectStatus | 'all')}
        >
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Všechny</SelectItem>
            <SelectItem value="Reported">Nahlášeno</SelectItem>
            <SelectItem value="In Progress">V řešení</SelectItem>
            <SelectItem value="Repaired">Opraveno</SelectItem>
            <SelectItem value="Closed">Uzavřeno</SelectItem>
            <SelectItem value="Deferred">Odloženo</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}