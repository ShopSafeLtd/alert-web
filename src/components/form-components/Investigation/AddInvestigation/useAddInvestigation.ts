import { useState } from 'react';
import type { CreateInvestigationMutation } from 'graphql/generated';
import { useCreateInvestigationMutation } from 'graphql/generated';
import { notification } from 'antd';
import { useStoreState } from 'state';
import type { MutationUpdaterFn } from '@apollo/client';
import errorNotification from 'types/error_notification';

export interface InvestigationData {
  id?: string;
  name?: string;
  description?: string;
}

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateInvestigationMutation>;
}

interface Return {
  onSubmit: (value: InvestigationData) => void;
  saving: boolean;
}

const useAddInvestigation = ({ onClose, update }: Props): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [createInvestigation] = useCreateInvestigationMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: 'Successfully Added!',
        description: 'The investigation has been added! ',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update,
  });

  const onSubmit = (data: InvestigationData) => {
    setSaving(true);
    createInvestigation({
      variables: {
        data: {
          name: data.name || '',
          description: data.description,
          schemeId,
        },
      },
    });
  };

  return {
    onSubmit,
    saving,
  };
};
export default useAddInvestigation;
