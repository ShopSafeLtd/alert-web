import type { DemDeviceData } from '#/types/DataType';
import type { MutationUpdaterFn } from '@apollo/client';

import React from 'react';

import type { UpsertDemDeviceMutation } from './graphql/mutations/__generated__/upsert-dem-device.generated';

import View from './AddDemDevice.view';
import useAddDemDevice from './useAddDemDevice';

interface Props {
  businessId?: string;
  editData?: DemDeviceData;
  onClose: () => void;
  update?: MutationUpdaterFn<UpsertDemDeviceMutation>;
}

const AddDemDevice = ({
  businessId,
  editData,
  onClose,
  update: updateMutation,
}: Props): JSX.Element => {
  const { form, loading, modelsData, onSubmit, saving } = useAddDemDevice({
    businessId,
    editData,
    onClose,
    updateMutation,
  });

  return (
    <View
      businessId={businessId}
      editData={editData}
      form={form}
      loading={loading}
      modelsData={modelsData}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
    />
  );
};

export default AddDemDevice;
