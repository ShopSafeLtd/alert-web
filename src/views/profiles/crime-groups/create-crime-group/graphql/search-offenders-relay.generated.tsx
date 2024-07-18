import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { OffendersFragmentDoc } from '../../../../../graphql/fragments/offenders.generated';
import { ImagesFragmentDoc } from '../../../../../graphql/fragments/images.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SearchOffendersRelayQueryVariables = Types.Exact<{
  after?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  order?: Types.InputMaybe<Types.OffenderOrderByWithRelationInput>;
  scheme?: Types.InputMaybe<Types.SchemeWhereUniqueInput>;
  where?: Types.InputMaybe<Types.OffenderWhereInput>;
  orderByValue?: Types.InputMaybe<Types.SortOrder>;
}>;


export type SearchOffendersRelayQuery = { __typename?: 'Query', listOffendersRelay: { __typename?: 'QueryListOffendersRelayConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'QueryListOffendersRelayConnectionEdge', node: { __typename?: 'Offender', id: string, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified: boolean, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', isFace?: boolean | null, id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }>, tags: Array<{ __typename?: 'Tag', id: string, name: string }> } }> } };


export const SearchOffendersRelayDocument = gql`
    query searchOffendersRelay($after: String, $first: Int, $order: OffenderOrderByWithRelationInput, $scheme: SchemeWhereUniqueInput, $where: OffenderWhereInput, $orderByValue: SortOrder) {
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
        images {
          ...Images
          isFace
        }
        tags {
          id
          name
        }
      }
    }
  }
}
    ${OffendersFragmentDoc}
${ImagesFragmentDoc}`;
export function useSearchOffendersRelayQuery(baseOptions?: Apollo.QueryHookOptions<SearchOffendersRelayQuery, SearchOffendersRelayQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchOffendersRelayQuery, SearchOffendersRelayQueryVariables>(SearchOffendersRelayDocument, options);
      }
export function useSearchOffendersRelayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchOffendersRelayQuery, SearchOffendersRelayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchOffendersRelayQuery, SearchOffendersRelayQueryVariables>(SearchOffendersRelayDocument, options);
        }
export type SearchOffendersRelayQueryHookResult = ReturnType<typeof useSearchOffendersRelayQuery>;
export type SearchOffendersRelayLazyQueryHookResult = ReturnType<typeof useSearchOffendersRelayLazyQuery>;
export type SearchOffendersRelayQueryResult = Apollo.QueryResult<SearchOffendersRelayQuery, SearchOffendersRelayQueryVariables>;