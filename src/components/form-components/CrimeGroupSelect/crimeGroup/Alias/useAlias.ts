import type { CrimeGroupQuery } from 'graphql/crime-groups/queries/__generated__/view-crime-group.generated';

import { notification } from 'antd';
import { useUpdateCrimeGroupMutation } from 'graphql/crime-groups/mutations/__generated__/update_crime_group.generated';
import { useCrimeGroupQuery } from 'graphql/crime-groups/queries/__generated__/view-crime-group.generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router';
import errorNotification from 'types/mutation_notifications/error_notification';

interface FormData {
  alias: string;
}

interface Props {
  onClose: () => void;
}

interface Return {
  data: CrimeGroupQuery | undefined;
  loading: boolean;
  onSubmit: (value: FormData) => void;
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
        description: intl.formatMessage({
          defaultMessage: 'The alias has been added to the crime group! ',
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
    void updateCrimeGroup({
      variables: {
        data: {
          alias: data.alias,
        },
        where: {
          id: params.id || '',
        },
      },
    });
  };

  return {
    data: crimeGroupData,
    loading,
    onSubmit,
    saving,
  };
};
export default useAddAlias;
