import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { IncidentItemsFragmentDoc } from '../../../../graphql/fragments/__generated__/incident-item.generated';
import { CreatedByFragmentDoc } from '../../../../graphql/fragments/__generated__/createdBy.generated';
import { ImagesFragmentDoc } from '../../../../graphql/fragments/__generated__/images.generated';
import { CrimeGroupsFragmentDoc } from '../../../../graphql/fragments/__generated__/crime-groups.generated';
import { VehiclesFragmentDoc } from '../../../../graphql/fragments/__generated__/vehicles.generated';
import { TodosFragmentDoc } from '../../../../graphql/fragments/__generated__/todos.generated';
import { OffendersFragmentDoc } from '../../../../graphql/fragments/__generated__/offenders.generated';
import { DocumentsFragmentDoc } from '../../../../graphql/fragments/__generated__/document.generated';
import { InvestigationsFragmentDoc } from '../../../../graphql/fragments/__generated__/investigations.generated';
import { UpdatesFragmentDoc } from '../../../../graphql/fragments/__generated__/updates.generated';
import { LocationsFragmentDoc } from '../../../../graphql/fragments/__generated__/location.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ViewIncidentQueryVariables = Types.Exact<{
  where: Types.IncidentWhereUniqueInput;
}>;


export type ViewIncidentQuery = { __typename?: 'Query', incident: { __typename?: 'Incident', id: string, subject: string, totalImages: number, description: string, dayTime: string, date: Date, createdAt: Date, time: Date, reference?: number | null, ref: string, policeReported: boolean, policeRef?: string | null, policeNo?: string | null, policeInvolved: boolean, activityAuthorised: boolean, priority: Types.IncidentPriority, customerRef?: string | null, subscribed: boolean, totalValue: number, totalRecoveredValue: number, originalDescription: string, aiImprovements?: string | null, aiKeyObservations?: Array<string> | null, aiMO?: string | null, aiMethod?: string | null, aiQualityScore?: number | null, aiSummary?: string | null, approved?: boolean | null, actions: Array<{ __typename?: 'Action', id: string, createdAt: Date, dataType: Types.Model, description?: string | null, reason?: string | null, type: Types.ActionType, reference?: number | null, byUser: { __typename?: 'User', id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string }> } }>, cctvRecords: Array<{ __typename?: 'CctvRecord', cameraNumber: string, endTime: Date, id: string, showFace: boolean, showIncident: boolean, startTime: Date, description?: string | null }>, answers: Array<{ __typename?: 'Answer', id: string, answer: string, type: Types.AnswerType, tagQuestion?: { __typename?: 'TagQuestion', id: string, priority: number, dependentQuestions: Array<{ [key: string]: any }>, question: { __typename?: 'Question', id: string, question: string, options: Array<{ [key: string]: any }>, optionsFormatted?: Array<string> | null } } | null }>, schemes: Array<{ __typename?: 'Scheme', id: string }>, scheme: { __typename?: 'Scheme', id: string, mg11Available: boolean, restrictIncidentAccess: boolean }, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string, crimeType?: Types.CrimeType | null }>, involvedTags: Array<{ __typename?: 'Tag', id: string, name: string }>, impactTags: Array<{ __typename?: 'Tag', id: string, name: string }>, incidentItems: Array<{ __typename?: 'IncidentItem', id: string, name?: string | null, value?: number | null, recoveredValue?: number | null, sku?: string | null, quantity?: number | null, recoveredQuantity?: number | null, goodsType?: { __typename?: 'GoodsType', id: string } | null, stockItem?: { __typename?: 'StockItem', id: string } | null }>, business?: { __typename?: 'Business', id: string, name: string, currency?: Types.Currency | null } | null, groups: Array<{ __typename?: 'Group', id: string, name: string }>, createdBy: { __typename?: 'User', id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string }> }, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }>, crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, vehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> }>, todos: Array<{ __typename?: 'Todo', id: string, name?: string | null, completedDate?: Date | null, createdAt: Date, completed?: boolean | null, reference?: number | null, dueDate?: Date | null, createdBy?: { __typename?: 'User', id: string, fullName: string } | null, completedBy?: { __typename?: 'User', id: string, fullName: string } | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }> }>, offenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified: boolean, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', isFace?: boolean | null, id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> }>, evidence: Array<{ __typename?: 'Document', id: string, name: string, url: string, fileType?: Types.FileType | null, tags: Array<{ __typename?: 'Tag', name: string }> }>, investigations: Array<{ __typename?: 'Investigation', id: string, name: string, description?: string | null, status: Types.InvestigationStatus, createdAt: Date, closedAt?: Date | null, reference?: number | null }>, updates: Array<{ __typename?: 'Update', id: string, text?: string | null, type: Types.UpdateType, createdAt: Date, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, subject: string, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }>, createdBy: { __typename?: 'User', origName: string, id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> }, replies: Array<{ __typename?: 'Update', id: string, text?: string | null, type: Types.UpdateType, createdAt: Date, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, subject: string, location?: { __typename?: 'Address', id: string, full: string, geoLat?: number | null, geoLng?: number | null } | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }>, createdBy: { __typename?: 'User', origName: string, id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> } }> }>, location?: { __typename?: 'Address', id: string, building?: string | null, street?: string | null, townCity?: string | null, county?: string | null, postcode?: string | null, geoLat?: number | null, geoLng?: number | null, full: string, alias?: string | null } | null } };


export const ViewIncidentDocument = gql`
    query ViewIncident($where: IncidentWhereUniqueInput!) {
  incident(where: $where) {
    id
    subject
    totalImages
    description
    dayTime
    date
    createdAt
    time
    reference
    ref
    policeReported
    policeRef
    policeNo
    policeInvolved
    actions {
      id
      createdAt
      dataType
      description
      reason
      type
      reference
      byUser {
        id
        fullName
        businesses {
          id
          name
        }
      }
    }
    activityAuthorised
    priority
    customerRef
    subscribed
    totalValue
    totalRecoveredValue
    originalDescription
    aiImprovements
    aiKeyObservations
    aiMO
    aiMethod
    aiQualityScore
    aiSummary
    cctvRecords {
      cameraNumber
      endTime
      id
      showFace
      showIncident
      startTime
      description
    }
    answers(orderBy: {tagQuestion: {priority: desc}}) {
      id
      answer
      tagQuestion {
        id
        priority
        dependentQuestions
        question {
          id
          question
          options
          optionsFormatted
        }
      }
      type
    }
    schemes {
      id
    }
    scheme {
      id
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
      currency
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