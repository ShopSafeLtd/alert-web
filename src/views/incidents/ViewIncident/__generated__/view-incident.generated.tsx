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


export type ViewIncidentQuery = { __typename?: 'Query', incident: { __typename?: 'Incident', id?: string | null, subject?: string | null, totalImages?: number | null, description?: string | null, dayTime: string, date?: Date | null, createdAt?: Date | null, time?: Date | null, reference?: number | null, ref?: string | null, policeReported?: boolean | null, policeRef?: string | null, policeNo?: string | null, policeInvolved?: boolean | null, activityAuthorised?: boolean | null, priority: Types.IncidentPriority, customerRef?: string | null, subscribed?: boolean | null, totalValue?: number | null, totalRecoveredValue?: number | null, originalDescription?: string | null, aiImprovements?: string | null, aiKeyObservations?: Array<string> | null, aiMO?: string | null, aiMethod?: string | null, aiQualityScore?: number | null, aiSummary?: string | null, approved?: boolean | null, cctvRecords: Array<{ __typename?: 'CctvRecord', cameraNumber?: string | null, endTime?: Date | null, id?: string | null, showFace?: boolean | null, showIncident?: boolean | null, startTime?: Date | null, description?: string | null }>, answers: Array<{ __typename?: 'Answer', id: string, answer: string, type: Types.AnswerType, tagQuestion?: { __typename?: 'TagQuestion', id?: string | null, priority?: number | null, dependentQuestions?: Array<{ [key: string]: any }> | null, question?: { __typename?: 'Question', id?: string | null, question?: string | null, options?: Array<{ [key: string]: any }> | null, optionsFormatted?: Array<string> | null } | null } | null }>, schemes: Array<{ __typename?: 'Scheme', id?: string | null }>, scheme: { __typename?: 'Scheme', id?: string | null, mg11Available?: boolean | null, restrictIncidentAccess?: boolean | null }, crimeTypes?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null, crimeType?: Types.CrimeType | null }> | null, involvedTags?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> | null, impactTags?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> | null, incidentItems: Array<{ __typename?: 'IncidentItem', id?: string | null, name?: string | null, value?: number | null, recoveredValue?: number | null, sku?: string | null, quantity?: number | null, recoveredQuantity?: number | null, goodsType?: { __typename?: 'GoodsType', id?: string | null } | null, stockItem?: { __typename?: 'StockItem', id?: string | null } | null }>, business?: { __typename?: 'Business', id: string, name?: string | null, currency?: Types.Currency | null } | null, groups: Array<{ __typename?: 'Group', id: string, name: string }>, createdBy: { __typename?: 'User', id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null }> }, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }>, crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents?: number | null, totalOffenders: number, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null }>, vehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> }>, todos: Array<{ __typename?: 'Todo', id?: string | null, name?: string | null, completedDate?: Date | null, createdAt?: Date | null, completed?: boolean | null, reference?: number | null, dueDate?: Date | null, createdBy?: { __typename?: 'User', id?: string | null, fullName: string } | null, assignedUsers: Array<{ __typename?: 'User', id?: string | null, fullName: string }> }>, offenders: Array<{ __typename?: 'Offender', id?: string | null, reference?: number | null, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified?: boolean | null, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', isFace?: boolean | null, id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> }>, evidence: Array<{ __typename?: 'Document', id?: string | null, name?: string | null, url?: string | null, fileType?: Types.FileType | null, tags: Array<{ __typename?: 'Tag', name?: string | null }> }>, investigations: Array<{ __typename?: 'Investigation', id?: string | null, name?: string | null, description?: string | null, status?: Types.InvestigationStatus | null, createdAt?: Date | null, closedAt?: Date | null, reference?: number | null }>, updates: Array<{ __typename?: 'Update', id?: string | null, text?: string | null, type?: Types.UpdateType | null, createdAt?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents?: number | null, totalOffenders: number, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id?: string | null, reference?: number | null, dayTime: string, policeRef?: string | null, subject?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id?: string | null, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt?: Date | null, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, createdBy: { __typename?: 'User', fullName: string, id?: string | null } }>, createdBy: { __typename?: 'User', origName?: string | null, id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null, fullName?: string | null }> }, replies: Array<{ __typename?: 'Update', id?: string | null, text?: string | null, type?: Types.UpdateType | null, createdAt?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents?: number | null, totalOffenders: number, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id?: string | null, reference?: number | null, dayTime: string, policeRef?: string | null, subject?: string | null, location?: { __typename?: 'Address', id: string, full?: string | null, geoLat?: number | null, geoLng?: number | null } | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id?: string | null, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt?: Date | null, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, createdBy: { __typename?: 'User', fullName: string, id?: string | null } }>, createdBy: { __typename?: 'User', origName?: string | null, id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null, fullName?: string | null }> } }> }>, location?: { __typename?: 'Address', id: string, building?: string | null, street?: string | null, townCity?: string | null, county?: string | null, postcode?: string | null, geoLat?: number | null, geoLng?: number | null, full?: string | null, alias?: string | null } | null } };


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