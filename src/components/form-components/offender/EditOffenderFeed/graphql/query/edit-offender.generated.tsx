import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EditOffenderQueryVariables = Types.Exact<{
  where: Types.OffenderWhereUniqueInput;
}>;


export type EditOffenderQuery = { __typename?: 'Query', offender: { __typename?: 'Offender', id: string, alias: Array<string>, infoSource?: string | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, dateSource?: string | null, hair?: string | null, gender?: Types.Gender | null, comment?: string | null, name?: string | null, reference?: number | null, race?: Types.Race | null, peculiarities?: string | null, approved?: boolean | null, idVerified: boolean, idSource?: Types.IdSource | null, customGalleries: Array<{ __typename?: 'CustomGallery', id: string, name: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, tags: Array<{ __typename?: 'Tag', id: string, name: string }> } };


export const EditOffenderDocument = gql`
    query EditOffender($where: OffenderWhereUniqueInput!) {
  offender(where: $where) {
    id
    alias
    infoSource
    knownFor
    targetedGoods
    justification
    age
    build
    height
    dateOfBirth
    dateSource
    hair
    gender
    comment
    name
    reference
    race
    peculiarities
    approved
    idVerified
    idSource
    customGalleries {
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
  }
}
    `;
export function useEditOffenderQuery(baseOptions: Apollo.QueryHookOptions<EditOffenderQuery, EditOffenderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EditOffenderQuery, EditOffenderQueryVariables>(EditOffenderDocument, options);
      }
export function useEditOffenderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EditOffenderQuery, EditOffenderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EditOffenderQuery, EditOffenderQueryVariables>(EditOffenderDocument, options);
        }
export type EditOffenderQueryHookResult = ReturnType<typeof useEditOffenderQuery>;
export type EditOffenderLazyQueryHookResult = ReturnType<typeof useEditOffenderLazyQuery>;
export type EditOffenderQueryResult = Apollo.QueryResult<EditOffenderQuery, EditOffenderQueryVariables>;