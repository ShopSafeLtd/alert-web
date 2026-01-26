import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import { PoliceOffenderSideListItemFragmentDoc } from '../../__generated__/PoliceOffenderSideListItem.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SharedOffendersSideListQueryVariables = Types.Exact<{
  after?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Types.SharedOffenderRelayOrderInput>;
  where?: Types.InputMaybe<Types.SharedOffenderRelayWhereInput>;
}>;


export type SharedOffendersSideListQuery = { __typename?: 'Query', sharedOffenderRelay: { __typename?: 'QuerySharedOffenderRelayConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, endCursor?: string | null, startCursor?: string | null }, edges: Array<{ __typename?: 'QuerySharedOffenderRelayConnectionEdge', cursor: string, node: { __typename?: 'SharedOffender', id: string, name?: string | null, policePriorityScore?: number | null, totalLossValue?: number | null, totalIncidents: number, images: Array<{ __typename?: 'Image', id: string, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, optimised?: string | null }>, offender: Array<{ __typename?: 'Offender', id: string }> } }> } };


export const SharedOffendersSideListDocument = gql`
    query SharedOffendersSideList($after: String, $first: Int, $orderBy: SharedOffenderRelayOrderInput, $where: SharedOffenderRelayWhereInput) {
  sharedOffenderRelay(
    after: $after
    first: $first
    orderBy: $orderBy
    where: $where
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
    edges {
      cursor
      node {
        ...PoliceOffenderSideListItem
      }
    }
    totalCount
  }
}
    ${PoliceOffenderSideListItemFragmentDoc}`;
export function useSharedOffendersSideListQuery(baseOptions?: Apollo.QueryHookOptions<SharedOffendersSideListQuery, SharedOffendersSideListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SharedOffendersSideListQuery, SharedOffendersSideListQueryVariables>(SharedOffendersSideListDocument, options);
      }
export function useSharedOffendersSideListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SharedOffendersSideListQuery, SharedOffendersSideListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SharedOffendersSideListQuery, SharedOffendersSideListQueryVariables>(SharedOffendersSideListDocument, options);
        }
export type SharedOffendersSideListQueryHookResult = ReturnType<typeof useSharedOffendersSideListQuery>;
export type SharedOffendersSideListLazyQueryHookResult = ReturnType<typeof useSharedOffendersSideListLazyQuery>;
export type SharedOffendersSideListQueryResult = Apollo.QueryResult<SharedOffendersSideListQuery, SharedOffendersSideListQueryVariables>;