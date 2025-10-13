import type { CustomGalleryData } from 'types/DataType';

import React from 'react';

import View from './AddCustomGallery.view';
import useAddCustomGallery from './useAddCustomGallery';

interface Props {
  data?: CustomGalleryData;
  onClose: () => void;
  saving?: boolean;
  update: (value: CustomGalleryData) => void;
}

const AddCustomGallery = ({
  data,
  onClose,
  saving,
  update,
}: Props): JSX.Element => {
  const { groupsData, groupsLoading, onSubmit } = useAddCustomGallery({
    data,
    update,
  });

  return (
    <View
      data={data}
      groupsData={groupsData}
      groupsLoading={groupsLoading}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving || false}
    />
  );
};

export default AddCustomGallery;
