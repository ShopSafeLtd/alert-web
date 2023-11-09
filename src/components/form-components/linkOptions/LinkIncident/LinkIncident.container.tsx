import React from 'react';
import type { IncidentCardData } from 'types/DataType';
import View from './LinkIncident.view';
import useLinkIncident from './useLinkIncident';
import type { ListIncidentsQuery } from '../../../../graphql/generated';

export interface Incident {
  incident: Exclude<
    ListIncidentsQuery['listIncidents'],
    null | undefined
  >['incidents'][0];
}

interface Props {
  onClose: () => void;
  incidentIds: string[] | undefined;
  update?: (value: IncidentCardData) => void;
  getIncident?: (value: Incident) => void;
  takeAllSchemes?: boolean;
}
const LinkIncident = ({
  onClose,
  update,
  incidentIds,
  getIncident,
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
  } = useLinkIncident({
    onClose,
    update,
    incidentIds,
    getIncident,
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

export default LinkIncident;
