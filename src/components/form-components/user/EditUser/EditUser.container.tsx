import View from './EditUser.view';
import useEditUser from './useEditUser';
import { UpdateUserMutation } from 'graphql/generated';
import { MutationUpdaterFn } from '@apollo/client';

interface Props {
  onClose: () => void;
  // update: MutationUpdaterFn<UpdateUserMutation>;
}

const EditUser = ({ onClose }: Props) => {
  const {
    onSubmit,
    data,
    loading,
    groupsData,
    groupsLoading,
    chatsData,
    chatsLoading,
    saving,
  } = useEditUser({
    onClose,
    // update,
  });
  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      data={data}
      loading={loading}
      groupsData={groupsData}
      groupsLoading={groupsLoading}
      chatsData={chatsData}
      chatsLoading={chatsLoading}
      saving={saving}
      //   onValuesChange={onValuesChange}
      //   form={form}
    />
  );
};

export default EditUser;
