import type { CreateDocumentsMutation } from '#/graphql/documents/mutations/__generated__/create-documents.generated';
import type { MutationUpdaterFn } from '@apollo/client';

import type { UpsertFolderMutation } from '../../graphql/mutations/__generated__/upsert-folder.generated';
import type { FolderQuery } from '../../graphql/queries/__generated__/folder.generated';
export interface Props {
  addDocument: boolean;
  addFolder: boolean;
  addRights: boolean;
  data: FolderQuery | undefined;
  deleteRights: boolean;
  editFolder: boolean;
  editRights: boolean;
  loading: boolean;
  onDelete: (value: string) => void;
  saving: boolean;
  search: string;
  setSearch: (value: string) => void;
  toggleAddDocument: () => void;
  toggleAddFolder: () => void;
  toggleEditFolder: () => void;
  updateDocumentList: MutationUpdaterFn<CreateDocumentsMutation>;
  updateFolderList: MutationUpdaterFn<UpsertFolderMutation>;
}
