import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ViewOffenderMatchesQueryVariables = Types.Exact<{
  where: Types.OffenderWhereUniqueInput;
  orderBy?: Types.InputMaybe<
    | Array<Types.RekMatchOrderByWithRelationInput>
    | Types.RekMatchOrderByWithRelationInput
  >;
}>;

export type ViewOffenderMatchesQuery = {
  __typename?: 'Query';
  offender: {
    __typename?: 'Offender';
    id: string;
    name?: string | null;
    reference?: number | null;
    age?: Types.Age | null;
    build?: Types.Build | null;
    height?: Types.Height | null;
    gender?: Types.Gender | null;
    race?: Types.Race | null;
    searchedMatches: Array<{
      __typename?: 'RekMatch';
      id: string;
      matchedFaces: Array<{
        __typename?: 'RekMatchedFace';
        id: string;
        similarity: number;
        rekFace: {
          __typename?: 'RekFace';
          id: string;
          boundingHeight?: number | null;
          boundingLeft?: number | null;
          boundingTop?: number | null;
          boundingWidth?: number | null;
          image: {
            __typename?: 'Image';
            id: string;
            url?: string | null;
            optimised?: string | null;
            position: Types.ImagePosition;
            rotation: number;
            faces: Array<{
              __typename?: 'RekFace';
              id: string;
              confidence?: number | null;
              boundingHeight?: number | null;
              boundingLeft?: number | null;
              boundingTop?: number | null;
              boundingWidth?: number | null;
              offender: {
                __typename?: 'Offender';
                id: string;
                name?: string | null;
                reference?: number | null;
                age?: Types.Age | null;
                gender?: Types.Gender | null;
                race?: Types.Race | null;
                build?: Types.Build | null;
                height?: Types.Height | null;
              };
              rekMatchedSearches: Array<{
                __typename?: 'RekMatch';
                id: string;
              }>;
            }>;
          };
        };
      }>;
      matchedOffender: {
        __typename?: 'Offender';
        id: string;
        name?: string | null;
        reference?: number | null;
        age?: Types.Age | null;
        build?: Types.Build | null;
        height?: Types.Height | null;
        gender?: Types.Gender | null;
        race?: Types.Race | null;
        images: Array<{
          __typename?: 'Image';
          id: string;
          position: Types.ImagePosition;
          rotation: number;
          optimised?: string | null;
        }>;
      };
    }>;
    images: Array<{
      __typename?: 'Image';
      id: string;
      position: Types.ImagePosition;
      rotation: number;
      optimised?: string | null;
    }>;
  };
};

export const ViewOffenderMatchesDocument = gql`
  query ViewOffenderMatches(
    $where: OffenderWhereUniqueInput!
    $orderBy: [RekMatchOrderByWithRelationInput!]
  ) {
    offender(where: $where) {
      id
      name
      reference
      age
      build
      height
      height
      gender
      race
      searchedMatches(orderBy: $orderBy) {
        id
        matchedFaces {
          id
          similarity
          rekFace {
            id
            boundingHeight
            boundingLeft
            boundingTop
            boundingWidth
            image {
              id
              url
              optimised
              position
              rotation
              faces {
                id
                confidence
                boundingHeight
                boundingLeft
                boundingTop
                boundingWidth
                offender {
                  id
                  name
                  reference
                  age
                  gender
                  race
                  build
                  height
                  height
                }
                rekMatchedSearches {
                  id
                }
              }
            }
          }
        }
        matchedOffender {
          id
          name
          reference
          age
          build
          height
          height
          gender
          race
          images {
            id
            position
            rotation
            optimised
          }
        }
      }
      images {
        id
        position
        rotation
        optimised
      }
    }
  }
`;
export function useViewOffenderMatchesQuery(
  baseOptions: Apollo.QueryHookOptions<
    ViewOffenderMatchesQuery,
    ViewOffenderMatchesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ViewOffenderMatchesQuery,
    ViewOffenderMatchesQueryVariables
  >(ViewOffenderMatchesDocument, options);
}
export function useViewOffenderMatchesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ViewOffenderMatchesQuery,
    ViewOffenderMatchesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ViewOffenderMatchesQuery,
    ViewOffenderMatchesQueryVariables
  >(ViewOffenderMatchesDocument, options);
}
export type ViewOffenderMatchesQueryHookResult = ReturnType<
  typeof useViewOffenderMatchesQuery
>;
export type ViewOffenderMatchesLazyQueryHookResult = ReturnType<
  typeof useViewOffenderMatchesLazyQuery
>;
export type ViewOffenderMatchesQueryResult = Apollo.QueryResult<
  ViewOffenderMatchesQuery,
  ViewOffenderMatchesQueryVariables
>;
