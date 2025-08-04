import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateFlowMutationVariables = Types.Exact<{
  data: Types.UpdateFlowData;
  where: Types.UniqueId;
}>;


export type UpdateFlowMutation = { __typename?: 'Mutation', updateFlow?: { __typename?: 'Flow', id?: string | null, name?: string | null, description?: string | null, edges?: Array<{ __typename?: 'FlowEdge', id?: string | null, type?: string | null, markerEnd?: { [key: string]: any } | null, source?: string | null, sourceHandle?: string | null, target?: string | null, targetHandle?: string | null }> | null, nodes?: Array<{ __typename?: 'FlowNode', id?: string | null, type?: string | null, data?: { [key: string]: any } | null, height?: number | null, width?: number | null, style?: { __typename?: 'Style', height: number, width: number } | null, position?: { __typename?: 'XY', x: number, y: number } | null, positionAbsolute?: { __typename?: 'XY', x: number, y: number } | null }> | null } | null };


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