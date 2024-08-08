import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type SingleShoeFragment = { readonly __typename?: 'Shoe', readonly type: Types.ShoeType, readonly style: string, readonly size: number, readonly status: Types.ShoeStatus, readonly side: Types.ShoeSide, readonly retailPrice: number, readonly recycled: boolean, readonly id: string, readonly description: string, readonly colour: string, readonly box: boolean, readonly updatedAt: Date, readonly stockItem: { readonly __typename?: 'StockItem', readonly id: string, readonly sku?: string | null }, readonly business: { readonly __typename?: 'Business', readonly id: string, readonly name: string, readonly locations: ReadonlyArray<{ readonly __typename?: 'Address', readonly full: string }> }, readonly primaryShoe?: { readonly __typename?: 'Shoe', readonly id: string, readonly business: { readonly __typename?: 'Business', readonly id: string, readonly name: string, readonly locations: ReadonlyArray<{ readonly __typename?: 'Address', readonly full: string }> } } | null };

export const SingleShoeFragmentDoc = gql`
    fragment SingleShoe on Shoe {
  type
  style
  size
  status
  side
  retailPrice
  recycled
  id
  description
  colour
  stockItem {
    id
    sku
  }
  business {
    id
    name
    locations {
      full
    }
  }
  box
  updatedAt
  primaryShoe {
    id
    business {
      id
      name
      locations {
        full
      }
    }
  }
}
    `;