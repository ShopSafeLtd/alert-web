import React from 'react';
import View from './EditBusiness.view';
import useEditBusiness from './useEditBusiness';

interface Props {
  onClose: () => void;
  businessId: string | undefined;
}

const EditBusiness = ({ onClose, businessId }: Props) => {
  const {
    onSubmit,
    onSearchBusiness,
    saving,
    form,
    loading,
    location,
    setLocation,
    tags,
    tagsLoading,
    addTag,
    toggleAddTag,
    updateNewTagData,
    groups,
    groupsLoading,
  } = useEditBusiness({ onClose, businessId });

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      onSearchBusiness={onSearchBusiness}
      saving={saving}
      form={form}
      loading={loading}
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

export default EditBusiness;
