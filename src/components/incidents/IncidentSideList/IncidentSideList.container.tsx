import React from 'react'
import View from './IncidentSideList.view'
import useIncidentSideList from './useIncidentSideList'

interface Props {
  current?: string;
}

const IncidentSideList = ({ current }: Props) => {
  const {data, loading, onPaginationChange } = useIncidentSideList()

  return (
    <View
      data={data}
      loading={loading}
      current={current}
      onPaginationChange={onPaginationChange}
    />
  )
}

export default IncidentSideList