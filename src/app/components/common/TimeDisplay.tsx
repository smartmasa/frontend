import { useTranslation } from '@/utils/i18n';

interface TimeDisplayProps {
  minutes: string | number;
  className?: string;
}

export function TimeDisplay({ minutes, className = '' }: TimeDisplayProps) {
  const { t } = useTranslation();
  
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <svg
        className="w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="text-xs text-gray-500">{minutes} {t('common.min')}</span>
    </div>
  );
} 