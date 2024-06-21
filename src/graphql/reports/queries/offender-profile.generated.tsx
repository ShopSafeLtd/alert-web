import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OffenderProfileQueryVariables = Types.Exact<{
  where: Types.OffenderWhereUniqueInput;
  orderBy?: Types.InputMaybe<
    Array<Types.BanOrderByWithRelationInput> | Types.BanOrderByWithRelationInput
  >;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  incidentsOrderBy?: Types.InputMaybe<
    | Array<Types.IncidentOrderByWithRelationInput>
    | Types.IncidentOrderByWithRelationInput
  >;
}>;

export type OffenderProfileQuery = {
  __typename?: 'Query';
  offender: {
    __typename?: 'Offender';
    age?: Types.Age | null;
    dateOfBirth?: Date | null;
    dateSource?: string | null;
    gender?: Types.Gender | null;
    hair?: string | null;
    build?: Types.Build | null;
    height?: Types.Height | null;
    id: string;
    name?: string | null;
    peculiarities?: string | null;
    race?: Types.Race | null;
    reference?: number | null;
    totalIncidents: number;
    totalRecoveredValue: number;
    totalTheftSuccess: number;
    totalValue: number;
    updatedAt: Date;
    bans: Array<{
      __typename?: 'Ban';
      id: string;
      endDate: Date;
      active: boolean;
      startDate: Date;
      title?: string | null;
    }>;
    crimeGroups: Array<{
      __typename?: 'CrimeGroup';
      id: string;
      reference?: number | null;
    }>;
    incidentsByHour: Array<{
      __typename?: 'TagTotal';
      name: string;
      count: number;
    }>;
    incidentsByDayOfWeek: Array<{
      __typename?: 'TagTotal';
      name: string;
      count: number;
    }>;
    incidentsByMonth: Array<{
      __typename?: 'TagTotal';
      name: string;
      count: number;
    }>;
    incidentTotals: Array<{
      __typename?: 'IncidentTotal';
      month: string;
      data: Array<{ __typename?: 'TagTotal'; name: string; count: number }>;
    }>;
    goodsTypesTotals: Array<{
      __typename?: 'BusinessGoodsTotals';
      avgLostValue?: number | null;
      businessId?: string | null;
      avgRecoveredValue?: number | null;
      count?: number | null;
      successRate?: number | null;
      totalRecoveredValue?: number | null;
      totalLostValue?: number | null;
      goodsType?: { __typename?: 'GoodsType'; id: string; name: string } | null;
    }>;
    images: Array<{
      __typename?: 'Image';
      id: string;
      optimised?: string | null;
      url?: string | null;
    }>;
    incidents: Array<{
      __typename?: 'Incident';
      id: string;
      dayTime: string;
      date: Date;
      value?: number | null;
      recoveredValue?: number | null;
      reference?: number | null;
      crimeTypes: Array<{ __typename?: 'Tag'; id: string; name: string }>;
      createdBy: {
        __typename?: 'User';
        id: string;
        businesses: Array<{
          __typename?: 'Business';
          id: string;
          name: string;
          fullName: string;
        }>;
      };
    }>;
    lastActive?: {
      __typename?: 'Incident';
      id: string;
      dayTime: string;
      date: Date;
      value?: number | null;
      recoveredValue?: number | null;
      reference?: number | null;
      crimeTypes: Array<{ __typename?: 'Tag'; id: string; name: string }>;
      createdBy: {
        __typename?: 'User';
        id: string;
        businesses: Array<{
          __typename?: 'Business';
          id: string;
          name: string;
          fullName: string;
        }>;
      };
    } | null;
    tags: Array<{ __typename?: 'Tag'; id: string; name: string }>;
    vehicles: Array<{
      __typename?: 'Vehicle';
      id: string;
      make?: string | null;
      model?: string | null;
      registration?: string | null;
      colour?: string | null;
    }>;
  };
};

export const OffenderProfileDocument = gql`
  query OffenderProfile(
    $where: OffenderWhereUniqueInput!
    $orderBy: [BanOrderByWithRelationInput!]
    $first: Int
    $incidentsOrderBy: [IncidentOrderByWithRelationInput!]
  ) {
    offender(where: $where) {
      age
      bans(orderBy: $orderBy) {
        id
        endDate
        active
        startDate
        title
      }
      crimeGroups {
        id
        reference
      }
      dateOfBirth
      dateSource
      gender
      hair
      build
      height
      id
      incidentsByHour {
        name
        count
      }
      incidentsByDayOfWeek {
        name
        count
      }
      incidentsByMonth {
        name
        count
      }
      incidentTotals {
        month
        data {
          name
          count
        }
      }
      goodsTypesTotals {
        avgLostValue
        businessId
        avgRecoveredValue
        count
        successRate
        totalRecoveredValue
        totalLostValue
        goodsType {
          id
          name
        }
      }
      images(take: $first) {
        id
        optimised
        url
      }
      incidents(orderBy: $incidentsOrderBy) {
        id
        dayTime
        date
        crimeTypes {
          id
          name
        }
        value
        recoveredValue
        reference
        createdBy {
          id
          businesses {
            id
            name
            fullName
          }
        }
      }
      lastActive {
        id
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
        value
        recoveredValue
        reference
      }
      name
      peculiarities
      race
      reference
      tags {
        id
        name
      }
      totalIncidents
      totalRecoveredValue
      totalTheftSuccess
      totalValue
      updatedAt
      vehicles {
        id
        make
        model
        registration
        colour
      }
    }
  }
`;
export function useOffenderProfileQuery(
  baseOptions: Apollo.QueryHookOptions<
    OffenderProfileQuery,
    OffenderProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OffenderProfileQuery, OffenderProfileQueryVariables>(
    OffenderProfileDocument,
    options
  );
}
export function useOffenderProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OffenderProfileQuery,
    OffenderProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    OffenderProfileQuery,
    OffenderProfileQueryVariables
  >(OffenderProfileDocument, options);
}
export type OffenderProfileQueryHookResult = ReturnType<
  typeof useOffenderProfileQuery
>;
export type OffenderProfileLazyQueryHookResult = ReturnType<
  typeof useOffenderProfileLazyQuery
>;
export type OffenderProfileQueryResult = Apollo.QueryResult<
  OffenderProfileQuery,
  OffenderProfileQueryVariables
>;
