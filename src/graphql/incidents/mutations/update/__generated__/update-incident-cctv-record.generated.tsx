import type * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateIncidentCctvRecordMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  cctvRecords?: Types.InputMaybe<Types.CctvRecordUpdateManyWithoutIncidentInput>;
}>;


export type UpdateIncidentCctvRecordMutation = { __typename?: 'Mutation', updateIncident: { __typename?: 'Incident', id: string, cctvRecords: Array<{ __typename?: 'CctvRecord', cameraNumber: string, endTime: Date, id: string, showFace: boolean, showIncident: boolean, startTime: Date, description?: string | null }> } };


export const UpdateIncidentCctvRecordDocument = gql`
    mutation UpdateIncidentCctvRecord($id: String!, $cctvRecords: CctvRecordUpdateManyWithoutIncidentInput) {
  updateIncident(where: {id: $id}, data: {cctvRecords: $cctvRecords}) {
    id
    cctvRecords {
      cameraNumber
      endTime
      id
      showFace
      showIncident
      startTime
      description
    }
  }
}
    `;
export type UpdateIncidentCctvRecordMutationFn = Apollo.MutationFunction<UpdateIncidentCctvRecordMutation, UpdateIncidentCctvRecordMutationVariables>;
export function useUpdateIncidentCctvRecordMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIncidentCctvRecordMutation, UpdateIncidentCctvRecordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIncidentCctvRecordMutation, UpdateIncidentCctvRecordMutationVariables>(UpdateIncidentCctvRecordDocument, options);
      }
export type UpdateIncidentCctvRecordMutationHookResult = ReturnType<typeof useUpdateIncidentCctvRecordMutation>;
export type UpdateIncidentCctvRecordMutationResult = Apollo.MutationResult<UpdateIncidentCctvRecordMutation>;
export type UpdateIncidentCctvRecordMutationOptions = Apollo.BaseMutationOptions<UpdateIncidentCctvRecordMutation, UpdateIncidentCctvRecordMutationVariables>;