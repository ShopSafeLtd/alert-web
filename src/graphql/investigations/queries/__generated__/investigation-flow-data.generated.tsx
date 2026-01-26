import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InvestigationFlowDataQueryVariables = Types.Exact<{
  where: Types.InvestigationWhereUniqueInput;
}>;


export type InvestigationFlowDataQuery = { __typename?: 'Query', investigation: { __typename?: 'Investigation', id: string, flows: Array<{ __typename?: 'Flow', id: string, name: string, description?: string | null, updatedAt: Date, nodes: Array<{ __typename?: 'FlowNode', id: string, type: string, data: { [key: string]: any }, height: number, width: number, style: { __typename?: 'Style', height: number, width: number }, position: { __typename?: 'XY', x: number, y: number }, positionAbsolute: { __typename?: 'XY', x: number, y: number } }>, edges: Array<{ __typename?: 'FlowEdge', id: string, type: string, markerEnd: { [key: string]: any }, source: string, sourceHandle?: string | null, target: string, targetHandle?: string | null }> }> } };


export const InvestigationFlowDataDocument = gql`
    query InvestigationFlowData($where: InvestigationWhereUniqueInput!) {
  investigation(where: $where) {
    id
    flows {
      id
      name
      description
      updatedAt
      nodes {
        id
        type
        data
        height
        width
        style {
          height
          width
        }
        position {
          x
          y
        }
        positionAbsolute {
          x
          y
        }
      }
      edges {
        id
        type
        markerEnd
        source
        sourceHandle
        target
        targetHandle
      }
    }
  }
}
    `;
export function useInvestigationFlowDataQuery(baseOptions: Apollo.QueryHookOptions<InvestigationFlowDataQuery, InvestigationFlowDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvestigationFlowDataQuery, InvestigationFlowDataQueryVariables>(InvestigationFlowDataDocument, options);
      }
export function useInvestigationFlowDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvestigationFlowDataQuery, InvestigationFlowDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvestigationFlowDataQuery, InvestigationFlowDataQueryVariables>(InvestigationFlowDataDocument, options);
        }
export type InvestigationFlowDataQueryHookResult = ReturnType<typeof useInvestigationFlowDataQuery>;
export type InvestigationFlowDataLazyQueryHookResult = ReturnType<typeof useInvestigationFlowDataLazyQuery>;
export type InvestigationFlowDataQueryResult = Apollo.QueryResult<InvestigationFlowDataQuery, InvestigationFlowDataQueryVariables>;