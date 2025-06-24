import type { CreateDocumentsMutation } from '#/graphql/documents/mutations/__generated__/create-documents.generated';
import type { MutationUpdaterFn } from '@apollo/client';

import type { UpsertFolderMutation } from '../../graphql/mutations/__generated__/upsert-folder.generated';
import type { DocumentsNoFolderQuery } from '../../graphql/queries/__generated__/documents_no_folder.generated';
import type { FoldersQuery } from '../../graphql/queries/__generated__/folders.generated';

export interface Props {
  addDocument: boolean;
  addFolder: boolean;
  addRights: boolean;
  data: FoldersQuery | undefined;
  deleteRights: boolean;
  documentsData: DocumentsNoFolderQuery | undefined;
  documentsLoading: boolean;
  fetchMoreDocScroll: () => void;
  fetchMoreScroll: () => void;
  loading: boolean;
  onDelete: (value: string) => void;
  saving: boolean;
  search: string;
  setSearch: (value: string) => void;
  toggleAddDocument: () => void;
  toggleAddFolder: () => void;
  updateDocumentList: MutationUpdaterFn<CreateDocumentsMutation>;
  updateFolderList: MutationUpdaterFn<UpsertFolderMutation>;
}
