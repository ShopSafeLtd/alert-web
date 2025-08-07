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


export type ViewInvestigationQuery = { __typename?: 'Query', investigation: { __typename?: 'Investigation', id: string, description?: string | null, name: string, status: Types.InvestigationStatus, totalOffenders: number, totalIncidents: number, totalValue: number, totalRecoveredValue: number, totalTheftSuccess: number, closedAt?: Date | null, subscribed: boolean, createdBy: { __typename?: 'User', id: string, fullName: string }, documents: Array<{ __typename?: 'Document', id: string, name: string, url: string, thumbnailUrl?: string | null, tags: Array<{ __typename?: 'Tag', name: string, id: string }>, articles: Array<{ __typename?: 'Article', id: string, previewText?: string | null, previewImage?: string | null }> }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, todos: Array<{ __typename?: 'Todo', id: string, name?: string | null, completedDate?: Date | null, createdAt: Date, completed?: boolean | null, reference?: number | null, dueDate?: Date | null, createdBy?: { __typename?: 'User', id: string, fullName: string } | null, completedBy?: { __typename?: 'User', id: string, fullName: string } | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }> }>, vehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null }>, offenders: Array<{ __typename?: 'Offender', totalIncidents: number, totalValue: number, id: string, reference?: number | null, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified: boolean, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, latestIncident?: { __typename?: 'Incident', id: string, date: Date } | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, optimisedPersisted?: string | null, position: Types.ImagePosition, rotation: number, isFace?: boolean | null }> }>, incidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, customerRef?: string | null, subject: string, description: string, priority: Types.IncidentPriority, approved?: boolean | null, totalValue: number, totalRecoveredValue: number, vehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, reference?: number | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified: boolean, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, position: Types.ImagePosition, rotation: number, url?: string | null, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> }>, location?: { __typename?: 'Address', id: string, full: string, geoLat?: number | null, geoLng?: number | null } | null, business?: { __typename?: 'Business', id: string, name: string } | null, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, createdBy: { __typename?: 'User', id: string, fullName: string } }>, updates: Array<{ __typename?: 'Update', id: string, text?: string | null, type: Types.UpdateType, createdAt: Date, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, subject: string, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }>, createdBy: { __typename?: 'User', origName: string, id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> }, replies: Array<{ __typename?: 'Update', id: string, text?: string | null, type: Types.UpdateType, createdAt: Date, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, subject: string, location?: { __typename?: 'Address', id: string, full: string, geoLat?: number | null, geoLng?: number | null } | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }>, createdBy: { __typename?: 'User', origName: string, id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> } }> }>, crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number, vehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null }>, offenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified: boolean, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> }> }>, flows: Array<{ __typename?: 'Flow', updatedAt: Date, name: string, id: string, description?: string | null, edges: Array<{ __typename?: 'FlowEdge', id: string, type: string, markerEnd: { [key: string]: any }, source: string, sourceHandle?: string | null, target: string, targetHandle?: string | null }>, nodes: Array<{ __typename?: 'FlowNode', id: string, type: string, data: { [key: string]: any }, height: number, width: number, style: { __typename?: 'Style', height: number, width: number }, position: { __typename?: 'XY', x: number, y: number }, positionAbsolute: { __typename?: 'XY', x: number, y: number } }> }> } };


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