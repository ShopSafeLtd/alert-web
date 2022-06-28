import React from "react";
import View from "./AddChatGroup.view";
import useAddChatGroup from "./useAddChatGroup";

interface Props {
  onClose: () => void;
}

const AddChatGroup = ({ onClose }: Props) => {
  const { onSubmit } = useAddChatGroup();

  return <View onSubmit={onSubmit} onClose={onClose} />;
};

export default AddChatGroup;
