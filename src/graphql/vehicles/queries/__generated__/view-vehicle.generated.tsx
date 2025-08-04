import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { ImagesFragmentDoc } from '../../../fragments/__generated__/images.generated';
import { CrimeGroupsFragmentDoc } from '../../../fragments/__generated__/crime-groups.generated';
import { OffendersFragmentDoc } from '../../../fragments/__generated__/offenders.generated';
import { IncidentsFragmentDoc } from '../../../fragments/__generated__/incidents.generated';
import { DocumentsFragmentDoc } from '../../../fragments/__generated__/document.generated';
import { InvestigationsFragmentDoc } from '../../../fragments/__generated__/investigations.generated';
import { UpdatesFragmentDoc } from '../../../fragments/__generated__/updates.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type VehicleQueryVariables = Types.Exact<{
  where: Types.VehicleWhereUniqueInput;
}>;


export type VehicleQuery = { __typename?: 'Query', vehicle: { __typename?: 'Vehicle', id?: string | null, make?: string | null, model?: string | null, registration?: string | null, totalOffenders: number, totalIncidents: number, totalCrimeGroups: number, reference?: number | null, subscribed?: boolean | null, totalImages?: number | null, updatedAt?: Date | null, colour?: string | null, customGalleries: Array<{ __typename?: 'CustomGallery', id?: string | null, name?: string | null }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }>, crimeGroup: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents?: number | null, totalOffenders: number, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null }>, offenders: Array<{ __typename?: 'Offender', id?: string | null, reference?: number | null, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified?: boolean | null, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', isFace?: boolean | null, id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> }>, incidents: Array<{ __typename?: 'Incident', id?: string | null, reference?: number | null, dayTime: string, policeRef?: string | null, subject?: string | null, totalValue?: number | null, totalRecoveredValue?: number | null, location?: { __typename?: 'Address', id: string, full?: string | null, geoLat?: number | null, geoLng?: number | null } | null }>, evidence: Array<{ __typename?: 'Document', id?: string | null, name?: string | null, url?: string | null, fileType?: Types.FileType | null, tags: Array<{ __typename?: 'Tag', name?: string | null }> }>, investigations: Array<{ __typename?: 'Investigation', id?: string | null, name?: string | null, description?: string | null, status?: Types.InvestigationStatus | null, createdAt?: Date | null, closedAt?: Date | null, reference?: number | null }>, updates: Array<{ __typename?: 'Update', id?: string | null, text?: string | null, type?: Types.UpdateType | null, createdAt?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents?: number | null, totalOffenders: number, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id?: string | null, reference?: number | null, dayTime: string, policeRef?: string | null, subject?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id?: string | null, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt?: Date | null, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, createdBy: { __typename?: 'User', fullName: string, id?: string | null } }>, createdBy: { __typename?: 'User', origName?: string | null, id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null, fullName?: string | null }> }, replies: Array<{ __typename?: 'Update', id?: string | null, text?: string | null, type?: Types.UpdateType | null, createdAt?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents?: number | null, totalOffenders: number, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id?: string | null, reference?: number | null, dayTime: string, policeRef?: string | null, subject?: string | null, location?: { __typename?: 'Address', id: string, full?: string | null, geoLat?: number | null, geoLng?: number | null } | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id?: string | null, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt?: Date | null, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, createdBy: { __typename?: 'User', fullName: string, id?: string | null } }>, createdBy: { __typename?: 'User', origName?: string | null, id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null, fullName?: string | null }> } }> }> } };


export const VehicleDocument = gql`
    query Vehicle($where: VehicleWhereUniqueInput!) {
  vehicle(where: $where) {
    id
    make
    model
    registration
    totalOffenders
    totalIncidents
    totalCrimeGroups
    reference
    subscribed
    totalImages
    customGalleries {
      id
      name
    }
    groups {
      id
      name
    }
    images {
      ...Images
    }
    updatedAt
    colour
    crimeGroup {
      ...CrimeGroups
    }
    offenders {
      ...Offenders
      images {
        ...Images
        isFace
      }
    }
    incidents {
      ...Incidents
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
    ${ImagesFragmentDoc}
${CrimeGroupsFragmentDoc}
${OffendersFragmentDoc}
${IncidentsFragmentDoc}
${DocumentsFragmentDoc}
${InvestigationsFragmentDoc}
${UpdatesFragmentDoc}`;
export function useVehicleQuery(baseOptions: Apollo.QueryHookOptions<VehicleQuery, VehicleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VehicleQuery, VehicleQueryVariables>(VehicleDocument, options);
      }
export function useVehicleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VehicleQuery, VehicleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VehicleQuery, VehicleQueryVariables>(VehicleDocument, options);
        }
export type VehicleQueryHookResult = ReturnType<typeof useVehicleQuery>;
export type VehicleLazyQueryHookResult = ReturnType<typeof useVehicleLazyQuery>;
export type VehicleQueryResult = Apollo.QueryResult<VehicleQuery, VehicleQueryVariables>;