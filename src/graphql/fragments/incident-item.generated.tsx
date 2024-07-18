import type * as Types from '../types.js';

import { gql } from '@apollo/client';
export type IncidentItemsFragment = { __typename?: 'IncidentItem', id: string, name?: string | null, value?: number | null, recoveredValue?: number | null, sku?: string | null, quantity?: number | null, recoveredQuantity?: number | null, goodsType?: { __typename?: 'GoodsType', id: string } | null, stockItem?: { __typename?: 'StockItem', id: string } | null };

export const IncidentItemsFragmentDoc = gql`
    fragment IncidentItems on IncidentItem {
  id
  name
  value
  recoveredValue
  sku
  quantity
  recoveredQuantity
  goodsType {
    id
  }
  stockItem {
    id
  }
}
    `;