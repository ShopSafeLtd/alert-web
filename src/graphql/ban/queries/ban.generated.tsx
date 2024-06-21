import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BanQueryVariables = Types.Exact<{
  where: Types.BanWhereUniqueInput;
}>;

export type BanQuery = {
  __typename?: 'Query';
  ban: {
    __typename?: 'Ban';
    id: string;
    active: boolean;
    location: string;
    startDate: Date;
    endDate: Date;
    description?: string | null;
    createdAt: Date;
    createdBy: { __typename?: 'User'; id: string; fullName: string };
  };
};

export const BanDocument = gql`
  query Ban($where: BanWhereUniqueInput!) {
    ban(where: $where) {
      id
      active
      location
      startDate
      endDate
      description
      createdBy {
        id
        fullName
      }
      createdAt
    }
  }
`;
export function useBanQuery(
  baseOptions: Apollo.QueryHookOptions<BanQuery, BanQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BanQuery, BanQueryVariables>(BanDocument, options);
}
export function useBanLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BanQuery, BanQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BanQuery, BanQueryVariables>(BanDocument, options);
}
export type BanQueryHookResult = ReturnType<typeof useBanQuery>;
export type BanLazyQueryHookResult = ReturnType<typeof useBanLazyQuery>;
export type BanQueryResult = Apollo.QueryResult<BanQuery, BanQueryVariables>;
