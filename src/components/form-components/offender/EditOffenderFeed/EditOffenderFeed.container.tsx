import React from 'react';

import View from './EditOffenderFeed.view';
import useEditOffender from './useEditOffenderFeed';

interface Props {
  offenderId: string;
  onClose: () => void;
}

const EditOffender = ({ offenderId, onClose }: Props): JSX.Element => {
  const {
    customGalleries,
    customGalleriesLoading,
    data,
    groups,
    groupsLoading,
    loading,
    needJustification,
    offenderSettings,
    onSubmit,
    saving,
    tags,
    tagsLoading,
  } = useEditOffender({ offenderId, onClose });
  return (
    <div>
      <View
        customGalleries={customGalleries}
        customGalleriesLoading={customGalleriesLoading}
        data={data}
        groups={groups}
        groupsLoading={groupsLoading}
        loading={loading}
        needJustification={needJustification}
        offenderSettings={offenderSettings}
        onClose={onClose}
        onSubmit={onSubmit}
        saving={saving}
        tags={tags}
        tagsLoading={tagsLoading}
      />
    </div>
  );
};

export default EditOffender;
