import type { ListDocumentsOnSchemeQuery } from 'graphql/documents/queries/__generated__/list-documents.generated';

import { useDeleteDocumentMutation } from '#/graphql/documents/mutations/__generated__/delete-document.generated';
import errorNotification from '#/types/mutation_notifications/error_notification';
import hasPermission from '#/utils/has-permission';
import { notification } from 'antd';
import {
  ListDocumentsOnSchemeDocument,
  useListDocumentsOnSchemeQuery,
} from 'graphql/documents/queries/__generated__/list-documents.generated';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import type { Props as Return } from '../types/Documents';

import { useStoreState } from '../../../../../state';

const useListDocuments = (): Return => {
  const intl = useIntl();
  const [addDocument, setAddDocument] = useState(false);
  const [saving, setSaving] = useState(false);
  const toggleAddDocument = () => setAddDocument(!addDocument);
  const schemes = useStoreState((state) => state.user.schemes);
  const schemeId = useStoreState((state) => state.scheme.id);
  const currentScheme = useMemo(
    () => schemes.find((scheme) => scheme.scheme.id === schemeId),
    [schemes, schemeId]
  );
  const permissions = currentScheme?.permissions;

  const variables = {
    where: {
      id: schemeId,
    },
  };
  const { data, loading } = useListDocumentsOnSchemeQuery({
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
      const existingData = store.readQuery<ListDocumentsOnSchemeQuery>({
        query: ListDocumentsOnSchemeDocument,
        variables,
      });

      if (!existingData?.scheme) return;
      store.writeQuery<ListDocumentsOnSchemeQuery>({
        data: {
          __typename: 'Query',
          scheme: {
            ...existingData.scheme,
            documents: existingData.scheme.documents.filter(
              ({ id }) => id !== res.deleteDocument?.id
            ),
          },
        },
        query: ListDocumentsOnSchemeDocument,
        variables,
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
  const deleteRights = hasPermission({
    permission: {
      method: PermissionMethod.Delete,
      model: PermissionModel.Documents,
    },
    permissions,
  });
  const addRights = hasPermission({
    permission: {
      method: PermissionMethod.Write,
      model: PermissionModel.Documents,
    },
    permissions,
  });
  return {
    addDocument,
    addRights,
    data,
    deleteRights,
    loading,
    onDelete,
    saving,
    toggleAddDocument,
  };
};

export default useListDocuments;
