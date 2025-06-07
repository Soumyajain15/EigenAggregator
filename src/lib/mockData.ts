import type { UserRestakingInfo, ValidatorMetadata, RewardInsights, SlashEvent, ValidatorStatus } from '@/types';

export const mockUserRestakingData: UserRestakingInfo[] = [
  { id: 'user1', userAddress: '0xAliceFEF3e2478789d87a698F8b87878f8F787E', amountRestaked: 10.5, targetAVS: '0xValidatorAVSAlpha89d87a698F8b87878f8F787E' },
  { id: 'user2', userAddress: '0xBob78A698F8b87878f8F787EF8b87878f8F787E', amountRestaked: 25.0, targetAVS: '0xValidatorAVSBeta8F8b87878f8F787EF8b8787E' },
  { id: 'user3', userAddress: '0xCharlie878f8F787E87a698F8b8FEF3e2478789d', amountRestaked: 5.75, targetAVS: '0xValidatorAVSAlpha89d87a698F8b87878f8F787E' },
  { id: 'user4', userAddress: '0xDave8b87878f8F787EF8bFEF3e2478789d87a69', amountRestaked: 100.2, targetAVS: '0xValidatorAVSGamma787EF8bFEF3e2478789d7A6' },
];

const mockSlashEvents: SlashEvent[] = [
  { id: 'slash1', timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), amount: 0.1, reason: 'Downtime' },
  { id: 'slash2', timestamp: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(), amount: 0.5, reason: 'Double Signing' },
];

export const mockValidatorMetadata: ValidatorMetadata[] = [
  { 
    id: 'validatorA', 
    operatorAddress: '0xValidatorAVSAlpha89d87a698F8b87878f8F787E', 
    totalDelegatedStake: 1250.75, 
    slashHistory: [mockSlashEvents[0]], 
    status: 'active' as ValidatorStatus 
  },
  { 
    id: 'validatorB', 
    operatorAddress: '0xValidatorAVSBeta8F8b87878f8F787EF8b8787E', 
    totalDelegatedStake: 3400.0, 
    slashHistory: [], 
    status: 'active' as ValidatorStatus 
  },
  { 
    id: 'validatorC', 
    operatorAddress: '0xValidatorAVSGamma787EF8bFEF3e2478789d7A6', 
    totalDelegatedStake: 800.5, 
    slashHistory: [mockSlashEvents[1]], 
    status: 'slashed' as ValidatorStatus
  },
  { 
    id: 'validatorD', 
    operatorAddress: '0xValidatorAVSDeltaFEF3e2478789d87a698F8b878', 
    totalDelegatedStake: 0, 
    slashHistory: [], 
    status: 'inactive' as ValidatorStatus
  },
  { 
    id: 'validatorE', 
    operatorAddress: '0xValidatorAVSEpsilon2478789d87a698F8b87878f', 
    totalDelegatedStake: 500, 
    slashHistory: [], 
    status: 'jailed' as ValidatorStatus
  },
];

export const mockRewardInsightsData: Record<string, RewardInsights> = {
  '0xAliceFEF3e2478789d87a698F8b87878f8F787E': {
    walletAddress: '0xAliceFEF3e2478789d87a698F8b87878f8F787E',
    totalRestakingRewards: 1.5,
    rewardsBreakdown: [
      { id: 'reward1', validatorAddress: '0xValidatorAVSAlpha89d87a698F8b87878f8F787E', rewardAmount: 1.0, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { id: 'reward2', validatorAddress: '0xValidatorAVSBeta8F8b87878f8F787EF8b8787E', rewardAmount: 0.5, timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
    ],
  },
  '0xBob78A698F8b87878f8F787EF8b87878f8F787E': {
    walletAddress: '0xBob78A698F8b87878f8F787EF8b87878f8F787E',
    totalRestakingRewards: 3.2,
    rewardsBreakdown: [
      { id: 'reward3', validatorAddress: '0xValidatorAVSBeta8F8b87878f8F787EF8b8787E', rewardAmount: 3.2, timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    ],
  },
};

export const fetchMockRewardInsights = async (address: string): Promise<RewardInsights | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRewardInsightsData[address] || null);
    }, 500); 
  });
};
