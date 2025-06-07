export interface UserRestakingInfo {
  id: string;
  userAddress: string;
  amountRestaked: number; 
  targetAVS: string; 
}

export interface SlashEvent {
  id: string;
  timestamp: string; 
  amount: number;
  reason?: string;
}

export type ValidatorStatus = 'active' | 'jailed' | 'slashed' | 'inactive' | 'unknown';

export interface ValidatorMetadata {
  id: string;
  operatorAddress: string; 
  totalDelegatedStake: number;
  slashHistory: SlashEvent[];
  status: ValidatorStatus;
}

export interface RewardPerValidator {
  id: string;
  validatorAddress: string;
  rewardAmount: number;
  timestamp?: string; 
}

export interface RewardInsights {
  walletAddress: string;
  totalRestakingRewards: number;
  rewardsBreakdown: RewardPerValidator[];
}
