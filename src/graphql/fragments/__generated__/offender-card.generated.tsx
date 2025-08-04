import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type OffenderCardFragment = { __typename?: 'Offender', id?: string | null, name?: string | null, totalIncidents: number, reference?: number | null, totalImages: number, approved?: boolean | null, knownFor: Array<string>, targetedGoods: Array<string>, totalValue?: number | null, comment?: string | null, createdByUser?: boolean | null, idVerified?: boolean | null, updatedAt?: Date | null, latestIncident?: { __typename?: 'Incident', id?: string | null, dateAgo?: number | null, reportedBusinessName: string, dayTime: string } | null, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }>, images: Array<{ __typename?: 'Image', id?: string | null, rotation?: number | null, position?: Types.ImagePosition | null, optimised?: string | null, primary?: boolean | null, policeImage?: boolean | null, isFace?: boolean | null }> };

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