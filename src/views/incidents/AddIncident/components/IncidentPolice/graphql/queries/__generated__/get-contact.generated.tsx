import type * as Types from '../../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserContactQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserContactQuery = { __typename?: 'Query', userContact?: { __typename?: 'Contact', id: string, address?: string | null, dobPlace?: string | null, formerName?: string | null, gender?: string | null, height?: string | null, homeTel?: string | null, mobileTel?: string | null, occupation?: string | null, postcode?: string | null, prefContact?: string | null, updatedAt?: Date | null, workTel?: string | null, user?: { __typename?: 'User', email?: string | null, fullName: string, id?: string | null } | null } | null };


export const UserContactDocument = gql`
    query UserContact {
  userContact {
    id
    address
    dobPlace
    formerName
    gender
    height
    homeTel
    mobileTel
    occupation
    postcode
    prefContact
    updatedAt
    user {
      email
      fullName
      id
    }
    workTel
  }
}
    `;
export function useUserContactQuery(baseOptions?: Apollo.QueryHookOptions<UserContactQuery, UserContactQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserContactQuery, UserContactQueryVariables>(UserContactDocument, options);
      }
export function useUserContactLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserContactQuery, UserContactQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserContactQuery, UserContactQueryVariables>(UserContactDocument, options);
        }
export type UserContactQueryHookResult = ReturnType<typeof useUserContactQuery>;
export type UserContactLazyQueryHookResult = ReturnType<typeof useUserContactLazyQuery>;
export type UserContactQueryResult = Apollo.QueryResult<UserContactQuery, UserContactQueryVariables>;