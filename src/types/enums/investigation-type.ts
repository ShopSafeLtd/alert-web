import { InvestigationType } from 'graphql/types';

const GetInvestigationTypeValues = {
  [InvestigationType.CriminalDamage]: 'Criminal Damage',
  [InvestigationType.CyberFraud]: 'Cyber Fraud',
  [InvestigationType.EmployeeTheft]: 'Employee Theft',
  [InvestigationType.Fraud]: 'Fraud',
  [InvestigationType.General]: 'General',
  [InvestigationType.OrganisedRetailCrime]: 'Organised Retail Crime',
  [InvestigationType.Robbery]: 'Robbery',
  [InvestigationType.Shoplifting]: 'Shoplifting',
  [InvestigationType.StockLoss]: 'Stock Loss',
  [InvestigationType.VendorFraud]: 'Vendor Fraud',
} as const;

export default GetInvestigationTypeValues;
