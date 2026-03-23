import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import { IncidentCardFragmentDoc } from '../../../fragments/__generated__/incident-card.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListIncidentsAllSchemesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.IncidentWhereInput>;
  order?: Types.InputMaybe<Types.IncidentOrderByWithRelationInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ListIncidentsAllSchemesQuery = { __typename?: 'Query', listIncidentsAllSchemes?: { __typename?: 'ListIncidents', total: number, incidents: Array<{ __typename?: 'Incident', approved?: boolean | null, draft: boolean, id: string, totalImages: number, priority: Types.IncidentPriority, customerRef?: string | null, newIncident: boolean, subject: string, reference?: number | null, policeRef?: string | null, dayTime: string, description: string, createdByUser: boolean, totalValue: number, totalRecoveredValue: number, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, status?: { __typename?: 'IncidentStatus', id: string, name: string, tooltip?: string | null } | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }>, images: Array<{ __typename?: 'Image', low?: string | null, optimised?: string | null, id: string, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, primary?: boolean | null }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, reference?: number | null, gender?: Types.Gender | null, race?: Types.Race | null, age?: Types.Age | null, build?: Types.Build | null, dateOfBirth?: Date | null, knownFor: Array<string>, wanted: boolean, images: Array<{ __typename?: 'Image', id: string, low?: string | null, optimised?: string | null, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null }> }>, business?: { __typename?: 'Business', id: string, name: string } | null, location?: { __typename?: 'Address', id: string, full: string } | null }> } | null };


export const ListIncidentsAllSchemesDocument = gql`
    query listIncidentsAllSchemes($where: IncidentWhereInput, $order: IncidentOrderByWithRelationInput, $take: Int, $skip: Int) {
  listIncidentsAllSchemes(where: $where, order: $order, take: $take, skip: $skip) {
    incidents {
      ...IncidentCard
    }
    total
  }
}
    ${IncidentCardFragmentDoc}`;
export function useListIncidentsAllSchemesQuery(baseOptions?: Apollo.QueryHookOptions<ListIncidentsAllSchemesQuery, ListIncidentsAllSchemesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListIncidentsAllSchemesQuery, ListIncidentsAllSchemesQueryVariables>(ListIncidentsAllSchemesDocument, options);
      }
export function useListIncidentsAllSchemesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListIncidentsAllSchemesQuery, ListIncidentsAllSchemesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListIncidentsAllSchemesQuery, ListIncidentsAllSchemesQueryVariables>(ListIncidentsAllSchemesDocument, options);
        }
export type ListIncidentsAllSchemesQueryHookResult = ReturnType<typeof useListIncidentsAllSchemesQuery>;
export type ListIncidentsAllSchemesLazyQueryHookResult = ReturnType<typeof useListIncidentsAllSchemesLazyQuery>;
export type ListIncidentsAllSchemesQueryResult = Apollo.QueryResult<ListIncidentsAllSchemesQuery, ListIncidentsAllSchemesQueryVariables>;