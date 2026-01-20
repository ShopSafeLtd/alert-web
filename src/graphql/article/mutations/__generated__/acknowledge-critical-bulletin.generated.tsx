import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AcknowledgeCriticalBulletinMutationVariables = Types.Exact<{
  articleId: Types.Scalars['String'];
}>;


export type AcknowledgeCriticalBulletinMutation = { __typename?: 'Mutation', acknowledgeCriticalBulletin: boolean };


export const AcknowledgeCriticalBulletinDocument = gql`
    mutation AcknowledgeCriticalBulletin($articleId: String!) {
  acknowledgeCriticalBulletin(articleId: $articleId)
}
    `;
export type AcknowledgeCriticalBulletinMutationFn = Apollo.MutationFunction<AcknowledgeCriticalBulletinMutation, AcknowledgeCriticalBulletinMutationVariables>;
export function useAcknowledgeCriticalBulletinMutation(baseOptions?: Apollo.MutationHookOptions<AcknowledgeCriticalBulletinMutation, AcknowledgeCriticalBulletinMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcknowledgeCriticalBulletinMutation, AcknowledgeCriticalBulletinMutationVariables>(AcknowledgeCriticalBulletinDocument, options);
      }
export type AcknowledgeCriticalBulletinMutationHookResult = ReturnType<typeof useAcknowledgeCriticalBulletinMutation>;
export type AcknowledgeCriticalBulletinMutationResult = Apollo.MutationResult<AcknowledgeCriticalBulletinMutation>;
export type AcknowledgeCriticalBulletinMutationOptions = Apollo.BaseMutationOptions<AcknowledgeCriticalBulletinMutation, AcknowledgeCriticalBulletinMutationVariables>;