import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type IncidentCardFragment = { __typename?: 'Incident', approved?: boolean | null, id?: string | null, totalImages?: number | null, priority: Types.IncidentPriority, customerRef?: string | null, subject?: string | null, reference?: number | null, policeRef?: string | null, dayTime: string, description?: string | null, createdByUser?: boolean | null, crimeTypes?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> | null, images: Array<{ __typename?: 'Image', low?: string | null, id?: string | null, rotation?: number | null, position?: Types.ImagePosition | null, primary?: boolean | null }>, offenders: Array<{ __typename?: 'Offender', name?: string | null, id?: string | null }>, business?: { __typename?: 'Business', name?: string | null } | null, location?: { __typename?: 'Address', full?: string | null } | null };

export const IncidentCardFragmentDoc = gql`
    fragment IncidentCard on Incident {
  approved
  id
  totalImages
  crimeTypes {
    id
    name
  }
  priority
  customerRef
  images {
    low
    id
    rotation
    position
    primary
  }
  subject
  reference
  policeRef
  offenders {
    name
    id
  }
  dayTime
  business {
    name
  }
  location {
    full
  }
  description
  createdByUser
}
    `;