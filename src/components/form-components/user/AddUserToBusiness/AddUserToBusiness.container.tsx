import type { MutationUpdaterFn } from '@apollo/client';
import type { AddUsersToBusinessMutation } from 'graphql/businesses/mutations/__generated__/add-users-to-business.generated';

import React from 'react';

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
      data={data}
      loading={loading}
      onClose={onClose}
      onSelectChange={onSelectChange}
      onSubmit={onSubmit}
      saving={saving}
    />
  );
};

export default AddUserToBusiness;
