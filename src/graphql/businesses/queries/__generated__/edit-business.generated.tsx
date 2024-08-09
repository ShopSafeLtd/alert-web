import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EditBusinessQueryVariables = Types.Exact<{
  where: Types.BusinessWhereUniqueInput;
}>;


export type EditBusinessQuery = { __typename?: 'Query', business: { __typename?: 'Business', id: string, name: string, fullName: string, publicName: boolean, siteNumber?: string | null, brands: Array<string>, parent?: { __typename?: 'Business', id: string, name: string, fullName: string } | null, groups: Array<{ __typename?: 'Group', id: string, name: string }>, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, locations: Array<{ __typename?: 'Address', id: string, building?: string | null, street?: string | null, townCity?: string | null, county?: string | null, postcode?: string | null, geoLng?: number | null, geoLat?: number | null }> } };


export const EditBusinessDocument = gql`
    query EditBusiness($where: BusinessWhereUniqueInput!) {
  business(where: $where) {
    id
    name
    fullName
    publicName
    siteNumber
    parent {
      id
      name
      fullName
    }
    groups {
      id
      name
    }
    tags {
      id
      name
    }
    brands
    locations {
      id
      building
      street
      townCity
      county
      postcode
      geoLng
      geoLat
    }
  }
}
    `;
export function useEditBusinessQuery(baseOptions: Apollo.QueryHookOptions<EditBusinessQuery, EditBusinessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EditBusinessQuery, EditBusinessQueryVariables>(EditBusinessDocument, options);
      }
export function useEditBusinessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EditBusinessQuery, EditBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EditBusinessQuery, EditBusinessQueryVariables>(EditBusinessDocument, options);
        }
export type EditBusinessQueryHookResult = ReturnType<typeof useEditBusinessQuery>;
export type EditBusinessLazyQueryHookResult = ReturnType<typeof useEditBusinessLazyQuery>;
export type EditBusinessQueryResult = Apollo.QueryResult<EditBusinessQuery, EditBusinessQueryVariables>;