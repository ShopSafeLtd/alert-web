import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RecycledItemQueryVariables = Types.Exact<{
  where: Types.RecycledItemWhereUniqueInput;
}>;


export type RecycledItemQuery = { __typename?: 'Query', recycledItem?: { __typename?: 'RecycledItem', id?: string | null, systemTask?: boolean | null, incident?: { __typename?: 'Incident', id?: string | null, date?: Date | null, recycled?: boolean | null, subject?: string | null, createdBy: { __typename?: 'User', id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null }> }, location?: { __typename?: 'Address', id: string, full?: string | null } | null } | null, offender?: { __typename?: 'Offender', id?: string | null, gender?: Types.Gender | null, name?: string | null, race?: Types.Race | null, recycled?: boolean | null, incidents: Array<{ __typename?: 'Incident', id?: string | null, date?: Date | null, location?: { __typename?: 'Address', id: string, full?: string | null } | null }> } | null, scheme?: { __typename?: 'Scheme', id?: string | null } | null } | null };


export const RecycledItemDocument = gql`
    query recycledItem($where: RecycledItemWhereUniqueInput!) {
  recycledItem(where: $where) {
    id
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
export function useRecycledItemQuery(baseOptions: Apollo.QueryHookOptions<RecycledItemQuery, RecycledItemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecycledItemQuery, RecycledItemQueryVariables>(RecycledItemDocument, options);
      }
export function useRecycledItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecycledItemQuery, RecycledItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecycledItemQuery, RecycledItemQueryVariables>(RecycledItemDocument, options);
        }
export type RecycledItemQueryHookResult = ReturnType<typeof useRecycledItemQuery>;
export type RecycledItemLazyQueryHookResult = ReturnType<typeof useRecycledItemLazyQuery>;
export type RecycledItemQueryResult = Apollo.QueryResult<RecycledItemQuery, RecycledItemQueryVariables>;