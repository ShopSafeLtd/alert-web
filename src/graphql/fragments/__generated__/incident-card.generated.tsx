import type * as Types from '../../types';

import { gql } from '@apollo/client';
export type IncidentCardFragment = { __typename?: 'Incident', approved?: boolean | null, draft: boolean, id: string, totalImages: number, priority: Types.IncidentPriority, customerRef?: string | null, newIncident: boolean, subject: string, reference?: number | null, policeRef?: string | null, dayTime: string, description: string, createdByUser: boolean, totalValue: number, totalRecoveredValue: number, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, status?: { __typename?: 'IncidentStatus', id: string, name: string, tooltip?: string | null } | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }>, images: Array<{ __typename?: 'Image', low?: string | null, optimised?: string | null, id: string, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, primary?: boolean | null }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, reference?: number | null, gender?: Types.Gender | null, race?: Types.Race | null, age?: Types.Age | null, build?: Types.Build | null, dateOfBirth?: Date | null, knownFor: Array<string>, wanted: boolean, images: Array<{ __typename?: 'Image', id: string, low?: string | null, optimised?: string | null, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null }> }>, business?: { __typename?: 'Business', id: string, name: string } | null, location?: { __typename?: 'Address', id: string, full: string } | null };

export const IncidentCardFragmentDoc = gql`
    fragment IncidentCard on Incident {
  approved
  draft
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
  assignedUsers {
    id
    fullName
  }
  images {
    low
    optimised
    id
    rotation
    position
    positionX
    positionY
    primary
  }
  subject
  reference
  policeRef
  offenders {
    id
    name
    reference
    gender
    race
    age
    build
    dateOfBirth
    knownFor
    wanted
    images(take: 1, orderBy: {createdAt: desc}) {
      id
      low
      optimised
      rotation
      position
      positionX
      positionY
    }
  }
  dayTime
  business {
    id
    name
  }
  location {
    id
    full
  }
  description
  createdByUser
  totalValue
  totalRecoveredValue
}
    `;