import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AiVisionMatchDrawerQueryVariables = Types.Exact<{
  where: Types.UniqueId;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type AiVisionMatchDrawerQuery = { __typename?: 'Query', aiVisionMatch: { __typename?: 'AIVisionMatch', id: string, priority: Types.AiVisionMatchPriority, createdAt: Date, confidenceRating: Types.AiVisionMatchConfidence, confidence: number, faceImage: { __typename?: 'Image', id: string, url?: string | null }, stillImage: { __typename?: 'Image', id: string, url?: string | null }, business: { __typename?: 'Business', id: string, name: string, locations: Array<{ __typename?: 'Address', id: string, geoLat?: number | null, geoLng?: number | null }> }, camera: { __typename?: 'AIVisionCamera', id: string, make?: string | null, model?: string | null, serialNumber?: string | null, osVersion?: string | null }, matchedOffender: { __typename?: 'Offender', id: string, name?: string | null, reference?: number | null, knownFor: Array<string>, targetedGoods: Array<string>, aiSummary?: string | null, aiKeyObservations?: Array<string> | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null }>, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, aiImpactAssessment?: { __typename?: 'AiImpactAssessment', category?: Types.AiImpactAssessmentCategory | null, id: string } | null, aiRiskAssessment?: { __typename?: 'AiRiskAssessment', id: string, escalationPotential?: string | null, staffSafetyRisk?: Types.AiRiskAssessmentSafetyRisk | null, threatLevel?: Types.AiRiskAssessmentThreatLevel | null } | null, aiVisionDetections: Array<{ __typename?: 'AIVisionMatch', id: string, createdAt: Date, confidenceRating: Types.AiVisionMatchConfidence, business: { __typename?: 'Business', id: string, name: string } }>, incidents: Array<{ __typename?: 'Incident', reference?: number | null, id: string, subject: string, aiSummary?: string | null, createdAt: Date, business?: { __typename?: 'Business', id: string, name: string } | null }> } } };


export const AiVisionMatchDrawerDocument = gql`
    query AiVisionMatchDrawer($where: UniqueId!, $take: Int) {
  aiVisionMatch(where: $where) {
    id
    faceImage {
      id
      url
    }
    stillImage {
      id
      url
    }
    priority
    business {
      id
      name
      locations {
        id
        geoLat
        geoLng
      }
    }
    camera {
      id
      make
      model
      serialNumber
      osVersion
    }
    matchedOffender {
      id
      name
      reference
      images {
        id
        url
      }
      knownFor
      targetedGoods
      tags {
        id
        name
      }
      aiSummary
      aiKeyObservations
      aiImpactAssessment {
        category
        id
      }
      aiRiskAssessment {
        id
        escalationPotential
        staffSafetyRisk
        threatLevel
      }
      aiVisionDetections(take: $take) {
        id
        createdAt
        business {
          id
          name
        }
        confidenceRating
      }
      incidents(take: $take) {
        reference
        id
        subject
        aiSummary
        business {
          id
          name
        }
        createdAt
      }
    }
    createdAt
    confidenceRating
    confidence
  }
}
    `;
export function useAiVisionMatchDrawerQuery(baseOptions: Apollo.QueryHookOptions<AiVisionMatchDrawerQuery, AiVisionMatchDrawerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AiVisionMatchDrawerQuery, AiVisionMatchDrawerQueryVariables>(AiVisionMatchDrawerDocument, options);
      }
export function useAiVisionMatchDrawerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AiVisionMatchDrawerQuery, AiVisionMatchDrawerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AiVisionMatchDrawerQuery, AiVisionMatchDrawerQueryVariables>(AiVisionMatchDrawerDocument, options);
        }
export type AiVisionMatchDrawerQueryHookResult = ReturnType<typeof useAiVisionMatchDrawerQuery>;
export type AiVisionMatchDrawerLazyQueryHookResult = ReturnType<typeof useAiVisionMatchDrawerLazyQuery>;
export type AiVisionMatchDrawerQueryResult = Apollo.QueryResult<AiVisionMatchDrawerQuery, AiVisionMatchDrawerQueryVariables>;