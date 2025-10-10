import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IncidentAiDetailsQueryVariables = Types.Exact<{
  where: Types.IncidentWhereUniqueInput;
}>;


export type IncidentAiDetailsQuery = { __typename?: 'Query', incident: { __typename?: 'Incident', id: string, aiImprovements?: string | null, aiKeyObservations?: Array<string> | null, aiMO?: string | null, aiMethod?: string | null, aiQualityScore?: number | null, aiSummary?: string | null, aiBehavioralAnalysis?: { __typename?: 'AiBehavioralAnalysis', id: string, interventionResponse?: string | null, learningBehavior?: string | null, planningEvidence?: string | null, riskTolerance?: Types.AiRiskTolerance | null, sophisticationLevel?: Types.AiSophisticationLevel | null, stressResponse?: string | null, tacticsUsed: Array<string> } | null, aiImpactAssessment?: { __typename?: 'AiImpactAssessment', id: string, category?: Types.AiImpactAssessmentCategory | null, financialImpact?: Types.AiImpactAssessmentFinancialImpact | null, justification: string, keyFactors: Array<string>, overallScore: number, securityResourceImpact?: Types.AiImpactAssessmentSecurityResourceImpact | null } | null, aiInvestigationLeads?: { __typename?: 'AiInvestigationLeads', id: string, keyCCTVTimestamps: Array<string>, suggestedActions: Array<string> } | null, aiNetworkAnalysis?: { __typename?: 'AiNetworkAnalysis', id: string, communicationObserved: Array<string>, groupDynamics: string, offenderRoles?: { [key: string]: any } | null } | null, aiPatternRecognition?: { __typename?: 'AiPatternRecognition', groupBehaviorPattern: string, knownMOMatch: string, id: string, timePatternClassification: string } | null, aiPreventionInsights?: { __typename?: 'AiPreventionInsights', id: string, recommendations: Array<string>, staffingImplications: string, vulnerabilitiesExploited: Array<string> } | null, aiRiskAssessment?: { __typename?: 'AiRiskAssessment', confrontationResponse?: string | null, escalationPotential?: string | null, id: string, reoffendingProbability?: number | null, staffSafetyRisk?: Types.AiRiskAssessmentSafetyRisk | null, threatLevel?: Types.AiRiskAssessmentThreatLevel | null, violencePotential?: Types.AiRiskAssessmentThreatLevel | null } | null } };


export const IncidentAiDetailsDocument = gql`
    query IncidentAiDetails($where: IncidentWhereUniqueInput!) {
  incident(where: $where) {
    id
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
    aiImpactAssessment {
      id
      category
      financialImpact
      justification
      keyFactors
      overallScore
      securityResourceImpact
    }
    aiImprovements
    aiInvestigationLeads {
      id
      keyCCTVTimestamps
      suggestedActions
    }
    aiKeyObservations
    aiMO
    aiMethod
    aiNetworkAnalysis {
      id
      communicationObserved
      groupDynamics
      offenderRoles
    }
    aiPatternRecognition {
      groupBehaviorPattern
      knownMOMatch
      id
      timePatternClassification
    }
    aiPreventionInsights {
      id
      recommendations
      staffingImplications
      vulnerabilitiesExploited
    }
    aiQualityScore
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
  }
}
    `;
export function useIncidentAiDetailsQuery(baseOptions: Apollo.QueryHookOptions<IncidentAiDetailsQuery, IncidentAiDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IncidentAiDetailsQuery, IncidentAiDetailsQueryVariables>(IncidentAiDetailsDocument, options);
      }
export function useIncidentAiDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IncidentAiDetailsQuery, IncidentAiDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IncidentAiDetailsQuery, IncidentAiDetailsQueryVariables>(IncidentAiDetailsDocument, options);
        }
export type IncidentAiDetailsQueryHookResult = ReturnType<typeof useIncidentAiDetailsQuery>;
export type IncidentAiDetailsLazyQueryHookResult = ReturnType<typeof useIncidentAiDetailsLazyQuery>;
export type IncidentAiDetailsQueryResult = Apollo.QueryResult<IncidentAiDetailsQuery, IncidentAiDetailsQueryVariables>;