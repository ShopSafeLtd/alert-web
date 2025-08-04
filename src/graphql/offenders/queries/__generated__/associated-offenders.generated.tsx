import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AssociatedOffendersQueryVariables = Types.Exact<{
  where: Types.OffenderWhereUniqueInput;
  associatedOffender: Types.UniqueId;
  linkedIncidents?: Types.InputMaybe<Types.Scalars['Boolean']>;
  linkedCrimeGroup?: Types.InputMaybe<Types.Scalars['Boolean']>;
  crimeTypesWhere?: Types.InputMaybe<Types.TagWhereInput>;
  groups?: Types.InputMaybe<Array<Types.UniqueId> | Types.UniqueId>;
}>;


export type AssociatedOffendersQuery = { __typename?: 'Query', offender: { __typename?: 'Offender', id: string, knownAssociates: Array<{ __typename?: 'Offender', id: string, name?: string | null, alias: Array<string>, reference?: number | null, dateOfBirth?: Date | null, age?: Types.Age | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, hair?: string | null, peculiarities?: string | null, totalAssociatedIncidents: number, totalAssociatedCrimeGroups: number, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, position: Types.ImagePosition, rotation: number }>, associatedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, alias?: string | null, totalIncidents: number, reference?: number | null, totalOffenders: number }>, associatedIncidents: Array<{ __typename?: 'Incident', id: string, dayTime: string, reference?: number | null, business?: { __typename?: 'Business', id: string, fullName: string } | null, location?: { __typename?: 'Address', full: string, id: string } | null, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, createdBy: { __typename?: 'User', id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string }> } }> }> } };


export const AssociatedOffendersDocument = gql`
    query AssociatedOffenders($where: OffenderWhereUniqueInput!, $associatedOffender: UniqueId!, $linkedIncidents: Boolean, $linkedCrimeGroup: Boolean, $crimeTypesWhere: TagWhereInput, $groups: [UniqueId!]) {
  offender(where: $where) {
    id
    knownAssociates(
      linkedIncidents: $linkedIncidents
      linkedCrimeGroup: $linkedCrimeGroup
      groups: $groups
    ) {
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
      totalAssociatedIncidents(associatedOffender: $associatedOffender)
      totalAssociatedCrimeGroups(associatedOffender: $associatedOffender)
      associatedCrimeGroups(associatedOffender: $associatedOffender) {
        id
        alias
        totalIncidents
        reference
        totalOffenders
      }
      associatedIncidents(associatedOffender: $associatedOffender) {
        id
        dayTime
        reference
        business {
          id
          fullName
        }
        location {
          full
          id
        }
        crimeTypes(where: $crimeTypesWhere) {
          id
          name
        }
        createdBy {
          id
          fullName
          businesses {
            id
            name
          }
        }
      }
    }
  }
}
    `;
export function useAssociatedOffendersQuery(baseOptions: Apollo.QueryHookOptions<AssociatedOffendersQuery, AssociatedOffendersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AssociatedOffendersQuery, AssociatedOffendersQueryVariables>(AssociatedOffendersDocument, options);
      }
export function useAssociatedOffendersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AssociatedOffendersQuery, AssociatedOffendersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AssociatedOffendersQuery, AssociatedOffendersQueryVariables>(AssociatedOffendersDocument, options);
        }
export type AssociatedOffendersQueryHookResult = ReturnType<typeof useAssociatedOffendersQuery>;
export type AssociatedOffendersLazyQueryHookResult = ReturnType<typeof useAssociatedOffendersLazyQuery>;
export type AssociatedOffendersQueryResult = Apollo.QueryResult<AssociatedOffendersQuery, AssociatedOffendersQueryVariables>;