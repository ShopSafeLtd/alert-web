import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
export type FolderDocumentsFragment = { __typename?: 'Document', id: string, name: string, url: string, thumbnailUrl?: string | null, createdAt: Date, fileType?: Types.FileType | null, tags: Array<{ __typename?: 'Tag', id: string, name: string }> };

export const FolderDocumentsFragmentDoc = gql`
    fragment FolderDocuments on Document {
  id
  name
  url
  thumbnailUrl
  createdAt
  fileType
  tags {
    id
    name
  }
}
    `;