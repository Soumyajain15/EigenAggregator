import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, ShieldCheck, Award } from 'lucide-react';

export default function HomePage() {
  return (
    <MainLayout>
      <div className="space-y-12">
        <section className="text-center py-16 bg-card rounded-xl shadow-xl">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline mb-6 text-primary">
              Welcome to EigenAggregator
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Your central hub for EigenLayer restaking data. Explore user activity, validator performance, and reward insights with a clean, intuitive interface.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                <Link href="/restakers">View Restakers</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                <Link href="/validators">Explore Validators</Link>
              </Button>
               <Button asChild variant="secondary" size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                <Link href="/rewards">Check Rewards</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <Link href="/restakers" className="block rounded-lg overflow-hidden group">
            <Card className="h-full transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:border-primary border-2 border-transparent">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">User Restaking Info</CardTitle>
                <Users className="h-7 w-7 text-primary transition-transform duration-300 group-hover:scale-110" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Discover users participating in restaking, their staked amounts, and chosen AVS.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/validators" className="block rounded-lg overflow-hidden group">
            <Card className="h-full transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:border-primary border-2 border-transparent">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">Validator Metadata</CardTitle>
                <ShieldCheck className="h-7 w-7 text-primary transition-transform duration-300 group-hover:scale-110" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Access detailed information about AVS validators, including stake, status, and slash history.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/rewards" className="block rounded-lg overflow-hidden group">
            <Card className="h-full transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:border-primary border-2 border-transparent">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">Reward Insights</CardTitle>
                <Award className="h-7 w-7 text-primary transition-transform duration-300 group-hover:scale-110" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Check restaking rewards for any wallet address, with a breakdown per validator.
                </p>
              </CardContent>
            </Card>
          </Link>
        </section>
      </div>
    </MainLayout>
  );
}
