import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateFlowMutationVariables = Types.Exact<{
  data: Types.UpdateFlowData;
  where: Types.UniqueId;
}>;


export type UpdateFlowMutation = { __typename?: 'Mutation', updateFlow: { __typename?: 'Flow', id: string, name: string, description?: string | null, edges: Array<{ __typename?: 'FlowEdge', id: string, type: string, markerEnd: { [key: string]: any }, source: string, sourceHandle?: string | null, target: string, targetHandle?: string | null }>, nodes: Array<{ __typename?: 'FlowNode', id: string, type: string, data: { [key: string]: any }, height: number, width: number, style: { __typename?: 'Style', height: number, width: number }, position: { __typename?: 'XY', x: number, y: number }, positionAbsolute: { __typename?: 'XY', x: number, y: number } }> } };


export const UpdateFlowDocument = gql`
    mutation UpdateFlow($data: UpdateFlowData!, $where: UniqueId!) {
  updateFlow(data: $data, where: $where) {
    id
    name
    description
    edges {
      id
      type
      markerEnd
      source
      sourceHandle
      target
      targetHandle
    }
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
  }
}
    `;
export type UpdateFlowMutationFn = Apollo.MutationFunction<UpdateFlowMutation, UpdateFlowMutationVariables>;
export function useUpdateFlowMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFlowMutation, UpdateFlowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFlowMutation, UpdateFlowMutationVariables>(UpdateFlowDocument, options);
      }
export type UpdateFlowMutationHookResult = ReturnType<typeof useUpdateFlowMutation>;
export type UpdateFlowMutationResult = Apollo.MutationResult<UpdateFlowMutation>;
export type UpdateFlowMutationOptions = Apollo.BaseMutationOptions<UpdateFlowMutation, UpdateFlowMutationVariables>;