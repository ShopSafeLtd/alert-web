import React from 'react';
import View from './LinkIncident.view';
import useLinkIncident from './useLinkIncident';

interface Props {
  onClose: () => void;
  update: (value: string) => void;
  incidentIds: string[] | undefined;
}
const LinkIncident = ({ onClose, update, incidentIds }: Props): JSX.Element => {
  const {
    onSubmit,
    saving,
    data,
    loading,
    search,
    setSearch,
    openLightbox,
    onPaginationChange,
    setCurrentId,
    selectedIncident,
  } = useLinkIncident({ onClose, update, incidentIds });

  return (
    <View
      onSubmit={onSubmit}
      saving={saving}
      data={data}
      search={search}
      setSearch={setSearch}
      loading={loading}
      openLightbox={openLightbox}
      onClose={onClose}
      onPaginationChange={onPaginationChange}
      setCurrentId={setCurrentId}
      selectedIncident={selectedIncident}
    />
  );
};

export default LinkIncident;
