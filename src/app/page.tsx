import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
  <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-white text-[var(--brand-blue)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-xl">
        <Image
          src="/universidadFasta.jpg"
          alt="Universidad FASTA"
          width={200}
          height={60}
          priority
        />
        <h1 className="text-2xl font-bold">Simulador / Evaluación de Orientación al Marketing</h1>
        <p className="text-sm text-[var(--brand-blue)]/90">
          Responde un conjunto de preguntas para obtener un diagnóstico cuantitativo de tu nivel de orientación al marketing .
        </p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-md border border-[var(--brand-blue)] text-[var(--brand-blue)] hover:bg-[var(--progress-track)] px-5 py-3 text-sm font-medium transition-colors"
            href="/simulador"
          >
            Comenzar evaluación
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-xs text-gray-500 dark:text-gray-400">
        <span>© {new Date().getFullYear()} Marketing Simulator</span>
      </footer>
    </div>
  );
}
