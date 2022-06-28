import { MutationUpdaterFn } from "@apollo/client";
import { CreateChatMutation } from "graphql/generated";
import React from "react";
import View from "./AddChat.view";
import useAddChat from "./useAddChat";

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateChatMutation>;
}

const AddChat = ({ onClose, update }: Props) => {
  const { onSubmit, usersData, usersLoading, saving, setSaving } = useAddChat({
    onClose,
    update,
  });

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

export default AddChat;
