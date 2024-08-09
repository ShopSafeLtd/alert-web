import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LinkBusinessToSchemeMutationVariables = Types.Exact<{
  business: Types.BusinessWhereUniqueInput;
  scheme: Types.SchemeWhereUniqueInput;
}>;


export type LinkBusinessToSchemeMutation = { __typename?: 'Mutation', linkBusinessToScheme: { __typename?: 'Business', id: string, name: string, fullName: string, publicName: boolean, demId?: string | null, totalUsers: number, parent?: { __typename?: 'Business', id: string, name: string, fullName: string, publicName: boolean } | null, locations: Array<{ __typename?: 'Address', id: string, full: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, tags: Array<{ __typename?: 'Tag', id: string, name: string }> } };


export const LinkBusinessToSchemeDocument = gql`
    mutation LinkBusinessToScheme($business: BusinessWhereUniqueInput!, $scheme: SchemeWhereUniqueInput!) {
  linkBusinessToScheme(business: $business, scheme: $scheme) {
    id
    name
    fullName
    publicName
    demId
    parent {
      id
      name
      fullName
      publicName
    }
    locations {
      id
      full
    }
    groups {
      id
      name
    }
    tags {
      id
      name
    }
    totalUsers
  }
}
    `;
export type LinkBusinessToSchemeMutationFn = Apollo.MutationFunction<LinkBusinessToSchemeMutation, LinkBusinessToSchemeMutationVariables>;
export function useLinkBusinessToSchemeMutation(baseOptions?: Apollo.MutationHookOptions<LinkBusinessToSchemeMutation, LinkBusinessToSchemeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LinkBusinessToSchemeMutation, LinkBusinessToSchemeMutationVariables>(LinkBusinessToSchemeDocument, options);
      }
export type LinkBusinessToSchemeMutationHookResult = ReturnType<typeof useLinkBusinessToSchemeMutation>;
export type LinkBusinessToSchemeMutationResult = Apollo.MutationResult<LinkBusinessToSchemeMutation>;
export type LinkBusinessToSchemeMutationOptions = Apollo.BaseMutationOptions<LinkBusinessToSchemeMutation, LinkBusinessToSchemeMutationVariables>;