import { MutationUpdaterFn } from "@apollo/client";
import { CreateGroupMutation } from "graphql/generated";
import React from "react";
import View from "./AddGroup.view";
import useAddGroup from "./useAddGroup";

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateGroupMutation>;
}

const AddGroup = ({ onClose, update }: Props) => {
  const { onSubmit, usersData, usersLoading, saving, setSaving } =
    useAddGroup({ onClose, update });

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
