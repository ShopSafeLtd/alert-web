import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateGroupMutation } from 'graphql/generated';
import React from 'react';
import View from './AddGroup.view';
import useAddGroup from './useAddGroup';

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateGroupMutation>;
}

const AddGroup = ({ onClose, update }: Props): JSX.Element => {
  const { onSubmit, usersData, usersLoading, saving } = useAddGroup({
    onClose,
    update,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      usersData={usersData}
      usersLoading={usersLoading}
      saving={saving}
    />
  );
};

export default AddGroup;
