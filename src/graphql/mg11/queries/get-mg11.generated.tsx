import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FetchMg11QueryVariables = Types.Exact<{
  where: Types.Mg11WhereUniqueInput;
}>;


export type FetchMg11Query = { __typename?: 'Query', mg11: { __typename?: 'MG11', id: string, status: Types.Mg11Status, statement?: string | null, address?: string | null, postcode?: string | null, homeTel?: string | null, workTel?: string | null, mobileTel?: string | null, email?: string | null, name?: string | null, age?: string | null, urn?: string | null, occupation?: string | null, visualRecording?: boolean | null, prefContact?: string | null, gender?: string | null, dobPlace?: string | null, formerName?: string | null, incidentId?: string | null, height?: string | null, ethnicity?: string | null, availability?: string | null, likelyToAttend?: boolean | null, likelyToAttendReason?: string | null, specialMeasures?: boolean | null, careNeeds?: boolean | null, careNeedsDetails?: string | null, detailsExplained?: boolean | null, leafletReceived?: boolean | null, medicalReleasedPolice?: string | null, medicalReleasedDefence?: string | null, civilProceedingsRelease?: string | null, witnessServiceDisclose?: boolean | null, witnessSignature?: string | null, witnessSignatureDate?: Date | null, interviewerSignature?: string | null, station?: string | null, statementWhereWhen?: string | null } };


export const FetchMg11Document = gql`
    query FetchMg11($where: MG11WhereUniqueInput!) {
  mg11(where: $where) {
    id
    status
    statement
    address
    postcode
    homeTel
    workTel
    mobileTel
    email
    name
    age
    urn
    occupation
    visualRecording
    prefContact
    gender
    dobPlace
    formerName
    incidentId
    height
    ethnicity
    availability
    likelyToAttend
    likelyToAttendReason
    specialMeasures
    careNeeds
    careNeedsDetails
    detailsExplained
    leafletReceived
    medicalReleasedPolice
    medicalReleasedDefence
    civilProceedingsRelease
    witnessServiceDisclose
    witnessSignature
    witnessSignatureDate
    interviewerSignature
    station
    statementWhereWhen
  }
}
    `;
export function useFetchMg11Query(baseOptions: Apollo.QueryHookOptions<FetchMg11Query, FetchMg11QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchMg11Query, FetchMg11QueryVariables>(FetchMg11Document, options);
      }
export function useFetchMg11LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchMg11Query, FetchMg11QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchMg11Query, FetchMg11QueryVariables>(FetchMg11Document, options);
        }
export type FetchMg11QueryHookResult = ReturnType<typeof useFetchMg11Query>;
export type FetchMg11LazyQueryHookResult = ReturnType<typeof useFetchMg11LazyQuery>;
export type FetchMg11QueryResult = Apollo.QueryResult<FetchMg11Query, FetchMg11QueryVariables>;