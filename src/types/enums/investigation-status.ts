import { InvestigationStatus } from 'graphql/types';

const GetInvestigationStatusValues = {
  [InvestigationStatus.Closed]: 'Closed',
  [InvestigationStatus.Open]: 'Open',
  [InvestigationStatus.Paused]: 'Paused',
} as const;

export default GetInvestigationStatusValues;
