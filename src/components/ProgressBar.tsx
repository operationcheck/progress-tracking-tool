import { getProgressColor } from '../utils';

interface ProgressBarProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
  height?: string;
}

export const ProgressBar = ({
  progress,
  className = '',
  showPercentage = true,
  height = 'h-3',
}: ProgressBarProps) => {
  const progressColor = getProgressColor(progress);

  return (
    <div class={`flex items-center space-x-3 ${className}`}>
      <div class={`flex-1 bg-slate-300 rounded-full overflow-hidden ${height}`}>
        <div
          class={`${height} ${progressColor} transition-all duration-300 ease-in-out`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      {showPercentage && (
        <span class="text-sm font-medium text-slate-600 min-w-[3rem] text-right">
          {progress}%
        </span>
      )}
    </div>
  );
};
