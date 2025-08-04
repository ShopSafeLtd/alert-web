import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type VehiclesFragment = { __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null };

export const VehiclesFragmentDoc = gql`
    fragment Vehicles on Vehicle {
  id
  reference
  colour
  model
  make
  registration
}
    `;