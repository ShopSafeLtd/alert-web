import React from 'react';
import View from './GroupDetail.view';

import useGroupDetail from './useGroupDetail';

function GroupDetail(): JSX.Element {
  const { data, loading, saving, editGroup, toggleEditGroup, deleteConfirm } =
    useGroupDetail();
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
