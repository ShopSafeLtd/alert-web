import type * as Types from '../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OffenderAiDrawerQueryVariables = Types.Exact<{
  where: Types.OffenderWhereUniqueInput;
}>;


export type OffenderAiDrawerQuery = { __typename?: 'Query', offender: { __typename?: 'Offender', aiImpactScore?: number | null, aiImprovements?: string | null, aiKeyObservations?: Array<string> | null, aiMO?: string | null, aiMethods?: Array<string> | null, aiQualityScore?: number | null, aiSummary?: string | null, aiBehavioralAnalysis?: { __typename?: 'AiBehavioralAnalysis', id: string, interventionResponse?: string | null, learningBehavior?: string | null, planningEvidence?: string | null, riskTolerance?: Types.AiRiskTolerance | null, sophisticationLevel?: Types.AiSophisticationLevel | null, stressResponse?: string | null, tacticsUsed: Array<string> } | null, aiGeographicAnalysis?: { __typename?: 'AiGeographicAnalysis', id: string, geographicPattern: string, hotspotAnalysis: string, travelDistance: string } | null, aiIdentityLinkage?: { __typename?: 'AiIdentityLinkage', distinctiveMarkers: Array<string>, identityConfidence: number, potentialMatches: Array<string> } | null, aiImpactAssessment?: { __typename?: 'AiImpactAssessment', category?: Types.AiImpactAssessmentCategory | null, financialImpact?: Types.AiImpactAssessmentFinancialImpact | null, id: string, justification: string, keyFactors: Array<string>, overallScore: number, securityResourceImpact?: Types.AiImpactAssessmentSecurityResourceImpact | null } | null, aiQualityAssessment?: { __typename?: 'AiQualityAssessment', id: string, dataGaps: Array<string>, improvements: Array<string>, qualityScore: number } | null, aiRecommendedActions?: { __typename?: 'AiRecommendedActions', earlyWarningSignals: Array<string>, id: string, preventionTactics: Array<string>, priorityLevel?: Types.AiRecommendedActionsPriorityLevel | null, staffGuidance?: string | null } | null, aiRiskAssessment?: { __typename?: 'AiRiskAssessment', confrontationResponse?: string | null, escalationPotential?: string | null, id: string, reoffendingProbability?: number | null, staffSafetyRisk?: Types.AiRiskAssessmentSafetyRisk | null, threatLevel?: Types.AiRiskAssessmentThreatLevel | null, violencePotential?: Types.AiRiskAssessmentThreatLevel | null } | null, aiTargetAnalysis?: { __typename?: 'AiTargetAnalysis', id: string, storeVulnerabilities: Array<string>, targetPreference: string, valueRange: string } | null, aiTemporalAnalysis?: { __typename?: 'AiTemporalAnalysis', frequencyAnalysis: string, patternPrediction: string, timePatterns: string } | null } };


export const OffenderAiDrawerDocument = gql`
    query OffenderAiDrawer($where: OffenderWhereUniqueInput!) {
  offender(where: $where) {
    aiBehavioralAnalysis {
      id
      interventionResponse
      learningBehavior
      planningEvidence
      riskTolerance
      sophisticationLevel
      stressResponse
      tacticsUsed
    }
    aiGeographicAnalysis {
      id
      geographicPattern
      hotspotAnalysis
      travelDistance
    }
    aiIdentityLinkage {
      distinctiveMarkers
      identityConfidence
      potentialMatches
    }
    aiImpactAssessment {
      category
      financialImpact
      id
      justification
      keyFactors
      overallScore
      securityResourceImpact
    }
    aiImpactScore
    aiImprovements
    aiKeyObservations
    aiMO
    aiMethods
    aiQualityAssessment {
      id
      dataGaps
      improvements
      qualityScore
    }
    aiQualityScore
    aiRecommendedActions {
      earlyWarningSignals
      id
      preventionTactics
      priorityLevel
      staffGuidance
    }
    aiRiskAssessment {
      confrontationResponse
      escalationPotential
      id
      reoffendingProbability
      staffSafetyRisk
      threatLevel
      violencePotential
    }
    aiSummary
    aiTargetAnalysis {
      id
      storeVulnerabilities
      targetPreference
      valueRange
    }
    aiTemporalAnalysis {
      frequencyAnalysis
      patternPrediction
      timePatterns
    }
  }
}
    `;
export function useOffenderAiDrawerQuery(baseOptions: Apollo.QueryHookOptions<OffenderAiDrawerQuery, OffenderAiDrawerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OffenderAiDrawerQuery, OffenderAiDrawerQueryVariables>(OffenderAiDrawerDocument, options);
      }
export function useOffenderAiDrawerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OffenderAiDrawerQuery, OffenderAiDrawerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OffenderAiDrawerQuery, OffenderAiDrawerQueryVariables>(OffenderAiDrawerDocument, options);
        }
export type OffenderAiDrawerQueryHookResult = ReturnType<typeof useOffenderAiDrawerQuery>;
export type OffenderAiDrawerLazyQueryHookResult = ReturnType<typeof useOffenderAiDrawerLazyQuery>;
export type OffenderAiDrawerQueryResult = Apollo.QueryResult<OffenderAiDrawerQuery, OffenderAiDrawerQueryVariables>;