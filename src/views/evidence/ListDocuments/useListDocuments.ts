import type { CreateDocumentsMutation } from '#/graphql/documents/mutations/__generated__/create-documents.generated';
import type {
  DocumentsQuery,
  DocumentsQueryVariables,
} from '#/views/evidence/grapqhl/queries/__generated__/documents.generated';
import type { MutationUpdaterFn } from '@apollo/client';

import hasRolePermission from '#/utils/has-role-permission';
import {
  DocumentsDocument,
  useDocumentsQuery,
} from '#/views/evidence/grapqhl/queries/__generated__/documents.generated';
import { type TableProps, notification } from 'antd';
import { useDeleteDocumentMutation } from 'graphql/documents/mutations/__generated__/delete-document.generated';
import {
  DocumentType,
  PermissionMethod,
  PermissionModel,
  QueryMode,
} from 'graphql/types';
import { useState } from 'react';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

interface TableItem {
  fileUrl: string;
  key: string;
  name: string;
  tags: { id: string; name: string }[];
}

interface Return {
  addEvidence: boolean;
  createRights: boolean;
  data: DocumentsQuery | null | undefined;
  deleteRights: boolean;
  downloadRights: boolean;
  loading: boolean;
  onDelete: (value: string) => void;
  onTableChange: TableProps<TableItem>['onChange'];
  saving: boolean;
  search: string;
  setSearch: (value: string) => void;
  toggleAddEvidence: () => void;
  updateNewEvidenceList: MutationUpdaterFn<CreateDocumentsMutation>;
}

const useDocumentList = (): Return => {
  const { id: currentSchemeId, name: schemeName } = useStoreState(
    (state) => state.scheme
  );

  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [addEvidence, setAddEvidence] = useState(false);
  const [skip, setSkip] = useState(0);

  const variables: DocumentsQueryVariables = {
    skip,
    take: 20,
    where: {
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
      schemeId: {
        equals: currentSchemeId,
      },
      type: {
        equals: DocumentType.Evidence,
      },
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
        description: `The evidence has been removed from ${schemeName}!`,
        message: 'Successfully Removed',
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
        data: {
          documents: {
            edges: existingData?.documents?.edges.filter(
              ({ node: document }) => document?.id !== res?.deleteDocument?.id
            ),
            totalCount: count,
          },
        },
        query: DocumentsDocument,

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
  const updateNewEvidenceList: MutationUpdaterFn<CreateDocumentsMutation> = (
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
    count += res.createDocuments.length;
    const nodes = res.createDocuments.map((el) => ({
      node: el,
    }));
    store.writeQuery<DocumentsQuery, DocumentsQueryVariables>({
      data: {
        documents: {
          edges: [...existingData.documents.edges, ...nodes],
          totalCount: count,
        },
      },
      query: DocumentsDocument,
      variables,
    });
  };

  const toggleAddEvidence = () => {
    setAddEvidence(!addEvidence);
  };

  const deleteRights = hasRolePermission({
    permission: {
      method: PermissionMethod.Delete,
      model: PermissionModel.Evidence,
    },
  });
  const createRights = hasRolePermission({
    permission: {
      method: PermissionMethod.Write,
      model: PermissionModel.Evidence,
    },
  });
  const downloadRights = hasRolePermission({
    permission: {
      method: PermissionMethod.Read,
      model: PermissionModel.Evidence,
    },
  });

  const onTableChange: TableProps<TableItem>['onChange'] = (pagination) => {
    if (pagination.current) setSkip(pagination.current * 20 - 20);
  };

  return {
    addEvidence,
    createRights,
    data,
    deleteRights,
    downloadRights,
    loading: (data === null || data === undefined) && loading,
    onDelete,
    onTableChange,
    saving,
    search,
    setSearch,
    toggleAddEvidence,
    updateNewEvidenceList,
  };
};

export default useDocumentList;
