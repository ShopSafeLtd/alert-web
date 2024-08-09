import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { OffendersFragmentDoc } from '../../../../../../graphql/fragments/__generated__/offenders.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListOffendersCardQueryVariables = Types.Exact<{
  after?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  order?: Types.InputMaybe<Types.OffenderOrderByWithRelationInput>;
  scheme?: Types.InputMaybe<Types.SchemeWhereUniqueInput>;
  where?: Types.InputMaybe<Types.OffenderWhereInput>;
  orderByValue?: Types.InputMaybe<Types.SortOrder>;
}>;


export type ListOffendersCardQuery = { __typename?: 'Query', listOffendersRelay: { __typename?: 'QueryListOffendersRelayConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'QueryListOffendersRelayConnectionEdge', node: { __typename?: 'Offender', id: string, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified: boolean, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, lastActive?: { __typename?: 'Incident', id: string, dayTime: string } | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }> } }> } };


export const ListOffendersCardDocument = gql`
    query ListOffendersCard($after: String, $first: Int, $order: OffenderOrderByWithRelationInput, $scheme: SchemeWhereUniqueInput, $where: OffenderWhereInput, $orderByValue: SortOrder) {
  listOffendersRelay(
    after: $after
    first: $first
    order: $order
    scheme: $scheme
    where: $where
    orderByValue: $orderByValue
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        ...Offenders
        lastActive {
          id
          dayTime
        }
        images {
          id
          url
          optimised
          card
          position
          rotation
        }
      }
    }
  }
}
    ${OffendersFragmentDoc}`;
export function useListOffendersCardQuery(baseOptions?: Apollo.QueryHookOptions<ListOffendersCardQuery, ListOffendersCardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListOffendersCardQuery, ListOffendersCardQueryVariables>(ListOffendersCardDocument, options);
      }
export function useListOffendersCardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListOffendersCardQuery, ListOffendersCardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListOffendersCardQuery, ListOffendersCardQueryVariables>(ListOffendersCardDocument, options);
        }
export type ListOffendersCardQueryHookResult = ReturnType<typeof useListOffendersCardQuery>;
export type ListOffendersCardLazyQueryHookResult = ReturnType<typeof useListOffendersCardLazyQuery>;
export type ListOffendersCardQueryResult = Apollo.QueryResult<ListOffendersCardQuery, ListOffendersCardQueryVariables>;