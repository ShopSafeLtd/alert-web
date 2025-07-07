import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { LocationsFragmentDoc } from '../../../fragments/__generated__/location.generated';
import { TodosFragmentDoc } from '../../../fragments/__generated__/todos.generated';
import { DemDevicesFragmentDoc } from '../../../fragments/__generated__/dem-device.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BusinessQueryVariables = Types.Exact<{
  where: Types.BusinessWhereUniqueInput;
  incidentsWhere?: Types.InputMaybe<Types.IncidentWhereInput>;
}>;


export type BusinessQuery = { __typename?: 'Query', business: { __typename?: 'Business', id: string, name: string, fullName: string, publicName: boolean, demId?: string | null, siteNumber?: string | null, brands: Array<string>, currency?: Types.Currency | null, brandsList: Array<{ __typename?: 'Brand', id: string, name: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, incidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, date: Date, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, createdBy: { __typename?: 'User', id: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> }, location?: { __typename?: 'Address', id: string, building?: string | null, street?: string | null, townCity?: string | null, county?: string | null, postcode?: string | null, geoLat?: number | null, geoLng?: number | null, full: string, alias?: string | null } | null }>, todos: Array<{ __typename?: 'Todo', id: string, name?: string | null, completedDate?: Date | null, createdAt: Date, completed?: boolean | null, reference?: number | null, dueDate?: Date | null, createdBy?: { __typename?: 'User', id: string, fullName: string } | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }> }>, demDevices: Array<{ __typename?: 'DemDevice', id: string, demId: string, createdAt: Date, serialNumber?: string | null, name: string, evidence: Array<{ __typename?: 'Document', id: string, name: string, url: string, fileType?: Types.FileType | null }>, demGroups: Array<{ __typename?: 'DemGroup', id: string, name: string }> }>, parent?: { __typename?: 'Business', id: string, name: string, fullName: string } | null, evidences: Array<{ __typename?: 'Document', id: string, name: string, url: string, fileType?: Types.FileType | null }>, locations: Array<{ __typename?: 'Address', id: string, full: string, geoLat?: number | null, geoLng?: number | null }> } };


export const BusinessDocument = gql`
    query Business($where: BusinessWhereUniqueInput!, $incidentsWhere: IncidentWhereInput) {
  business(where: $where) {
    id
    name
    fullName
    publicName
    demId
    siteNumber
    brands
    currency
    brandsList {
      id
      name
    }
    groups {
      id
      name
    }
    tags {
      id
      name
    }
    incidents(where: $incidentsWhere) {
      id
      reference
      dayTime
      date
      crimeTypes {
        id
        name
      }
      createdBy {
        id
        businesses {
          id
          name
          fullName
        }
      }
      location {
        ...Locations
      }
    }
    todos {
      ...Todos
    }
    demDevices {
      ...DemDevices
      evidence {
        id
        name
        url
        fileType
      }
      demGroups {
        id
        name
      }
    }
    parent {
      id
      name
      fullName
    }
    evidences {
      id
      name
      url
      fileType
    }
    locations {
      id
      full
      geoLat
      geoLng
    }
  }
}
    ${LocationsFragmentDoc}
${TodosFragmentDoc}
${DemDevicesFragmentDoc}`;
export function useBusinessQuery(baseOptions: Apollo.QueryHookOptions<BusinessQuery, BusinessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessQuery, BusinessQueryVariables>(BusinessDocument, options);
      }
export function useBusinessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessQuery, BusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessQuery, BusinessQueryVariables>(BusinessDocument, options);
        }
export type BusinessQueryHookResult = ReturnType<typeof useBusinessQuery>;
export type BusinessLazyQueryHookResult = ReturnType<typeof useBusinessLazyQuery>;
export type BusinessQueryResult = Apollo.QueryResult<BusinessQuery, BusinessQueryVariables>;