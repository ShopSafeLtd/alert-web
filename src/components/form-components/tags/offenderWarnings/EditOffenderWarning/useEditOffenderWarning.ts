import type { TagQuery} from 'graphql/tag/queries/__generated__/tag.generated';

import { notification } from 'antd';
import { useUpdateTagMutation } from 'graphql/tag/mutation/__generated__/update_tag.generated';
import { useTagQuery } from 'graphql/tag/queries/__generated__/tag.generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';


interface FormData {
  description: string;
  name: string;
}
interface Props {
  offenderId: string;
  onClose: () => void;
}
interface Return {
  data: TagQuery | undefined;
  loading: boolean;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const useEditOffenderWarning = ({ offenderId, onClose }: Props): Return => {
  const [saving, setSaving] = useState(false);
  const intl = useIntl();
  const { data: TagData, loading } = useTagQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: offenderId,
      },
    },
  });

  const [updateTag] = useUpdateTagMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The offender warning has been updated.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    if (offenderId)
      void updateTag({
        variables: {
          data: {
            description: { set: data.description },
            name: { set: data.name },
          },
          where: {
            id: offenderId,
          },
        },
      });
  };

  return {
    data: TagData,
    loading,
    onSubmit,
    saving,
  };
};

export default useEditOffenderWarning;
