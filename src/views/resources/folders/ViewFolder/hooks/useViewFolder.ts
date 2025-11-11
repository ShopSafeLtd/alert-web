import type { CreateDocumentsMutation } from '#/graphql/documents/mutations/__generated__/create-documents.generated';
import type { MutationUpdaterFn } from '@apollo/client';

import { useDeleteDocumentMutation } from '#/graphql/documents/mutations/__generated__/delete-document.generated';
import errorNotification from '#/types/mutation_notifications/error_notification';
import hasRolePermission from '#/utils/has-role-permission';
import { notification } from 'antd';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router';

import type { UpsertFolderMutation } from '../../graphql/mutations/__generated__/upsert-folder.generated';
import type {
  FolderQuery,
  FolderQueryVariables,
} from '../../graphql/queries/__generated__/folder.generated';
import type { Props as Return } from '../types/ViewFolder';

import { useDeleteFolderMutation } from '../../graphql/mutations/__generated__/delete-folder.generated';
import {
  FolderDocument,
  useFolderQuery,
} from '../../graphql/queries/__generated__/folder.generated';

const useViewFolder = (): Return => {
  const params = useParams();
  const folderId = params.id || '';
  const intl = useIntl();
  const navigate = useNavigate();
  const [addDocument, setAddDocument] = useState(false);
  const [addFolder, setAddFolder] = useState(false);
  const [editFolder, setEditFolder] = useState(false);

  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const toggleAddDocument = () => setAddDocument(!addDocument);
  const toggleAddFolder = () => setAddFolder(!addFolder);
  const toggleEditFolder = () => setEditFolder(!editFolder);

  // const schemeId = useAtomValue(currentSchemeIdAtom);
  const variables = {
    where: {
      id: folderId,
    },
  };
  const { data, loading } = useFolderQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const [deleteDocument] = useDeleteDocumentMutation({
    awaitRefetchQueries: true,
    onCompleted: () => {
      notification.success({
        description: intl.formatMessage({
          defaultMessage:
            'The document has been deleted from the resources list!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
    refetchQueries: ['Folder'],
  });
  const updateFolderList: MutationUpdaterFn<UpsertFolderMutation> = (
    store,
    result
    // eslint-disable-next-line unicorn/consistent-function-scoping
  ) => {
    if (result === null || result === undefined) return;

    const existingData = store.readQuery<FolderQuery, FolderQueryVariables>({
      query: FolderDocument,
      variables,
    });
    if (existingData && result.data) {
      const oldData = existingData.folder.childFolders || [];
      const newData = result.data.upsertFolder;
      store.writeQuery<FolderQuery, FolderQueryVariables>({
        data: {
          folder: {
            ...existingData.folder,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            childFolders: [...oldData, newData],
            totalChildFolders: existingData.folder.totalChildFolders + 1,
          },
        },
        query: FolderDocument,
        variables,
      });
    }
  };
  const updateDocumentList: MutationUpdaterFn<CreateDocumentsMutation> = (
    store,
    result
    // eslint-disable-next-line unicorn/consistent-function-scoping
  ) => {
    if (result === null || result === undefined) return;

    const existingData = store.readQuery<FolderQuery, FolderQueryVariables>({
      query: FolderDocument,
      variables,
    });
    if (existingData && result.data) {
      const oldData = existingData.folder.documents || [];
      const newData = result.data.createDocuments;
      store.writeQuery<FolderQuery, FolderQueryVariables>({
        data: {
          folder: {
            ...existingData.folder,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            documents: [...oldData, ...newData],
            totalDocuments:
              existingData.folder.totalDocuments +
              result.data.createDocuments.length,
          },
        },
        query: FolderDocument,
        variables,
      });
    }
  };
  const [deleteFolder] = useDeleteFolderMutation({
    awaitRefetchQueries: true,
    onCompleted: (_data, clientOptions) => {
      // Check if we deleted the current folder or a child folder
      if (clientOptions?.variables?.id === folderId) {
        // Deleted the current folder being viewed - navigate away
        navigate('/app/resources/folders');
      }
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The folder has been deleted from the folder list!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
    refetchQueries: ['Folder'],
  });

  const onDeleteFolder = (value: string) => {
    setSaving(true);
    void deleteFolder({
      variables: {
        id: value || '',
      },
    }).finally(() => setSaving(false));
  };
  const onDelete = (value: string) => {
    setSaving(true);
    void deleteDocument({
      variables: {
        id: value || '',
      },
    }).finally(() => setSaving(false));
  };
  const deleteRights = hasRolePermission({
    permission: {
      method: PermissionMethod.Delete,
      model: PermissionModel.Documents,
    },
  });
  const addRights = hasRolePermission({
    permission: {
      method: PermissionMethod.Write,
      model: PermissionModel.Documents,
    },
  });
  // const addDocRights = hasRolePermission({
  //   permission: {
  //     method: PermissionMethod.Write,
  //     model: PermissionModel.Documents,
  //   },
  // });
  const editRights = hasRolePermission({
    permission: {
      method: PermissionMethod.Edit,
      model: PermissionModel.Documents,
    },
  });
  return {
    addDocument,
    addFolder,
    addRights,
    data,
    deleteRights,
    editFolder,
    editRights,
    loading,
    onDelete,
    onDeleteFolder,
    saving,
    search,
    setSearch,
    toggleAddDocument,
    toggleAddFolder,
    toggleEditFolder,
    updateDocumentList,
    updateFolderList,
  };
};

export default useViewFolder;
