import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddressesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.AddressWhereInput>;
}>;


export type AddressesQuery = { __typename?: 'Query', addresses: Array<{ __typename?: 'Address', id: string, building?: string | null, street?: string | null, townCity?: string | null, county?: string | null, postcode?: string | null, primary?: boolean | null, full: string }> };


export const AddressesDocument = gql`
    query addresses($where: AddressWhereInput) {
  addresses(where: $where) {
    id
    building
    street
    townCity
    county
    postcode
    primary
    full
  }
}
    `;
export function useAddressesQuery(baseOptions?: Apollo.QueryHookOptions<AddressesQuery, AddressesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AddressesQuery, AddressesQueryVariables>(AddressesDocument, options);
      }
export function useAddressesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AddressesQuery, AddressesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AddressesQuery, AddressesQueryVariables>(AddressesDocument, options);
        }
export type AddressesQueryHookResult = ReturnType<typeof useAddressesQuery>;
export type AddressesLazyQueryHookResult = ReturnType<typeof useAddressesLazyQuery>;
export type AddressesQueryResult = Apollo.QueryResult<AddressesQuery, AddressesQueryVariables>;