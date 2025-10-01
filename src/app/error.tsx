'use client';

import Image from 'next/image';


interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-8">
        {/* Logo FASTA */}
        <div className="flex justify-center">
          <Image
            src={"/universidadFasta.jpg"}
            alt="Universidad FASTA"
            width={200}
            height={100}
            className="object-contain"
            priority
          />
        </div>
        
        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-[var(--brand-blue)]">
            404
          </h1>
          <p className="text-xl text-[var(--brand-blue)] font-medium">
            Página no encontrada
          </p>
        </div>
        
        {/* Back to Home Button */}
        <div className="pt-4">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 border border-[var(--brand-blue)] text-[var(--brand-blue)] rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
