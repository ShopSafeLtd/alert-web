import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PreviewIncidentExportQueryVariables = Types.Exact<{
  where: Types.IncidentExportInput;
  take: Types.Scalars['Int'];
  skip: Types.Scalars['Int'];
}>;

export type PreviewIncidentExportQuery = {
  __typename?: 'Query';
  previewIncidentExport: {
    __typename?: 'IncidentExport';
    activityCount: number;
    incidentCount: number;
    incidentItemsCount: number;
    offenderCount: number;
    vehicleCount: number;
    incidents: Array<{
      __typename?: 'Incident';
      id: string;
      date: Date;
      description: string;
    }>;
  };
};

export const PreviewIncidentExportDocument = gql`
  query PreviewIncidentExport(
    $where: IncidentExportInput!
    $take: Int!
    $skip: Int!
  ) {
    previewIncidentExport(where: $where, take: $take, skip: $skip) {
      activityCount
      incidentCount
      incidentItemsCount
      incidents {
        id
        date
        description
      }
      offenderCount
      vehicleCount
    }
  }
`;
export function usePreviewIncidentExportQuery(
  baseOptions: Apollo.QueryHookOptions<
    PreviewIncidentExportQuery,
    PreviewIncidentExportQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    PreviewIncidentExportQuery,
    PreviewIncidentExportQueryVariables
  >(PreviewIncidentExportDocument, options);
}
export function usePreviewIncidentExportLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PreviewIncidentExportQuery,
    PreviewIncidentExportQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PreviewIncidentExportQuery,
    PreviewIncidentExportQueryVariables
  >(PreviewIncidentExportDocument, options);
}
export type PreviewIncidentExportQueryHookResult = ReturnType<
  typeof usePreviewIncidentExportQuery
>;
export type PreviewIncidentExportLazyQueryHookResult = ReturnType<
  typeof usePreviewIncidentExportLazyQuery
>;
export type PreviewIncidentExportQueryResult = Apollo.QueryResult<
  PreviewIncidentExportQuery,
  PreviewIncidentExportQueryVariables
>;
