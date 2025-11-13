import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SuggestedCrimeGroupMembersQueryVariables = Types.Exact<{
  where: Types.CrimeGroupWhereUniqueInput;
  crimeTypesWhere?: Types.InputMaybe<Types.TagWhereInput>;
  associatedCrimeGroup?: Types.InputMaybe<Types.UniqueId>;
}>;


export type SuggestedCrimeGroupMembersQuery = { __typename?: 'Query', crimeGroup: { __typename?: 'CrimeGroup', id: string, suggestedMembers: Array<{ __typename?: 'Offender', id: string, name?: string | null, alias: Array<string>, reference?: number | null, dateOfBirth?: Date | null, age?: Types.Age | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, hair?: string | null, peculiarities?: string | null, totalAssociatedIncidents: number, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, position: Types.ImagePosition, rotation: number }>, associatedIncidents: Array<{ __typename?: 'Incident', id: string, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }> }> }> } };


export const SuggestedCrimeGroupMembersDocument = gql`
    query SuggestedCrimeGroupMembers($where: CrimeGroupWhereUniqueInput!, $crimeTypesWhere: TagWhereInput, $associatedCrimeGroup: UniqueId) {
  crimeGroup(where: $where) {
    id
    suggestedMembers {
      id
      name
      alias
      reference
      dateOfBirth
      age
      gender
      build
      height
      race
      hair
      peculiarities
      images {
        id
        optimised
        position
        rotation
      }
      totalAssociatedIncidents(associatedCrimeGroup: $associatedCrimeGroup)
      associatedIncidents(associatedCrimeGroup: $associatedCrimeGroup) {
        id
        crimeTypes {
          id
          name
        }
      }
    }
  }
}
    `;
export function useSuggestedCrimeGroupMembersQuery(baseOptions: Apollo.QueryHookOptions<SuggestedCrimeGroupMembersQuery, SuggestedCrimeGroupMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SuggestedCrimeGroupMembersQuery, SuggestedCrimeGroupMembersQueryVariables>(SuggestedCrimeGroupMembersDocument, options);
      }
export function useSuggestedCrimeGroupMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SuggestedCrimeGroupMembersQuery, SuggestedCrimeGroupMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SuggestedCrimeGroupMembersQuery, SuggestedCrimeGroupMembersQueryVariables>(SuggestedCrimeGroupMembersDocument, options);
        }
export type SuggestedCrimeGroupMembersQueryHookResult = ReturnType<typeof useSuggestedCrimeGroupMembersQuery>;
export type SuggestedCrimeGroupMembersLazyQueryHookResult = ReturnType<typeof useSuggestedCrimeGroupMembersLazyQuery>;
export type SuggestedCrimeGroupMembersQueryResult = Apollo.QueryResult<SuggestedCrimeGroupMembersQuery, SuggestedCrimeGroupMembersQueryVariables>;