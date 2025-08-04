import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
export type FolderDocumentsFragment = { __typename?: 'Document', id?: string | null, name?: string | null, url?: string | null, thumbnailUrl?: string | null, createdAt?: Date | null, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> };

export const FolderDocumentsFragmentDoc = gql`
    fragment FolderDocuments on Document {
  id
  name
  url
  thumbnailUrl
  createdAt
  tags {
    id
    name
  }
}
    `;