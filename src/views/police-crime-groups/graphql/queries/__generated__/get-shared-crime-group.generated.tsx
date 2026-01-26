import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import { PoliceCrimeGroupCardFragmentDoc } from '../../../../../components/police-crime-groups/PoliceCrimeGroupCard/__generated__/PoliceCrimeGroupCard.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSharedCrimeGroupQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetSharedCrimeGroupQuery = { __typename?: 'Query', sharedCrimeGroup: { __typename?: 'SharedCrimeGroup', aiActivityTrendsSnapshot?: { [key: string]: any } | null, aiGroupSophisticationSnapshot?: { [key: string]: any } | null, aiMemberRiskAggregationSnapshot?: { [key: string]: any } | null, id: string, crimeGroupId: string, createdAt: Date, updatedAt: Date, policePriorityScore?: number | null, aiQualityScore?: number | null, aiSophisticationLevel?: Types.AiSophisticationLevel | null, aiSummary?: string | null, aiActivityPatterns?: string | null, aiOrganizationStructure?: string | null, aiKeyObservations: Array<string>, crimeGroup: { __typename?: 'CrimeGroup', id: string, ref: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalValue: number, totalRecoveredValue: number, totalTheftSuccess: number, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, reference?: number | null, totalIncidents: number, totalValue: number, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, primary?: boolean | null }> }>, vehicles: Array<{ __typename?: 'Vehicle', id: string, registration?: string | null, reference?: number | null, make?: string | null, model?: string | null, colour?: string | null, totalIncidents: number }>, incidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dateAgo: number, reportedBusinessName: string, totalValue: number }> }, schemes: Array<{ __typename?: 'Scheme', id: string, name: string, hubForce?: Types.PoliceForce | null }> } };


export const GetSharedCrimeGroupDocument = gql`
    query GetSharedCrimeGroup($id: String!) {
  sharedCrimeGroup(where: {id: $id}) {
    ...PoliceCrimeGroupCard
    aiActivityTrendsSnapshot
    aiGroupSophisticationSnapshot
    aiMemberRiskAggregationSnapshot
    crimeGroup {
      id
      ref
      reference
      alias
      totalIncidents
      totalOffenders
      totalValue
      totalRecoveredValue
      totalTheftSuccess
      offenders {
        id
        name
        reference
        totalIncidents
        totalValue
        images {
          id
          optimised
          primary
        }
      }
      vehicles {
        id
        registration
        reference
        make
        model
        colour
        totalIncidents
      }
      incidents {
        id
        reference
        dateAgo
        reportedBusinessName
        totalValue
      }
    }
  }
}
    ${PoliceCrimeGroupCardFragmentDoc}`;
export function useGetSharedCrimeGroupQuery(baseOptions: Apollo.QueryHookOptions<GetSharedCrimeGroupQuery, GetSharedCrimeGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSharedCrimeGroupQuery, GetSharedCrimeGroupQueryVariables>(GetSharedCrimeGroupDocument, options);
      }
export function useGetSharedCrimeGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSharedCrimeGroupQuery, GetSharedCrimeGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSharedCrimeGroupQuery, GetSharedCrimeGroupQueryVariables>(GetSharedCrimeGroupDocument, options);
        }
export type GetSharedCrimeGroupQueryHookResult = ReturnType<typeof useGetSharedCrimeGroupQuery>;
export type GetSharedCrimeGroupLazyQueryHookResult = ReturnType<typeof useGetSharedCrimeGroupLazyQuery>;
export type GetSharedCrimeGroupQueryResult = Apollo.QueryResult<GetSharedCrimeGroupQuery, GetSharedCrimeGroupQueryVariables>;