import { useMemo, useState } from 'react';
import type {
  DocumentsQuery,
  DocumentsQueryVariables,
  CreateDocumentMutation,
} from 'graphql/generated';
import {
  DocumentType,
  DocumentsDocument,
  QueryMode,
  useDocumentsQuery,
  useDeleteDocumentMutation,
  PermissionMethod,
  PermissionModel,
} from 'graphql/generated';
import { useStoreState } from 'state';
import { notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import type { MutationUpdaterFn } from '@apollo/client';
import hasPermission from '#/utils/has-permission';
// import hasPermission from '#/utils/has-permission';

interface Return {
  data:
    | {
        node: {
          id: string;
          name: string;
          url: string;
          description?: string | null;
          fileType?: string | null;
          tags: Array<{
            __typename?: 'Tag';
            id: string;
            name: string;
          }>;
        };
      }[]
    | null
    | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addEvidence: boolean;
  toggleAddEvidence: () => void;
  saving: boolean;
  onDelete: (value: string) => void;
  updateNewEvidenceList: MutationUpdaterFn<CreateDocumentMutation>;
  deleteRights: boolean;
  createRights: boolean;
  downloadRights: boolean;
}

const useDocumentList = (): Return => {
  const { schemes } = useStoreState((state) => state.user);
  const { id: currentSchemeId, name: schemeName } = useStoreState(
    (state) => state.scheme
  );
  const currentScheme = useMemo(
    () => schemes.find((scheme) => scheme.scheme.id === currentSchemeId),
    [schemes, currentSchemeId]
  );
  const permissions = currentScheme?.permissions;

  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [addEvidence, setAddEvidence] = useState(false);

  const variables = {
    where: {
      schemeId: {
        equals: currentSchemeId,
      },
      type: {
        equals: DocumentType.Evidence,
      },

      OR: search
        ? [
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
          ]
        : undefined,
    },
  };
  const { data, loading } = useDocumentsQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });
  // delete
  const [deleteDocument] = useDeleteDocumentMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Removed',
        description: `The evidence has been removed from ${schemeName}!`,
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res === null || res === undefined) return;
      const existingData = store.readQuery<DocumentsQuery>({
        query: DocumentsDocument,
        variables,
      });

      if (existingData === null) return;
      let count = existingData?.documents?.totalCount || 1;
      count -= 1;
      store.writeQuery<DocumentsQuery>({
        query: DocumentsDocument,
        data: {
          documents: {
            totalCount: count,
            edges: existingData?.documents?.edges.filter(
              ({ node: document }) => document?.id !== res?.deleteDocument?.id
            ),
          },
        },

        variables,
      });
    },
  });

  const onDelete = (currentId: string) => {
    void deleteDocument({
      variables: {
        id: currentId,
      },
    }).finally(() => setSaving(false));
  };

  // createDocument
  const updateNewEvidenceList: MutationUpdaterFn<CreateDocumentMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<
      DocumentsQuery,
      DocumentsQueryVariables
    >({
      query: DocumentsDocument,
      variables,
    });

    if (existingData === null) return;

    let count = existingData?.documents?.totalCount || 0;
    count += 1;
    store.writeQuery<DocumentsQuery, DocumentsQueryVariables>({
      query: DocumentsDocument,
      data: {
        documents: {
          totalCount: count,
          edges: [
            ...existingData.documents.edges,
            { node: res.createDocument },
          ],
        },
      },
      variables,
    });
  };

  const toggleAddEvidence = () => {
    setAddEvidence(!addEvidence);
  };

  const deleteRights = hasPermission({
    permissions,
    permission: {
      model: PermissionModel.Evidence,
      method: PermissionMethod.Delete,
    },
  });
  const createRights = hasPermission({
    permissions,
    permission: {
      model: PermissionModel.Evidence,
      method: PermissionMethod.Write,
    },
  });
  const downloadRights = hasPermission({
    permissions,
    permission: {
      model: PermissionModel.Evidence,
      method: PermissionMethod.Read,
    },
  });

  return {
    data: data?.documents.edges,
    loading: (data === null || data === undefined) && loading,
    search,
    setSearch,
    addEvidence,
    toggleAddEvidence,
    saving,
    onDelete,
    updateNewEvidenceList,
    deleteRights,
    createRights,
    downloadRights,
  };
};

export default useDocumentList;
