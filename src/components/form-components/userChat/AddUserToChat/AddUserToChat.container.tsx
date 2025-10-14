import React from 'react';

import View from './AddUserToChat.view';
import useAddUserToChat from './useAddUserToChat';

interface FormData {
  user: string[];
}
interface MemberData {
  businesses: { id: string; name: string }[];
  firstLetter?: null | string;
  fullName: string;
  id: string;
}
interface Props {
  addMemberUpdate: (value: FormData) => void;
  membersData: MemberData[] | undefined;
  onClose: () => void;
}

const AddUserToChat = ({
  addMemberUpdate,
  membersData,
  onClose,
}: Props): JSX.Element => {
  const { loading, onSubmit, saving, search, setSearch, usersData } =
    useAddUserToChat({
      addMemberUpdate,
      membersData,
      onClose,
    });
  return (
    <View
      loading={loading}
      onClose={onClose}
      onSubmit={onSubmit}
      saving={saving}
      search={search}
      setSearch={setSearch}
      usersData={usersData}
    />
  );
};

export default AddUserToChat;
