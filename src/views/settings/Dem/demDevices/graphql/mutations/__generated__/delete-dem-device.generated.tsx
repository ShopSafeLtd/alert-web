import type * as Types from '../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteDemDeviceMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteDemDeviceMutation = { __typename?: 'Mutation', deleteDemDevice: { __typename?: 'DemDevice', id: string, name: string } };


export const DeleteDemDeviceDocument = gql`
    mutation deleteDemDevice($id: String!) {
  deleteDemDevice(where: {id: $id}) {
    id
    name
  }
}
    `;
export type DeleteDemDeviceMutationFn = Apollo.MutationFunction<DeleteDemDeviceMutation, DeleteDemDeviceMutationVariables>;
export function useDeleteDemDeviceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDemDeviceMutation, DeleteDemDeviceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDemDeviceMutation, DeleteDemDeviceMutationVariables>(DeleteDemDeviceDocument, options);
      }
export type DeleteDemDeviceMutationHookResult = ReturnType<typeof useDeleteDemDeviceMutation>;
export type DeleteDemDeviceMutationResult = Apollo.MutationResult<DeleteDemDeviceMutation>;
export type DeleteDemDeviceMutationOptions = Apollo.BaseMutationOptions<DeleteDemDeviceMutation, DeleteDemDeviceMutationVariables>;