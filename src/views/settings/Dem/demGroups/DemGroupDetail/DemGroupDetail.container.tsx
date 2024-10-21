import React from 'react';
import { useParams } from 'react-router-dom';

import View from './DemGroupDetail.view';
import useDemGroupDetail from './useDemGroupDetail';

const DemGroupDetail = (): JSX.Element => {
  const groupId = useParams().id;

  const {
    data,
    deleteConfirm,
    editDemGroup,
    loading,
    saving,
    toggleEditDemGroup,
  } = useDemGroupDetail(groupId || '');
  return (
    <div>
      <View
        data={data}
        deleteConfirm={deleteConfirm}
        editDemGroup={editDemGroup}
        loading={loading}
        saving={saving}
        toggleEditDemGroup={toggleEditDemGroup}
      />
    </div>
  );
};

export default DemGroupDetail;
