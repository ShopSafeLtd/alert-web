import React from "react";
import View from "./GroupList.view";
import useGroupList from "./useGroupList";

const GroupList = () => {
  const { data, loading, search, setSearch, addGroup, toggleAddGroup } =
    useGroupList();
  return (
    <View
      data={data}
      loading={loading}
      search={search}
      setSearch={setSearch}
      addGroup={addGroup}
      toggleAddGroup={toggleAddGroup}
    />
  );
};

export default GroupList;
