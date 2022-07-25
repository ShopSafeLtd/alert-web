import React from 'react';
import { MutationUpdaterFn } from '@apollo/client';
import { CreateBanMutation } from 'graphql/generated';
import View from './AddExclusion.view';
import useAddExclusion from './useAddExclusion';

interface Props {
  onClose: () => void;
  offenderId: string | undefined;
  update: MutationUpdaterFn<CreateBanMutation>;
}

const AddExclusion = ({ update, onClose, offenderId }: Props): JSX.Element => {
  const { onSubmit, saving, setStartDate, disabledDate } = useAddExclusion({
    onClose,
    offenderId,
    update,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      saving={saving}
      setStartDate={setStartDate}
      disabledDate={disabledDate}
    />
  );
};

export default AddExclusion;
