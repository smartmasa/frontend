'use client';

import Image from 'next/image';
import Link from 'next/link';
import HeaderWithLogo from '@/app/components/HeaderWithLogo';
import { useOrder } from '@/contexts/OrderContext';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <HeaderWithLogo />
      
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold text-secondary-500">Welcome to SmartMasa</h1>
          <p className="text-base text-secondary-400 mb-8">Please scan the QR code on your table to start ordering.</p>
        </div>
      </div>
    </main>
  );
}
