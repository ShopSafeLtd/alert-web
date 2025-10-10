import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BusinessImpactQueryVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type BusinessImpactQuery = { __typename?: 'Query', businessImpact: { __typename?: 'BusinessImpact', businessAddress: string, businessName: string, contactAddress: string, contactName: string, crimeNumber: string, date: string, description: string, incidentDate: string, incidentLoss: string, incidentRecovered: string, lostItems: Array<string>, policeOfficerAttending: string, referenceNumber: string, telephone: string, userAddress: string, userContact: string, userName: string } };


export const BusinessImpactDocument = gql`
    query BusinessImpact($where: UniqueId!) {
  businessImpact(where: $where) {
    businessAddress
    businessName
    contactAddress
    contactName
    crimeNumber
    date
    description
    incidentDate
    incidentLoss
    incidentRecovered
    lostItems
    policeOfficerAttending
    referenceNumber
    telephone
    userAddress
    userContact
    userName
  }
}
    `;
export function useBusinessImpactQuery(baseOptions: Apollo.QueryHookOptions<BusinessImpactQuery, BusinessImpactQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessImpactQuery, BusinessImpactQueryVariables>(BusinessImpactDocument, options);
      }
export function useBusinessImpactLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessImpactQuery, BusinessImpactQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessImpactQuery, BusinessImpactQueryVariables>(BusinessImpactDocument, options);
        }
export type BusinessImpactQueryHookResult = ReturnType<typeof useBusinessImpactQuery>;
export type BusinessImpactLazyQueryHookResult = ReturnType<typeof useBusinessImpactLazyQuery>;
export type BusinessImpactQueryResult = Apollo.QueryResult<BusinessImpactQuery, BusinessImpactQueryVariables>;