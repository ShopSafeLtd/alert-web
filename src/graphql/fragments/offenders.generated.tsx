import type * as Types from '../types.js';

import { gql } from '@apollo/client';
export type OffendersFragment = {
  __typename?: 'Offender';
  id: string;
  name?: string | null;
  alias: Array<string>;
  age?: Types.Age | null;
  gender?: Types.Gender | null;
  race?: Types.Race | null;
  build?: Types.Build | null;
  height?: Types.Height | null;
  hair?: string | null;
  peculiarities?: string | null;
  comment?: string | null;
  dateSource?: string | null;
  dateOfBirth?: Date | null;
  idVerified: boolean;
  idSource?: Types.IdSource | null;
  knownFor: Array<string>;
  targetedGoods: Array<string>;
  justification?: string | null;
  infoSource?: string | null;
};

export const OffendersFragmentDoc = gql`
  fragment Offenders on Offender {
    id
    name
    alias
    age
    gender
    race
    build
    height
    hair
    peculiarities
    comment
    dateSource
    dateOfBirth
    idVerified
    idSource
    knownFor
    targetedGoods
    justification
    infoSource
  }
`;
