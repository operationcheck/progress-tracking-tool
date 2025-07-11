import { useState } from 'preact/hooks';
import type { ApiResponse, GradeProgress, CalculationMode } from './types';
import { DataInputTabs } from './components/DataInputTabs';
import { GradeFilter } from './components/GradeFilter';
import { CurriculumSection } from './components/CurriculumSection';
import { StatisticsCard } from './components/StatisticsCard';
import { CalculationModeToggle } from './components/CalculationModeToggle';
import { calculateGradeProgress } from './utils';

export function App() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [grades, setGrades] = useState<GradeProgress[]>([]);
  const [activeGrade, setActiveGrade] = useState<string>('');
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('completion');

  const handleDataLoad = (jsonData: ApiResponse) => {
    setData(jsonData);
    recalculateProgress(jsonData);
  };

  const recalculateProgress = (jsonData: ApiResponse) => {
    const gradeProgressData = jsonData.result.data.termYears.map(termYear => 
      calculateGradeProgress(termYear, calculationMode)
    );
    setGrades(gradeProgressData);
    
    if (gradeProgressData.length > 0 && !activeGrade) {
      setActiveGrade(gradeProgressData[0].grade);
    }
  };

  const handleModeChange = (mode: CalculationMode) => {
    setCalculationMode(mode);
    if (data) {
      recalculateProgress(data);
    }
  };

  const handleGradeChange = (grade: string) => {
    setActiveGrade(grade);
  };

  const activeGradeData = grades.find(g => g.grade === activeGrade);

  return (
    <div class="min-h-screen bg-slate-50">
      <div class="container mx-auto px-4 py-8">
        <header class="text-center mb-8">
          <h1 class="text-3xl font-bold text-slate-800 mb-2">
            Progress Tracking Tool
          </h1>
          <p class="text-slate-600">
            Fetch data from N-Lobby or upload JSON files to view progress by grade and subject
          </p>
        </header>

        {!data ? (
          <DataInputTabs onDataLoad={handleDataLoad} />
        ) : (
          <div>
            <CalculationModeToggle 
              mode={calculationMode}
              onModeChange={handleModeChange}
            />
            
            <GradeFilter 
              grades={grades}
              activeGrade={activeGrade}
              onGradeChange={handleGradeChange}
            />
            
            {activeGradeData && (
              <div class="max-w-6xl mx-auto">
                <StatisticsCard gradeData={activeGradeData} />
                
                <div class="space-y-6">
                  {activeGradeData.curriculums.map((curriculum) => (
                    <CurriculumSection 
                      key={curriculum.curriculumName} 
                      curriculum={curriculum} 
                    />
                  ))}
                </div>
                
                <div class="mt-8 text-center">
                  <button
                    onClick={() => {
                      setData(null);
                      setGrades([]);
                      setActiveGrade('');
                    }}
                    class="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors border border-slate-700"
                  >
                    Load New Data
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
