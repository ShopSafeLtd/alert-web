import React from 'react';
import View from './LinkOffender.view';
import useLinkOffender from './useLinkOffender';

interface Props {
  onClose: () => void;
  update: (value: string[] | undefined) => void;
}
const LinkOffender = ({ onClose, update }: Props): JSX.Element => {
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
    offenderData,
  } = useLinkOffender({ onClose, update });

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
      offenderData={offenderData}
    />
  );
};

export default LinkOffender;
