import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

interface HeaderWithBackProps {
  title: string;
}

export const HeaderWithBack = ({ title }: HeaderWithBackProps) => {
  const router = useRouter();

  return (
    <div className="bg-white shadow-sm p-4">
      <div className="max-w-7xl mx-auto px-4 pt-2 flex justify-between items-center">
      <div className="flex items-center">
          <button 
            onClick={() => router.back()}
            className="mr-4 text-secondary-500"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold text-secondary-500">{title}</h1>
        </div>
      </div>
    </div>
  );
}; 