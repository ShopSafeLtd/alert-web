import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import { TodosFragmentDoc } from '../../../fragments/__generated__/todos.generated';
import { VehiclesFragmentDoc } from '../../../fragments/__generated__/vehicles.generated';
import { UpdatesFragmentDoc } from '../../../fragments/__generated__/updates.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ViewInvestigationQueryVariables = Types.Exact<{
  where: Types.InvestigationWhereUniqueInput;
}>;


export type ViewInvestigationQuery = { __typename?: 'Query', investigation: { __typename?: 'Investigation', id: string, description?: string | null, name: string, status: Types.InvestigationStatus, type: Types.InvestigationType, priority: Types.InvestigationPriority, totalOffenders: number, totalIncidents: number, totalValue: number, totalRecoveredValue: number, totalTheftSuccess: number, closedAt?: Date | null, subscribed: boolean, createdBy: { __typename?: 'User', id: string, fullName: string }, documents: Array<{ __typename?: 'Document', id: string, name: string, url: string, thumbnailUrl?: string | null, tags: Array<{ __typename?: 'Tag', name: string, id: string }>, articles: Array<{ __typename?: 'Article', id: string, previewText?: string | null, previewImage?: string | null }> }>, todos: Array<{ __typename?: 'Todo', id: string, name?: string | null, completedDate?: Date | null, createdAt: Date, completed?: boolean | null, reference?: number | null, dueDate?: Date | null, createdBy?: { __typename?: 'User', id: string, fullName: string } | null, completedBy?: { __typename?: 'User', id: string, fullName: string } | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }> }>, vehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null }>, updates: Array<{ __typename?: 'Update', id: string, text?: string | null, type: Types.UpdateType, createdAt: Date, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, subject: string, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }>, createdBy: { __typename?: 'User', origName: string, id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> }, replies: Array<{ __typename?: 'Update', id: string, text?: string | null, type: Types.UpdateType, createdAt: Date, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, subject: string, location?: { __typename?: 'Address', id: string, full: string, geoLat?: number | null, geoLng?: number | null } | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }>, createdBy: { __typename?: 'User', origName: string, id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> } }> }>, crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, alias?: string | null, ref: string, totalValue: number, totalOffenders: number, totalIncidents: number }> } };


export const ViewInvestigationDocument = gql`
    query ViewInvestigation($where: InvestigationWhereUniqueInput!) {
  investigation(where: $where) {
    id
    description
    name
    status
    type
    priority
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
    subscribed
    todos {
      ...Todos
    }
    vehicles {
      ...Vehicles
    }
    updates(orderBy: {createdAt: desc}) {
      ...Updates
    }
    crimeGroups {
      id
      alias
      ref
      totalValue
      totalOffenders
      totalIncidents
    }
  }
}
    ${TodosFragmentDoc}
${VehiclesFragmentDoc}
${UpdatesFragmentDoc}`;
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