"use client";

import { useState, useEffect } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-card border-t border-border py-8 text-center mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          © {currentYear !== null ? currentYear : '...'} EigenAggregator. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Data provided for informational purposes only. Not financial advice.
        </p>
      </div>
    </footer>
  );
}
