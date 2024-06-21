import type * as Types from '../types.js';

import { gql } from '@apollo/client';
import { UpdatesFragmentDoc } from '../fragments/updates.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateUpdateOnIncidentMutationVariables = Types.Exact<{
  incident: Types.UniqueId;
  data: Types.CreateUpdateData;
}>;

export type CreateUpdateOnIncidentMutation = {
  __typename?: 'Mutation';
  createUpdateOnIncident: {
    __typename?: 'Update';
    id: string;
    text?: string | null;
    type: Types.UpdateType;
    createdAt: Date;
    images: Array<{
      __typename?: 'Image';
      id: string;
      url?: string | null;
      optimised?: string | null;
      position: Types.ImagePosition;
      rotation: number;
      card?: string | null;
    }>;
    linkedCrimeGroups: Array<{
      __typename?: 'CrimeGroup';
      id: string;
      reference?: number | null;
      alias?: string | null;
      totalIncidents: number;
      totalOffenders: number;
      totalRecoveredValue: number;
      totalTheftSuccess: number;
      totalValue: number;
    }>;
    linkedVehicles: Array<{
      __typename?: 'Vehicle';
      id: string;
      reference?: number | null;
      colour?: string | null;
      model?: string | null;
      make?: string | null;
      registration?: string | null;
      images: Array<{
        __typename?: 'Image';
        id: string;
        url?: string | null;
        optimised?: string | null;
        position: Types.ImagePosition;
        rotation: number;
        card?: string | null;
      }>;
    }>;
    linkedIncidents: Array<{
      __typename?: 'Incident';
      id: string;
      reference?: number | null;
      dayTime: string;
      policeRef?: string | null;
      subject?: string | null;
      images: Array<{
        __typename?: 'Image';
        id: string;
        url?: string | null;
        optimised?: string | null;
        position: Types.ImagePosition;
        rotation: number;
        card?: string | null;
      }>;
    }>;
    linkedOffenders: Array<{
      __typename?: 'Offender';
      id: string;
      reference?: number | null;
      name?: string | null;
      gender?: Types.Gender | null;
      build?: Types.Build | null;
      height?: Types.Height | null;
      race?: Types.Race | null;
      age?: Types.Age | null;
      dateOfBirth?: Date | null;
      images: Array<{
        __typename?: 'Image';
        id: string;
        url?: string | null;
        optimised?: string | null;
        position: Types.ImagePosition;
        rotation: number;
        card?: string | null;
      }>;
    }>;
    linkedArticles: Array<{
      __typename?: 'Article';
      id: string;
      title: string;
      updatedAt: Date;
      watermarkImage: boolean;
      previewImage?: string | null;
      previewText?: string | null;
      priority: Types.ArticlePriority;
      images: Array<{
        __typename?: 'Image';
        id: string;
        url?: string | null;
        optimised?: string | null;
        card?: string | null;
        position: Types.ImagePosition;
        rotation: number;
      }>;
      createdBy: { __typename?: 'User'; fullName: string; id: string };
    }>;
    createdBy: {
      __typename?: 'User';
      origName: string;
      id: string;
      fullName: string;
      businesses: Array<{
        __typename?: 'Business';
        id: string;
        name: string;
        fullName: string;
      }>;
    };
    replies: Array<{
      __typename?: 'Update';
      id: string;
      text?: string | null;
      type: Types.UpdateType;
      createdAt: Date;
      images: Array<{
        __typename?: 'Image';
        id: string;
        url?: string | null;
        optimised?: string | null;
        position: Types.ImagePosition;
        rotation: number;
        card?: string | null;
      }>;
      linkedCrimeGroups: Array<{
        __typename?: 'CrimeGroup';
        id: string;
        reference?: number | null;
        alias?: string | null;
        totalIncidents: number;
        totalOffenders: number;
        totalRecoveredValue: number;
        totalTheftSuccess: number;
        totalValue: number;
      }>;
      linkedVehicles: Array<{
        __typename?: 'Vehicle';
        id: string;
        reference?: number | null;
        colour?: string | null;
        model?: string | null;
        make?: string | null;
        registration?: string | null;
        images: Array<{
          __typename?: 'Image';
          id: string;
          url?: string | null;
          optimised?: string | null;
          position: Types.ImagePosition;
          rotation: number;
          card?: string | null;
        }>;
      }>;
      linkedIncidents: Array<{
        __typename?: 'Incident';
        id: string;
        reference?: number | null;
        dayTime: string;
        policeRef?: string | null;
        subject?: string | null;
        location?: {
          __typename?: 'Address';
          id: string;
          full: string;
          geoLat?: number | null;
          geoLng?: number | null;
        } | null;
        images: Array<{
          __typename?: 'Image';
          id: string;
          url?: string | null;
          optimised?: string | null;
          position: Types.ImagePosition;
          rotation: number;
          card?: string | null;
        }>;
      }>;
      linkedOffenders: Array<{
        __typename?: 'Offender';
        id: string;
        reference?: number | null;
        name?: string | null;
        gender?: Types.Gender | null;
        build?: Types.Build | null;
        height?: Types.Height | null;
        race?: Types.Race | null;
        age?: Types.Age | null;
        dateOfBirth?: Date | null;
        images: Array<{
          __typename?: 'Image';
          id: string;
          url?: string | null;
          optimised?: string | null;
          position: Types.ImagePosition;
          rotation: number;
          card?: string | null;
        }>;
      }>;
      linkedArticles: Array<{
        __typename?: 'Article';
        id: string;
        title: string;
        updatedAt: Date;
        watermarkImage: boolean;
        previewImage?: string | null;
        previewText?: string | null;
        priority: Types.ArticlePriority;
        images: Array<{
          __typename?: 'Image';
          id: string;
          url?: string | null;
          optimised?: string | null;
          card?: string | null;
          position: Types.ImagePosition;
          rotation: number;
        }>;
        createdBy: { __typename?: 'User'; fullName: string; id: string };
      }>;
      createdBy: {
        __typename?: 'User';
        origName: string;
        id: string;
        fullName: string;
        businesses: Array<{
          __typename?: 'Business';
          id: string;
          name: string;
          fullName: string;
        }>;
      };
    }>;
  };
};

export const CreateUpdateOnIncidentDocument = gql`
  mutation CreateUpdateOnIncident(
    $incident: UniqueId!
    $data: CreateUpdateData!
  ) {
    createUpdateOnIncident(incident: $incident, data: $data) {
      ...Updates
    }
  }
  ${UpdatesFragmentDoc}
`;
export type CreateUpdateOnIncidentMutationFn = Apollo.MutationFunction<
  CreateUpdateOnIncidentMutation,
  CreateUpdateOnIncidentMutationVariables
>;
export function useCreateUpdateOnIncidentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUpdateOnIncidentMutation,
    CreateUpdateOnIncidentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateUpdateOnIncidentMutation,
    CreateUpdateOnIncidentMutationVariables
  >(CreateUpdateOnIncidentDocument, options);
}
export type CreateUpdateOnIncidentMutationHookResult = ReturnType<
  typeof useCreateUpdateOnIncidentMutation
>;
export type CreateUpdateOnIncidentMutationResult =
  Apollo.MutationResult<CreateUpdateOnIncidentMutation>;
export type CreateUpdateOnIncidentMutationOptions = Apollo.BaseMutationOptions<
  CreateUpdateOnIncidentMutation,
  CreateUpdateOnIncidentMutationVariables
>;
