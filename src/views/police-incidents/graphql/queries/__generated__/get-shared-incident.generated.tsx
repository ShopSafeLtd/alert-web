import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import { PoliceIncidentCardFragmentDoc } from '../../../../../components/police-incidents/PoliceIncidentCard/__generated__/PoliceIncidentCard.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSharedIncidentQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetSharedIncidentQuery = { __typename?: 'Query', sharedIncident: { __typename?: 'SharedIncident', aiBehavioralAnalysisSnapshot?: { [key: string]: any } | null, aiImpactAssessmentSnapshot?: { [key: string]: any } | null, aiInvestigationLeadsSnapshot?: { [key: string]: any } | null, aiNetworkAnalysisSnapshot?: { [key: string]: any } | null, aiPatternRecognitionSnapshot?: { [key: string]: any } | null, aiPreventionInsightsSnapshot?: { [key: string]: any } | null, aiRiskAssessmentSnapshot?: { [key: string]: any } | null, aiImprovements?: string | null, id: string, createdAt: Date, updatedAt: Date, policePriorityScore?: number | null, policeArea: Types.PoliceForce, aiQualityScore?: number | null, aiSummary?: string | null, aiKeyObservations: Array<string>, aiMethod?: string | null, aiMO?: string | null, tag: Array<{ __typename?: 'Tag', id: string, name: string }>, schemes: Array<{ __typename?: 'Scheme', id: string, name: string, hubForce?: Types.PoliceForce | null }>, incident: { __typename?: 'Incident', id: string, subject: string, description: string, reference?: number | null, policeRef?: string | null, customerRef?: string | null, priority: Types.IncidentPriority, totalImages: number, newIncident: boolean, dayTime: string, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, business?: { __typename?: 'Business', id: string, name: string } | null, location?: { __typename?: 'Address', id: string, full: string } | null, images: Array<{ __typename?: 'Image', id: string, low?: string | null, optimised?: string | null, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, primary?: boolean | null }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null }> }> } } };


export const GetSharedIncidentDocument = gql`
    query GetSharedIncident($id: String!) {
  sharedIncident(where: {id: $id}) {
    ...PoliceIncidentCard
    aiBehavioralAnalysisSnapshot
    aiImpactAssessmentSnapshot
    aiInvestigationLeadsSnapshot
    aiNetworkAnalysisSnapshot
    aiPatternRecognitionSnapshot
    aiPreventionInsightsSnapshot
    aiRiskAssessmentSnapshot
    aiImprovements
  }
}
    ${PoliceIncidentCardFragmentDoc}`;
export function useGetSharedIncidentQuery(baseOptions: Apollo.QueryHookOptions<GetSharedIncidentQuery, GetSharedIncidentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSharedIncidentQuery, GetSharedIncidentQueryVariables>(GetSharedIncidentDocument, options);
      }
export function useGetSharedIncidentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSharedIncidentQuery, GetSharedIncidentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSharedIncidentQuery, GetSharedIncidentQueryVariables>(GetSharedIncidentDocument, options);
        }
export type GetSharedIncidentQueryHookResult = ReturnType<typeof useGetSharedIncidentQuery>;
export type GetSharedIncidentLazyQueryHookResult = ReturnType<typeof useGetSharedIncidentLazyQuery>;
export type GetSharedIncidentQueryResult = Apollo.QueryResult<GetSharedIncidentQuery, GetSharedIncidentQueryVariables>;