import type { MonthlyProgress } from '../types';
import { getProgressColor } from '../utils';

interface MonthlyProgressChartProps {
  monthlyProgress: MonthlyProgress[];
  subjectName: string;
}

export const MonthlyProgressChart = ({
  monthlyProgress,
  subjectName,
}: MonthlyProgressChartProps) => {
  const getMonthName = (month: number): string => {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return monthNames[month - 1] || '';
  };

  if (monthlyProgress.length === 0) {
    return (
      <div class="p-4 text-center text-gray-500 text-sm">
        No monthly progress data available
      </div>
    );
  }

  return (
    <div class="p-4 bg-slate-100 rounded-b-lg">
      <h5 class="text-sm font-medium text-slate-800 mb-3">
        Monthly Progress: {subjectName}
      </h5>

      <div class="space-y-2">
        {monthlyProgress.map((month, index) => (
          <div key={index} class="flex items-center space-x-3">
            <div class="w-12 text-xs text-slate-600 font-medium">
              {getMonthName(month.month)} {month.year}
            </div>

            <div class="flex-1 bg-slate-300 rounded-full h-3 overflow-hidden">
              <div
                class={`h-full transition-all duration-300 ${getProgressColor(
                  month.progress
                )}`}
                style={{ width: `${Math.min(month.progress, 100)}%` }}
              />
            </div>

            <div class="w-12 text-xs text-slate-600 text-right">
              {month.progress}%
            </div>

            {month.score && (
              <div class="w-8 text-xs text-slate-600 text-right font-medium">
                {month.score}
              </div>
            )}

            <div class="w-8 text-xs text-slate-500 text-right">
              #{month.reportNumber}
            </div>
          </div>
        ))}
      </div>

      <div class="mt-4 pt-4 border-t border-slate-300 text-xs text-slate-500">
        <div class="flex justify-between">
          <span>
            Completed:{' '}
            {monthlyProgress.filter((m) => m.progress === 100).length}/
            {monthlyProgress.length}
          </span>
          <span>
            Avg Score:{' '}
            {monthlyProgress.filter((m) => m.score !== null).length > 0
              ? Math.round(
                  monthlyProgress
                    .filter((m) => m.score !== null)
                    .reduce((sum, m) => sum + m.score!, 0) /
                    monthlyProgress.filter((m) => m.score !== null).length
                )
              : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};
