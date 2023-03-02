import React from 'react';
import View from './LinkIncident.view';
import useLinkIncident from './useLinkIncident';
import { ListIncidentsQuery } from '../../../../graphql/generated';

export interface Incident {
  incident: Exclude<
    ListIncidentsQuery['listIncidents'],
    null | undefined
  >['incidents'][0];
}

interface Props {
  onClose: () => void;
  incidentIds: string[] | undefined;
}
const LinkIncident = ({ onClose, incidentIds }: Props): JSX.Element => {
  const {
    onSubmit,
    saving,
    data,
    loading,
    search,
    setSearch,
    onPaginationChange,
    onSelect,
  } = useLinkIncident({ onClose, incidentIds });

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
