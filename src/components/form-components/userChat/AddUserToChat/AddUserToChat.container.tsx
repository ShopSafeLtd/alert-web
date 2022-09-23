import React from 'react';
import View from './AddUserToChat.view';
import useAddUserToChat from './useAddUserToChat';

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
  membersData: MemberData[] | undefined;
  onClose: () => void;
  addMemberUpdate: (value: FormData) => void;
}

const AddUserToChat = ({
  onClose,
  addMemberUpdate,
  membersData,
}: Props): JSX.Element => {
  const { onSubmit, usersData, loading, search, setSearch, saving } =
    useAddUserToChat({
      onClose,
      membersData,
      addMemberUpdate,
    });
  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      usersData={usersData}
      loading={loading}
      search={search}
      setSearch={setSearch}
      saving={saving}
    />
  );
};

export default AddUserToChat;
