import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type DocumentsFragment = { __typename?: 'Document', id: string, name: string, url: string, fileType?: Types.FileType | null, tags: Array<{ __typename?: 'Tag', name: string }> };

export const DocumentsFragmentDoc = gql`
    fragment Documents on Document {
  id
  name
  url
  fileType
  tags {
    name
  }
}
    `;