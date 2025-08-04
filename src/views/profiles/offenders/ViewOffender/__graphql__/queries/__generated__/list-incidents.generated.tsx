import type * as Types from '../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { IncidentsDetailedFragmentDoc } from '../../../../../../../graphql/fragments/__generated__/incidents-detailed.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OffenderIncidentsQueryVariables = Types.Exact<{
  where: Types.OffenderWhereUniqueInput;
  orderBy?: Types.InputMaybe<Array<Types.IncidentOrderByWithRelationInput> | Types.IncidentOrderByWithRelationInput>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type OffenderIncidentsQuery = { __typename?: 'Query', offender: { __typename?: 'Offender', incidents: Array<{ __typename?: 'Incident', id?: string | null, reference?: number | null, dayTime: string, policeRef?: string | null, customerRef?: string | null, subject?: string | null, description?: string | null, priority: Types.IncidentPriority, approved?: boolean | null, totalValue?: number | null, totalRecoveredValue?: number | null, location?: { __typename?: 'Address', id: string, full?: string | null, geoLat?: number | null, geoLng?: number | null } | null, business?: { __typename?: 'Business', id: string, name?: string | null } | null, crimeTypes?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> | null, groups: Array<{ __typename?: 'Group', id: string, name: string }>, offenders: Array<{ __typename?: 'Offender', id?: string | null, name?: string | null, reference?: number | null, images: Array<{ __typename?: 'Image', id?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }> }>, createdBy: { __typename?: 'User', id?: string | null, fullName: string } }> } };


export const OffenderIncidentsDocument = gql`
    query OffenderIncidents($where: OffenderWhereUniqueInput!, $orderBy: [IncidentOrderByWithRelationInput!], $skip: Int, $take: Int) {
  offender(where: $where) {
    incidents(orderBy: $orderBy, skip: $skip, take: $take) {
      ...IncidentsDetailed
    }
  }
}
    ${IncidentsDetailedFragmentDoc}`;
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