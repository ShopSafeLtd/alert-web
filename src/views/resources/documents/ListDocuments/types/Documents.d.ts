import type { ListDocumentsOnSchemeQuery } from 'graphql/documents/queries/list-documents.generated';

export interface Props {
  data: ListDocumentsOnSchemeQuery | undefined;
  toggleAddDocument: () => void;
  addDocument: boolean;
  loading: boolean;
  isAdmin: boolean;
}
