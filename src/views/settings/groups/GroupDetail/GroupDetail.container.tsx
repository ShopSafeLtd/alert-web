import React from 'react';
import { useParams } from 'react-router-dom';

import View from './GroupDetail.view';
import useGroupDetail from './useGroupDetail';

const GroupDetail = (): JSX.Element => {
  const groupId = useParams().id;

  const { data, deleteConfirm, editGroup, loading, saving, toggleEditGroup } =
    useGroupDetail(groupId || '');
  return (
    <div>
      <View
        data={data}
        deleteConfirm={deleteConfirm}
        editGroup={editGroup}
        loading={loading}
        saving={saving}
        toggleEditGroup={toggleEditGroup}
      />
    </div>
  );
};

export default GroupDetail;
