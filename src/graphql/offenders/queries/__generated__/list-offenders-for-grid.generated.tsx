import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListOffendersForGridQueryVariables = Types.Exact<{
  scheme: Types.SchemeWhereUniqueInput;
  where?: Types.InputMaybe<Types.OffenderWhereInput>;
  order?: Types.InputMaybe<Types.OffenderOrderByWithRelationInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ListOffendersForGridQuery = { __typename?: 'Query', listOffenders: { __typename?: 'ListOffenders', total: number, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, reference?: number | null, gender?: Types.Gender | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, totalIncidents: number, totalValue: number, alias: Array<string>, wanted: boolean, knownFor: Array<string>, targetedGoods: Array<string>, latestIncident?: { __typename?: 'Incident', id: string, date: Date } | null, targetedBusinesses?: Array<{ __typename?: 'Business', id: string, name: string }> | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, position: Types.ImagePosition, rotation: number }> }> } };


export const ListOffendersForGridDocument = gql`
    query listOffendersForGrid($scheme: SchemeWhereUniqueInput!, $where: OffenderWhereInput, $order: OffenderOrderByWithRelationInput, $take: Int, $skip: Int) {
  listOffenders(
    scheme: $scheme
    where: $where
    order: $order
    take: $take
    skip: $skip
  ) {
    offenders {
      id
      name
      reference
      gender
      race
      age
      dateOfBirth
      totalIncidents
      totalValue
      latestIncident {
        id
        date
      }
      alias
      wanted
      knownFor
      targetedGoods
      targetedBusinesses {
        id
        name
      }
      images(take: 1) {
        id
        optimised
        position
        rotation
      }
    }
    total
  }
}
    `;
export function useListOffendersForGridQuery(baseOptions: Apollo.QueryHookOptions<ListOffendersForGridQuery, ListOffendersForGridQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListOffendersForGridQuery, ListOffendersForGridQueryVariables>(ListOffendersForGridDocument, options);
      }
export function useListOffendersForGridLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListOffendersForGridQuery, ListOffendersForGridQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListOffendersForGridQuery, ListOffendersForGridQueryVariables>(ListOffendersForGridDocument, options);
        }
export type ListOffendersForGridQueryHookResult = ReturnType<typeof useListOffendersForGridQuery>;
export type ListOffendersForGridLazyQueryHookResult = ReturnType<typeof useListOffendersForGridLazyQuery>;
export type ListOffendersForGridQueryResult = Apollo.QueryResult<ListOffendersForGridQuery, ListOffendersForGridQueryVariables>;