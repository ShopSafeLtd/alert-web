import React from 'react';
import { MutationUpdaterFn } from '@apollo/client';
import { AddUsersToBusinessMutation } from 'graphql/generated';
import View from './AddUserToBusiness.view';
import useAddUserToBusiness from './useAddUserToBusiness';

interface Props {
  businessId: string;
  onClose: () => void;
  update: MutationUpdaterFn<AddUsersToBusinessMutation>;
}

const AddUserToBusiness = ({ businessId, onClose, update }: Props) => {
  const { data, loading, onSelectChange, onSubmit, saving } =
    useAddUserToBusiness({ businessId, onClose, update });

  return (
    <View
      onClose={onClose}
      data={data}
      loading={loading}
      onSelectChange={onSelectChange}
      onSubmit={onSubmit}
      saving={saving}
    />
  );
};

export default AddUserToBusiness;
