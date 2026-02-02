import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BusinessPoliceAreaQueryVariables = Types.Exact<{
  where: Types.BusinessWhereUniqueInput;
}>;


export type BusinessPoliceAreaQuery = { __typename?: 'Query', business: { __typename?: 'Business', id: string, policeArea: Array<Types.PoliceForce> } };


export const BusinessPoliceAreaDocument = gql`
    query BusinessPoliceArea($where: BusinessWhereUniqueInput!) {
  business(where: $where) {
    id
    policeArea
  }
}
    `;
export function useBusinessPoliceAreaQuery(baseOptions: Apollo.QueryHookOptions<BusinessPoliceAreaQuery, BusinessPoliceAreaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessPoliceAreaQuery, BusinessPoliceAreaQueryVariables>(BusinessPoliceAreaDocument, options);
      }
export function useBusinessPoliceAreaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessPoliceAreaQuery, BusinessPoliceAreaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessPoliceAreaQuery, BusinessPoliceAreaQueryVariables>(BusinessPoliceAreaDocument, options);
        }
export type BusinessPoliceAreaQueryHookResult = ReturnType<typeof useBusinessPoliceAreaQuery>;
export type BusinessPoliceAreaLazyQueryHookResult = ReturnType<typeof useBusinessPoliceAreaLazyQuery>;
export type BusinessPoliceAreaQueryResult = Apollo.QueryResult<BusinessPoliceAreaQuery, BusinessPoliceAreaQueryVariables>;