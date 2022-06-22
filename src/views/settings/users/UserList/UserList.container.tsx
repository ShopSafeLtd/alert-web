import React from 'react'
import View from './UserList.view'
import useUserList from './useUserList'


const UserList = () => {
  const { data, loading, search, setSearch } = useUserList()

  return (
    <View
      data={data}
      loading={loading}
      search={search}
      setSearch={setSearch}
    />
  )
}

export default UserList