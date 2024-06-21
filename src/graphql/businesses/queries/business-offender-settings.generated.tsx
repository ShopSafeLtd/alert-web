import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import { OffenderSettingsFragmentDoc } from '../../fragments/offender-settings.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BusinessOffenderSettingsQueryVariables = Types.Exact<{
  where: Types.BusinessWhereUniqueInput;
}>;

export type BusinessOffenderSettingsQuery = {
  __typename?: 'Query';
  business: {
    __typename?: 'Business';
    id: string;
    offenderSettings: {
      __typename?: 'OffenderSettings';
      name: boolean;
      alias: boolean;
      ethnicity: boolean;
      gender: boolean;
      build: boolean;
      height: boolean;
      hair: boolean;
      age: boolean;
      dateOfBirth: boolean;
      dateOfBirthSource: boolean;
      idVerified: boolean;
      peculiarities: boolean;
      comment: boolean;
      images: boolean;
    };
  };
};

export const BusinessOffenderSettingsDocument = gql`
  query BusinessOffenderSettings($where: BusinessWhereUniqueInput!) {
    business(where: $where) {
      id
      offenderSettings {
        ...OffenderSettings
      }
    }
  }
  ${OffenderSettingsFragmentDoc}
`;
export function useBusinessOffenderSettingsQuery(
  baseOptions: Apollo.QueryHookOptions<
    BusinessOffenderSettingsQuery,
    BusinessOffenderSettingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    BusinessOffenderSettingsQuery,
    BusinessOffenderSettingsQueryVariables
  >(BusinessOffenderSettingsDocument, options);
}
export function useBusinessOffenderSettingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BusinessOffenderSettingsQuery,
    BusinessOffenderSettingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    BusinessOffenderSettingsQuery,
    BusinessOffenderSettingsQueryVariables
  >(BusinessOffenderSettingsDocument, options);
}
export type BusinessOffenderSettingsQueryHookResult = ReturnType<
  typeof useBusinessOffenderSettingsQuery
>;
export type BusinessOffenderSettingsLazyQueryHookResult = ReturnType<
  typeof useBusinessOffenderSettingsLazyQuery
>;
export type BusinessOffenderSettingsQueryResult = Apollo.QueryResult<
  BusinessOffenderSettingsQuery,
  BusinessOffenderSettingsQueryVariables
>;
