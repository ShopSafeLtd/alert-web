import React from "react";
import View from "./GroupDetail.view";

import useGroupDetail from "./useGroupDetail";

function UserDetail() {
  const { data, loading } = useGroupDetail();
  return (
    <div>
      <View data={data} loading={loading} />
    </div>
  );
}

export default UserDetail;
