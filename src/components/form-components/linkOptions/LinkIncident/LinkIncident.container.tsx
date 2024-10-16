import type { IncidentCardData } from 'types/DataType';

import React from 'react';

import type { Incident } from './useLinkIncident';

import View from './LinkIncident.view';
import useLinkIncident from './useLinkIncident';

interface Props {
  getIncident?: (value: Incident) => void;
  incidentIds: string[] | undefined;
  onClose: () => void;
  takeAllSchemes?: boolean;
  update?: (value: IncidentCardData) => void;
}
const LinkIncident = ({
  getIncident,
  incidentIds,
  onClose,
  takeAllSchemes,
  update,
}: Props): JSX.Element => {
  const {
    businesses,
    businessesLoading,
    clearFilters,
    crimeTypes,
    data,
    goods,
    goodsLoading,
    groups,
    groupsLoading,
    loading,
    onPaginationChange,
    onSelect,
    onSubmit,
    pagination,
    saving,
    search,
    setBusinessesFilter,
    setCrimeTypesFilter,
    setGoodsFilter,
    setGroupsFilter,
    setPeculiarities,
    setSearch,
    tagsLoading,
    variables,
  } = useLinkIncident({
    getIncident,
    incidentIds,
    onClose,
    takeAllSchemes,
    update,
  });

  return (
    <View
      businesses={businesses}
      businessesLoading={businessesLoading}
      clearFilters={clearFilters}
      crimeTypes={crimeTypes}
      data={data}
      goods={goods}
      goodsLoading={goodsLoading}
      groups={groups}
      groupsLoading={groupsLoading}
      loading={loading}
      onClose={onClose}
      onPaginationChange={onPaginationChange}
      onSelect={onSelect}
      onSubmit={onSubmit}
      pagination={pagination}
      saving={saving}
      search={search}
      setBusinessesFilter={setBusinessesFilter}
      setCrimeTypesFilter={setCrimeTypesFilter}
      setGoodsFilter={setGoodsFilter}
      setGroupsFilter={setGroupsFilter}
      setPeculiarities={setPeculiarities}
      setSearch={setSearch}
      tagsLoading={tagsLoading}
      variables={variables}
    />
  );
};

export default LinkIncident;
