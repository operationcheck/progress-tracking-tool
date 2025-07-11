import type { GradeProgress } from '../types';
import { getGradeDisplayName } from '../utils';

interface GradeFilterProps {
  grades: GradeProgress[];
  activeGrade: string;
  onGradeChange: (grade: string) => void;
}

export const GradeFilter = ({
  grades,
  activeGrade,
  onGradeChange,
}: GradeFilterProps) => {
  if (grades.length === 0) return null;

  return (
    <div class="w-full max-w-4xl mx-auto mb-6">
      <div class="flex flex-wrap gap-2 justify-center">
        {grades.map((gradeData) => (
          <button
            key={gradeData.grade}
            onClick={() => onGradeChange(gradeData.grade)}
            class={`px-4 py-2 rounded-lg font-medium transition-colors border ${
              activeGrade === gradeData.grade
                ? 'bg-blue-600 text-white border-blue-700'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300 border-slate-300'
            }`}
          >
            {getGradeDisplayName(gradeData.grade)}
            <span class="ml-2 text-sm opacity-75">
              ({gradeData.completedSubjects}/{gradeData.totalSubjects})
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
