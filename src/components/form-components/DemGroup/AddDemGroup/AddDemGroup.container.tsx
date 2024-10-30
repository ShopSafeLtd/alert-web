import type { DemGroupData } from '#/types/DataType';
import type { MutationUpdaterFn } from '@apollo/client';

import React from 'react';

import type { UpsertDemGroupMutation } from './graphql/mutations/__generated__/upsert-dem-group.generated';

import View from './AddDemGroup.view';
import useAddDemGroup from './useAddDemGroup';

interface Props {
  editData?: DemGroupData;
  onClose: () => void;
  update?: MutationUpdaterFn<UpsertDemGroupMutation>;
}

const AddDemGroup = ({
  editData,
  onClose,
  update: updateMutation,
}: Props): JSX.Element => {
  const { devicesData, form, loading, onSubmit, saving } = useAddDemGroup({
    editData,
    onClose,
    updateMutation,
  });

  return (
    <View
      devicesData={devicesData}
      editData={editData}
      form={form}
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
    />
  );
};

export default AddDemGroup;
