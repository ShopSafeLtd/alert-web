import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateSchemeMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.SchemeUpdateInput;
}>;


export type UpdateSchemeMutation = { __typename?: 'Mutation', updateScheme: { __typename?: 'Scheme', id: string, name: string, restrictIncidentAccess: boolean, reportOnly: boolean, autoApproveIncidents: boolean, autoApproveOffenders: boolean, defaultPublicOffenderDOB: boolean, defaultIncidentEmail: boolean, defaultIncidentPush: boolean, defaultBulletinEmails: boolean, defaultBulletinPush: boolean, defaultSubscribedIncidentOnly: boolean, defaultSubscribedOffenderOnly: boolean, defaultMessagePush: boolean, defaultOffenderEmail: boolean, defaultOffenderPush: boolean, autoPopulateDescription: boolean, needJustification: boolean, requireSiteNumberForUsers: boolean, facialRecognition: boolean, facialDetection: boolean, facialRedaction: boolean, incidentCustomQuestionRadio: boolean, incidentTypeTooltip?: string | null, activityAssignToUser: boolean, requireActivityAuthorised: boolean, useBusinessGroupsOnIncident: boolean, imagesRequiredOnOffenders: boolean, incidentRetention?: number | null, offenderRetention?: number | null, policeReporting: boolean, oneSelectedIncidentTypeOnly: boolean, logo?: { __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, optimisedPersisted?: string | null } | null, darkLogo?: { __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, optimisedPersisted?: string | null } | null } };


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