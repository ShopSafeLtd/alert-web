import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IncidentDraftDetailsQueryVariables = Types.Exact<{
  where: Types.IncidentWhereUniqueInput;
}>;


export type IncidentDraftDetailsQuery = { __typename?: 'Query', incident: { __typename?: 'Incident', date?: Date | null, id?: string | null, description?: string | null, subject?: string | null, business?: { __typename?: 'Business', id: string, name?: string | null } | null, evidence: Array<{ __typename?: 'Document', id?: string | null, url?: string | null, name?: string | null }>, answers: Array<{ __typename?: 'Answer', answer: string, id: string, tagQuestion?: { __typename?: 'TagQuestion', id?: string | null, question?: { __typename?: 'Question', id?: string | null } | null } | null }>, cctvRecords: Array<{ __typename?: 'CctvRecord', id?: string | null, aheadBehind?: string | null, cameraNumber?: string | null, correctTime?: boolean | null, description?: string | null, endTime?: Date | null, incorrectBy?: number | null, showFace?: boolean | null, showIncident?: boolean | null, startTime?: Date | null }>, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, position?: Types.ImagePosition | null, policeImage?: boolean | null, rotation?: number | null }>, impactTags?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> | null, involvedTags?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> | null, motiveTags?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> | null, vehicles: Array<{ __typename?: 'Vehicle', id?: string | null, make?: string | null, model?: string | null, colour?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, position?: Types.ImagePosition | null, policeImage?: boolean | null }> }>, offenders: Array<{ __typename?: 'Offender', id?: string | null, name?: string | null, age?: Types.Age | null, build?: Types.Build | null, gender?: Types.Gender | null, height?: Types.Height | null, race?: Types.Race | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, position?: Types.ImagePosition | null, policeImage?: boolean | null }> }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string }>, crimeTypes?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> | null, location?: { __typename?: 'Address', id: string } | null, incidentItems: Array<{ __typename?: 'IncidentItem', id?: string | null, name?: string | null, quantity?: number | null, recoveredQuantity?: number | null, recoveredValue?: number | null, value?: number | null, sku?: string | null, goodsType?: { __typename?: 'GoodsType', name?: string | null, id?: string | null } | null, stockItem?: { __typename?: 'StockItem', id?: string | null } | null }> } };


export const IncidentDraftDetailsDocument = gql`
    query IncidentDraftDetails($where: IncidentWhereUniqueInput!) {
  incident(where: $where) {
    business {
      id
      name
    }
    evidence {
      id
      url
      name
    }
    answers {
      answer
      id
      tagQuestion {
        id
        question {
          id
        }
      }
    }
    cctvRecords {
      id
      aheadBehind
      cameraNumber
      correctTime
      description
      endTime
      incorrectBy
      showFace
      showIncident
      startTime
    }
    date
    id
    description
    images {
      id
      url
      position
      policeImage
      rotation
    }
    impactTags {
      id
      name
    }
    involvedTags {
      id
      name
    }
    motiveTags {
      id
      name
    }
    vehicles {
      id
      make
      model
      colour
      registration
      images {
        id
        url
        position
        policeImage
      }
    }
    offenders {
      id
      name
      images {
        id
        url
        position
        policeImage
      }
      age
      build
      gender
      height
      name
      race
    }
    groups {
      id
      name
    }
    crimeGroups {
      id
    }
    crimeTypes {
      id
      name
    }
    subject
    location {
      id
    }
    incidentItems {
      id
      name
      goodsType {
        name
        id
      }
      quantity
      recoveredQuantity
      recoveredValue
      value
      sku
      stockItem {
        id
      }
      value
    }
  }
}
    `;
export function useIncidentDraftDetailsQuery(baseOptions: Apollo.QueryHookOptions<IncidentDraftDetailsQuery, IncidentDraftDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IncidentDraftDetailsQuery, IncidentDraftDetailsQueryVariables>(IncidentDraftDetailsDocument, options);
      }
export function useIncidentDraftDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IncidentDraftDetailsQuery, IncidentDraftDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IncidentDraftDetailsQuery, IncidentDraftDetailsQueryVariables>(IncidentDraftDetailsDocument, options);
        }
export type IncidentDraftDetailsQueryHookResult = ReturnType<typeof useIncidentDraftDetailsQuery>;
export type IncidentDraftDetailsLazyQueryHookResult = ReturnType<typeof useIncidentDraftDetailsLazyQuery>;
export type IncidentDraftDetailsQueryResult = Apollo.QueryResult<IncidentDraftDetailsQuery, IncidentDraftDetailsQueryVariables>;