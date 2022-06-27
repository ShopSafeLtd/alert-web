import React from 'react'
import View from './AddUser.view'
import useAddUser from './useAddUser'

interface Props {
  onClose: () => void;
}

const AddUser = ({ onClose }: Props) => {
  const { onSubmit, groupsData, groupsLoading} = useAddUser()


  return (
    <View
      onSubmit={onSubmit}
      onClose={onClose}
      groupsData={groupsData}
      groupsLoading={groupsLoading}
    />
  )
}

export default AddUser