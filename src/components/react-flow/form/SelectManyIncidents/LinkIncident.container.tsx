import type { Incident } from 'components/react-flow/nodes/list-incidents-node';

import React from 'react';

import View from './LinkIncident.view';
import useLinkIncident from './useLinkIncident';

interface Props {
  ids?: string[];
  onClose: () => void;
  onSelect: (incidents: Incident[]) => void;
}
const LinkIncident = ({ ids, onClose, onSelect }: Props): JSX.Element => {
  const {
    data,
    loading,
    onChange,
    onPaginationChange,
    onSubmit,
    saving,
    search,
    selectedRowKeys,
    setSearch,
  } = useLinkIncident({ ids, onClose, onSelect });

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
      selectedRowKeys={selectedRowKeys}
      setSearch={setSearch}
    />
  );
};

export default LinkIncident;
