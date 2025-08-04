import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { TodosFragmentDoc } from '../../../fragments/__generated__/todos.generated';
import { VehiclesFragmentDoc } from '../../../fragments/__generated__/vehicles.generated';
import { OffendersFragmentDoc } from '../../../fragments/__generated__/offenders.generated';
import { IncidentsDetailedFragmentDoc } from '../../../fragments/__generated__/incidents-detailed.generated';
import { ImagesFragmentDoc } from '../../../fragments/__generated__/images.generated';
import { UpdatesFragmentDoc } from '../../../fragments/__generated__/updates.generated';
import { CrimeGroupsFragmentDoc } from '../../../fragments/__generated__/crime-groups.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ViewInvestigationQueryVariables = Types.Exact<{
  where: Types.InvestigationWhereUniqueInput;
}>;


export type ViewInvestigationQuery = { __typename?: 'Query', investigation: { __typename?: 'Investigation', id?: string | null, description?: string | null, name?: string | null, status?: Types.InvestigationStatus | null, totalOffenders: number, totalIncidents: number, totalValue?: number | null, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, closedAt?: Date | null, subscribed?: boolean | null, createdBy: { __typename?: 'User', id?: string | null, fullName: string }, documents: Array<{ __typename?: 'Document', id?: string | null, name?: string | null, url?: string | null, thumbnailUrl?: string | null, tags: Array<{ __typename?: 'Tag', name?: string | null, id?: string | null }>, articles: Array<{ __typename?: 'Article', id: string, previewText?: string | null, previewImage?: string | null }> }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, todos: Array<{ __typename?: 'Todo', id?: string | null, name?: string | null, completedDate?: Date | null, createdAt?: Date | null, completed?: boolean | null, reference?: number | null, dueDate?: Date | null, createdBy?: { __typename?: 'User', id?: string | null, fullName: string } | null, assignedUsers: Array<{ __typename?: 'User', id?: string | null, fullName: string }> }>, vehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null }>, offenders: Array<{ __typename?: 'Offender', totalIncidents: number, totalValue?: number | null, id?: string | null, reference?: number | null, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified?: boolean | null, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, latestIncident?: { __typename?: 'Incident', id?: string | null, date?: Date | null } | null, images: Array<{ __typename?: 'Image', id?: string | null, optimised?: string | null, optimisedPersisted?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, isFace?: boolean | null }> }>, incidents: Array<{ __typename?: 'Incident', id?: string | null, reference?: number | null, dayTime: string, policeRef?: string | null, customerRef?: string | null, subject?: string | null, description?: string | null, priority: Types.IncidentPriority, approved?: boolean | null, totalValue?: number | null, totalRecoveredValue?: number | null, vehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null }>, offenders: Array<{ __typename?: 'Offender', id?: string | null, name?: string | null, reference?: number | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified?: boolean | null, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, url?: string | null, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> }>, location?: { __typename?: 'Address', id: string, full?: string | null, geoLat?: number | null, geoLng?: number | null } | null, business?: { __typename?: 'Business', id: string, name?: string | null } | null, crimeTypes?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> | null, groups: Array<{ __typename?: 'Group', id: string, name: string }>, createdBy: { __typename?: 'User', id?: string | null, fullName: string } }>, updates: Array<{ __typename?: 'Update', id?: string | null, text?: string | null, type?: Types.UpdateType | null, createdAt?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents?: number | null, totalOffenders: number, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id?: string | null, reference?: number | null, dayTime: string, policeRef?: string | null, subject?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id?: string | null, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt?: Date | null, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, createdBy: { __typename?: 'User', fullName: string, id?: string | null } }>, createdBy: { __typename?: 'User', origName?: string | null, id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null, fullName?: string | null }> }, replies: Array<{ __typename?: 'Update', id?: string | null, text?: string | null, type?: Types.UpdateType | null, createdAt?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents?: number | null, totalOffenders: number, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id?: string | null, reference?: number | null, dayTime: string, policeRef?: string | null, subject?: string | null, location?: { __typename?: 'Address', id: string, full?: string | null, geoLat?: number | null, geoLng?: number | null } | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id?: string | null, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt?: Date | null, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, createdBy: { __typename?: 'User', fullName: string, id?: string | null } }>, createdBy: { __typename?: 'User', origName?: string | null, id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null, fullName?: string | null }> } }> }>, crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents?: number | null, totalOffenders: number, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null, vehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null }>, offenders: Array<{ __typename?: 'Offender', id?: string | null, reference?: number | null, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified?: boolean | null, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> }> }>, flows?: Array<{ __typename?: 'Flow', updatedAt?: Date | null, name?: string | null, id?: string | null, description?: string | null, edges?: Array<{ __typename?: 'FlowEdge', id?: string | null, type?: string | null, markerEnd?: { [key: string]: any } | null, source?: string | null, sourceHandle?: string | null, target?: string | null, targetHandle?: string | null }> | null, nodes?: Array<{ __typename?: 'FlowNode', id?: string | null, type?: string | null, data?: { [key: string]: any } | null, height?: number | null, width?: number | null, style?: { __typename?: 'Style', height: number, width: number } | null, position?: { __typename?: 'XY', x: number, y: number } | null, positionAbsolute?: { __typename?: 'XY', x: number, y: number } | null }> | null }> | null } };


