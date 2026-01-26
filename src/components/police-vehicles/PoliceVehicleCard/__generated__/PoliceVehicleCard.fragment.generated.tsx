import type * as Types from '../../../../graphql/types';

import { gql } from '@apollo/client';
export type PoliceVehicleCardFragment = { __typename?: 'SharedVehicle', id: string, createdAt: Date, updatedAt: Date, policePriorityScore?: number | null, aiQualityScore?: number | null, aiSummary?: string | null, aiKeyObservations: Array<string>, aiUsagePatterns?: string | null, aiGeographicPattern?: string | null, aiGenerationStatus?: string | null, aiLastGeneratedAt?: Date | null, schemes: Array<{ __typename?: 'Scheme', id: string, name: string, hubForce?: Types.PoliceForce | null }>, vehicle: Array<{ __typename?: 'Vehicle', id: string, registration?: string | null, reference?: number | null, make?: string | null, model?: string | null, colour?: string | null, totalIncidents: number, totalOffenders: number, totalImages: number, images: Array<{ __typename?: 'Image', id: string, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, optimised?: string | null, primary?: boolean | null, url?: string | null }> }> };

export const PoliceVehicleCardFragmentDoc = gql`
    fragment PoliceVehicleCard on SharedVehicle {
  id
  createdAt
  updatedAt
  policePriorityScore
  aiQualityScore
  aiSummary
  aiKeyObservations
  aiUsagePatterns
  aiGeographicPattern
  aiGenerationStatus
  aiLastGeneratedAt
  schemes {
    id
    name
    hubForce
  }
  vehicle {
    id
    registration
    reference
    make
    model
    colour
    totalIncidents
    totalOffenders
    totalImages
    images {
      id
      rotation
      position
      positionX
      positionY
      optimised
      primary
      url
    }
  }
}
    `;