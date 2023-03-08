export interface CrimeGroupData {
  id: string;
  reference?: number | null;
  alias?: string | null;
  totalOffenders?: number | null;
  totalIncidents?: number | null;
  totalValue?: number | null;
  totalRecoveredValue?: number | null;
  totalTheftSuccess?: number | null;
  vehicles?: string[];
  offenders?: string[];
}
