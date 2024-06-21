import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import { IncidentCardFragmentDoc } from '../../fragments/incident-card.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListIncidentsAllSchemesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.IncidentWhereInput>;
  order?: Types.InputMaybe<Types.IncidentOrderByWithRelationInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type ListIncidentsAllSchemesQuery = {
  __typename?: 'Query';
  listIncidentsAllSchemes?: {
    __typename?: 'ListIncidents';
    total: number;
    incidents: Array<{
      __typename?: 'Incident';
      approved?: boolean | null;
      id: string;
      totalImages: number;
      priority: Types.IncidentPriority;
      customerRef?: string | null;
      subject?: string | null;
      reference?: number | null;
      policeRef?: string | null;
      dayTime: string;
      description: string;
      createdByUser: boolean;
      crimeTypes: Array<{ __typename?: 'Tag'; id: string; name: string }>;
      images: Array<{
        __typename?: 'Image';
        low?: string | null;
        id: string;
        rotation: number;
        position: Types.ImagePosition;
        primary?: boolean | null;
      }>;
      offenders: Array<{
        __typename?: 'Offender';
        name?: string | null;
        id: string;
      }>;
      business?: { __typename?: 'Business'; name: string } | null;
      location?: { __typename?: 'Address'; full: string } | null;
    }>;
  } | null;
};

export const ListIncidentsAllSchemesDocument = gql`
  query listIncidentsAllSchemes(
    $where: IncidentWhereInput
    $order: IncidentOrderByWithRelationInput
    $take: Int
    $skip: Int
  ) {
    listIncidentsAllSchemes(
      where: $where
      order: $order
      take: $take
      skip: $skip
    ) {
      incidents {
        ...IncidentCard
      }
      total
    }
  }
  ${IncidentCardFragmentDoc}
`;
export function useListIncidentsAllSchemesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ListIncidentsAllSchemesQuery,
    ListIncidentsAllSchemesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ListIncidentsAllSchemesQuery,
    ListIncidentsAllSchemesQueryVariables
  >(ListIncidentsAllSchemesDocument, options);
}
export function useListIncidentsAllSchemesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListIncidentsAllSchemesQuery,
    ListIncidentsAllSchemesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ListIncidentsAllSchemesQuery,
    ListIncidentsAllSchemesQueryVariables
  >(ListIncidentsAllSchemesDocument, options);
}
export type ListIncidentsAllSchemesQueryHookResult = ReturnType<
  typeof useListIncidentsAllSchemesQuery
>;
export type ListIncidentsAllSchemesLazyQueryHookResult = ReturnType<
  typeof useListIncidentsAllSchemesLazyQuery
>;
export type ListIncidentsAllSchemesQueryResult = Apollo.QueryResult<
  ListIncidentsAllSchemesQuery,
  ListIncidentsAllSchemesQueryVariables
>;
