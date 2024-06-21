import { useState } from 'react';
import { notification } from 'antd';

import { useParams } from 'react-router';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import type { CrimeGroupQuery } from 'graphql/crime-groups/queries/view-crime-group.generated';
import { useCrimeGroupQuery } from 'graphql/crime-groups/queries/view-crime-group.generated';
import { useUpdateCrimeGroupMutation } from 'graphql/crime-groups/mutations/update_crime_group.generated';

interface FormData {
  alias: string;
}

interface Props {
  onClose: () => void;
}

interface Return {
  onSubmit: (value: FormData) => void;
  data: CrimeGroupQuery | undefined;
  loading: boolean;
  saving: boolean;
}

const useAddAlias = ({ onClose }: Props): Return => {
  const intl = useIntl();
  const params = useParams();
  const [saving, setSaving] = useState(false);

  const { data: crimeGroupData, loading } = useCrimeGroupQuery({
    variables: {
      where: {
        id: params.id,
      },
    },
  });

  const [updateCrimeGroup] = useUpdateCrimeGroupMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The alias has been added to the crime group! ',
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
    void updateCrimeGroup({
      variables: {
        where: {
          id: params.id || '',
        },
        data: {
          alias: data.alias,
        },
      },
    });
  };

  return {
    onSubmit,
    saving,
    data: crimeGroupData,
    loading,
  };
};
export default useAddAlias;
