import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type CrimeGroupsFragment = { __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number };

export const CrimeGroupsFragmentDoc = gql`
    fragment CrimeGroups on CrimeGroup {
  id
  reference
  alias
  totalIncidents
  totalOffenders
  totalRecoveredValue
  totalTheftSuccess
  totalValue
}
    `;