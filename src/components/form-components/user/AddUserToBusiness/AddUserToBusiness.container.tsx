import React from 'react';
import type { MutationUpdaterFn } from '@apollo/client';
import View from './AddUserToBusiness.view';
import useAddUserToBusiness from './useAddUserToBusiness';
import type { AddUsersToBusinessMutation } from 'graphql/businesses/mutations/add-users-to-business.generated';

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
