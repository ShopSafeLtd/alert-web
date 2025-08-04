import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type InvestigationsFragment = { __typename?: 'Investigation', id?: string | null, name?: string | null, description?: string | null, status?: Types.InvestigationStatus | null, createdAt?: Date | null, closedAt?: Date | null, reference?: number | null };

export const InvestigationsFragmentDoc = gql`
    fragment Investigations on Investigation {
  id
  name
  description
  status
  createdAt
  closedAt
  reference
}
    `;