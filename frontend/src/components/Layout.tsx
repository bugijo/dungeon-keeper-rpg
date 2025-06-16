import React from 'react';
import { Navbar } from './Navbar';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background text-text-base min-h-screen">
      <Navbar />
      <main className="p-8">
        {children}
      </main>
    </div>
  );
}