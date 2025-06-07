import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockValidatorMetadata } from '@/lib/mockData';
import type { ValidatorMetadata, ValidatorStatus } from '@/types';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, ShieldAlert, ShieldX, ShieldOff, HelpCircle, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

async function getValidatorsData(): Promise<ValidatorMetadata[]> {
  // In a real app, fetch from your API
  // const res = await fetch('YOUR_API_ENDPOINT/validators');
  // if (!res.ok) throw new Error('Failed to fetch validators');
  // return res.json();
  await new Promise(resolve => setTimeout(resolve, 200)); // Simulate network delay
  return Promise.resolve(mockValidatorMetadata);
}

const StatusDisplay = ({ status }: { status: ValidatorStatus }) => {
  switch (status) {
    case 'active':
      return <Badge variant="outline" className="border-accent text-accent items-center"><ShieldCheck className="h-4 w-4 mr-1.5" />Active</Badge>;
    case 'jailed':
      return <Badge variant="secondary" className="items-center"><ShieldAlert className="h-4 w-4 mr-1.5 text-secondary-foreground" />Jailed</Badge>;
    case 'slashed':
      return <Badge variant="destructive" className="items-center"><ShieldX className="h-4 w-4 mr-1.5" />Slashed</Badge>;
    case 'inactive':
      return <Badge variant="outline" className="items-center"><ShieldOff className="h-4 w-4 mr-1.5" />Inactive</Badge>;
    default:
      return <Badge variant="outline" className="items-center"><HelpCircle className="h-4 w-4 mr-1.5" />Unknown</Badge>;
  }
};

export default async function ValidatorsPage() {
  const validators = await getValidatorsData();

  return (
    <MainLayout>
      <div className="space-y-8">
        <Card className="shadow-xl rounded-lg overflow-hidden">
          <CardHeader className="bg-card">
            <CardTitle className="text-3xl font-headline text-primary">Validator Metadata</CardTitle>
            <CardDescription>
              Detailed information for AVS validators, including total stake, status, and slash history.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
             <ScrollArea className="h-[calc(100vh-20rem)]"> {/* Adjust height as needed */}
              <Table>
                <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur-sm z-10">
                  <TableRow>
                    <TableHead className="w-[35%] px-6 py-3">Operator Address</TableHead>
                    <TableHead className="text-right px-6 py-3">Total Delegated Stake</TableHead>
                    <TableHead className="text-center px-6 py-3">Status</TableHead>
                    <TableHead className="text-center px-6 py-3">Slashes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {validators.length > 0 ? (
                    validators.map((validator) => (
                      <TableRow key={validator.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium font-code px-6 py-4">{validator.operatorAddress}</TableCell>
                        <TableCell className="text-right px-6 py-4">{validator.totalDelegatedStake.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                        <TableCell className="text-center px-6 py-4">
                          <StatusDisplay status={validator.status} />
                        </TableCell>
                        <TableCell className="text-center px-6 py-4">
                          {validator.slashHistory.length > 0 ? (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="link" size="sm" className="text-primary hover:underline p-0 h-auto">
                                  {validator.slashHistory.length} event(s) <Info className="h-3 w-3 ml-1" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-lg">
                                <DialogHeader>
                                  <DialogTitle>Slash History: <span className="font-code text-sm">{validator.operatorAddress}</span></DialogTitle>
                                  <DialogDescription>
                                    Detailed list of slash events for this validator.
                                  </DialogDescription>
                                </DialogHeader>
                                <ScrollArea className="max-h-[50vh] pr-3 mt-4">
                                  <div className="space-y-3">
                                  {validator.slashHistory.map(event => (
                                    <div key={event.id} className="p-3 border rounded-md bg-muted/50 shadow-sm">
                                      <p className="text-sm font-semibold">Amount: <span className="font-bold text-destructive">{event.amount} ETH-like</span></p>
                                      <p className="text-xs text-muted-foreground">Date: {format(new Date(event.timestamp), "PPpp")}</p>
                                      {event.reason && <p className="text-xs mt-1">Reason: <span className="italic">{event.reason}</span></p>}
                                    </div>
                                  ))}
                                  </div>
                                </ScrollArea>
                              </DialogContent>
                            </Dialog>
                          ) : (
                            <span className="text-xs text-muted-foreground">None</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                     <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground h-24">
                        No validator data available.
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
