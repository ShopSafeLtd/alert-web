import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GenerateOffenderBulletinMutationVariables = Types.Exact<{
  offenderId: Types.Scalars['String'];
  context?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GenerateOffenderBulletinMutation = { __typename?: 'Mutation', generateOffenderBulletin: { __typename?: 'OffenderBulletin', title: string, htmlBody: string } };


export const GenerateOffenderBulletinDocument = gql`
    mutation GenerateOffenderBulletin($offenderId: String!, $context: String) {
  generateOffenderBulletin(
    where: {id: $offenderId}
    data: {context: $context}
  ) {
    title
    htmlBody
  }
}
    `;
export type GenerateOffenderBulletinMutationFn = Apollo.MutationFunction<GenerateOffenderBulletinMutation, GenerateOffenderBulletinMutationVariables>;
export function useGenerateOffenderBulletinMutation(baseOptions?: Apollo.MutationHookOptions<GenerateOffenderBulletinMutation, GenerateOffenderBulletinMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateOffenderBulletinMutation, GenerateOffenderBulletinMutationVariables>(GenerateOffenderBulletinDocument, options);
      }
export type GenerateOffenderBulletinMutationHookResult = ReturnType<typeof useGenerateOffenderBulletinMutation>;
export type GenerateOffenderBulletinMutationResult = Apollo.MutationResult<GenerateOffenderBulletinMutation>;
export type GenerateOffenderBulletinMutationOptions = Apollo.BaseMutationOptions<GenerateOffenderBulletinMutation, GenerateOffenderBulletinMutationVariables>;
