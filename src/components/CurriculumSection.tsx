import type { CurriculumProgress } from '../types';
import { SubjectCard } from './SubjectCard';
import { ProgressBar } from './ProgressBar';
import { getProgressTextColor } from '../utils';

interface CurriculumSectionProps {
  curriculum: CurriculumProgress;
}

export const CurriculumSection = ({ curriculum }: CurriculumSectionProps) => {
  const progressTextColor = getProgressTextColor(curriculum.overallProgress);
  
  return (
    <div class="bg-slate-50 rounded-lg border border-slate-300 p-6 mb-6">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h3 class="text-lg font-semibold text-slate-800">
            {curriculum.curriculumName}
          </h3>
          <p class="text-sm text-slate-600 mt-1">
            {curriculum.completedSubjects}/{curriculum.totalSubjects} subjects completed
          </p>
        </div>
        <div class={`text-2xl font-bold ${progressTextColor}`}>
          {curriculum.overallProgress}%
        </div>
      </div>
      
      <ProgressBar 
        progress={curriculum.overallProgress} 
        className="mb-6"
        showPercentage={false}
        height="h-3"
      />
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {curriculum.subjects.map((subject) => (
          <SubjectCard key={subject.subjectName} subject={subject} />
        ))}
      </div>
    </div>
  );
};