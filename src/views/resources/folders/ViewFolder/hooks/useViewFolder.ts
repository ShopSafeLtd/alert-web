import type { CreateDocumentsMutation } from '#/graphql/documents/mutations/__generated__/create-documents.generated';
import type { MutationUpdaterFn } from '@apollo/client';

import { useDeleteDocumentMutation } from '#/graphql/documents/mutations/__generated__/delete-document.generated';
import errorNotification from '#/types/mutation_notifications/error_notification';
import hasRolePermission from '#/utils/has-role-permission';
import { notification } from 'antd';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router';

import type { UpsertFolderMutation } from '../../graphql/mutations/__generated__/upsert-folder.generated';
import type {
  FolderQuery,
  FolderQueryVariables,
} from '../../graphql/queries/__generated__/folder.generated';
import type { Props as Return } from '../types/ViewFolder';

import {
  FolderDocument,
  useFolderQuery,
} from '../../graphql/queries/__generated__/folder.generated';

const useViewFolder = (): Return => {
  const params = useParams();
  const folderId = params.id || '';
  const intl = useIntl();
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
    update: (store, { data: res }) => {
      if (res?.deleteDocument === null || res?.deleteDocument === undefined)
        return;

      const existingData = store.readQuery<FolderQuery>({
        query: FolderDocument,
        variables,
      });

      if (!existingData?.folder) return;

      store.writeQuery<FolderQuery>({
        data: {
          __typename: 'Query',
          folder: {
            ...existingData.folder,
            documents: existingData.folder.documents.filter(
              ({ id }) => id !== res.deleteDocument.id
            ),
            totalDocuments: existingData.folder.totalDocuments - 1,
          },
        },
        query: FolderDocument,
        variables,
      });
    },
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
      });
    }
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
