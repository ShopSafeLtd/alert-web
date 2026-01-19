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
    businessName,
    currency,
    form,
    groups,
    groupsLoading,
    loading,
    location,
    onSearchBusiness,
    onSubmit,
    onSyncCancel,
    onSyncConfirm,
    saving,
    setLocation,
    showSyncModal,
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
      businessName={businessName}
      currency={currency}
      form={form}
      groups={groups}
      groupsLoading={groupsLoading}
      loading={loading}
      location={location}
      onClose={onClose}
      onSearchBusiness={onSearchBusiness}
      onSubmit={onSubmit}
      onSyncCancel={onSyncCancel}
      onSyncConfirm={onSyncConfirm}
      saving={saving}
      setLocation={setLocation}
      showSyncModal={showSyncModal}
      tags={tags}
      tagsLoading={tagsLoading}
      toggleAddTag={toggleAddTag}
      updateNewTagData={updateNewTagData}
    />
  );
};

export default EditBusiness;
