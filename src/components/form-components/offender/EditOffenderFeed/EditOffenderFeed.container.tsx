import React from 'react';
import View from './EditOffenderFeed.view';
import useEditOffender from './useEditOffenderFeed';

interface Props {
  offenderId: string;
  onClose: () => void;
}

const EditOffender = ({ offenderId, onClose }: Props): JSX.Element => {
  const {
    onSubmit,
    data,
    loading,
    saving,
    groups,
    groupsLoading,
    tags,
    tagsLoading,
    customGalleries,
    customGalleriesLoading,
    ageCheck,
    setAgeCheck,
    idVerified,
    onValuesChange,
    adminRights,
  } = useEditOffender({ offenderId, onClose });
  return (
    <div>
      <View
        onSubmit={onSubmit}
        data={data}
        loading={loading}
        saving={saving}
        groups={groups}
        groupsLoading={groupsLoading}
        tags={tags}
        tagsLoading={tagsLoading}
        ageCheck={ageCheck}
        setAgeCheck={setAgeCheck}
        onClose={onClose}
        idVerified={idVerified}
        onValuesChange={onValuesChange}
        customGalleries={customGalleries}
        customGalleriesLoading={customGalleriesLoading}
        adminRights={adminRights}
      />
    </div>
  );
};

export default EditOffender;
