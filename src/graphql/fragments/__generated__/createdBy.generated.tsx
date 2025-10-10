import type * as Types from '../../types';

import { gql } from '@apollo/client';
export type CreatedByFragment = { __typename?: 'User', id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string }> };

export const CreatedByFragmentDoc = gql`
    fragment CreatedBy on User {
  id
  fullName
  businesses {
    id
    name
  }
}
    `;