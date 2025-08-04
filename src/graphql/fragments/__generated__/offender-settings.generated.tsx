import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type OffenderSettingsFragment = { __typename?: 'OffenderSettings', name?: boolean | null, alias?: boolean | null, ethnicity?: boolean | null, gender?: boolean | null, build?: boolean | null, height?: boolean | null, hair?: boolean | null, age?: boolean | null, dateOfBirth?: boolean | null, dateOfBirthSource?: boolean | null, idVerified?: boolean | null, peculiarities?: boolean | null, comment?: boolean | null, images?: boolean | null };

export const OffenderSettingsFragmentDoc = gql`
    fragment OffenderSettings on OffenderSettings {
  name
  alias
  ethnicity
  gender
  build
  height
  hair
  age
  dateOfBirth
  dateOfBirthSource
  idVerified
  peculiarities
  comment
  images
}
    `;