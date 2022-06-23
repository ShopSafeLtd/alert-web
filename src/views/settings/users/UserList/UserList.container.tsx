import React from "react";
import View from "./UserList.view";
import useUserList from "./useUserList";

const UserList = () => {
  const {
    data,
    loading,
    search,
    setSearch,
    groupsData,
    groupsLoading,
    selectedGroups,
    setSelectedGroups,
  } = useUserList();

  return (
    <View
      data={data}
      loading={loading}
      search={search}
      setSearch={setSearch}
      groupsData={groupsData}
      groupsLoading={groupsLoading}
      selectedGroups={selectedGroups}
      setSelectedGroups={setSelectedGroups}
    />
  );
};

export default UserList;
