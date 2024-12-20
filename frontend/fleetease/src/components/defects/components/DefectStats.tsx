import React from 'react';
import { AlertTriangle, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Defect } from '../types';

interface DefectStatsProps {
  defects: Defect[];
  showResolved?: boolean;
}

export default function DefectStats({ defects, showResolved = true }: DefectStatsProps) {
  const activeDefects = defects.filter(
    d => d.defect_status !== 'Closed' && d.defect_status !== 'Repaired'
  );

  const resolvedDefects = defects.filter(
    d => d.defect_status === 'Closed' || d.defect_status === 'Repaired'
  );

  const criticalDefects = defects.filter(
    d => d.defect_severity === 'Critical' && d.defect_status !== 'Closed'
  );

  const getHighPriorityCount = () => {
    return defects.filter(
      d => 
        (d.defect_severity === 'Critical' || d.defect_severity === 'High') && 
        d.defect_status !== 'Closed'
    ).length;
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
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
            {criticalDefects.length > 0 && (
              <p className="text-sm text-red-600">
                Z toho {criticalDefects.length} kritických
              </p>
            )}
          </div>
        </CardContent>
      </Card>

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