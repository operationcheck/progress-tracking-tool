import { useState } from 'preact/hooks';
import type { SubjectProgress } from '../types';
import { ProgressBar } from './ProgressBar';
import { MonthlyProgressChart } from './MonthlyProgressChart';
import { getProgressTextColor } from '../utils';

interface SubjectCardProps {
  subject: SubjectProgress;
}

export const SubjectCard = ({ subject }: SubjectCardProps) => {
  const [showMonthlyProgress, setShowMonthlyProgress] = useState(false);
  const progressTextColor = getProgressTextColor(subject.progress);

  return (
    <div class="bg-white rounded-lg border border-slate-300 hover:border-slate-400/50 transition-colors h-fit">
      <div class="p-4">
        <div class="flex justify-between items-start mb-3">
          <div class="flex-1">
            <h4 class="font-medium text-slate-800 text-sm leading-tight">
              {subject.subjectName}
            </h4>
            <p class="text-xs text-slate-500 mt-1">{subject.curriculumName}</p>
          </div>
          <div class={`text-lg font-bold ${progressTextColor}`}>
            {subject.progress}%
          </div>
        </div>

        <ProgressBar
          progress={subject.progress}
          className="mb-3"
          showPercentage={false}
          height="h-2"
        />

        <div class="flex justify-between items-center text-xs text-slate-500 mb-4">
          <span>
            {subject.completedReports}/{subject.totalReports} reports
          </span>
          {subject.averageScore && (
            <span class="font-medium">Avg: {subject.averageScore}</span>
          )}
        </div>

        {subject.monthlyProgress.length > 0 && (
          <button
            onClick={() => setShowMonthlyProgress(!showMonthlyProgress)}
            class="w-full text-xs text-blue-600 hover:text-blue-800 font-medium py-1 border-t border-slate-300 pt-4 pb-0"
          >
            {showMonthlyProgress ? 'Hide' : 'Show'} Monthly Progress
            <span class="ml-1">{showMonthlyProgress ? '▲' : '▼'}</span>
          </button>
        )}
      </div>

      {showMonthlyProgress && subject.monthlyProgress.length > 0 && (
        <div class="border-t border-slate-300">
          <MonthlyProgressChart
            monthlyProgress={subject.monthlyProgress}
            subjectName={subject.subjectName}
          />
        </div>
      )}
    </div>
  );
};
