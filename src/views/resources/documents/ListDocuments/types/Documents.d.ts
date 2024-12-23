import type { ListDocumentsOnSchemeQuery } from 'graphql/documents/queries/__generated__/list-documents.generated';

export interface Props {
  addDocument: boolean;
  addRights: boolean;
  data: ListDocumentsOnSchemeQuery | undefined;
  deleteRights: boolean;
  loading: boolean;
  onDelete: (value: string) => void;
  saving: boolean;
  toggleAddDocument: () => void;
}
