import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import { IncidentItemsFragmentDoc } from '../../fragments/incident-item.generated';
import { CreatedByFragmentDoc } from '../../fragments/createdBy.generated';
import { ImagesFragmentDoc } from '../../fragments/images.generated';
import { CrimeGroupsFragmentDoc } from '../../fragments/crime-groups.generated';
import { VehiclesFragmentDoc } from '../../fragments/vehicles.generated';
import { TodosFragmentDoc } from '../../fragments/todos.generated';
import { OffendersFragmentDoc } from '../../fragments/offenders.generated';
import { DocumentsFragmentDoc } from '../../fragments/document.generated';
import { InvestigationsFragmentDoc } from '../../fragments/investigations.generated';
import { UpdatesFragmentDoc } from '../../fragments/updates.generated';
import { LocationsFragmentDoc } from '../../fragments/location.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ViewIncidentQueryVariables = Types.Exact<{
  where: Types.IncidentWhereUniqueInput;
}>;


export type ViewIncidentQuery = { __typename?: 'Query', incident: { __typename?: 'Incident', id: string, subject?: string | null, totalImages: number, description: string, dayTime: string, date: Date, time: Date, reference?: number | null, ref: string, policeReported: boolean, policeRef?: string | null, policeNo?: string | null, policeInvolved: boolean, priority: Types.IncidentPriority, customerRef?: string | null, subscribed: boolean, totalValue: number, totalRecoveredValue: number, approved?: boolean | null, cctvRecords: Array<{ __typename?: 'CctvRecord', cameraNumber: string, endTime: Date, id: string, showFace: boolean, showIncident: boolean, startTime: Date }>, answers: Array<{ __typename?: 'Answer', id: string, answer: string, type: Types.AnswerType, tagQuestion?: { __typename?: 'TagQuestion', id: string, priority: number, question: { __typename?: 'Question', id: string, question: string } } | null }>, scheme: { __typename?: 'Scheme', mg11Available: boolean, restrictIncidentAccess: boolean }, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string, crimeType?: Types.CrimeType | null }>, involvedTags: Array<{ __typename?: 'Tag', id: string, name: string }>, impactTags: Array<{ __typename?: 'Tag', id: string, name: string }>, incidentItems: Array<{ __typename?: 'IncidentItem', id: string, name?: string | null, value?: number | null, recoveredValue?: number | null, sku?: string | null, quantity?: number | null, recoveredQuantity?: number | null, goodsType?: { __typename?: 'GoodsType', id: string } | null, stockItem?: { __typename?: 'StockItem', id: string } | null }>, business?: { __typename?: 'Business', id: string, name: string } | null, groups: Array<{ __typename?: 'Group', id: string, name: string }>, createdBy: { __typename?: 'User', id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string }> }, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }>, crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, vehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> }>, todos: Array<{ __typename?: 'Todo', id: string, name?: string | null, completedDate?: Date | null, createdAt: Date, completed?: boolean | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }> }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified: boolean, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', isFace?: boolean | null, id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> }>, evidence: Array<{ __typename?: 'Document', id: string, name: string, url: string, fileType?: Types.FileType | null, tags: Array<{ __typename?: 'Tag', name: string }> }>, investigations: Array<{ __typename?: 'Investigation', id: string, name: string, description?: string | null, status: Types.InvestigationStatus, createdAt: Date, closedAt?: Date | null, reference?: number | null }>, updates: Array<{ __typename?: 'Update', id: string, text?: string | null, type: Types.UpdateType, createdAt: Date, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, subject?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }>, createdBy: { __typename?: 'User', origName: string, id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> }, replies: Array<{ __typename?: 'Update', id: string, text?: string | null, type: Types.UpdateType, createdAt: Date, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, subject?: string | null, location?: { __typename?: 'Address', id: string, full: string, geoLat?: number | null, geoLng?: number | null } | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }>, createdBy: { __typename?: 'User', origName: string, id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> } }> }>, location?: { __typename?: 'Address', id: string, building?: string | null, street?: string | null, townCity?: string | null, county?: string | null, postcode?: string | null, geoLat?: number | null, geoLng?: number | null, full: string, alias?: string | null } | null } };


export const ViewIncidentDocument = gql`
    query ViewIncident($where: IncidentWhereUniqueInput!) {
  incident(where: $where) {
    id
    subject
    totalImages
    description
    dayTime
    date
    time
    reference
    ref
    policeReported
    policeRef
    policeNo
    policeInvolved
    priority
    customerRef
    subscribed
    totalValue
    totalRecoveredValue
    cctvRecords {
      cameraNumber
      endTime
      id
      showFace
      showIncident
      startTime
    }
    answers {
      id
      answer
      tagQuestion {
        id
        priority
        question {
          id
          question
        }
      }
      type
    }
    scheme {
      mg11Available
      restrictIncidentAccess
    }
    crimeTypes {
      id
      name
      crimeType
    }
    involvedTags {
      id
      name
    }
    impactTags {
      id
      name
    }
    incidentItems {
      ...IncidentItems
    }
    approved
    business {
      id
      name
    }
    groups {
      id
      name
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
      images {
        ...Images
      }
    }
    todos {
      ...Todos
    }
    offenders {
      ...Offenders
      images {
        ...Images
        isFace
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
    location {
      ...Locations
    }
  }
}
    ${IncidentItemsFragmentDoc}
${CreatedByFragmentDoc}
${ImagesFragmentDoc}
${CrimeGroupsFragmentDoc}
${VehiclesFragmentDoc}
${TodosFragmentDoc}
${OffendersFragmentDoc}
${DocumentsFragmentDoc}
${InvestigationsFragmentDoc}
${UpdatesFragmentDoc}
${LocationsFragmentDoc}`;
export function useViewIncidentQuery(baseOptions: Apollo.QueryHookOptions<ViewIncidentQuery, ViewIncidentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewIncidentQuery, ViewIncidentQueryVariables>(ViewIncidentDocument, options);
      }
export function useViewIncidentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewIncidentQuery, ViewIncidentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewIncidentQuery, ViewIncidentQueryVariables>(ViewIncidentDocument, options);
        }
export type ViewIncidentQueryHookResult = ReturnType<typeof useViewIncidentQuery>;
export type ViewIncidentLazyQueryHookResult = ReturnType<typeof useViewIncidentLazyQuery>;
export type ViewIncidentQueryResult = Apollo.QueryResult<ViewIncidentQuery, ViewIncidentQueryVariables>;