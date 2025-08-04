import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AiVisionMatchesQueryVariables = Types.Exact<{
  where: Types.AiVisionMatchWhereInput;
  orderBy?: Types.InputMaybe<Array<Types.AiVisionMatchOrderByInput> | Types.AiVisionMatchOrderByInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type AiVisionMatchesQuery = { __typename?: 'Query', aiVisionMatches?: { __typename?: 'QueryAiVisionMatchesConnection', edges: Array<{ __typename?: 'QueryAiVisionMatchesConnectionEdge', node: { __typename?: 'AIVisionMatch', id: string, priority: Types.AiVisionMatchPriority, confidenceRating: Types.AiVisionMatchConfidence, confidence: number, createdAt?: Date | null, business: { __typename?: 'Business', id: string, name?: string | null }, camera: { __typename?: 'AIVisionCamera', id: string, serialNumber?: string | null }, matchedOffender: { __typename?: 'Offender', id?: string | null, reference?: number | null, name?: string | null, aiSummary?: string | null, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }>, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null }> }, faceImage: { __typename?: 'Image', id?: string | null, url?: string | null }, stillImage: { __typename?: 'Image', id?: string | null, url?: string | null } } }> } | null };


export const AiVisionMatchesDocument = gql`
    query AiVisionMatches($where: AiVisionMatchWhereInput!, $orderBy: [AiVisionMatchOrderByInput!], $take: Int) {
  aiVisionMatches(where: $where, orderBy: $orderBy, take: $take) {
    edges {
      node {
        id
        priority
        business {
          id
          name
        }
        camera {
          id
          serialNumber
        }
        matchedOffender {
          id
          reference
          name
          aiSummary
          tags {
            id
            name
          }
          images(take: 1) {
            id
            url
          }
        }
        faceImage {
          id
          url
        }
        stillImage {
          id
          url
        }
        confidenceRating
        confidence
        priority
        createdAt
      }
    }
  }
}
    `;
export function useAiVisionMatchesQuery(baseOptions: Apollo.QueryHookOptions<AiVisionMatchesQuery, AiVisionMatchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AiVisionMatchesQuery, AiVisionMatchesQueryVariables>(AiVisionMatchesDocument, options);
      }
export function useAiVisionMatchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AiVisionMatchesQuery, AiVisionMatchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AiVisionMatchesQuery, AiVisionMatchesQueryVariables>(AiVisionMatchesDocument, options);
        }
export type AiVisionMatchesQueryHookResult = ReturnType<typeof useAiVisionMatchesQuery>;
export type AiVisionMatchesLazyQueryHookResult = ReturnType<typeof useAiVisionMatchesLazyQuery>;
export type AiVisionMatchesQueryResult = Apollo.QueryResult<AiVisionMatchesQuery, AiVisionMatchesQueryVariables>;