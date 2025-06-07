import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockUserRestakingData } from '@/lib/mockData';
import type { UserRestakingInfo } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

async function getRestakersData(): Promise<UserRestakingInfo[]> {
  // In a real app, fetch from your API:
  // const res = await fetch('YOUR_API_ENDPOINT/restakers');
  // if (!res.ok) throw new Error('Failed to fetch restakers');
  // return res.json();
  await new Promise(resolve => setTimeout(resolve, 200)); // Simulate network delay
  return Promise.resolve(mockUserRestakingData);
}

export default async function RestakersPage() {
  const restakers = await getRestakersData();

  return (
    <MainLayout>
      <div className="space-y-8">
        <Card className="shadow-xl rounded-lg overflow-hidden">
          <CardHeader className="bg-card">
            <CardTitle className="text-3xl font-headline text-primary">User Restaking Information</CardTitle>
            <CardDescription>
              A list of users who have restaked their stETH, along with their staked amounts and target AVS.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-20rem)]"> {/* Adjust height as needed */}
              <Table>
                <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur-sm z-10">
                  <TableRow>
                    <TableHead className="w-[40%] px-6 py-3">User Address</TableHead>
                    <TableHead className="text-right px-6 py-3">Amount Restaked (stETH)</TableHead>
                    <TableHead className="px-6 py-3">Target AVS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {restakers.length > 0 ? (
                    restakers.map((restaker) => (
                      <TableRow key={restaker.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium font-code px-6 py-4">{restaker.userAddress}</TableCell>
                        <TableCell className="text-right px-6 py-4">{restaker.amountRestaked.toFixed(2)}</TableCell>
                        <TableCell className="px-6 py-4">
                          <Badge variant="secondary" className="font-code bg-accent/10 text-accent border border-accent/30">
                            {restaker.targetAVS}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground h-24">
                        No restaking data available.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
