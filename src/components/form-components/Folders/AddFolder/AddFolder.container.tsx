import type { FolderData } from '#/types/DataType';
import type { UpsertFolderMutation } from '#/views/resources/folders/graphql/mutations/__generated__/upsert-folder.generated';
import type { MutationUpdaterFn } from '@apollo/client';

import React from 'react';

import View from './AddFolder.view';
import useAddFolder from './useAddFolder';

interface Props {
  folderId?: string;
  onAddNewFolder?: (value: FolderData) => void;
  onClose: () => void;
  parentFolderId?: string;
  saving?: boolean;
  update?: MutationUpdaterFn<UpsertFolderMutation>;
}

const AddFolder = ({
  folderId,
  onAddNewFolder,
  onClose,
  parentFolderId,
  saving: origSaving = false,
  update,
}: Props): JSX.Element => {
  const { form, loading, onSelectParent, onSubmit, saving } = useAddFolder({
    folderId,
    onAddNewFolder,
    onClose,
    parentFolderId,
    update,
  });

  return (
    <View
      form={form}
      loading={loading}
      onClose={onClose}
      onSelectParent={onSelectParent}
      onSubmit={onSubmit}
      parentFolderId={parentFolderId}
      saving={saving || origSaving}
    />
  );
};

export default AddFolder;
