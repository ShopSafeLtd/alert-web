import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type IncidentUpdateCardsFragment = { __typename?: 'Incident', id?: string | null, reference?: number | null, dayTime: string, policeRef?: string | null, subject?: string | null, totalValue?: number | null, totalRecoveredValue?: number | null, location?: { __typename?: 'Address', id: string, full?: string | null, geoLat?: number | null, geoLng?: number | null } | null };

export const IncidentUpdateCardsFragmentDoc = gql`
    fragment IncidentUpdateCards on Incident {
  id
  reference
  dayTime
  policeRef
  subject
  totalValue
  totalRecoveredValue
  location {
    id
    full
    geoLat
    geoLng
  }
}
    `;