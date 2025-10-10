import type * as Types from '../../types';

import { gql } from '@apollo/client';
export type InvestigationsFragment = { __typename?: 'Investigation', id: string, name: string, description?: string | null, status: Types.InvestigationStatus, createdAt: Date, closedAt?: Date | null, reference?: number | null };

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