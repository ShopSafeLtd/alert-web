import React from 'react';

import View from './EditBusiness.view';
import useEditBusiness from './useEditBusiness';

interface Props {
  businessId: string | undefined;
  onClose: () => void;
}

const EditBusiness = ({ businessId, onClose }: Props) => {
  const {
    addTag,
    brands,
    brandsLoading,
    form,
    groups,
    groupsLoading,
    loading,
    location,
    onSearchBusiness,
    onSubmit,
    saving,
    setLocation,
    tags,
    tagsLoading,
    toggleAddTag,
    updateNewTagData,
  } = useEditBusiness({ businessId, onClose });

  return (
    <View
      addTag={addTag}
      brands={brands}
      brandsLoading={brandsLoading}
      form={form}
      groups={groups}
      groupsLoading={groupsLoading}
      loading={loading}
      location={location}
      onClose={onClose}
      onSearchBusiness={onSearchBusiness}
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

export default EditBusiness;
