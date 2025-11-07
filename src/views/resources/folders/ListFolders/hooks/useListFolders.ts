import type { CreateDocumentsMutation } from '#/graphql/documents/mutations/__generated__/create-documents.generated';
import type { MutationUpdaterFn } from '@apollo/client';

import { useDeleteDocumentMutation } from '#/graphql/documents/mutations/__generated__/delete-document.generated';
import errorNotification from '#/types/mutation_notifications/error_notification';
import hasRolePermission from '#/utils/has-role-permission';
import { notification } from 'antd';
import { PermissionMethod, PermissionModel, QueryMode } from 'graphql/types';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import type { UpsertFolderMutation } from '../../graphql/mutations/__generated__/upsert-folder.generated';
import type {
  DocumentsNoFolderQuery,
  DocumentsNoFolderQueryVariables,
} from '../../graphql/queries/__generated__/documents_no_folder.generated';
import type {
  FoldersQuery,
  FoldersQueryVariables,
} from '../../graphql/queries/__generated__/folders.generated';
import type { Props as Return } from '../types/folders';

import { useDeleteFolderMutation } from '../../graphql/mutations/__generated__/delete-folder.generated';
import {
  DocumentsNoFolderDocument,
  useDocumentsNoFolderQuery,
} from '../../graphql/queries/__generated__/documents_no_folder.generated';
import {
  FoldersDocument,
  useFoldersQuery,
} from '../../graphql/queries/__generated__/folders.generated';

const useListFolder = (): Return => {
  const intl = useIntl();

  const [addDocument, setAddDocument] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const toggleAddDocument = () => setAddDocument(!addDocument);
  const [addFolder, setAddFolder] = useState(false);
  const toggleAddFolder = () => setAddFolder(!addFolder);
  const folderVariables: FoldersQueryVariables = {
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },

        {
          description: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
      ],
    },
  };
  const docVariables: DocumentsNoFolderQueryVariables = {
    where: {
      name: search
        ? {
            contains: search,
            mode: QueryMode.Insensitive,
          }
        : undefined,
    },
  };
  const { data, fetchMore, loading } = useFoldersQuery({
    fetchPolicy: 'cache-and-network',
    variables: folderVariables,
  });
  const fetchMoreScroll = () => {
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          folders: {
            ...fetchMoreResult.folders,
            edges: [
              ...(prev.folders?.edges || []),
              ...(fetchMoreResult.folders?.edges || []),
            ],
          },
        };
      },
      variables: {
        ...folderVariables,
        after: data?.folders?.pageInfo?.endCursor,
      },
    });
  };

  const {
    data: documentsData,
    fetchMore: documentFetch,
    loading: documentsLoading,
  } = useDocumentsNoFolderQuery({
    fetchPolicy: 'cache-and-network',
    variables: docVariables,
  });
  const fetchMoreDocScroll = () => {
    void documentFetch({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          documentsNoFolder: {
            ...fetchMoreResult.documentsNoFolder,
            edges: [
              ...(prev.documentsNoFolder?.edges || []),
              ...(fetchMoreResult.documentsNoFolder?.edges || []),
            ],
          },
        };
      },
      variables: {
        ...docVariables,
        after: documentsData?.documentsNoFolder?.pageInfo?.endCursor,
      },
    });
  };
  const updateFolderList: MutationUpdaterFn<UpsertFolderMutation> = (
    store,
    result
    // eslint-disable-next-line unicorn/consistent-function-scoping
  ) => {
    if (result === null || result === undefined) return;

    const existingData = store.readQuery<FoldersQuery, FoldersQueryVariables>({
      query: FoldersDocument,
      variables: folderVariables,
    });
    if (existingData && result.data) {
      const oldData = existingData.folders.edges || [];
      const newData = { node: result.data.upsertFolder };
      store.writeQuery<FoldersQuery, FoldersQueryVariables>({
        data: {
          folders: {
            ...existingData.folders,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            edges: [...oldData, newData],
            totalCount: existingData.folders.totalCount + 1,
          },
        },
        query: FoldersDocument,
        variables: folderVariables,
      });
    }
  };
  const updateDocumentList: MutationUpdaterFn<CreateDocumentsMutation> = (
    store,
    result
    // eslint-disable-next-line unicorn/consistent-function-scoping
  ) => {
    if (result === null || result === undefined) return;

    const existingData = store.readQuery<
      DocumentsNoFolderQuery,
      DocumentsNoFolderQueryVariables
    >({
      query: DocumentsNoFolderDocument,
    });
    if (existingData && result.data) {
      const oldDocuments = existingData.documentsNoFolder.edges || [];
      const newDocuments = result.data.createDocuments.map((el) => ({
        node: el,
      }));
      store.writeQuery<DocumentsNoFolderQuery, DocumentsNoFolderQueryVariables>(
        {
          data: {
            documentsNoFolder: {
              ...existingData.documentsNoFolder,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              edges: [...oldDocuments, ...newDocuments],
              totalCount:
                existingData.documentsNoFolder.totalCount +
                result.data.createDocuments.length,
            },
          },
          query: DocumentsNoFolderDocument,
          variables: docVariables,
        }
      );
    }
  };
  const [deleteFolder] = useDeleteFolderMutation({
    onCompleted: () => {
      notification.success({
        description: intl.formatMessage({
          defaultMessage:
            'The folder has been deleted from the resources list!',
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
      if (res?.deleteFolder === null || res?.deleteFolder === undefined) return;

      const existingData = store.readQuery<FoldersQuery>({
        query: FoldersDocument,
      });

      if (!existingData?.folders) return;

      store.writeQuery<FoldersQuery>({
        data: {
          __typename: 'Query',
          folders: {
            ...existingData.folders,
            edges: existingData.folders.edges.filter(
              ({ node }) => node.id !== res.deleteFolder.id
            ),
            totalCount: existingData.folders.totalCount - 1,
          },
        },
        query: FoldersDocument,
        variables: folderVariables,
      });
    },
  });

  const onDeleteFolder = (value: string) => {
    setSaving(true);
    void deleteFolder({
      variables: {
        id: value || '',
      },
    }).finally(() => setSaving(false));
  };
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

      const existingData = store.readQuery<DocumentsNoFolderQuery>({
        query: DocumentsNoFolderDocument,
      });

      if (!existingData?.documentsNoFolder) return;

      store.writeQuery<DocumentsNoFolderQuery>({
        data: {
          __typename: 'Query',
          documentsNoFolder: {
            ...existingData.documentsNoFolder,
            edges: existingData.documentsNoFolder.edges.filter(
              ({ node }) => node.id !== res.deleteDocument.id
            ),
            totalCount: existingData.documentsNoFolder.totalCount - 1,
          },
        },
        query: DocumentsNoFolderDocument,
        variables: docVariables,
      });
    },
  });

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
  return {
    addDocument,
    addFolder,
    addRights,
    data,
    deleteRights,
    documentsData,
    documentsLoading,
    fetchMoreDocScroll,
    fetchMoreScroll,
    loading,
    onDelete,
    onDeleteFolder,
    saving,
    search,
    setSearch,
    toggleAddDocument,
    toggleAddFolder,
    updateDocumentList,
    updateFolderList,
  };
};

export default useListFolder;
