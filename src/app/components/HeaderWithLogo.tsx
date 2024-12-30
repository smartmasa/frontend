import LanguageButton from './LanguageButton';

export default function HeaderWithLogo() {
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 pt-2 flex justify-between items-center">
        <h1 className="text-xl font-bold">LOGO</h1>
        <LanguageButton />
      </div>
    </div>
  );
} 