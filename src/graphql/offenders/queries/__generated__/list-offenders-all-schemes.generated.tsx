import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListOffendersAllSchemesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.OffenderWhereInput>;
  order?: Types.InputMaybe<Types.OffenderOrderByWithRelationInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ListOffendersAllSchemesQuery = { __typename?: 'Query', listOffendersAllSchemes: { __typename?: 'ListOffenders', total: number, offenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, hair?: string | null, gender?: Types.Gender | null, name?: string | null, totalIncidents: number, totalValue: number, race?: Types.Race | null, peculiarities?: string | null, approved?: boolean | null, active?: boolean | null, lastActive?: { __typename?: 'Incident', id: string, dayTime: string } | null, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, position: Types.ImagePosition, rotation: number, primary?: boolean | null, policeImage?: boolean | null, isFace?: boolean | null, optimisedPersisted?: string | null }> }> } };


export const ListOffendersAllSchemesDocument = gql`
    query listOffendersAllSchemes($where: OffenderWhereInput, $order: OffenderOrderByWithRelationInput, $take: Int, $skip: Int) {
  listOffendersAllSchemes(where: $where, order: $order, take: $take, skip: $skip) {
    offenders {
      id
      reference
      reference
      age
      build
      height
      dateOfBirth
      hair
      gender
      name
      totalIncidents
      totalValue
      race
      peculiarities
      approved
      active
      lastActive {
        id
        dayTime
      }
      tags {
        id
        name
      }
      images {
        id
        optimised
        position
        rotation
        primary
        policeImage
        isFace
        optimisedPersisted
      }
    }
    total
  }
}
    `;
export function useListOffendersAllSchemesQuery(baseOptions?: Apollo.QueryHookOptions<ListOffendersAllSchemesQuery, ListOffendersAllSchemesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListOffendersAllSchemesQuery, ListOffendersAllSchemesQueryVariables>(ListOffendersAllSchemesDocument, options);
      }
export function useListOffendersAllSchemesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListOffendersAllSchemesQuery, ListOffendersAllSchemesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListOffendersAllSchemesQuery, ListOffendersAllSchemesQueryVariables>(ListOffendersAllSchemesDocument, options);
        }
export type ListOffendersAllSchemesQueryHookResult = ReturnType<typeof useListOffendersAllSchemesQuery>;
export type ListOffendersAllSchemesLazyQueryHookResult = ReturnType<typeof useListOffendersAllSchemesLazyQuery>;
export type ListOffendersAllSchemesQueryResult = Apollo.QueryResult<ListOffendersAllSchemesQuery, ListOffendersAllSchemesQueryVariables>;