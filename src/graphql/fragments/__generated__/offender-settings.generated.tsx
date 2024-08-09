import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type OffenderSettingsFragment = { __typename?: 'OffenderSettings', name: boolean, alias: boolean, ethnicity: boolean, gender: boolean, build: boolean, height: boolean, hair: boolean, age: boolean, dateOfBirth: boolean, dateOfBirthSource: boolean, idVerified: boolean, peculiarities: boolean, comment: boolean, images: boolean };

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