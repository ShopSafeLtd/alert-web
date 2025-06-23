import type { FolderData } from '#/types/DataType';
import type { UpsertFolderMutation } from '#/views/resources/folders/graphql/mutations/__generated__/upsert-folder.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { FormInstance } from 'antd';

import errorNotification from '#/types/mutation_notifications/error_notification';
import { useUpsertFolderMutation } from '#/views/resources/folders/graphql/mutations/__generated__/upsert-folder.generated';
import { Form, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { useEditFolderQuery } from './graphql/__generated__/eidtFolder.generated';

const { useForm } = Form;
export interface FormData {
  description: string;
  name: string;
  // parent: ValueType;
  parentId: string;
  roles: string[];
}
interface Props {
  folderId?: string;
  onAddNewFolder?: (value: FolderData) => void;
  onClose: () => void;
  parentFolderId?: string;
  update?: MutationUpdaterFn<UpsertFolderMutation>;
}

interface Return {
  form: FormInstance<FormData>;
  loading: boolean;
  onSelectParent: (data: string) => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const useAddFolder = ({
  folderId,
  onAddNewFolder,
  onClose,
  parentFolderId,
  update,
}: Props): Return => {
  const intl = useIntl();

  const [form] = useForm<FormData>();
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (parentFolderId)
      form.setFieldsValue({
        parentId: parentFolderId,
      });
  }, [parentFolderId]);
  const { loading } = useEditFolderQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ folder }) => {
      form.setFieldsValue({
        description: folder.description || '',
        name: folder.name,
        parentId: folder.parentFolderId || '',
        roles: folder.roles.map((role) => role.id) || [],
      });
    },
    skip: !folderId,
    variables: {
      where: {
        id: folderId,
      },
    },
  });

  const onSelectParent = (value: string) => {
    form.setFieldsValue({
      parentId: value,
    });
  };
  const [createFolder] = useUpsertFolderMutation({
    onCompleted: () => {
      if (folderId) {
        notification.success({
          description: intl.formatMessage({
            defaultMessage: 'The folder has been updated.',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Successfully Updated!',
          }),
          placement: 'bottomRight',
        });
      } else {
        notification.success({
          description: intl.formatMessage({
            defaultMessage: 'The folder has been added.',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Successfully Added!',
          }),
          placement: 'bottomRight',
        });
      }
    },
    onError: () => {
      errorNotification();
    },
    update,
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);

    if (onAddNewFolder) {
      onAddNewFolder(data);
      setSaving(false);
      onClose();
    } else {
      void createFolder({
        variables: {
          data: {
            description: data.description,
            folderId,
            name: data.name,
            parentId: parentFolderId || data.parentId,
            roleIds: data.roles,
          },
        },
      }).finally(() => {
        setSaving(false);
        onClose();
      });
    }
  };

  return {
    form,
    loading,
    onSelectParent,
    onSubmit,
    saving,
  };
};
export default useAddFolder;
