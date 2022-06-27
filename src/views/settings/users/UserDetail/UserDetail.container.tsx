import React from "react";
import View from "./UserDetail.view";

import useUserDetail from "./useUserDetail";

const UserDetail = () => {
  const { data, loading } = useUserDetail();
  return <View data={data} loading={loading} />;
};

export default UserDetail;
