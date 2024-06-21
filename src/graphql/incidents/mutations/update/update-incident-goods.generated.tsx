import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateIncidentGoodsMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  incidentItems?: Types.InputMaybe<Types.IncidentItemUpdateManyWithoutIncidentInput>;
}>;

export type UpdateIncidentGoodsMutation = {
  __typename?: 'Mutation';
  updateIncident: {
    __typename?: 'Incident';
    id: string;
    incidentItems: Array<{
      __typename?: 'IncidentItem';
      id: string;
      name?: string | null;
      value?: number | null;
      recoveredValue?: number | null;
      goodsType: { __typename?: 'GoodsType'; id: string };
    }>;
  };
};

export const UpdateIncidentGoodsDocument = gql`
  mutation UpdateIncidentGoods(
    $id: String!
    $incidentItems: IncidentItemUpdateManyWithoutIncidentInput
  ) {
    updateIncident(
      where: { id: $id }
      data: { incidentItems: $incidentItems }
    ) {
      id
      incidentItems {
        id
        name
        value
        recoveredValue
        goodsType {
          id
        }
      }
    }
  }
`;
export type UpdateIncidentGoodsMutationFn = Apollo.MutationFunction<
  UpdateIncidentGoodsMutation,
  UpdateIncidentGoodsMutationVariables
>;
export function useUpdateIncidentGoodsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateIncidentGoodsMutation,
    UpdateIncidentGoodsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateIncidentGoodsMutation,
    UpdateIncidentGoodsMutationVariables
  >(UpdateIncidentGoodsDocument, options);
}
export type UpdateIncidentGoodsMutationHookResult = ReturnType<
  typeof useUpdateIncidentGoodsMutation
>;
export type UpdateIncidentGoodsMutationResult =
  Apollo.MutationResult<UpdateIncidentGoodsMutation>;
export type UpdateIncidentGoodsMutationOptions = Apollo.BaseMutationOptions<
  UpdateIncidentGoodsMutation,
  UpdateIncidentGoodsMutationVariables
>;
