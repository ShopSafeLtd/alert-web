import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TrainingVideoAuditQueryVariables = Types.Exact<{
  trainingVideoId: Types.Scalars['String'];
}>;


export type TrainingVideoAuditQuery = { __typename?: 'Query', trainingVideoAudit: { __typename?: 'TrainingVideoAudit', trainingVideoId: string, trainingVideoTitle: string, totalUsers: number, completedCount: number, notCompletedCount: number, completionRate: number, users: Array<{ __typename?: 'TrainingVideoUserCompletion', userId: string, userFullName: string, userEmail?: string | null, completedAt?: Date | null, hasCompleted: boolean }> } };


export const TrainingVideoAuditDocument = gql`
    query TrainingVideoAudit($trainingVideoId: String!) {
  trainingVideoAudit(trainingVideoId: $trainingVideoId) {
    trainingVideoId
    trainingVideoTitle
    totalUsers
    completedCount
    notCompletedCount
    completionRate
    users {
      userId
      userFullName
      userEmail
      completedAt
      hasCompleted
    }
  }
}
    `;
export function useTrainingVideoAuditQuery(baseOptions: Apollo.QueryHookOptions<TrainingVideoAuditQuery, TrainingVideoAuditQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TrainingVideoAuditQuery, TrainingVideoAuditQueryVariables>(TrainingVideoAuditDocument, options);
      }
export function useTrainingVideoAuditLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TrainingVideoAuditQuery, TrainingVideoAuditQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TrainingVideoAuditQuery, TrainingVideoAuditQueryVariables>(TrainingVideoAuditDocument, options);
        }
export type TrainingVideoAuditQueryHookResult = ReturnType<typeof useTrainingVideoAuditQuery>;
export type TrainingVideoAuditLazyQueryHookResult = ReturnType<typeof useTrainingVideoAuditLazyQuery>;
export type TrainingVideoAuditQueryResult = Apollo.QueryResult<TrainingVideoAuditQuery, TrainingVideoAuditQueryVariables>;