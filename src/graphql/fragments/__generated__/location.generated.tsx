import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type LocationsFragment = { __typename?: 'Address', id: string, building?: string | null, street?: string | null, townCity?: string | null, county?: string | null, postcode?: string | null, geoLat?: number | null, geoLng?: number | null, full?: string | null, alias?: string | null };

export const LocationsFragmentDoc = gql`
    fragment Locations on Address {
  id
  building
  street
  townCity
  county
  postcode
  geoLat
  geoLng
  full
  alias
}
    `;