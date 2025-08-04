import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { IncidentsDetailedFragmentDoc } from '../../../fragments/__generated__/incidents-detailed.generated';
import { VehiclesFragmentDoc } from '../../../fragments/__generated__/vehicles.generated';
import { ImagesFragmentDoc } from '../../../fragments/__generated__/images.generated';
import { OffendersFragmentDoc } from '../../../fragments/__generated__/offenders.generated';
import { DocumentsFragmentDoc } from '../../../fragments/__generated__/document.generated';
import { InvestigationsFragmentDoc } from '../../../fragments/__generated__/investigations.generated';
import { UpdatesFragmentDoc } from '../../../fragments/__generated__/updates.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CrimeGroupQueryVariables = Types.Exact<{
  where: Types.CrimeGroupWhereUniqueInput;
}>;


export type CrimeGroupQuery = { __typename?: 'Query', crimeGroup: { __typename?: 'CrimeGroup', id: string, reference?: number | null, totalIncidents?: number | null, totalOffenders: number, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null, subscribed?: boolean | null, alias?: string | null, groups: Array<{ __typename?: 'Group', id: string }>, activities?: Array<{ __typename?: 'Todo', id?: string | null, description?: string | null, dueDate?: Date | null, completed?: boolean | null, completedDate?: Date | null, reference?: number | null, createdAt?: Date | null, name?: string | null, assignedUsers: Array<{ __typename?: 'User', id?: string | null, fullName: string }>, completedBy?: { __typename?: 'User', id?: string | null, fullName: string } | null }> | null, incidents: Array<{ __typename?: 'Incident', id?: string | null, reference?: number | null, dayTime: string, policeRef?: string | null, customerRef?: string | null, subject?: string | null, description?: string | null, priority: Types.IncidentPriority, approved?: boolean | null, totalValue?: number | null, totalRecoveredValue?: number | null, location?: { __typename?: 'Address', id: string, full?: string | null, geoLat?: number | null, geoLng?: number | null } | null, business?: { __typename?: 'Business', id: string, name?: string | null } | null, crimeTypes?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> | null, groups: Array<{ __typename?: 'Group', id: string, name: string }>, offenders: Array<{ __typename?: 'Offender', id?: string | null, name?: string | null, reference?: number | null, images: Array<{ __typename?: 'Image', id?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }> }>, createdBy: { __typename?: 'User', id?: string | null, fullName: string } }>, vehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> }>, offenders: Array<{ __typename?: 'Offender', alias: Array<string>, totalIncidents: number, totalValue?: number | null, knownFor: Array<string>, targetedGoods: Array<string>, id?: string | null, reference?: number | null, name?: string | null, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified?: boolean | null, idSource?: Types.IdSource | null, justification?: string | null, infoSource?: string | null, latestIncident?: { __typename?: 'Incident', id?: string | null, date?: Date | null } | null, targetedBusinesses?: Array<{ __typename?: 'Business', id: string, name?: string | null }> | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> }>, evidence: Array<{ __typename?: 'Document', id?: string | null, name?: string | null, url?: string | null, fileType?: Types.FileType | null, tags: Array<{ __typename?: 'Tag', name?: string | null }> }>, investigations: Array<{ __typename?: 'Investigation', id?: string | null, name?: string | null, description?: string | null, status?: Types.InvestigationStatus | null, createdAt?: Date | null, closedAt?: Date | null, reference?: number | null }>, updates: Array<{ __typename?: 'Update', id?: string | null, text?: string | null, type?: Types.UpdateType | null, createdAt?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents?: number | null, totalOffenders: number, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id?: string | null, reference?: number | null, dayTime: string, policeRef?: string | null, subject?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id?: string | null, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt?: Date | null, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, createdBy: { __typename?: 'User', fullName: string, id?: string | null } }>, createdBy: { __typename?: 'User', origName?: string | null, id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null, fullName?: string | null }> }, replies: Array<{ __typename?: 'Update', id?: string | null, text?: string | null, type?: Types.UpdateType | null, createdAt?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents?: number | null, totalOffenders: number, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id?: string | null, reference?: number | null, dayTime: string, policeRef?: string | null, subject?: string | null, location?: { __typename?: 'Address', id: string, full?: string | null, geoLat?: number | null, geoLng?: number | null } | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id?: string | null, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt?: Date | null, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, createdBy: { __typename?: 'User', fullName: string, id?: string | null } }>, createdBy: { __typename?: 'User', origName?: string | null, id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null, fullName?: string | null }> } }> }> } };


export const CrimeGroupDocument = gql`
    query CrimeGroup($where: CrimeGroupWhereUniqueInput!) {
  crimeGroup(where: $where) {
    id
    reference
    totalIncidents
    totalOffenders
    totalRecoveredValue
    totalTheftSuccess
    totalValue
    subscribed
    alias
    groups {
      id
    }
    activities {
      id
      description
      dueDate
      completed
      completedDate
      reference
      createdAt
      assignedUsers {
        id
        fullName
      }
      completedBy {
        id
        fullName
      }
      name
    }
    incidents {
      ...IncidentsDetailed
    }
    vehicles {
      ...Vehicles
      images {
        ...Images
      }
    }
    offenders {
      ...Offenders
      alias
      totalIncidents
      totalValue
      latestIncident {
        id
        date
      }
      knownFor
      targetedBusinesses {
        id
        name
      }
      targetedGoods
      images {
        ...Images
      }
    }
    evidence {
      ...Documents
    }
    investigations {
      ...Investigations
    }
    updates(orderBy: {createdAt: desc}) {
      ...Updates
    }
  }
}
    ${IncidentsDetailedFragmentDoc}
${VehiclesFragmentDoc}
${ImagesFragmentDoc}
${OffendersFragmentDoc}
${DocumentsFragmentDoc}
${InvestigationsFragmentDoc}
${UpdatesFragmentDoc}`;
export function useCrimeGroupQuery(baseOptions: Apollo.QueryHookOptions<CrimeGroupQuery, CrimeGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CrimeGroupQuery, CrimeGroupQueryVariables>(CrimeGroupDocument, options);
      }
export function useCrimeGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CrimeGroupQuery, CrimeGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CrimeGroupQuery, CrimeGroupQueryVariables>(CrimeGroupDocument, options);
        }
export type CrimeGroupQueryHookResult = ReturnType<typeof useCrimeGroupQuery>;
export type CrimeGroupLazyQueryHookResult = ReturnType<typeof useCrimeGroupLazyQuery>;
export type CrimeGroupQueryResult = Apollo.QueryResult<CrimeGroupQuery, CrimeGroupQueryVariables>;