import type { ListDocumentsOnSchemeQuery } from '../../../../graphql/generated';

export interface Props {
  data: ListDocumentsOnSchemeQuery | undefined;
  toggleAddDocument: () => void;
  addDocument: boolean;
  loading: boolean;
  isAdmin: boolean;
}
