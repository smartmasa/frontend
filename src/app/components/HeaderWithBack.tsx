import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import LanguageButton from './LanguageButton';

interface HeaderWithBackProps {
  title: string;
}

export const HeaderWithBack = ({ title }: HeaderWithBackProps) => {
  const router = useRouter();

  return (
    <div className="bg-white shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => router.back()}
            className="mr-4 text-secondary-500"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold text-secondary-500">{title}</h1>
        </div>
        <LanguageButton />
      </div>
    </div>
  );
}; 