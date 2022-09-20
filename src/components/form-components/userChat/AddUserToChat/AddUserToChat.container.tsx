import React from 'react';
import View from './AddUserToChat.view';
import useAddUserToChat from './AddUserToChat';

interface FormData {
  user: string[];
}
interface MemberData {
  id: string;
  fullName: string;
  organisation: string;
  firstLetter?: string | null;
}
interface Props {
  usersData: MemberData[] | undefined;
  onClose: () => void;
  addMemberUpdate: (value: FormData) => void;
}

const AddUserToChat = ({
  onClose,
  addMemberUpdate,
  usersData,
}: Props): JSX.Element => {
  const { onSubmit, saving } = useAddUserToChat({
    onClose,
    addMemberUpdate,
  });
  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      usersData={usersData}
      saving={saving}
    />
  );
};

export default AddUserToChat;
