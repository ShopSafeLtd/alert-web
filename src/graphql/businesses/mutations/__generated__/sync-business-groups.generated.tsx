import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SyncBusinessGroupsMutationVariables = Types.Exact<{
  schemeId: Types.Scalars['String'];
  strategy: Types.GroupSyncStrategy;
  businessIds?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type SyncBusinessGroupsMutation = { __typename?: 'Mutation', syncBusinessGroups: { __typename?: 'SyncBusinessGroupsResult', success: boolean, message: string, businessesProcessed: number, totalIncidentsUpdated: number, totalOffendersUpdated: number, totalVehiclesUpdated: number, totalErrors: number } };


export const SyncBusinessGroupsDocument = gql`
    mutation SyncBusinessGroups($schemeId: String!, $strategy: GroupSyncStrategy!, $businessIds: [String!]) {
  syncBusinessGroups(
    data: {schemeId: $schemeId, strategy: $strategy, businessIds: $businessIds}
  ) {
    success
    message
    businessesProcessed
    totalIncidentsUpdated
    totalOffendersUpdated
    totalVehiclesUpdated
    totalErrors
  }
}
    `;
export type SyncBusinessGroupsMutationFn = Apollo.MutationFunction<SyncBusinessGroupsMutation, SyncBusinessGroupsMutationVariables>;
export function useSyncBusinessGroupsMutation(baseOptions?: Apollo.MutationHookOptions<SyncBusinessGroupsMutation, SyncBusinessGroupsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SyncBusinessGroupsMutation, SyncBusinessGroupsMutationVariables>(SyncBusinessGroupsDocument, options);
      }
export type SyncBusinessGroupsMutationHookResult = ReturnType<typeof useSyncBusinessGroupsMutation>;
export type SyncBusinessGroupsMutationResult = Apollo.MutationResult<SyncBusinessGroupsMutation>;
export type SyncBusinessGroupsMutationOptions = Apollo.BaseMutationOptions<SyncBusinessGroupsMutation, SyncBusinessGroupsMutationVariables>;