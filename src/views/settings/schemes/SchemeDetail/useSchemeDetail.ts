import { useState } from 'react';
import {
  useSchemeQuery,
  SchemeQuery,
  useUpdateSchemeMutation,
} from 'graphql/generated';
import { notification } from 'antd';
import { useStoreState } from 'state';

interface FormData {
  name: string;
  id: string;
  logo: { id: string; url: string; optimised: string };
  autoApproveOffenders: boolean;
  autoApproveIncidents: boolean;
}
interface Return {
  data: SchemeQuery | undefined;
  loading: boolean;
  saving: boolean;
  schemeSubmit: (value: FormData) => void;
}
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const useSchemeDetail = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);

  const openNotification = (type: NotificationType) => {
    if (type === 'success') {
      notification.success({
        message: 'Success!',
        description: 'The Scheme has been deleted!',
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
  const { data: schemeData, loading } = useSchemeQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: schemeId,
      },
    },
  });
  const [updateScheme] = useUpdateSchemeMutation({
    onCompleted: () => {
      setSaving(false);
      openNotification('success');
    },
    onError: () => {
      openNotification('error');
    },
  });

  const schemeSubmit = (data: FormData) => {
    setSaving(true);
    if (schemeId)
      updateScheme({
        variables: {
          where: {
            id: schemeId,
          },
          data: {
            name: { set: data.name },
            id: { set: data.id },
            autoApproveIncidents: { set: data.autoApproveIncidents },
            autoApproveOffenders: { set: data.autoApproveOffenders },
            logo: {
              update: {
                id: {
                  set: data.logo.id,
                },
                url: {
                  set: data.logo.url,
                },
                optimised: {
                  set: data.logo.optimised,
                },
              },
            },
          },
        },
      });
  };

  return {
    data: schemeData,
    loading,
    saving,
    schemeSubmit,
  };
};

export default useSchemeDetail;
