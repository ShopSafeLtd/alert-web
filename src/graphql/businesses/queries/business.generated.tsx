import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import { LocationsFragmentDoc } from '../../fragments/location.generated';
import { TodosFragmentDoc } from '../../fragments/todos.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BusinessQueryVariables = Types.Exact<{
  where: Types.BusinessWhereUniqueInput;
  incidentsWhere?: Types.InputMaybe<Types.IncidentWhereInput>;
}>;


export type BusinessQuery = { __typename?: 'Query', business: { __typename?: 'Business', id: string, name: string, fullName: string, publicName: boolean, demId?: string | null, siteNumber?: string | null, brands: Array<string>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, incidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, date: Date, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, createdBy: { __typename?: 'User', id: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> }, location?: { __typename?: 'Address', id: string, building?: string | null, street?: string | null, townCity?: string | null, county?: string | null, postcode?: string | null, geoLat?: number | null, geoLng?: number | null, full: string, alias?: string | null } | null }>, todos: Array<{ __typename?: 'Todo', id: string, name?: string | null, description?: string | null, dueDate?: Date | null, completed?: boolean | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }> }>, parent?: { __typename?: 'Business', id: string, name: string, fullName: string } | null, locations: Array<{ __typename?: 'Address', id: string, full: string, geoLat?: number | null, geoLng?: number | null }> } };


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
    parent {
      id
      name
      fullName
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
${TodosFragmentDoc}`;
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