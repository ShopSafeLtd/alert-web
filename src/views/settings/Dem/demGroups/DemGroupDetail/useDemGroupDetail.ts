import { useDeleteDemGroupMutation } from '#/components/form-components/DemGroup/AddDemGroup/graphql/mutations/__generated__/delete-dem-group.generated';
import { notification } from 'antd';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

import type { DemGroupQuery } from '../graphql/queries/__generated__/dem-group.generated';

import { useDemGroupQuery } from '../graphql/queries/__generated__/dem-group.generated';

interface Return {
  data: DemGroupQuery | undefined;
  deleteConfirm: () => void;
  editDemGroup: boolean;
  loading: boolean;
  saving: boolean;
  toggleEditDemGroup: () => void;
}

const useDemGroupDetail = (demGroupId: string): Return => {
  const intl = useIntl();
  const [saving, setSaving] = useState(false);
  const [editDemGroup, setEditDemGroup] = useState(false);

  const { data, loading } = useDemGroupQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: demGroupId,
      },
    },
  });

  const [deleteDemGroup] = useDeleteDemGroupMutation({
    onCompleted: () => {
      setSaving(false);
      window.history.back();
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The dem group has been deleted.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const deleteConfirm = () => {
    setSaving(true);
    if (demGroupId)
      void deleteDemGroup({
        variables: {
          id: demGroupId,
        },
      });
  };
  const toggleEditDemGroup = () => setEditDemGroup(!editDemGroup);

  return {
    data,
    deleteConfirm,
    editDemGroup,
    loading,
    saving,
    toggleEditDemGroup,
  };
};

export default useDemGroupDetail;
