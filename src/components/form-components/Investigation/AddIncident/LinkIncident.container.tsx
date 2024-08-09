import type { ListIncidentsQuery } from 'graphql/incidents/queries/__generated__/list-incidents.generated';

import React from 'react';

import View from './LinkIncident.view';
import useLinkIncident from './useLinkIncident';

export interface Incident {
  incident: Exclude<
    ListIncidentsQuery['listIncidents'],
    null | undefined
  >['incidents'][0];
}

interface Props {
  incidentIds: string[] | undefined;
  onClose: () => void;
}
const LinkIncident = ({ incidentIds, onClose }: Props): JSX.Element => {
  const {
    data,
    loading,
    onPaginationChange,
    onSelect,
    onSubmit,
    saving,
    search,
    setSearch,
  } = useLinkIncident({ incidentIds, onClose });

  return (
    <View
      data={data}
      loading={loading}
      onClose={onClose}
      onPaginationChange={onPaginationChange}
      onSelect={onSelect}
      onSubmit={onSubmit}
      saving={saving}
      search={search}
      setSearch={setSearch}
    />
  );
};

export default LinkIncident;
