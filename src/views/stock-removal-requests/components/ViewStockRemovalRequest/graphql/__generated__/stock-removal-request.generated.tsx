import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import { UpdatesFragmentDoc } from '../../../../../../graphql/fragments/__generated__/updates.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StockRemovalRequestQueryVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type StockRemovalRequestQuery = { __typename?: 'Query', stockRemovalRequest: { __typename?: 'StockRemovalRequest', id: string, createdAt: Date, title: string, description?: string | null, status: Types.StockRemovalRequestStatus, reference?: number | null, costCentreCode?: string | null, destination?: Types.StockRemovalRquestDestination | null, nominalCode?: string | null, fascia?: string | null, priority: Types.StockRemovalPriority, personalityInfluences?: string | null, reason?: string | null, reasonForNonReturn?: string | null, rechargeBrand?: string | null, rechargeReference?: string | null, recipientEmail?: string | null, recipientName?: string | null, recipientPhone?: string | null, returnDate?: Date | null, shippingAddress?: string | null, shippingAddressLine1?: string | null, shippingAddressLine2?: string | null, shippingCity?: string | null, shippingCounty?: string | null, shippingPostcode?: string | null, shippingCountry?: string | null, smqAccountNumber?: string | null, socialHandles?: string | null, storeOrDC?: string | null, willStockBeReturned?: string | null, tmid?: string | null, tracking?: string | null, picker?: { __typename?: 'User', id: string, fullName: string } | null, createdBy: { __typename?: 'User', id: string, fullName: string }, items: Array<{ __typename?: 'StockRemovalItem', id: string, name?: string | null, brand?: string | null, sku?: string | null, barcode?: string | null, pickLocation?: string | null, requestedQuantity?: number | null, pickedQuantity?: number | null, value?: number | null }>, business?: { __typename?: 'Business', id: string, name: string } | null, approvers: Array<{ __typename?: 'StockRemovalRequestApproval', status: Types.StockRemovalRequestApprovalStatus, id: string, user: { __typename?: 'User', id: string, fullName: string } }>, updates: Array<{ __typename?: 'Update', id: string, text?: string | null, type: Types.UpdateType, createdAt: Date, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, subject: string, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }>, createdBy: { __typename?: 'User', origName: string, id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> }, replies: Array<{ __typename?: 'Update', id: string, text?: string | null, type: Types.UpdateType, createdAt: Date, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, subject: string, location?: { __typename?: 'Address', id: string, full: string, geoLat?: number | null, geoLng?: number | null } | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }>, createdBy: { __typename?: 'User', origName: string, id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> } }> }> } };


export const StockRemovalRequestDocument = gql`
    query stockRemovalRequest($where: UniqueId!) {
  stockRemovalRequest(where: $where) {
    id
    createdAt
    title
    description
    status
    reference
    costCentreCode
    destination
    nominalCode
    fascia
    picker {
      id
      fullName
    }
    priority
    personalityInfluences
    reason
    reasonForNonReturn
    rechargeBrand
    rechargeReference
    recipientEmail
    recipientName
    recipientPhone
    returnDate
    shippingAddress
    shippingAddressLine1
    shippingAddressLine2
    shippingCity
    shippingCounty
    shippingPostcode
    shippingCountry
    smqAccountNumber
    socialHandles
    storeOrDC
    willStockBeReturned
    tmid
    tracking
    createdBy {
      id
      fullName
    }
    items {
      id
      name
      brand
      sku
      barcode
      pickLocation
      requestedQuantity
      pickedQuantity
      value
    }
    business {
      id
      name
    }
    approvers {
      status
      id
      user {
        id
        fullName
      }
    }
    updates(orderBy: {createdAt: desc}) {
      ...Updates
    }
  }
}
    ${UpdatesFragmentDoc}`;
export function useStockRemovalRequestQuery(baseOptions: Apollo.QueryHookOptions<StockRemovalRequestQuery, StockRemovalRequestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StockRemovalRequestQuery, StockRemovalRequestQueryVariables>(StockRemovalRequestDocument, options);
      }
export function useStockRemovalRequestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StockRemovalRequestQuery, StockRemovalRequestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StockRemovalRequestQuery, StockRemovalRequestQueryVariables>(StockRemovalRequestDocument, options);
        }
export type StockRemovalRequestQueryHookResult = ReturnType<typeof useStockRemovalRequestQuery>;
export type StockRemovalRequestLazyQueryHookResult = ReturnType<typeof useStockRemovalRequestLazyQuery>;
export type StockRemovalRequestQueryResult = Apollo.QueryResult<StockRemovalRequestQuery, StockRemovalRequestQueryVariables>;