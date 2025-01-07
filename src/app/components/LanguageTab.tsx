import Image from 'next/image';

interface LanguageTabProps {
  code: string;
  name: string;
  isSelected: boolean;
  onClick?: () => void;
}

export default function LanguageTab({ code, name, isSelected, onClick }: LanguageTabProps) {
  return (
    <div
      className={`bg-white flex flex-col items-center p-4 rounded-xl w-full gap-2 transition-colors
        ${isSelected ? 'border-2 border-orange-500' : 'border border-secondary-200 hover:bg-gray-50'}`}
    >
      <Image
        src={`/static/flags/${code}.svg`}
        alt={`${name} flag`}
        width={48}
        height={48}
        className="rounded-full"
      />
      <span className="text-sm font-medium text-secondary-500">{name}</span>
    </div>
  );
} 