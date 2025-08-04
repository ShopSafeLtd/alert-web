import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { VehiclesFragmentDoc } from '../../../fragments/__generated__/vehicles.generated';
import { ImagesFragmentDoc } from '../../../fragments/__generated__/images.generated';
import { OffendersFragmentDoc } from '../../../fragments/__generated__/offenders.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateInvestigationMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.UpdateInvestigationInput;
}>;


export type UpdateInvestigationMutation = { __typename?: 'Mutation', updateInvestigation?: { __typename?: 'Investigation', id?: string | null, description?: string | null, name?: string | null, groups: Array<{ __typename?: 'Group', id: string, name: string }>, createdBy: { __typename?: 'User', id?: string | null, fullName: string }, vehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> }>, offenders: Array<{ __typename?: 'Offender', id?: string | null, reference?: number | null, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified?: boolean | null, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, optimised?: string | null, optimisedPersisted?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, isFace?: boolean | null }> }>, incidents: Array<{ __typename?: 'Incident', id?: string | null, policeRef?: string | null, dayTime: string, reference?: number | null, subject?: string | null, date?: Date | null, value?: number | null, recoveredValue?: number | null, createdBy: { __typename?: 'User', organisation?: string | null }, location?: { __typename?: 'Address', id: string } | null, vehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }> }>, offenders: Array<{ __typename?: 'Offender', id?: string | null, reference?: number | null, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified?: boolean | null, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }> }> }>, crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, alias?: string | null, reference?: number | null, vehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, registration?: string | null, make?: string | null, model?: string | null, colour?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }> }>, offenders: Array<{ __typename?: 'Offender', id?: string | null, name?: string | null, alias: Array<string>, reference?: number | null, dateOfBirth?: Date | null, age?: Types.Age | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, hair?: string | null, peculiarities?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }> }> }>, flows?: Array<{ __typename?: 'Flow', name?: string | null, description?: string | null, edges?: Array<{ __typename?: 'FlowEdge', id?: string | null, type?: string | null, markerEnd?: { [key: string]: any } | null, source?: string | null, sourceHandle?: string | null, target?: string | null, targetHandle?: string | null }> | null, nodes?: Array<{ __typename?: 'FlowNode', id?: string | null, type?: string | null, data?: { [key: string]: any } | null, height?: number | null, width?: number | null, position?: { __typename?: 'XY', x: number, y: number } | null, positionAbsolute?: { __typename?: 'XY', x: number, y: number } | null }> | null }> | null } | null };


export const UpdateInvestigationDocument = gql`
    mutation UpdateInvestigation($where: UniqueId!, $data: UpdateInvestigationInput!) {
  updateInvestigation(where: $where, data: $data) {
    id
    description
    name
    groups {
      id
      name
    }
    createdBy {
      id
      fullName
    }
    vehicles {
      ...Vehicles
      images {
        ...Images
      }
    }
    offenders {
      ...Offenders
      images {
        id
        optimised
        optimisedPersisted
        position
        rotation
        isFace
      }
    }
    incidents {
      id
      policeRef
      dayTime
      createdBy {
        organisation
      }
      reference
      subject
      date
      location {
        id
      }
      value
      recoveredValue
      vehicles {
        ...Vehicles
        images {
          id
          optimised
          position
          rotation
        }
      }
      offenders {
        ...Offenders
        images {
          id
          optimised
          position
          rotation
        }
      }
    }
    crimeGroups {
      id
      alias
      reference
      vehicles {
        id
        reference
        registration
        make
        model
        images {
          id
          optimised
          position
          rotation
        }
        colour
      }
      offenders {
        id
        name
        alias
        reference
        dateOfBirth
        age
        gender
        build
        height
        race
        hair
        peculiarities
        images {
          id
          optimised
          position
          rotation
        }
      }
    }
    flows {
      name
      description
      edges {
        id
        type
        markerEnd
        source
        sourceHandle
        target
        targetHandle
      }
      nodes {
        id
        type
        data
        height
        width
        position {
          x
          y
        }
        positionAbsolute {
          x
          y
        }
      }
    }
  }
}
    ${VehiclesFragmentDoc}
${ImagesFragmentDoc}
${OffendersFragmentDoc}`;
export type UpdateInvestigationMutationFn = Apollo.MutationFunction<UpdateInvestigationMutation, UpdateInvestigationMutationVariables>;
export function useUpdateInvestigationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInvestigationMutation, UpdateInvestigationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInvestigationMutation, UpdateInvestigationMutationVariables>(UpdateInvestigationDocument, options);
      }
export type UpdateInvestigationMutationHookResult = ReturnType<typeof useUpdateInvestigationMutation>;
export type UpdateInvestigationMutationResult = Apollo.MutationResult<UpdateInvestigationMutation>;
export type UpdateInvestigationMutationOptions = Apollo.BaseMutationOptions<UpdateInvestigationMutation, UpdateInvestigationMutationVariables>;