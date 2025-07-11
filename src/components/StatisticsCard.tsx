import type { GradeProgress } from '../types';
import { getProgressTextColor } from '../utils';

interface StatisticsCardProps {
  gradeData: GradeProgress;
}

export const StatisticsCard = ({ gradeData }: StatisticsCardProps) => {
  const progressTextColor = getProgressTextColor(gradeData.overallProgress);
  
  const stats = [
    {
      label: 'Overall Progress',
      value: `${gradeData.overallProgress}%`,
      color: progressTextColor
    },
    {
      label: 'Completed Subjects',
      value: gradeData.completedSubjects,
      color: 'text-green-600'
    },
    {
      label: 'Total Subjects',
      value: gradeData.totalSubjects,
      color: 'text-blue-600'
    },
    {
      label: 'Remaining',
      value: gradeData.totalSubjects - gradeData.completedSubjects,
      color: 'text-orange-600'
    }
  ];
  
  return (
    <div class="bg-white rounded-lg border border-slate-300 p-6 mb-6">
      <h3 class="text-lg font-semibold text-slate-800 mb-4">
        Statistics Overview
      </h3>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} class="text-center">
            <div class={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </div>
            <div class="text-sm text-slate-600 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      
      <div class="mt-4 pt-4 border-t border-slate-300">
        <div class="flex justify-between items-center text-sm text-slate-600">
          <span>Completion Rate</span>
          <span class="font-medium">
            {gradeData.totalSubjects > 0 
              ? Math.round((gradeData.completedSubjects / gradeData.totalSubjects) * 100)
              : 0}% of subjects completed
          </span>
        </div>
      </div>
    </div>
  );
};