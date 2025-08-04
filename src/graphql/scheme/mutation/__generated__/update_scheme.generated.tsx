import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateSchemeMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.SchemeUpdateInput;
}>;


export type UpdateSchemeMutation = { __typename?: 'Mutation', updateScheme?: { __typename?: 'Scheme', id?: string | null, name?: string | null, restrictIncidentAccess?: boolean | null, reportOnly?: boolean | null, autoApproveIncidents?: boolean | null, autoApproveOffenders?: boolean | null, defaultPublicOffenderDOB?: boolean | null, defaultIncidentEmail?: boolean | null, defaultIncidentPush?: boolean | null, defaultBulletinEmails?: boolean | null, defaultBulletinPush?: boolean | null, defaultSubscribedIncidentOnly?: boolean | null, defaultSubscribedOffenderOnly?: boolean | null, defaultMessagePush?: boolean | null, defaultOffenderEmail?: boolean | null, defaultOffenderPush?: boolean | null, autoPopulateDescription?: boolean | null, needJustification?: boolean | null, requireSiteNumberForUsers?: boolean | null, facialRecognition?: boolean | null, facialDetection?: boolean | null, facialRedaction?: boolean | null, incidentCustomQuestionRadio?: boolean | null, incidentTypeTooltip?: string | null, activityAssignToUser?: boolean | null, requireActivityAuthorised?: boolean | null, useBusinessGroupsOnIncident?: boolean | null, imagesRequiredOnOffenders?: boolean | null, incidentRetention?: number | null, offenderRetention?: number | null, policeReporting?: boolean | null, oneSelectedIncidentTypeOnly?: boolean | null, logo?: { __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, optimisedPersisted?: string | null } | null, darkLogo?: { __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, optimisedPersisted?: string | null } | null } | null };


export const UpdateSchemeDocument = gql`
    mutation updateScheme($where: UniqueId!, $data: SchemeUpdateInput!) {
  updateScheme(where: $where, data: $data) {
    id
    name
    restrictIncidentAccess
    reportOnly
    autoApproveIncidents
    autoApproveOffenders
    defaultPublicOffenderDOB
    defaultIncidentEmail
    defaultIncidentPush
    defaultBulletinEmails
    defaultBulletinPush
    defaultSubscribedIncidentOnly
    defaultSubscribedOffenderOnly
    defaultMessagePush
    defaultOffenderEmail
    defaultOffenderPush
    autoPopulateDescription
    needJustification
    requireSiteNumberForUsers
    facialRecognition
    facialDetection
    facialRedaction
    incidentCustomQuestionRadio
    incidentTypeTooltip
    activityAssignToUser
    requireActivityAuthorised
    useBusinessGroupsOnIncident
    imagesRequiredOnOffenders
    incidentRetention
    offenderRetention
    policeReporting
    oneSelectedIncidentTypeOnly
    logo {
      id
      url
      optimised
      optimisedPersisted
    }
    darkLogo {
      id
      url
      optimised
      optimisedPersisted
    }
  }
}
    `;
export type UpdateSchemeMutationFn = Apollo.MutationFunction<UpdateSchemeMutation, UpdateSchemeMutationVariables>;
export function useUpdateSchemeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSchemeMutation, UpdateSchemeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSchemeMutation, UpdateSchemeMutationVariables>(UpdateSchemeDocument, options);
      }
export type UpdateSchemeMutationHookResult = ReturnType<typeof useUpdateSchemeMutation>;
export type UpdateSchemeMutationResult = Apollo.MutationResult<UpdateSchemeMutation>;
export type UpdateSchemeMutationOptions = Apollo.BaseMutationOptions<UpdateSchemeMutation, UpdateSchemeMutationVariables>;