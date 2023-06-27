import React from 'react';
import type { Incident } from 'components/react-flow/nodes/incident-details-node';
import View from './LinkIncident.view';
import useLinkIncident from './useLinkIncident';

interface Props {
  onClose: () => void;
  onSelect: (incidents: Incident) => void;
}
const LinkIncident = ({ onClose, onSelect }: Props): JSX.Element => {
  const {
    onSubmit,
    saving,
    data,
    loading,
    search,
    setSearch,
    onPaginationChange,
    onChange,
  } = useLinkIncident({ onClose, onSelect });

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
      onSelect={onChange}
    />
  );
};

export default LinkIncident;
