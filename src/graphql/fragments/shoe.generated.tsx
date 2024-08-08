import type * as Types from '../types.js';

import { gql } from '@apollo/client';
export type ShoesFragment = { __typename?: 'Shoe', type: Types.ShoeType, style: string, size: number, status: Types.ShoeStatus, side: Types.ShoeSide, retailPrice: number, recycled: boolean, id: string, description: string, colour: string, box: boolean, updatedAt: Date, stockItem: { __typename?: 'StockItem', id: string, sku?: string | null }, business: { __typename?: 'Business', id: string, name: string, locations: Array<{ __typename?: 'Address', full: string }> }, primaryShoe?: { __typename?: 'Shoe', id: string, business: { __typename?: 'Business', id: string, name: string, locations: Array<{ __typename?: 'Address', full: string }> } } | null };

export const ShoesFragmentDoc = gql`
    fragment Shoes on Shoe {
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