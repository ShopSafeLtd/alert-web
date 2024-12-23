import type { BusinessData } from 'types/DataType';

import React from 'react';

import View from './AddBusiness.view';
import useAddBusiness from './useAddBusiness';

interface Props {
  onClose: () => void;
  saving: boolean;
  update: (value: BusinessData) => void;
}

const AddBusiness = ({ onClose, saving, update }: Props) => {
  const {
    addTag,
    form,
    groups,
    groupsLoading,
    location,
    onSubmit,
    setLocation,
    tags,
    tagsLoading,
    toggleAddTag,
    updateNewTagData,
  } = useAddBusiness({
    update,
  });

  return (
    <View
      addTag={addTag}
      form={form}
      groups={groups}
      groupsLoading={groupsLoading}
      location={location}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
      setLocation={setLocation}
      tags={tags}
      tagsLoading={tagsLoading}
      toggleAddTag={toggleAddTag}
      updateNewTagData={updateNewTagData}
    />
  );
};

export default AddBusiness;
