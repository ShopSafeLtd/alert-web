import type * as Types from '../../../../types.js';

import { gql } from '@apollo/client';
import { OffendersFragmentDoc } from '../../../../fragments/__generated__/offenders.generated';
import { ImagesFragmentDoc } from '../../../../fragments/__generated__/images.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateIncidentOffendersMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  offenders?: Types.InputMaybe<Types.OffenderUpdateManyWithoutIncidentsNested>;
}>;


export type UpdateIncidentOffendersMutation = { __typename?: 'Mutation', updateIncident: { __typename?: 'Incident', id: string, offenders: Array<{ __typename?: 'Offender', recycled: boolean, id: string, reference?: number | null, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified: boolean, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, primary?: boolean | null, policeImage?: boolean | null, card?: string | null, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null }> }> }> } };


export const UpdateIncidentOffendersDocument = gql`
    mutation UpdateIncidentOffenders($id: String!, $offenders: OffenderUpdateManyWithoutIncidentsNested) {
  updateIncident(where: {id: $id}, data: {offenders: $offenders}) {
    id
    offenders(where: {recycled: {equals: false}}) {
      ...Offenders
      images(take: 1) {
        ...Images
        offenders {
          id
          name
        }
      }
      recycled
    }
  }
}
    ${OffendersFragmentDoc}
${ImagesFragmentDoc}`;
export type UpdateIncidentOffendersMutationFn = Apollo.MutationFunction<UpdateIncidentOffendersMutation, UpdateIncidentOffendersMutationVariables>;
export function useUpdateIncidentOffendersMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIncidentOffendersMutation, UpdateIncidentOffendersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIncidentOffendersMutation, UpdateIncidentOffendersMutationVariables>(UpdateIncidentOffendersDocument, options);
      }
export type UpdateIncidentOffendersMutationHookResult = ReturnType<typeof useUpdateIncidentOffendersMutation>;
export type UpdateIncidentOffendersMutationResult = Apollo.MutationResult<UpdateIncidentOffendersMutation>;
export type UpdateIncidentOffendersMutationOptions = Apollo.BaseMutationOptions<UpdateIncidentOffendersMutation, UpdateIncidentOffendersMutationVariables>;