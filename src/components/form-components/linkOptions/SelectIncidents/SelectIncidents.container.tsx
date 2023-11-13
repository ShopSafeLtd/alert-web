import React from 'react';
import View from './SelectIncidents.view';
import useSelectIncidents from './useSelectIncidents';

interface Props {
  onClose: () => void;
  incidentIds: string[] | undefined;
  update: (value: string[]) => void;
  takeAllSchemes?: boolean;
}
const SelectIncidents = ({
  onClose,
  update,
  incidentIds,
  takeAllSchemes,
}: Props): JSX.Element => {
  const {
    onSubmit,
    saving,
    data,
    loading,
    search,
    setSearch,
    pagination,
    onPaginationChange,
    onSelect,
    setPeculiarities,
    setGroupsFilter,
    businesses,
    goods,
    setCrimeTypesFilter,
    setGoodsFilter,
    setBusinessesFilter,
    goodsLoading,
    businessesLoading,
    variables,
    groups,
    groupsLoading,
    crimeTypes,
    tagsLoading,
    clearFilters,
  } = useSelectIncidents({
    onClose,
    update,
    incidentIds,
    takeAllSchemes,
  });

  return (
    <View
      onSubmit={onSubmit}
      saving={saving}
      data={data}
      search={search}
      setSearch={setSearch}
      loading={loading}
      onClose={onClose}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
      onSelect={onSelect}
      clearFilters={clearFilters}
      setCrimeTypesFilter={setCrimeTypesFilter}
      setGoodsFilter={setGoodsFilter}
      goods={goods}
      setGroupsFilter={setGroupsFilter}
      setPeculiarities={setPeculiarities}
      businesses={businesses}
      setBusinessesFilter={setBusinessesFilter}
      goodsLoading={goodsLoading}
      businessesLoading={businessesLoading}
      variables={variables}
      crimeTypes={crimeTypes}
      tagsLoading={tagsLoading}
      groups={groups}
      groupsLoading={groupsLoading}
    />
  );
};

export default SelectIncidents;
