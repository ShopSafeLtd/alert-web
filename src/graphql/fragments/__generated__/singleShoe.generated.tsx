import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type SingleShoeFragment = { __typename?: 'Shoe', type?: Types.ShoeType | null, style?: string | null, size?: number | null, status?: Types.ShoeStatus | null, side?: Types.ShoeSide | null, retailPrice?: number | null, recycled?: boolean | null, id?: string | null, description?: string | null, colour?: string | null, box?: boolean | null, updatedAt?: Date | null, stockItem?: { __typename?: 'StockItem', id?: string | null, sku?: string | null } | null, business?: { __typename?: 'Business', id: string, name?: string | null, locations: Array<{ __typename?: 'Address', full?: string | null }> } | null, primaryShoe?: { __typename?: 'Shoe', id?: string | null, business?: { __typename?: 'Business', id: string, name?: string | null, locations: Array<{ __typename?: 'Address', full?: string | null }> } | null } | null };

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