"use client";

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchMockRewardInsights } from '@/lib/mockData';
import type { RewardInsights } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Loader2, AlertTriangle, Search, Wallet, Info } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';

export default function RewardsPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [rewardsData, setRewardsData] = useState<RewardInsights | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleFetchRewards = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (!walletAddress.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a wallet address.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setError(null);
    setRewardsData(null);
    setHasSearched(true); 
    try {
      const data = await fetchMockRewardInsights(walletAddress);
      if (data) {
        setRewardsData(data);
         toast({
          title: "Rewards Fetched",
          description: `Successfully fetched rewards for wallet address.`,
        });
      } else {
        // setError will not be set here, rewardsData will remain null
        toast({
          title: "No Data Found",
          description: `No reward data found for the entered wallet address.`,
          variant: "default",
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      toast({
        title: "Fetch Error",
        description: `Failed to fetch rewards: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Effect to clear results if wallet address is cleared after a search
  useEffect(() => {
    if (walletAddress.trim() === '' && hasSearched) {
      setRewardsData(null);
      setError(null);
      // Optionally reset hasSearched if you want the "enter address" prompt to reappear
      // setHasSearched(false); 
    }
  }, [walletAddress, hasSearched]);

  return (
    <MainLayout>
      <div className="space-y-8">
        <Card className="shadow-xl rounded-lg overflow-hidden">
          <CardHeader className="bg-card">
            <CardTitle className="text-3xl font-headline text-primary">Reward Insights</CardTitle>
            <CardDescription>
              Enter a wallet address to view its total restaking rewards and a breakdown per validator.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <form onSubmit={handleFetchRewards} className="flex flex-col sm:flex-row gap-3 items-end">
              <div className="flex-grow w-full sm:w-auto">
                <label htmlFor="walletAddress" className="block text-sm font-medium text-foreground mb-1">
                  Wallet Address
                </label>
                <div className="relative">
                   <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                  <Input
                    type="text"
                    id="walletAddress"
                    name="walletAddress"
                    placeholder="e.g., 0xAliceFEF3e2478789d87a698F8b87878f8F787E"
                    value={walletAddress}
                    onChange={(e) => {
                      setWalletAddress(e.target.value);
                      // If user clears input, also clear previous results/errors
                      if (e.target.value.trim() === '') {
                        setRewardsData(null);
                        setError(null);
                        setHasSearched(false); 
                      }
                    }}
                    className="pl-10 py-2 text-base"
                    disabled={isLoading}
                    aria-label="Wallet Address Input"
                  />
                </div>
              </div>
              <Button type="submit" disabled={isLoading || !walletAddress.trim()} className="w-full sm:w-auto py-2.5">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : (
                  <Search className="h-5 w-5 mr-2" />
                )}
                Fetch Rewards
              </Button>
            </form>
          </CardContent>
        </Card>

        {isLoading && (
          <Card className="shadow-md rounded-lg">
            <CardContent className="p-8 flex flex-col items-center justify-center min-h-[200px]">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground text-lg">Fetching reward data...</p>
            </CardContent>
          </Card>
        )}

        {error && !isLoading && (
          <Card className="border-destructive bg-destructive/5 shadow-md rounded-lg">
             <CardHeader>
              <CardTitle className="text-destructive flex items-center text-xl">
                <AlertTriangle className="h-6 w-6 mr-2" /> Error Fetching Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-destructive-foreground bg-destructive/10 p-4 rounded-md">{error}</p>
            </CardContent>
          </Card>
        )}

        {rewardsData && !isLoading && !error && (
          <Card className="shadow-xl rounded-lg overflow-hidden">
            <CardHeader className="bg-accent/10">
              <CardTitle className="text-2xl text-primary">Rewards for: <span className="font-code text-xl block sm:inline break-all">{rewardsData.walletAddress}</span></CardTitle>
              <CardDescription className="text-lg pt-1 text-foreground/90">
                Total Restaking Rewards: <span className="font-semibold text-accent">{rewardsData.totalRestakingRewards.toFixed(4)} stETH</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <h3 className="text-xl font-semibold mt-0 mb-0 px-6 py-4 text-foreground border-b">Rewards Breakdown</h3>
              {rewardsData.rewardsBreakdown.length > 0 ? (
                <ScrollArea className="h-[calc(100vh-28rem)] min-h-[200px]"> {/* Adjust height */}
                  <Table>
                    <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur-sm z-10">
                      <TableRow>
                        <TableHead className="px-6 py-3">Validator Address</TableHead>
                        <TableHead className="text-right px-6 py-3">Reward Amount (stETH)</TableHead>
                        <TableHead className="px-6 py-3">Timestamp</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rewardsData.rewardsBreakdown.map((breakdown) => (
                        <TableRow key={breakdown.id} className="hover:bg-muted/30 transition-colors">
                          <TableCell className="font-code px-6 py-4">{breakdown.validatorAddress}</TableCell>
                          <TableCell className="text-right font-semibold text-accent px-6 py-4">{breakdown.rewardAmount.toFixed(4)}</TableCell>
                          <TableCell className="px-6 py-4">
                            {breakdown.timestamp ? format(new Date(breakdown.timestamp), "PPpp") : 'N/A'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              ) : (
                <p className="text-muted-foreground px-6 py-8 text-center">No specific reward breakdown available for this address.</p>
              )}
            </CardContent>
          </Card>
        )}
        
        {!isLoading && !error && !rewardsData && hasSearched && (
             <Card className="shadow-md rounded-lg">
                <CardContent className="p-8 text-center text-muted-foreground min-h-[200px] flex flex-col justify-center items-center">
                    <Info className="h-10 w-10 text-primary mb-4"/>
                    <p className="text-lg">No reward data found for the address:</p>
                    <p className="font-code text-sm mt-1 break-all">{walletAddress}</p>
                </CardContent>
             </Card>
        )}

        {!isLoading && !hasSearched && (
            <Card className="shadow-md rounded-lg">
                <CardContent className="p-8 text-center text-muted-foreground min-h-[200px] flex flex-col justify-center items-center">
                    <Wallet className="h-10 w-10 text-primary mb-4"/>
                    <p className="text-lg">Enter a wallet address above and click "Fetch Rewards" to view data.</p>
                </CardContent>
            </Card>
        )}
      </div>
    </MainLayout>
  );
}
