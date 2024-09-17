import type * as Types from '../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SearchOffendersQueryVariables = Types.Exact<{
  where: Types.SearchOffenderWhere;
  order?: Types.InputMaybe<Types.SearchOffenderSort>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type SearchOffendersQuery = { __typename?: 'Query', searchOffenders: { __typename?: 'QuerySearchOffendersConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'QuerySearchOffendersConnectionEdge', node: { __typename?: 'Offender', age?: Types.Age | null, build?: Types.Build | null, dateOfBirth?: Date | null, gender?: Types.Gender | null, hair?: string | null, id: string, dateSource?: string | null, updatedAt: Date, name?: string | null, peculiarities?: string | null, race?: Types.Race | null, reference?: number | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, position: Types.ImagePosition, rotation: number }>, lastActive?: { __typename?: 'Incident', id: string, dayTime: string } | null, tags: Array<{ __typename?: 'Tag', id: string, name: string }> } }> } };

export type OffenderSearchDetailsFragment = { __typename?: 'Offender', age?: Types.Age | null, build?: Types.Build | null, dateOfBirth?: Date | null, gender?: Types.Gender | null, hair?: string | null, id: string, dateSource?: string | null, updatedAt: Date, name?: string | null, peculiarities?: string | null, race?: Types.Race | null, reference?: number | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, position: Types.ImagePosition, rotation: number }>, lastActive?: { __typename?: 'Incident', id: string, dayTime: string } | null, tags: Array<{ __typename?: 'Tag', id: string, name: string }> };

export const OffenderSearchDetailsFragmentDoc = gql`
    fragment OffenderSearchDetails on Offender {
  age
  build
  dateOfBirth
  gender
  hair
  id
  dateSource
  updatedAt
  images {
    id
    optimised
    position
    rotation
  }
  lastActive {
    id
    dayTime
  }
  name
  peculiarities
  race
  reference
  tags {
    id
    name
  }
}
    `;
export const SearchOffendersDocument = gql`
    query SearchOffenders($where: SearchOffenderWhere!, $order: SearchOffenderSort, $after: String, $first: Int) {
  searchOffenders(where: $where, order: $order, after: $after, first: $first) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        ...OffenderSearchDetails
      }
    }
  }
}
    ${OffenderSearchDetailsFragmentDoc}`;
export function useSearchOffendersQuery(baseOptions: Apollo.QueryHookOptions<SearchOffendersQuery, SearchOffendersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchOffendersQuery, SearchOffendersQueryVariables>(SearchOffendersDocument, options);
      }
export function useSearchOffendersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchOffendersQuery, SearchOffendersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchOffendersQuery, SearchOffendersQueryVariables>(SearchOffendersDocument, options);
        }
export type SearchOffendersQueryHookResult = ReturnType<typeof useSearchOffendersQuery>;
export type SearchOffendersLazyQueryHookResult = ReturnType<typeof useSearchOffendersLazyQuery>;
export type SearchOffendersQueryResult = Apollo.QueryResult<SearchOffendersQuery, SearchOffendersQueryVariables>;