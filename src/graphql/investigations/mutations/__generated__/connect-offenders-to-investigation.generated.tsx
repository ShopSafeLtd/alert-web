import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import { OffendersFragmentDoc } from '../../../fragments/__generated__/offenders.generated';
import { ImagesFragmentDoc } from '../../../fragments/__generated__/images.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConnectOffendersToInvestigationMutationVariables = Types.Exact<{
  data: Types.ConnectOffendersToInvestigationInput;
}>;


export type ConnectOffendersToInvestigationMutation = { __typename?: 'Mutation', connectOffendersToInvestigation: { __typename?: 'Investigation', id: string, totalOffenders: number, offenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified: boolean, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', isFace?: boolean | null, id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, rotation: number, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> }> } };


export const ConnectOffendersToInvestigationDocument = gql`
    mutation ConnectOffendersToInvestigation($data: ConnectOffendersToInvestigationInput!) {
  connectOffendersToInvestigation(data: $data) {
    id
    offenders {
      ...Offenders
      images {
        ...Images
        isFace
      }
    }
    totalOffenders
  }
}
    ${OffendersFragmentDoc}
${ImagesFragmentDoc}`;
export type ConnectOffendersToInvestigationMutationFn = Apollo.MutationFunction<ConnectOffendersToInvestigationMutation, ConnectOffendersToInvestigationMutationVariables>;
export function useConnectOffendersToInvestigationMutation(baseOptions?: Apollo.MutationHookOptions<ConnectOffendersToInvestigationMutation, ConnectOffendersToInvestigationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConnectOffendersToInvestigationMutation, ConnectOffendersToInvestigationMutationVariables>(ConnectOffendersToInvestigationDocument, options);
      }
export type ConnectOffendersToInvestigationMutationHookResult = ReturnType<typeof useConnectOffendersToInvestigationMutation>;
export type ConnectOffendersToInvestigationMutationResult = Apollo.MutationResult<ConnectOffendersToInvestigationMutation>;
export type ConnectOffendersToInvestigationMutationOptions = Apollo.BaseMutationOptions<ConnectOffendersToInvestigationMutation, ConnectOffendersToInvestigationMutationVariables>;