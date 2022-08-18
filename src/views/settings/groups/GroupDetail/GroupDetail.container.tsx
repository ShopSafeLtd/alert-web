import React from 'react';
import { useParams } from 'react-router-dom';
import View from './GroupDetail.view';
import useGroupDetail from './useGroupDetail';

function GroupDetail(): JSX.Element {
  const groupId = useParams().id;

  const { data, loading, saving, editGroup, toggleEditGroup, deleteConfirm } =
    useGroupDetail(groupId || '');
  return (
    <div>
      <View
        data={data}
        loading={loading}
        saving={saving}
        editGroup={editGroup}
        toggleEditGroup={toggleEditGroup}
        deleteConfirm={deleteConfirm}
      />
    </div>
  );
}

export default GroupDetail;
