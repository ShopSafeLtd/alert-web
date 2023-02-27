import { useState } from 'react';
import {
  CreateInvestigationMutation,
  useCreateInvestigationMutation,
} from 'graphql/generated';
import { notification } from 'antd';
import { useStoreState } from 'state';
import { MutationUpdaterFn } from '@apollo/client';

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
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
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
