import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import { UpdatesFragmentDoc } from '../../../../../../graphql/fragments/__generated__/updates.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StockRemovalReturnQueryVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type StockRemovalReturnQuery = { __typename?: 'Query', stockRemovalRequest: { __typename?: 'StockRemovalRequest', id: string, createdAt: Date, title: string, description?: string | null, status: Types.StockRemovalRequestStatus, reference?: number | null, isReturn?: boolean | null, storeOrDC?: string | null, returnOrignalId?: string | null, rechargeReference?: string | null, rechargeBrand?: string | null, costCentreCode?: string | null, tracking?: string | null, dateofReturn?: Date | null, createdBy: { __typename?: 'User', id: string, fullName: string }, business?: { __typename?: 'Business', id: string, name: string } | null, returnImages: Array<{ __typename?: 'Image', id: string, url?: string | null }>, items: Array<{ __typename?: 'StockRemovalItem', id: string, name?: string | null, brand?: string | null, sku?: string | null, barcode?: string | null, value?: number | null, requestedQuantity?: number | null, pickedQuantity?: number | null, damaged?: boolean | null, stockItem: { __typename?: 'StockItem', id: string } }>, updates: Array<{ __typename?: 'Update', id: string, text?: string | null, type: Types.UpdateType, createdAt: Date, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, subject: string, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }>, createdBy: { __typename?: 'User', origName: string, id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> }, replies: Array<{ __typename?: 'Update', id: string, text?: string | null, type: Types.UpdateType, createdAt: Date, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }>, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }>, linkedVehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, reference?: number | null, dayTime: string, policeRef?: string | null, subject: string, location?: { __typename?: 'Address', id: string, full: string, geoLat?: number | null, geoLng?: number | null } | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, gender?: Types.Gender | null, build?: Types.Build | null, height?: Types.Height | null, race?: Types.Race | null, age?: Types.Age | null, dateOfBirth?: Date | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null }> }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }>, createdBy: { __typename?: 'User', origName: string, id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }> } }> }> } };


export const StockRemovalReturnDocument = gql`
    query stockRemovalReturn($where: UniqueId!) {
  stockRemovalRequest(where: $where) {
    id
    createdAt
    title
    description
    status
    reference
    isReturn
    storeOrDC
    returnOrignalId
    rechargeReference
    rechargeBrand
    costCentreCode
    tracking
    dateofReturn
    createdBy {
      id
      fullName
    }
    business {
      id
      name
    }
    returnImages {
      id
      url
    }
    items {
      id
      name
      brand
      sku
      barcode
      value
      requestedQuantity
      pickedQuantity
      damaged
      stockItem {
        id
      }
    }
    updates(orderBy: {createdAt: desc}) {
      ...Updates
    }
  }
}
    ${UpdatesFragmentDoc}`;
export function useStockRemovalReturnQuery(baseOptions: Apollo.QueryHookOptions<StockRemovalReturnQuery, StockRemovalReturnQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StockRemovalReturnQuery, StockRemovalReturnQueryVariables>(StockRemovalReturnDocument, options);
      }
export function useStockRemovalReturnLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StockRemovalReturnQuery, StockRemovalReturnQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StockRemovalReturnQuery, StockRemovalReturnQueryVariables>(StockRemovalReturnDocument, options);
        }
export type StockRemovalReturnQueryHookResult = ReturnType<typeof useStockRemovalReturnQuery>;
export type StockRemovalReturnLazyQueryHookResult = ReturnType<typeof useStockRemovalReturnLazyQuery>;
export type StockRemovalReturnQueryResult = Apollo.QueryResult<StockRemovalReturnQuery, StockRemovalReturnQueryVariables>;