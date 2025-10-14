import type { Incident } from 'components/react-flow/nodes/incident-details-node';

import React from 'react';

import View from './LinkIncident.view';
import useLinkIncident from './useLinkIncident';

interface Props {
  onClose: () => void;
  onSelect: (incidents: Incident) => void;
}
const LinkIncident = ({ onClose, onSelect }: Props): JSX.Element => {
  const {
    data,
    loading,
    onChange,
    onPaginationChange,
    onSubmit,
    saving,
    search,
    setSearch,
  } = useLinkIncident({ onClose, onSelect });

  return (
    <View
      data={data}
      loading={loading}
      onClose={onClose}
      onPaginationChange={onPaginationChange}
      onSelect={onChange}
      onSubmit={onSubmit}
      saving={saving}
      search={search}
      setSearch={setSearch}
    />
  );
};

export default LinkIncident;
