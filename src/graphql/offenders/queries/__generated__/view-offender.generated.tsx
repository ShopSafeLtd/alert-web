import type * as Types from '../../../types';

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


export type ViewOffenderQuery = { __typename?: 'Query', offender: { __typename?: 'Offender', id: string, alias: Array<string>, aiImprovements?: string | null, aiKeyObservations?: Array<string> | null, aiMO?: string | null, aiMethods?: Array<string> | null, aiQualityScore?: number | null, aiImpactScore?: number | null, aiSummary?: string | null, createdAt: Date, sourceDetails?: string | null, updatedAt: Date, justification?: string | null, infoSource?: string | null, origOffenderId?: string | null, knownFor: Array<string>, targetedGoods: Array<string>, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, dateSource?: string | null, hair?: string | null, gender?: Types.Gender | null, comment?: string | null, name?: string | null, reference?: number | null, race?: Types.Race | null, peculiarities?: string | null, subscribed: boolean, approved?: boolean | null, active?: boolean | null, idVerified: boolean, idSource?: Types.IdSource | null, totalImages: number, totalIncidents: number, scheme: { __typename?: 'Scheme', mg11Available: boolean }, incidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, customerRef?: string | null, subject: string, description: string, priority: Types.IncidentPriority, approved?: boolean | null, totalValue: number, totalRecoveredValue: number, location?: { __typename?: 'Address', id: string, full: string, geoLat?: number | null, geoLng?: number | null } | null, business?: { __typename?: 'Business', id: string, name: string } | null, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, reference?: number | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, position: Types.ImagePosition, rotation: number }> }>, createdBy: { __typename?: 'User', id: string, fullName: string } }>, customGalleries: Array<{ __typename?: 'CustomGallery', id: string, name: string }>, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, rotation: number, primary?: boolean | null, policeImage?: boolean | null, card?: string | null, faces: Array<{ __typename?: 'RekFace', id: string, confidence?: number | null, boundingHeight?: number | null, boundingLeft?: number | null, boundingTop?: number | null, boundingWidth?: number | null, offender?: { __typename?: 'Offender', id: string, name?: string | null } | null, rekMatchedSearches: Array<{ __typename?: 'RekMatch', id: string }> }> }>, addresses: Array<{ __typename?: 'Address', id: string, building?: string | null, street?: string | null, townCity?: string | null, county?: string | null, postcode?: string | null, geoLat?: number | null, geoLng?: number | null, full: string, alias?: string | null }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, bans: Array<{ __typename?: 'Ban', id: string, title?: string | null, location: string, description?: string | null, startDate: Date, endDate: Date, type?: Types.BanType | null, months: number, fineValue: number, duration: number }>, createdBy: { __typename?: 'User', id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string }> }, crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, vehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null }>, evidence: Array<{ __typename?: 'Document', id: string, name: string, url: string, fileType?: Types.FileType | null, tags: Array<{ __typename?: 'Tag', name: string }> }>, investigations: Array<{ __typename?: 'Investigation', id: string, name: string, description?: string | null, status: Types.InvestigationStatus, createdAt: Date, closedAt?: Date | null, reference?: number | null }>, updates: Array<{ __typename?: 'Update', id: string, text?: string | null, type: Types.UpdateType, createdAt: Date, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, subject: string, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }>, createdBy: { __typename?: 'User', origName: string, id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> }, replies: Array<{ __typename?: 'Update', id: string, text?: string | null, type: Types.UpdateType, createdAt: Date, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, subject: string, location?: { __typename?: 'Address', id: string, full: string, geoLat?: number | null, geoLng?: number | null } | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }>, createdBy: { __typename?: 'User', origName: string, id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> } }> }>, searchedMatches: Array<{ __typename?: 'RekMatch', id: string }>, articles: Array<{ __typename?: 'Article', id: string, title: string, createdAt: Date, updatedAt: Date, priority: Types.ArticlePriority, status: Types.CompleteStatus, previewImage?: string | null, previewText?: string | null, createdBy: { __typename?: 'User', id: string, fullName: string } }> } };


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
    articles {
      id
      title
      createdAt
      updatedAt
      priority
      status
      previewImage
      previewText
      createdBy {
        id
        fullName
      }
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