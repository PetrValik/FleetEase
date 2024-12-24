/** Komponenta pro zobrazení statistik defektů formou karet.
 * Zobrazuje přehled aktivních defektů a volitelně buď vyřešených defektů
 * nebo defektů s vysokou prioritou.
 */

import React from 'react';
import { AlertTriangle, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Defect } from '../types';

/**
 * Props rozhraní pro DefectStats komponentu
 * @property {Defect[]} defects - Seznam všech defektů pro analýzu
 * @property {boolean} showResolved - Určuje, zda se má zobrazit počet vyřešených defektů nebo počet defektů s vysokou prioritou
 */
interface DefectStatsProps {
  defects: Defect[];
  showResolved?: boolean;
}

export default function DefectStats({ defects, showResolved = true }: DefectStatsProps) {
  // Filtrování defektů podle různých kritérií
  const activeDefects = defects.filter(
    d => d.defect_status !== 'Closed' && d.defect_status !== 'Repaired'
  );

  const resolvedDefects = defects.filter(
    d => d.defect_status === 'Closed' || d.defect_status === 'Repaired'
  );

  const criticalDefects = defects.filter(
    d => d.defect_severity === 'Critical' && d.defect_status !== 'Closed'
  );

  /**
   * Vypočítá počet defektů s vysokou prioritou
   * (kritické a vysoké závažnosti, které nejsou uzavřené)
   */
  const getHighPriorityCount = () => {
    return defects.filter(
      d => 
        (d.defect_severity === 'Critical' || d.defect_severity === 'High') && 
        d.defect_status !== 'Closed'
    ).length;
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Karta aktivních defektů */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-semibold text-[#061f3f]">
            Aktivní defekty
          </CardTitle>
          <AlertTriangle className="h-8 w-8 text-[#061f3f]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-[#061f3f]">
              {activeDefects.length}
            </div>
            {/* Zobrazení počtu kritických defektů, pokud existují */}
            {criticalDefects.length > 0 && (
              <p className="text-sm text-red-600">
                Z toho {criticalDefects.length} kritických
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Karta vyřešených defektů nebo defektů s vysokou prioritou */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-semibold text-[#061f3f]">
            {showResolved ? 'Vyřešené defekty' : 'Vysoká priorita'}
          </CardTitle>
          <History className="h-8 w-8 text-[#061f3f]" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-[#061f3f]">
              {showResolved ? resolvedDefects.length : getHighPriorityCount()}
            </div>
            {/* Zobrazení upozornění pro defekty s vysokou prioritou */}
            {!showResolved && getHighPriorityCount() > 0 && (
              <p className="text-sm text-orange-600">
                Vyžaduje okamžitou pozornost
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}