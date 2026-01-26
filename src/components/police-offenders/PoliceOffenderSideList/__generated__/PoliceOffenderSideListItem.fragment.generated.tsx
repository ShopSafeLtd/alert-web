import type * as Types from '../../../../graphql/types';

import { gql } from '@apollo/client';
export type PoliceOffenderSideListItemFragment = { __typename?: 'SharedOffender', id: string, name?: string | null, policePriorityScore?: number | null, totalLossValue?: number | null, totalIncidents: number, images: Array<{ __typename?: 'Image', id: string, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, optimised?: string | null }>, offender: Array<{ __typename?: 'Offender', id: string }> };

export const PoliceOffenderSideListItemFragmentDoc = gql`
    fragment PoliceOffenderSideListItem on SharedOffender {
  id
  name
  policePriorityScore
  totalLossValue
  totalIncidents
  images {
    id
    rotation
    position
    positionX
    positionY
    optimised
  }
  offender {
    id
  }
}
    `;