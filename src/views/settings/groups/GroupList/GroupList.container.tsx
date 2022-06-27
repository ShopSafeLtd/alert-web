import React from "react";
import View from "./GroupList.view";
import useGroupList from "./useGroupList";

const GroupList = () => {
  const { data, loading, search, setSearch } = useGroupList();
  return (
    <View data={data} loading={loading} search={search} setSearch={setSearch} />
  );
};

export default GroupList;
