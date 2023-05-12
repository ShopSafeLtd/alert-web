import React from 'react';
import View from './LinkIncident.view';
import useLinkIncident from './useLinkIncident';
import { Incident } from 'components/react-flow/nodes/list-incidents-node';

interface Props {
  onClose: () => void;
  onSelect: (incidents: Incident[]) => void;
  ids?: string[];
}
const LinkIncident = ({ onClose, onSelect, ids }: Props): JSX.Element => {
  const {
    onSubmit,
    saving,
    data,
    loading,
    search,
    setSearch,
    onPaginationChange,
    onChange,
    selectedRowKeys,
  } = useLinkIncident({ onClose, onSelect, ids });

  return (
    <View
      selectedRowKeys={selectedRowKeys}
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
