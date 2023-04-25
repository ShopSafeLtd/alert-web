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
}
const LinkIncident = ({
  onClose,
  update,
  incidentIds,
  getIncident,
}: Props): JSX.Element => {
  const {
    onSubmit,
    saving,
    data,
    loading,
    search,
    setSearch,
    onPaginationChange,
    onSelect,
  } = useLinkIncident({ onClose, update, incidentIds, getIncident });

  return (
    <View
      onSubmit={onSubmit}
      saving={saving}
      data={data}
      search={search}
      setSearch={setSearch}
      loading={loading}
      onClose={onClose}
      onPaginationChange={onPaginationChange}
      onSelect={onSelect}
    />
  );
};

export default LinkIncident;
