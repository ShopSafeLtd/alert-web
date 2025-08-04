import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RecycledItemsQueryVariables = Types.Exact<{
  schemeId: Types.Scalars['String'];
  search?: Types.InputMaybe<Types.Scalars['String']>;
  order?: Types.InputMaybe<Types.RecycledItemOrderByWithRelationInput>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  dataType?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type RecycledItemsQuery = { __typename?: 'Query', recycledItems: Array<{ __typename?: 'RecycledItem', id?: string | null, deletedAt?: Date | null, expiresAt?: Date | null, systemTask?: boolean | null, deletedBy?: { __typename?: 'User', id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null }> } | null, incident?: { __typename?: 'Incident', id?: string | null, date?: Date | null, recycled?: boolean | null, subject?: string | null, createdBy: { __typename?: 'User', id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null }> }, location?: { __typename?: 'Address', id: string, full?: string | null } | null } | null, offender?: { __typename?: 'Offender', id?: string | null, gender?: Types.Gender | null, name?: string | null, race?: Types.Race | null, recycled?: boolean | null, incidents: Array<{ __typename?: 'Incident', id?: string | null, date?: Date | null, location?: { __typename?: 'Address', id: string, full?: string | null } | null }> } | null, scheme?: { __typename?: 'Scheme', id?: string | null } | null }> };


export const RecycledItemsDocument = gql`
    query recycledItems($schemeId: String!, $search: String, $order: RecycledItemOrderByWithRelationInput, $first: Int, $after: String, $dataType: [String!], $skip: Int) {
  recycledItems(
    schemeId: $schemeId
    search: $search
    order: $order
    first: $first
    after: $after
    dataType: $dataType
    skip: $skip
  ) {
    id
    deletedAt
    deletedBy {
      id
      fullName
      businesses {
        id
        name
      }
    }
    expiresAt
    incident {
      id
      createdBy {
        id
        fullName
        businesses {
          id
          name
        }
      }
      date
      location {
        id
        full
      }
      recycled
      subject
    }
    offender {
      id
      gender
      incidents {
        id
        date
        location {
          id
          full
        }
      }
      name
      race
      recycled
    }
    scheme {
      id
    }
    systemTask
  }
}
    `;
export function useRecycledItemsQuery(baseOptions: Apollo.QueryHookOptions<RecycledItemsQuery, RecycledItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecycledItemsQuery, RecycledItemsQueryVariables>(RecycledItemsDocument, options);
      }
export function useRecycledItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecycledItemsQuery, RecycledItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecycledItemsQuery, RecycledItemsQueryVariables>(RecycledItemsDocument, options);
        }
export type RecycledItemsQueryHookResult = ReturnType<typeof useRecycledItemsQuery>;
export type RecycledItemsLazyQueryHookResult = ReturnType<typeof useRecycledItemsLazyQuery>;
export type RecycledItemsQueryResult = Apollo.QueryResult<RecycledItemsQuery, RecycledItemsQueryVariables>;