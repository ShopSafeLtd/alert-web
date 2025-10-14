import type * as Types from '../../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GenerateIncidentTypeDescriptionMutationVariables = Types.Exact<{
  incidentTypeName: Types.Scalars['String'];
  userDescription?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GenerateIncidentTypeDescriptionMutation = { __typename?: 'Mutation', generateIncidentTypeDescription: string };


export const GenerateIncidentTypeDescriptionDocument = gql`
    mutation GenerateIncidentTypeDescription($incidentTypeName: String!, $userDescription: String) {
  generateIncidentTypeDescription(
    incidentTypeName: $incidentTypeName
    userDescription: $userDescription
  )
}
    `;
export type GenerateIncidentTypeDescriptionMutationFn = Apollo.MutationFunction<GenerateIncidentTypeDescriptionMutation, GenerateIncidentTypeDescriptionMutationVariables>;
export function useGenerateIncidentTypeDescriptionMutation(baseOptions?: Apollo.MutationHookOptions<GenerateIncidentTypeDescriptionMutation, GenerateIncidentTypeDescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateIncidentTypeDescriptionMutation, GenerateIncidentTypeDescriptionMutationVariables>(GenerateIncidentTypeDescriptionDocument, options);
      }
export type GenerateIncidentTypeDescriptionMutationHookResult = ReturnType<typeof useGenerateIncidentTypeDescriptionMutation>;
export type GenerateIncidentTypeDescriptionMutationResult = Apollo.MutationResult<GenerateIncidentTypeDescriptionMutation>;
export type GenerateIncidentTypeDescriptionMutationOptions = Apollo.BaseMutationOptions<GenerateIncidentTypeDescriptionMutation, GenerateIncidentTypeDescriptionMutationVariables>;