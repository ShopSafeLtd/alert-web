import type * as Types from '../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OffenderIncidentsQueryVariables = Types.Exact<{
  where: Types.OffenderWhereUniqueInput;
  orderBy?: Types.InputMaybe<Array<Types.IncidentOrderByWithRelationInput> | Types.IncidentOrderByWithRelationInput>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type OffenderIncidentsQuery = { __typename?: 'Query', offender: { __typename?: 'Offender', incidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, subject: string, totalValue: number, totalRecoveredValue: number, location?: { __typename?: 'Address', id: string, full: string } | null, business?: { __typename?: 'Business', id: string, name: string } | null }> } };


export const OffenderIncidentsDocument = gql`
    query OffenderIncidents($where: OffenderWhereUniqueInput!, $orderBy: [IncidentOrderByWithRelationInput!], $skip: Int, $take: Int) {
  offender(where: $where) {
    incidents(orderBy: $orderBy, skip: $skip, take: $take) {
      id
      reference
      dayTime
      policeRef
      subject
      totalValue
      totalRecoveredValue
      location {
        id
        full
      }
      business {
        id
        name
      }
    }
  }
}
    `;
export function useOffenderIncidentsQuery(baseOptions: Apollo.QueryHookOptions<OffenderIncidentsQuery, OffenderIncidentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OffenderIncidentsQuery, OffenderIncidentsQueryVariables>(OffenderIncidentsDocument, options);
      }
export function useOffenderIncidentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OffenderIncidentsQuery, OffenderIncidentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OffenderIncidentsQuery, OffenderIncidentsQueryVariables>(OffenderIncidentsDocument, options);
        }
export type OffenderIncidentsQueryHookResult = ReturnType<typeof useOffenderIncidentsQuery>;
export type OffenderIncidentsLazyQueryHookResult = ReturnType<typeof useOffenderIncidentsLazyQuery>;
export type OffenderIncidentsQueryResult = Apollo.QueryResult<OffenderIncidentsQuery, OffenderIncidentsQueryVariables>;