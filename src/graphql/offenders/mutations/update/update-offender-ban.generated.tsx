import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOffenderBansMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  bans?: Types.InputMaybe<Types.BansOnOffenderUpdate>;
}>;

export type UpdateOffenderBansMutation = {
  __typename?: 'Mutation';
  updateOffender: {
    __typename?: 'Offender';
    id: string;
    bans: Array<{
      __typename?: 'Ban';
      id: string;
      startDate: Date;
      endDate: Date;
      location: string;
      description?: string | null;
      title?: string | null;
      months: number;
      fineValue: number;
      type?: Types.BanType | null;
    }>;
  };
};

export const UpdateOffenderBansDocument = gql`
  mutation UpdateOffenderBans($id: String!, $bans: BansOnOffenderUpdate) {
    updateOffender(where: { id: $id }, data: { bans: $bans }) {
      id
      bans(orderBy: { endDate: asc }) {
        id
        startDate
        endDate
        location
        description
        title
        months
        fineValue
        type
      }
    }
  }
`;
export type UpdateOffenderBansMutationFn = Apollo.MutationFunction<
  UpdateOffenderBansMutation,
  UpdateOffenderBansMutationVariables
>;
export function useUpdateOffenderBansMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateOffenderBansMutation,
    UpdateOffenderBansMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateOffenderBansMutation,
    UpdateOffenderBansMutationVariables
  >(UpdateOffenderBansDocument, options);
}
export type UpdateOffenderBansMutationHookResult = ReturnType<
  typeof useUpdateOffenderBansMutation
>;
export type UpdateOffenderBansMutationResult =
  Apollo.MutationResult<UpdateOffenderBansMutation>;
export type UpdateOffenderBansMutationOptions = Apollo.BaseMutationOptions<
  UpdateOffenderBansMutation,
  UpdateOffenderBansMutationVariables
>;
