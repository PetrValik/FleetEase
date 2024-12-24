/**
 * Komponenta pro filtrování seznamu defektů. Umožňuje:
 * - Vyhledávání podle SPZ vozidla
 * - Filtrování podle závažnosti defektu
 * - Filtrování podle statusu defektu
 * 
 * Tato komponenta je používána především v manažerském rozhraní
 * pro efektivní procházení a třídění většího množství defektů.
 */

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

/**
 * Props rozhraní pro DefectFilters komponentu
 * @property {string} searchTerm - Aktuální vyhledávaný text
 * @property {function} onSearchChange - Callback pro změnu vyhledávaného textu
 * @property {DefectSeverityLevel | 'all'} selectedSeverity - Vybraná úroveň závažnosti
 * @property {function} onSeverityChange - Callback pro změnu úrovně závažnosti
 * @property {DefectStatus | 'all'} selectedStatus - Vybraný status defektu
 * @property {function} onStatusChange - Callback pro změnu statusu
 */
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
      {/* Vyhledávací pole s ikonou */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by license plate..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8"
        />
      </div>

      {/* Filtry pro závažnost a status */}
      <div className="flex gap-4">
        {/* Select pro filtrování podle závažnosti */}
        <Select
          value={selectedSeverity}
          onValueChange={(value) => onSeverityChange(value as DefectSeverityLevel | 'all')}
        >
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Závažnost" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Critical">Critical</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Minor">Minor</SelectItem>
          </SelectContent>
        </Select>

        {/* Select pro filtrování podle statusu */}
        <Select
          value={selectedStatus}
          onValueChange={(value) => onStatusChange(value as DefectStatus | 'all')}
        >
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Reported">Reported</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Repaired">Repaired</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
            <SelectItem value="Deferred">Deferred</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}