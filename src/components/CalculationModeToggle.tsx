import type { CalculationMode } from '../types';

interface CalculationModeToggleProps {
  mode: CalculationMode;
  onModeChange: (mode: CalculationMode) => void;
}

export const CalculationModeToggle = ({ mode, onModeChange }: CalculationModeToggleProps) => {
  const toggleOptions = [
    {
      value: 'completion' as const,
      label: 'Completion Based',
      description: 'Only counts 100% completed reports'
    },
    {
      value: 'weighted' as const,
      label: 'Weighted Average',
      description: 'Averages all progress values'
    }
  ];

  return (
    <div class="bg-white rounded-lg border border-slate-300 p-6 mb-6">
      <h3 class="text-lg font-medium text-slate-800 mb-4">
        Calculation Method
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {toggleOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => {
              if (mode !== option.value) {
                onModeChange(option.value);
              }
            }}
            class={`p-4 border-2 rounded-lg text-left transition-colors ${
              mode === option.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-300 hover:border-slate-400/50'
            }`}
          >
            <div class="flex items-center space-x-3">
              <div class={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                mode === option.value
                  ? 'border-blue-500'
                  : 'border-slate-300'
              }`}>
                {mode === option.value && (
                  <div class="w-2 h-2 rounded-full bg-blue-500" />
                )}
              </div>
              <div>
                <h4 class="font-medium text-slate-800">{option.label}</h4>
                <p class="text-sm text-slate-600 mt-1">{option.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div class="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-md">
        <p class="text-sm text-slate-700">
          <strong>Current method:</strong> {mode === 'completion' ? 'Completion Based' : 'Weighted Average'}
        </p>
        <p class="text-xs text-slate-600 mt-1">
          {mode === 'completion' 
            ? 'Progress is calculated based on the percentage of reports that are 100% complete.'
            : 'Progress is calculated as the average of all individual report progress values.'
          }
        </p>
      </div>
    </div>
  );
};