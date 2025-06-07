import Link from 'next/link';
import { Layers } from 'lucide-react'; 
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50 border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors">
          <Layers className="h-7 w-7" />
          <span className="text-xl font-semibold font-headline">EigenAggregator</span>
        </Link>
        <div className="space-x-1 sm:space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/restakers">Restakers</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/validators">Validators</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/rewards">Rewards</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
