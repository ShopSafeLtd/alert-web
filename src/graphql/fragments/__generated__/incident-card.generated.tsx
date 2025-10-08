import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type IncidentCardFragment = { __typename?: 'Incident', approved?: boolean | null, id: string, totalImages: number, priority: Types.IncidentPriority, customerRef?: string | null, newIncident: boolean, subject: string, reference?: number | null, policeRef?: string | null, dayTime: string, description: string, createdByUser: boolean, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, status?: { __typename?: 'IncidentStatus', id: string, name: string, tooltip?: string | null } | null, images: Array<{ __typename?: 'Image', low?: string | null, id: string, rotation: number, position: Types.ImagePosition, primary?: boolean | null }>, offenders: Array<{ __typename?: 'Offender', name?: string | null, id: string }>, business?: { __typename?: 'Business', name: string } | null, location?: { __typename?: 'Address', full: string } | null };

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
  newIncident
  status {
    id
    name
    tooltip
  }
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