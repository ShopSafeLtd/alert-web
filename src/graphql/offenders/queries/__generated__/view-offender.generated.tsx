import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { IncidentsDetailedFragmentDoc } from '../../../fragments/__generated__/incidents-detailed.generated';
import { ImagesFragmentDoc } from '../../../fragments/__generated__/images.generated';
import { LocationsFragmentDoc } from '../../../fragments/__generated__/location.generated';
import { CreatedByFragmentDoc } from '../../../fragments/__generated__/createdBy.generated';
import { CrimeGroupsFragmentDoc } from '../../../fragments/__generated__/crime-groups.generated';
import { VehiclesFragmentDoc } from '../../../fragments/__generated__/vehicles.generated';
import { DocumentsFragmentDoc } from '../../../fragments/__generated__/document.generated';
import { InvestigationsFragmentDoc } from '../../../fragments/__generated__/investigations.generated';
import { UpdatesFragmentDoc } from '../../../fragments/__generated__/updates.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ViewOffenderQueryVariables = Types.Exact<{
  where: Types.OffenderWhereUniqueInput;
  banWhere?: Types.InputMaybe<Types.BanWhereInput>;
}>;


export type ViewOffenderQuery = { __typename?: 'Query', offender: { __typename?: 'Offender', id?: string | null, alias: Array<string>, aiImprovements?: string | null, aiKeyObservations?: Array<string> | null, aiMO?: string | null, aiMethods?: Array<string> | null, aiQualityScore?: number | null, aiImpactScore?: number | null, aiSummary?: string | null, createdAt?: Date | null, sourceDetails?: string | null, updatedAt?: Date | null, justification?: string | null, infoSource?: string | null, origOffenderId?: string | null, knownFor: Array<string>, targetedGoods: Array<string>, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, dateSource?: string | null, hair?: string | null, gender?: Types.Gender | null, comment?: string | null, name?: string | null, reference?: number | null, race?: Types.Race | null, peculiarities?: string | null, subscribed?: boolean | null, approved?: boolean | null, active?: boolean | null, idVerified?: boolean | null, idSource?: Types.IdSource | null, totalImages: number, totalIncidents: number, scheme: { __typename?: 'Scheme', mg11Available?: boolean | null }, incidents: Array<{ __typename?: 'Incident', id?: string | null, reference?: number | null, dayTime: string, policeRef?: string | null, customerRef?: string | null, subject?: string | null, description?: string | null, priority: Types.IncidentPriority, approved?: boolean | null, totalValue?: number | null, totalRecoveredValue?: number | null, location?: { __typename?: 'Address', id: string, full?: string | null, geoLat?: number | null, geoLng?: number | null } | null, business?: { __typename?: 'Business', id: string, name?: string | null } | null, crimeTypes?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> | null, groups: Array<{ __typename?: 'Group', id: string, name: string }>, offenders: Array<{ __typename?: 'Offender', id?: string | null, name?: string | null, reference?: number | null, images: Array<{ __typename?: 'Image', id?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }> }>, createdBy: { __typename?: 'User', id?: string | null, fullName: string } }>, customGalleries: Array<{ __typename?: 'CustomGallery', id?: string | null, name?: string | null }>, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, primary?: boolean | null, policeImage?: boolean | null, card?: string | null, faces: Array<{ __typename?: 'RekFace', id?: string | null, confidence?: number | null, boundingHeight?: number | null, boundingLeft?: number | null, boundingTop?: number | null, boundingWidth?: number | null, offender?: { __typename?: 'Offender', id?: string | null, name?: string | null } | null, rekMatchedSearches?: Array<{ __typename?: 'RekMatch', id?: string | null }> | null }> }>, addresses: Array<{ __typename?: 'Address', id: string, building?: string | null, street?: string | null, townCity?: string | null, county?: string | null, postcode?: string | null, geoLat?: number | null, geoLng?: number | null, full?: string | null, alias?: string | null }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }>, bans: Array<{ __typename?: 'Ban', id: string, title?: string | null, location: string, description?: string | null, startDate?: Date | null, endDate?: Date | null, type?: Types.BanType | null, months: number, fineValue: number, duration?: number | null }>, createdBy: { __typename?: 'User', id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null }> }, crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents?: number | null, totalOffenders: number, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null }>, vehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null }>, evidence: Array<{ __typename?: 'Document', id?: string | null, name?: string | null, url?: string | null, fileType?: Types.FileType | null, tags: Array<{ __typename?: 'Tag', name?: string | null }> }>, investigations: Array<{ __typename?: 'Investigation', id?: string | null, name?: string | null, description?: string | null, status?: Types.InvestigationStatus | null, createdAt?: Date | null, closedAt?: Date | null, reference?: number | null }>, updates: Array<{ __typename?: 'Update', id?: string | null, text?: string | null, type?: Types.UpdateType | null, createdAt?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents?: number | null, totalOffenders: number, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id?: string | null, reference?: number | null, dayTime: string, policeRef?: string | null, subject?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id?: string | null, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt?: Date | null, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, createdBy: { __typename?: 'User', fullName: string, id?: string | null } }>, createdBy: { __typename?: 'User', origName?: string | null, id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null, fullName?: string | null }> }, replies: Array<{ __typename?: 'Update', id?: string | null, text?: string | null, type?: Types.UpdateType | null, createdAt?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents?: number | null, totalOffenders: number, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id?: string | null, reference?: number | null, dayTime: string, policeRef?: string | null, subject?: string | null, location?: { __typename?: 'Address', id: string, full?: string | null, geoLat?: number | null, geoLng?: number | null } | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id?: string | null, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt?: Date | null, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, createdBy: { __typename?: 'User', fullName: string, id?: string | null } }>, createdBy: { __typename?: 'User', origName?: string | null, id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null, fullName?: string | null }> } }> }>, searchedMatches: Array<{ __typename?: 'RekMatch', id?: string | null }> } };