export const ViewInvestigationDocument = gql`
    query ViewInvestigation($where: InvestigationWhereUniqueInput!) {
  investigation(where: $where) {
    id
    description
    name
    status
    totalOffenders
    totalIncidents
    totalValue
    totalRecoveredValue
    totalTheftSuccess
    closedAt
    createdBy {
      id
      fullName
    }
    documents {
      id
      name
      url
      thumbnailUrl
      tags {
        name
        id
      }
      articles {
        id
        previewText
        previewImage
      }
    }
    groups {
      id
      name
    }
    subscribed
    todos {
      ...Todos
    }
    vehicles {
      ...Vehicles
    }
    offenders {
      ...Offenders
      totalIncidents
      totalValue
      latestIncident {
        id
        date
      }
      images {
        id
        optimised
        optimisedPersisted
        position
        rotation
        isFace
      }
    }
    incidents(orderBy: {date: desc}) {
      ...IncidentsDetailed
      vehicles {
        ...Vehicles
      }
      offenders {
        ...Offenders
        images {
          ...Images
        }
      }
    }
    updates(orderBy: {createdAt: desc}) {
      ...Updates
    }
    crimeGroups {
      ...CrimeGroups
      vehicles {
        ...Vehicles
      }
      offenders {
        ...Offenders
        images {
          ...Images
        }
      }
    }
    flows {
      updatedAt
      name
      id
      description
      edges {
        id
        type
        markerEnd
        source
        sourceHandle
        target
        targetHandle
      }
      nodes {
        id
        type
        data
        height
        width
        style {
          height
          width
        }
        position {
          x
          y
        }
        positionAbsolute {
          x
          y
        }
      }
    }
  }
}
    ${TodosFragmentDoc}
${VehiclesFragmentDoc}
${OffendersFragmentDoc}
${IncidentsDetailedFragmentDoc}
${ImagesFragmentDoc}
${UpdatesFragmentDoc}
${CrimeGroupsFragmentDoc}`;
export function useViewInvestigationQuery(baseOptions: Apollo.QueryHookOptions<ViewInvestigationQuery, ViewInvestigationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewInvestigationQuery, ViewInvestigationQueryVariables>(ViewInvestigationDocument, options);
      }
export function useViewInvestigationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewInvestigationQuery, ViewInvestigationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewInvestigationQuery, ViewInvestigationQueryVariables>(ViewInvestigationDocument, options);
        }
export type ViewInvestigationQueryHookResult = ReturnType<typeof useViewInvestigationQuery>;
export type ViewInvestigationLazyQueryHookResult = ReturnType<typeof useViewInvestigationLazyQuery>;
export type ViewInvestigationQueryResult = Apollo.QueryResult<ViewInvestigationQuery, ViewInvestigationQueryVariables>;