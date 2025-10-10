import type * as Types from '../../types';

import { gql } from '@apollo/client';
export type IncidentsDetailedFragment = { __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, customerRef?: string | null, subject: string, description: string, priority: Types.IncidentPriority, approved?: boolean | null, totalValue: number, totalRecoveredValue: number, location?: { __typename?: 'Address', id: string, full: string, geoLat?: number | null, geoLng?: number | null } | null, business?: { __typename?: 'Business', id: string, name: string } | null, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, reference?: number | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, position: Types.ImagePosition, rotation: number }> }>, createdBy: { __typename?: 'User', id: string, fullName: string } };

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