import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListIncidentsQueryVariables = Types.Exact<{
  scheme: Types.SchemeWhereUniqueInput;
  where?: Types.InputMaybe<Types.IncidentWhereInput>;
  order?: Types.InputMaybe<Types.IncidentOrderByWithRelationInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ListIncidentsQuery = { __typename?: 'Query', listIncidents?: { __typename?: 'ListIncidents', total: number, incidents: Array<{ __typename?: 'Incident', id: string, subject: string, totalImages: number, description: string, dayTime: string, reference?: number | null, policeRef?: string | null, approved?: boolean | null, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, business?: { __typename?: 'Business', id: string, name: string } | null, location?: { __typename?: 'Address', id: string, full: string } | null, createdBy: { __typename?: 'User', id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string }> }, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, position: Types.ImagePosition, rotation: number, primary?: boolean | null, policeImage?: boolean | null, low?: string | null }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, incidentItems: Array<{ __typename?: 'IncidentItem', id: string, name?: string | null, value?: number | null, recoveredValue?: number | null, sku?: string | null, quantity?: number | null, recoveredQuantity?: number | null, goodsType?: { __typename?: 'GoodsType', id: string } | null }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null }> }> } | null };


export const ListIncidentsDocument = gql`
    query listIncidents($scheme: SchemeWhereUniqueInput!, $where: IncidentWhereInput, $order: IncidentOrderByWithRelationInput, $take: Int, $skip: Int) {
  listIncidents(
    scheme: $scheme
    where: $where
    order: $order
    take: $take
    skip: $skip
  ) {
    incidents {
      id
      subject
      totalImages
      description
      dayTime
      reference
      policeRef
      crimeTypes {
        id
        name
      }
      approved
      business {
        id
        name
      }
      location {
        id
        full
      }
      createdBy {
        id
        fullName
        businesses {
          id
          name
        }
      }
      images {
        id
        optimised
        position
        rotation
        primary
        policeImage
        low
      }
      groups {
        id
        name
      }
      incidentItems {
        id
        name
        value
        recoveredValue
        sku
        quantity
        recoveredQuantity
        goodsType {
          id
        }
      }
      offenders {
        id
        name
      }
    }
    total
  }
}
    `;
export function useListIncidentsQuery(baseOptions: Apollo.QueryHookOptions<ListIncidentsQuery, ListIncidentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListIncidentsQuery, ListIncidentsQueryVariables>(ListIncidentsDocument, options);
      }
export function useListIncidentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListIncidentsQuery, ListIncidentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListIncidentsQuery, ListIncidentsQueryVariables>(ListIncidentsDocument, options);
        }
export type ListIncidentsQueryHookResult = ReturnType<typeof useListIncidentsQuery>;
export type ListIncidentsLazyQueryHookResult = ReturnType<typeof useListIncidentsLazyQuery>;
export type ListIncidentsQueryResult = Apollo.QueryResult<ListIncidentsQuery, ListIncidentsQueryVariables>;