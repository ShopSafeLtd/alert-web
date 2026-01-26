import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListIncidentsForTableQueryVariables = Types.Exact<{
  scheme: Types.SchemeWhereUniqueInput;
  where?: Types.InputMaybe<Types.IncidentWhereInput>;
  order?: Types.InputMaybe<Types.IncidentOrderByWithRelationInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ListIncidentsForTableQuery = { __typename?: 'Query', listIncidents?: { __typename?: 'ListIncidents', total: number, incidents: Array<{ __typename?: 'Incident', id: string, subject: string, dayTime: string, reference?: number | null, policeRef?: string | null, business?: { __typename?: 'Business', id: string, name: string } | null, location?: { __typename?: 'Address', id: string, full: string } | null, incidentItems: Array<{ __typename?: 'IncidentItem', value?: number | null, recoveredValue?: number | null }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null }> }> }> } | null };


export const ListIncidentsForTableDocument = gql`
    query listIncidentsForTable($scheme: SchemeWhereUniqueInput!, $where: IncidentWhereInput, $order: IncidentOrderByWithRelationInput, $take: Int, $skip: Int) {
  listIncidents(
    scheme: $scheme
    where: $where
    order: $order
    take: $take
    skip: $skip
  ) {
    incidents {
      id
      subject
      dayTime
      reference
      policeRef
      business {
        id
        name
      }
      location {
        id
        full
      }
      incidentItems {
        value
        recoveredValue
      }
      offenders {
        id
        name
        images(take: 1) {
          id
          optimised
        }
      }
    }
    total
  }
}
    `;
export function useListIncidentsForTableQuery(baseOptions: Apollo.QueryHookOptions<ListIncidentsForTableQuery, ListIncidentsForTableQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListIncidentsForTableQuery, ListIncidentsForTableQueryVariables>(ListIncidentsForTableDocument, options);
      }
export function useListIncidentsForTableLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListIncidentsForTableQuery, ListIncidentsForTableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListIncidentsForTableQuery, ListIncidentsForTableQueryVariables>(ListIncidentsForTableDocument, options);
        }
export type ListIncidentsForTableQueryHookResult = ReturnType<typeof useListIncidentsForTableQuery>;
export type ListIncidentsForTableLazyQueryHookResult = ReturnType<typeof useListIncidentsForTableLazyQuery>;
export type ListIncidentsForTableQueryResult = Apollo.QueryResult<ListIncidentsForTableQuery, ListIncidentsForTableQueryVariables>;