export const ViewOffenderDocument = gql`
    query ViewOffender($where: OffenderWhereUniqueInput!, $banWhere: BanWhereInput) {
  offender(where: $where) {
    id
    alias
    aiImprovements
    aiKeyObservations
    aiMO
    aiMethods
    aiQualityScore
    aiImpactScore
    aiSummary
    createdAt
    scheme {
      mg11Available
    }
    sourceDetails
    updatedAt
    justification
    infoSource
    origOffenderId
    knownFor
    targetedGoods
    age
    build
    height
    dateOfBirth
    dateSource
    hair
    gender
    comment
    name
    reference
    race
    peculiarities
    subscribed
    approved
    active
    idVerified
    idSource
    totalImages
    totalIncidents
    incidents {
      ...IncidentsDetailed
    }
    customGalleries {
      id
      name
    }
    images {
      ...Images
      faces {
        id
        confidence
        boundingHeight
        boundingLeft
        boundingTop
        boundingWidth
        offender {
          id
          name
        }
        rekMatchedSearches {
          id
        }
      }
    }
    addresses {
      ...Locations
    }
    groups {
      id
      name
    }
    tags {
      id
      name
    }
    bans(orderBy: {startDate: desc}, where: $banWhere) {
      id
      title
      location
      description
      startDate
      endDate
      type
      months
      fineValue
      duration
    }
    createdBy {
      ...CreatedBy
    }
    images {
      ...Images
    }
    crimeGroups {
      ...CrimeGroups
    }
    vehicles {
      ...Vehicles
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
    searchedMatches {
      id
    }
    updates(orderBy: {createdAt: desc}) {
      ...Updates
    }
  }
}
    ${IncidentsDetailedFragmentDoc}
${ImagesFragmentDoc}
${LocationsFragmentDoc}
${CreatedByFragmentDoc}
${CrimeGroupsFragmentDoc}
${VehiclesFragmentDoc}
${DocumentsFragmentDoc}
${InvestigationsFragmentDoc}
${UpdatesFragmentDoc}`;
export function useViewOffenderQuery(baseOptions: Apollo.QueryHookOptions<ViewOffenderQuery, ViewOffenderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewOffenderQuery, ViewOffenderQueryVariables>(ViewOffenderDocument, options);
      }
export function useViewOffenderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewOffenderQuery, ViewOffenderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewOffenderQuery, ViewOffenderQueryVariables>(ViewOffenderDocument, options);
        }
export type ViewOffenderQueryHookResult = ReturnType<typeof useViewOffenderQuery>;
export type ViewOffenderLazyQueryHookResult = ReturnType<typeof useViewOffenderLazyQuery>;
export type ViewOffenderQueryResult = Apollo.QueryResult<ViewOffenderQuery, ViewOffenderQueryVariables>;