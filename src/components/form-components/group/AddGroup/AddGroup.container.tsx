import React from "react";
import View from "./AddGroup.view";
import useAddGroup from "./useAddGroup";

interface Props {
  onClose: () => void;
}

const AddGroup = ({ onClose }: Props) => {
  const { onSubmit, usersData, usersLoading, saving, setSaving } =
    useAddGroup(onClose);

  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      usersData={usersData}
      usersLoading={usersLoading}
      saving={saving}
      setSaving={setSaving}
    />
  );
};

export default AddGroup;
