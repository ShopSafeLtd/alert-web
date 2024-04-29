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
    adminRights,
    needJustification,
    offenderSettings,
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
        onClose={onClose}
        customGalleries={customGalleries}
        customGalleriesLoading={customGalleriesLoading}
        adminRights={adminRights}
        needJustification={needJustification}
        offenderSettings={offenderSettings}
      />
    </div>
  );
};

export default EditOffender;
