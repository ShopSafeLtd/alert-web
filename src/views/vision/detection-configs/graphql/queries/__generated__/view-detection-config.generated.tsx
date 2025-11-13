import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ViewDetectionConfigQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type ViewDetectionConfigQuery = { __typename?: 'Query', detectionConfig: { __typename?: 'DetectActionConfig', id: string, minimumConfidenceTrigger: Types.AiVisionMatchConfidence, minimumPriorityTrigger: Types.AiVisionMatchPriority, name: string, type: Types.DetectActionType, eventData: { __typename?: 'EventData', sendEmail?: { __typename?: 'SendEmailData', title: string, message: string } | null, sendNotification?: { __typename?: 'SendNotificationData', message: string, title: string } | null, sendSMS?: { __typename?: 'SendSMSData', message: string } | null, task?: { __typename?: 'TaskData', businesses?: Array<string> | null, dueDays: number, questionGroupId?: string | null, name: string, questions: Array<string> } | null }, camera: Array<{ __typename?: 'AIVisionCamera', id: string }>, usersToGet: { __typename?: 'UsersToGetFrom', users?: Array<string> | null, roles?: Array<string> | null, parentGroupsAdmin?: boolean | null, parentGroups?: boolean | null, groups?: Array<string> | null, createdBy?: boolean | null, adminGroups?: Array<string> | null } } };


export const ViewDetectionConfigDocument = gql`
    query ViewDetectionConfig($id: String!) {
  detectionConfig(where: {id: $id}) {
    eventData {
      sendEmail {
        title
        message
      }
      sendNotification {
        message
        title
      }
      sendSMS {
        message
      }
      task {
        businesses
        dueDays
        questionGroupId
        name
        questions
      }
    }
    camera {
      id
    }
    id
    minimumConfidenceTrigger
    minimumPriorityTrigger
    name
    type
    usersToGet {
      users
      roles
      parentGroupsAdmin
      parentGroups
      groups
      createdBy
      adminGroups
    }
  }
}
    `;
export function useViewDetectionConfigQuery(baseOptions: Apollo.QueryHookOptions<ViewDetectionConfigQuery, ViewDetectionConfigQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewDetectionConfigQuery, ViewDetectionConfigQueryVariables>(ViewDetectionConfigDocument, options);
      }
export function useViewDetectionConfigLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewDetectionConfigQuery, ViewDetectionConfigQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewDetectionConfigQuery, ViewDetectionConfigQueryVariables>(ViewDetectionConfigDocument, options);
        }
export type ViewDetectionConfigQueryHookResult = ReturnType<typeof useViewDetectionConfigQuery>;
export type ViewDetectionConfigLazyQueryHookResult = ReturnType<typeof useViewDetectionConfigLazyQuery>;
export type ViewDetectionConfigQueryResult = Apollo.QueryResult<ViewDetectionConfigQuery, ViewDetectionConfigQueryVariables>;