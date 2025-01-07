import HeaderWithLogo from '@/app/components/HeaderWithLogo';

export default function Home() {
  
  return (
    <main className="min-h-screen bg-gray-50">
      <HeaderWithLogo />
      
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold text-secondary-500">Welcome to the home page</h1>
          <p className="text-base text-secondary-400 mb-8">Scan QR code to start</p>
        </div>
      </div>
    </main>
  );
}
