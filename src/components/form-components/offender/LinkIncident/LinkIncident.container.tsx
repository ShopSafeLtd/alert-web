import React from 'react';
import View from './LinkIncident.view';
import useLinkIncident from './useLinkIncident';

interface Props {
  onClose: () => void;
  update: (value: string[] | undefined) => void;
}
const LinkIncident = ({ onClose, update }: Props): JSX.Element => {
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
    incidentData,
  } = useLinkIncident({ onClose, update });

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
      incidentData={incidentData}
    />
  );
};

export default LinkIncident;
