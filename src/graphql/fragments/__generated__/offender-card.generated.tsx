import type * as Types from '../../types';

import { gql } from '@apollo/client';
export type OffenderCardFragment = { __typename?: 'Offender', id: string, name?: string | null, totalIncidents: number, reference?: number | null, totalImages: number, approved?: boolean | null, knownFor: Array<string>, targetedGoods: Array<string>, totalValue: number, comment?: string | null, createdByUser: boolean, idVerified: boolean, updatedAt: Date, latestIncident?: { __typename?: 'Incident', id: string, dateAgo: number, reportedBusinessName: string, dayTime: string } | null, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, images: Array<{ __typename?: 'Image', id: string, rotation: number, position: Types.ImagePosition, optimised?: string | null, primary?: boolean | null, policeImage?: boolean | null, isFace?: boolean | null }> };

export const OffenderCardFragmentDoc = gql`
    fragment OffenderCard on Offender {
  id
  name
  totalIncidents
  reference
  totalImages
  approved
  knownFor
  targetedGoods
  totalValue
  comment
  createdByUser
  idVerified
  updatedAt
  latestIncident {
    id
    dateAgo
    reportedBusinessName
    dayTime
  }
  tags {
    id
    name
  }
  images {
    id
    rotation
    position
    optimised
    primary
    policeImage
    isFace
  }
}
    `;