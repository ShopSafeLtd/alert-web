import React from 'react';
import type { BusinessData } from 'types/DataType';
import View from './AddBusiness.view';
import useAddBusiness from './useAddBusiness';

interface Props {
  onClose: () => void;
  update: (value: BusinessData) => void;
  saving: boolean;
}

const AddBusiness = ({ onClose, update, saving }: Props) => {
  const {
    onSubmit,
    form,
    location,
    setLocation,
    tags,
    tagsLoading,
    addTag,
    toggleAddTag,
    updateNewTagData,
    groups,
    groupsLoading,
  } = useAddBusiness({
    update,
  });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      saving={saving}
      form={form}
      location={location}
      setLocation={setLocation}
      tags={tags}
      tagsLoading={tagsLoading}
      addTag={addTag}
      toggleAddTag={toggleAddTag}
      updateNewTagData={updateNewTagData}
      groups={groups}
      groupsLoading={groupsLoading}
    />
  );
};

export default AddBusiness;
