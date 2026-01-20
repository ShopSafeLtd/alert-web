import type * as Types from '../../../../graphql/types';

import { gql } from '@apollo/client';
export type PoliceIncidentCardFragment = { __typename?: 'SharedIncident', id: string, createdAt: Date, updatedAt: Date, policePriorityScore?: number | null, policeArea: Types.PoliceForce, aiQualityScore?: number | null, aiSummary?: string | null, aiKeyObservations: Array<string>, aiMethod?: string | null, aiMO?: string | null, tag: Array<{ __typename?: 'Tag', id: string, name: string }>, schemes: Array<{ __typename?: 'Scheme', id: string, name: string, hubForce?: Types.PoliceForce | null }>, incident: { __typename?: 'Incident', id: string, subject: string, description: string, reference?: number | null, policeRef?: string | null, customerRef?: string | null, priority: Types.IncidentPriority, totalImages: number, newIncident: boolean, dayTime: string, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, business?: { __typename?: 'Business', id: string, name: string } | null, location?: { __typename?: 'Address', id: string, full: string } | null, images: Array<{ __typename?: 'Image', id: string, low?: string | null, optimised?: string | null, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, primary?: boolean | null }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null }> }> } };

export const PoliceIncidentCardFragmentDoc = gql`
    fragment PoliceIncidentCard on SharedIncident {
  id
  createdAt
  updatedAt
  policePriorityScore
  policeArea
  aiQualityScore
  aiSummary
  aiKeyObservations
  aiMethod
  aiMO
  tag {
    id
    name
  }
  schemes {
    id
    name
    hubForce
  }
  incident {
    id
    subject
    description
    reference
    policeRef
    customerRef
    priority
    totalImages
    newIncident
    dayTime
    crimeTypes {
      id
      name
    }
    business {
      id
      name
    }
    location {
      id
      full
    }
    images {
      id
      low
      optimised
      rotation
      position
      positionX
      positionY
      primary
    }
    offenders {
      id
      name
      images(take: 1, orderBy: {createdAt: desc}) {
        id
        optimised
        rotation
        position
        positionX
        positionY
      }
    }
  }
}
    `;