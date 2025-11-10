import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListOffendersSelectQueryVariables = Types.Exact<{
  scheme: Types.SchemeWhereUniqueInput;
  where?: Types.InputMaybe<Types.OffenderWhereInput>;
  order?: Types.InputMaybe<Types.OffenderOrderByWithRelationInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ListOffendersSelectQuery = { __typename?: 'Query', listOffenders: { __typename?: 'ListOffenders', total: number, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, reference?: number | null, updatedAt: Date, dateOfBirth?: Date | null, age?: Types.Age | null, gender?: Types.Gender | null, hair?: string | null, build?: Types.Build | null, race?: Types.Race | null, peculiarities?: string | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, optimisedPersisted?: string | null }>, incidents: Array<{ __typename?: 'Incident', id: string, date: Date, location?: { __typename?: 'Address', id: string, full: string } | null, createdBy: { __typename?: 'User', id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string }> } }> }> } };


export const ListOffendersSelectDocument = gql`
    query listOffendersSelect($scheme: SchemeWhereUniqueInput!, $where: OffenderWhereInput, $order: OffenderOrderByWithRelationInput, $take: Int, $skip: Int) {
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
      updatedAt
      dateOfBirth
      age
      gender
      hair
      build
      race
      peculiarities
      images {
        id
        optimised
        optimisedPersisted
      }
      incidents {
        id
        date
        location {
          id
          full
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
    total
  }
}
    `;
export function useListOffendersSelectQuery(baseOptions: Apollo.QueryHookOptions<ListOffendersSelectQuery, ListOffendersSelectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListOffendersSelectQuery, ListOffendersSelectQueryVariables>(ListOffendersSelectDocument, options);
      }
export function useListOffendersSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListOffendersSelectQuery, ListOffendersSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListOffendersSelectQuery, ListOffendersSelectQueryVariables>(ListOffendersSelectDocument, options);
        }
export type ListOffendersSelectQueryHookResult = ReturnType<typeof useListOffendersSelectQuery>;
export type ListOffendersSelectLazyQueryHookResult = ReturnType<typeof useListOffendersSelectLazyQuery>;
export type ListOffendersSelectQueryResult = Apollo.QueryResult<ListOffendersSelectQuery, ListOffendersSelectQueryVariables>;