import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type IncidentsDetailedFragment = { __typename?: 'Incident', id?: string | null, reference?: number | null, dayTime: string, policeRef?: string | null, customerRef?: string | null, subject?: string | null, description?: string | null, priority: Types.IncidentPriority, approved?: boolean | null, totalValue?: number | null, totalRecoveredValue?: number | null, location?: { __typename?: 'Address', id: string, full?: string | null, geoLat?: number | null, geoLng?: number | null } | null, business?: { __typename?: 'Business', id: string, name?: string | null } | null, crimeTypes?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> | null, groups: Array<{ __typename?: 'Group', id: string, name: string }>, offenders: Array<{ __typename?: 'Offender', id?: string | null, name?: string | null, reference?: number | null, images: Array<{ __typename?: 'Image', id?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }> }>, createdBy: { __typename?: 'User', id?: string | null, fullName: string } };

export const IncidentsDetailedFragmentDoc = gql`
    fragment IncidentsDetailed on Incident {
  id
  reference
  dayTime
  policeRef
  customerRef
  subject
  description
  priority
  approved
  totalValue
  totalRecoveredValue
  location {
    id
    full
    geoLat
    geoLng
  }
  business {
    id
    name
  }
  crimeTypes {
    id
    name
  }
  groups {
    id
    name
  }
  offenders {
    id
    name
    reference
    images {
      id
      optimised
      position
      rotation
    }
  }
  createdBy {
    id
    fullName
  }
}
    `;