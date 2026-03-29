import type * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOffenderBansMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  bans?: Types.InputMaybe<Types.BansOnOffenderUpdate>;
}>;


export type UpdateOffenderBansMutation = { __typename?: 'Mutation', updateOffender: { __typename?: 'Offender', id: string, bans: Array<{ __typename?: 'Ban', id: string, startDate: Date, endDate: Date, location: string, description?: string | null, checkId?: string | null, companyRef?: string | null, title?: string | null, months: number, fineValue: number, type?: Types.BanType | null, duration: number, createdAt: Date, createdBy: { __typename?: 'User', id: string, fullName: string } }> } };


export const UpdateOffenderBansDocument = gql`
    mutation UpdateOffenderBans($id: String!, $bans: BansOnOffenderUpdate) {
  updateOffender(where: {id: $id}, data: {bans: $bans}) {
    id
    bans(orderBy: {endDate: asc}) {
      id
      startDate
      endDate
      location
      description
      checkId
      companyRef
      title
      months
      fineValue
      type
      duration
      createdAt
      createdBy {
        id
        fullName
      }
    }
  }
}
    `;
export type UpdateOffenderBansMutationFn = Apollo.MutationFunction<UpdateOffenderBansMutation, UpdateOffenderBansMutationVariables>;
export function useUpdateOffenderBansMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOffenderBansMutation, UpdateOffenderBansMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOffenderBansMutation, UpdateOffenderBansMutationVariables>(UpdateOffenderBansDocument, options);
      }
export type UpdateOffenderBansMutationHookResult = ReturnType<typeof useUpdateOffenderBansMutation>;
export type UpdateOffenderBansMutationResult = Apollo.MutationResult<UpdateOffenderBansMutation>;
export type UpdateOffenderBansMutationOptions = Apollo.BaseMutationOptions<UpdateOffenderBansMutation, UpdateOffenderBansMutationVariables>;