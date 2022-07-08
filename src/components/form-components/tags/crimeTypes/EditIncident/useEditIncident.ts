import { useState } from 'react';
// import { useStoreState } from 'state';
import { TagQuery, useUpdateTagMutation, useTagQuery } from 'graphql/generated';
import { notification } from 'antd';

interface FormData {
  name: string;
  description: string;
}
interface Props {
  onClose: () => void;
  incidentId: string;
}
interface Return {
  onSubmit: (value: FormData) => void;
  data: TagQuery | undefined;
  loading: boolean;
  saving: boolean;
}
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const useEditIncident = ({ onClose, incidentId }: Props): Return => {
  // const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);

  const openNotification = (type: NotificationType) => {
    if (type === 'success') {
      notification.success({
        message: 'Success!',
        description: 'The user has been updated! ',
        placement: 'bottomRight',
      });
    } else if (type === 'error') {
      notification.error({
        message: 'error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    }
  };
  const { data: TagData, loading } = useTagQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: incidentId,
      },
    },
  });

  const [updateTag] = useUpdateTagMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      openNotification('success');
    },
    onError: () => {
      openNotification('error');
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    if (incidentId)
      updateTag({
        variables: {
          where: {
            id: incidentId,
          },
          data: {
            name: { set: data.name },
            description: { set: data.description },
          },
        },
      });
  };

  return {
    onSubmit,
    data: TagData,
    loading,
    saving,
  };
};

export default useEditIncident;
