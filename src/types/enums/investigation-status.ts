import { InvestigationStatus } from 'graphql/generated';

const GetInvestigationStatusValues = {
  [InvestigationStatus.Open]: 'Open',
  [InvestigationStatus.Closed]: 'Closed',
  [InvestigationStatus.Paused]: 'Paused',
} as const;

export default GetInvestigationStatusValues;
