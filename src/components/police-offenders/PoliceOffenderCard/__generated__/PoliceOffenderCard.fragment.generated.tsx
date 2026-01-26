import type * as Types from '../../../../graphql/types';

import { gql } from '@apollo/client';
export type PoliceOffenderCardFragment = { __typename?: 'SharedOffender', id: string, name?: string | null, createdAt: Date, updatedAt: Date, policePriorityScore?: number | null, aiQualityScore?: number | null, aiImpactScore?: number | null, aiSummary?: string | null, aiKeyObservations: Array<string>, aiMethods: Array<string>, aiMO?: string | null, aiPatternSignature: Array<string>, aiGenerationStatus?: string | null, aiLastGeneratedAt?: Date | null, aiGenerationAttempts: number, hasImages: boolean, hasName: boolean, lastIncidentAt?: Date | null, totalLossValue?: number | null, totalIncidents: number, images: Array<{ __typename?: 'Image', id: string, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, optimised?: string | null, primary?: boolean | null, policeImage?: boolean | null, isFace?: boolean | null }>, tag: Array<{ __typename?: 'Tag', id: string, name: string }>, schemes: Array<{ __typename?: 'Scheme', id: string, name: string, hubForce?: Types.PoliceForce | null, logo?: { __typename?: 'Image', url?: string | null, optimised?: string | null } | null, darkLogo?: { __typename?: 'Image', url?: string | null } | null }>, sources: Array<{ __typename?: 'Scheme', id: string, name: string, logo?: { __typename?: 'Image', url?: string | null, optimised?: string | null } | null, darkLogo?: { __typename?: 'Image', url?: string | null } | null }>, policeHubs: Array<{ __typename?: 'Scheme', id: string, name: string, hubForce?: Types.PoliceForce | null, logo?: { __typename?: 'Image', url?: string | null, optimised?: string | null } | null, darkLogo?: { __typename?: 'Image', url?: string | null } | null }>, offender: Array<{ __typename?: 'Offender', id: string, name?: string | null, reference?: number | null, totalImages: number, idVerified: boolean, latestIncident?: { __typename?: 'Incident', id: string, dateAgo: number, reportedBusinessName: string, dayTime: string } | null }> };

export const PoliceOffenderCardFragmentDoc = gql`
    fragment PoliceOffenderCard on SharedOffender {
  id
  name
  createdAt
  updatedAt
  policePriorityScore
  aiQualityScore
  aiImpactScore
  aiSummary
  aiKeyObservations
  aiMethods
  aiMO
  aiPatternSignature
  aiGenerationStatus
  aiLastGeneratedAt
  aiGenerationAttempts
  images {
    id
    rotation
    position
    positionX
    positionY
    optimised
    primary
    policeImage
    isFace
  }
  hasImages
  hasName
  lastIncidentAt
  totalLossValue
  totalIncidents
  tag {
    id
    name
  }
  schemes {
    id
    name
    hubForce
    logo {
      url
      optimised
    }
    darkLogo {
      url
    }
  }
  sources {
    id
    name
    logo {
      url
      optimised
    }
    darkLogo {
      url
    }
  }
  policeHubs {
    id
    name
    hubForce
    logo {
      url
      optimised
    }
    darkLogo {
      url
    }
  }
  offender {
    id
    name
    reference
    totalImages
    idVerified
    latestIncident {
      id
      dateAgo
      reportedBusinessName
      dayTime
    }
  }
}
    `;