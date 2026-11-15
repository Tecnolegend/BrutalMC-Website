import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center bg-[#050508]">
      <p className="font-minecraft text-red-500 text-sm tracking-widest">ERROR 404</p>
      <h1 className="text-3xl sm:text-5xl font-black uppercase text-white">This chunk failed to load</h1>
      <p className="text-zinc-400 max-w-md">The page you&apos;re looking for doesn&apos;t exist or was moved.</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs uppercase tracking-wider"
      >
        Back to BrutalMC
      </Link>
    </main>
  );
}
