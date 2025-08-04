import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AiVisionEventsQueryVariables = Types.Exact<{
  where: Types.AiVisionEventWhereInput;
  orderBy?: Types.InputMaybe<Array<Types.AiVisionEventOrderByInput> | Types.AiVisionEventOrderByInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type AiVisionEventsQuery = { __typename?: 'Query', aiVisionEvents?: { __typename?: 'QueryAiVisionEventsConnection', edges: Array<{ __typename?: 'QueryAiVisionEventsConnectionEdge', node: { __typename?: 'AIVisionEvent', id: string, createdAt?: Date | null, matchFound?: boolean | null, type?: Types.AiVisionEventType | null, business: { __typename?: 'Business', id: string, name?: string | null }, camera: { __typename?: 'AIVisionCamera', id: string, serialNumber?: string | null } } }> } | null };


export const AiVisionEventsDocument = gql`
    query aiVisionEvents($where: AiVisionEventWhereInput!, $orderBy: [AiVisionEventOrderByInput!], $take: Int) {
  aiVisionEvents(where: $where, orderBy: $orderBy, take: $take) {
    edges {
      node {
        id
        business {
          id
          name
        }
        camera {
          id
          serialNumber
        }
        createdAt
        matchFound
        type
      }
    }
  }
}
    `;
export function useAiVisionEventsQuery(baseOptions: Apollo.QueryHookOptions<AiVisionEventsQuery, AiVisionEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AiVisionEventsQuery, AiVisionEventsQueryVariables>(AiVisionEventsDocument, options);
      }
export function useAiVisionEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AiVisionEventsQuery, AiVisionEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AiVisionEventsQuery, AiVisionEventsQueryVariables>(AiVisionEventsDocument, options);
        }
export type AiVisionEventsQueryHookResult = ReturnType<typeof useAiVisionEventsQuery>;
export type AiVisionEventsLazyQueryHookResult = ReturnType<typeof useAiVisionEventsLazyQuery>;
export type AiVisionEventsQueryResult = Apollo.QueryResult<AiVisionEventsQuery, AiVisionEventsQueryVariables>;