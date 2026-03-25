import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import { VehiclesFragmentDoc } from '../../../fragments/__generated__/vehicles.generated';
import { ImagesFragmentDoc } from '../../../fragments/__generated__/images.generated';
import { DocumentsFragmentDoc } from '../../../fragments/__generated__/document.generated';
import { InvestigationsFragmentDoc } from '../../../fragments/__generated__/investigations.generated';
import { UpdatesFragmentDoc } from '../../../fragments/__generated__/updates.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CrimeGroupQueryVariables = Types.Exact<{
  where: Types.CrimeGroupWhereUniqueInput;
}>;


export type CrimeGroupQuery = { __typename?: 'Query', crimeGroup: { __typename?: 'CrimeGroup', id: string, reference?: number | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number, subscribed: boolean, alias?: string | null, groups: Array<{ __typename?: 'Group', id: string }>, activities: Array<{ __typename?: 'Todo', id: string, description?: string | null, dueDate?: Date | null, completed?: boolean | null, completedDate?: Date | null, reference?: number | null, createdAt: Date, name?: string | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }>, completedBy?: { __typename?: 'User', id: string, fullName: string } | null }>, incidents: Array<{ __typename?: 'Incident', id: string }>, vehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, rotation: number, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> }>, evidence: Array<{ __typename?: 'Document', id: string, name: string, url: string, fileType?: Types.FileType | null, tags: Array<{ __typename?: 'Tag', name: string }> }>, investigations: Array<{ __typename?: 'Investigation', id: string, name: string, description?: string | null, status: Types.InvestigationStatus, type: Types.InvestigationType, priority: Types.InvestigationPriority, createdAt: Date, closedAt?: Date | null, reference?: number | null }>, updates: Array<{ __typename?: 'Update', id: string, text?: string | null, type: Types.UpdateType, createdAt: Date, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, subject: string, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }>, createdBy: { __typename?: 'User', origName: string, id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> }, replies: Array<{ __typename?: 'Update', id: string, text?: string | null, type: Types.UpdateType, createdAt: Date, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, subject: string, location?: { __typename?: 'Address', id: string, full: string, geoLat?: number | null, geoLng?: number | null } | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }>, createdBy: { __typename?: 'User', origName: string, id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> } }> }> } };


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
      id
    }
    vehicles {
      ...Vehicles
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
    ${VehiclesFragmentDoc}
${ImagesFragmentDoc}
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