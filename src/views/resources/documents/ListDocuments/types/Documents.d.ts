import type { ListDocumentsOnSchemeQuery } from 'graphql/documents/queries/__generated__/list-documents.generated';

export interface Props {
  addDocument: boolean;
  data: ListDocumentsOnSchemeQuery | undefined;
  isAdmin: boolean;
  loading: boolean;
  toggleAddDocument: () => void;
}
