import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListUnapprovedIncidentsQueryVariables = Types.Exact<{
  scheme: Types.SchemeWhereUniqueInput;
  where?: Types.InputMaybe<Types.IncidentWhereInput>;
  order?: Types.InputMaybe<Types.IncidentOrderByWithRelationInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ListUnapprovedIncidentsQuery = { __typename?: 'Query', listIncidents?: { __typename?: 'ListIncidents', total: number, incidents: Array<{ __typename?: 'Incident', id?: string | null, subject?: string | null, dayTime: string, date?: Date | null, reference?: number | null, approved?: boolean | null, business?: { __typename?: 'Business', id: string, name?: string | null } | null, images: Array<{ __typename?: 'Image', id?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, url?: string | null }>, crimeTypes?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> | null, createdBy: { __typename?: 'User', id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null }> }, groups: Array<{ __typename?: 'Group', id: string, name: string }> }> } | null };


export const ListUnapprovedIncidentsDocument = gql`
    query listUnapprovedIncidents($scheme: SchemeWhereUniqueInput!, $where: IncidentWhereInput, $order: IncidentOrderByWithRelationInput, $take: Int, $skip: Int) {
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
      date
      reference
      business {
        id
        name
      }
      images {
        id
        optimised
        position
        rotation
        url
      }
      crimeTypes {
        id
        name
      }
      approved
      createdBy {
        id
        fullName
        businesses {
          id
          name
        }
      }
      groups {
        id
        name
      }
    }
    total
  }
}
    `;
export function useListUnapprovedIncidentsQuery(baseOptions: Apollo.QueryHookOptions<ListUnapprovedIncidentsQuery, ListUnapprovedIncidentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListUnapprovedIncidentsQuery, ListUnapprovedIncidentsQueryVariables>(ListUnapprovedIncidentsDocument, options);
      }
export function useListUnapprovedIncidentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListUnapprovedIncidentsQuery, ListUnapprovedIncidentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListUnapprovedIncidentsQuery, ListUnapprovedIncidentsQueryVariables>(ListUnapprovedIncidentsDocument, options);
        }
export type ListUnapprovedIncidentsQueryHookResult = ReturnType<typeof useListUnapprovedIncidentsQuery>;
export type ListUnapprovedIncidentsLazyQueryHookResult = ReturnType<typeof useListUnapprovedIncidentsLazyQuery>;
export type ListUnapprovedIncidentsQueryResult = Apollo.QueryResult<ListUnapprovedIncidentsQuery, ListUnapprovedIncidentsQueryVariables>;