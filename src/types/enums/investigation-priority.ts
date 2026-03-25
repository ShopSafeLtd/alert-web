import { InvestigationPriority } from 'graphql/types';

const GetInvestigationPriorityValues = {
  [InvestigationPriority.High]: 'High',
  [InvestigationPriority.Low]: 'Low',
  [InvestigationPriority.Medium]: 'Medium',
  [InvestigationPriority.Normal]: 'Normal',
} as const;

export default GetInvestigationPriorityValues;
