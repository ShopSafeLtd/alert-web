import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OffendersBasicInfoQueryVariables = Types.Exact<{
  where: Types.OffenderWhereInput;
}>;


export type OffendersBasicInfoQuery = { __typename?: 'Query', offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, reference?: number | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, optimisedPersisted?: string | null }> }> };


export const OffendersBasicInfoDocument = gql`
    query OffendersBasicInfo($where: OffenderWhereInput!) {
  offenders(where: $where) {
    id
    name
    reference
    images(take: 1) {
      id
      optimised
      optimisedPersisted
    }
  }
}
    `;
export function useOffendersBasicInfoQuery(baseOptions: Apollo.QueryHookOptions<OffendersBasicInfoQuery, OffendersBasicInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OffendersBasicInfoQuery, OffendersBasicInfoQueryVariables>(OffendersBasicInfoDocument, options);
      }
export function useOffendersBasicInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OffendersBasicInfoQuery, OffendersBasicInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OffendersBasicInfoQuery, OffendersBasicInfoQueryVariables>(OffendersBasicInfoDocument, options);
        }
export type OffendersBasicInfoQueryHookResult = ReturnType<typeof useOffendersBasicInfoQuery>;
export type OffendersBasicInfoLazyQueryHookResult = ReturnType<typeof useOffendersBasicInfoLazyQuery>;
export type OffendersBasicInfoQueryResult = Apollo.QueryResult<OffendersBasicInfoQuery, OffendersBasicInfoQueryVariables>;