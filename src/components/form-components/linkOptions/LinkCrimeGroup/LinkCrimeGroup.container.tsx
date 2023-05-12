import React from 'react';
import type { CrimeGroupData } from 'types/DataType';
import View from './LinkCrimeGroup.view';
import useLinkCrimeGroup from './useLinkCrimeGroup';

interface Props {
  onClose: () => void;
  update?: (value: CrimeGroupData) => void;
  crimeGroupIds: string[] | undefined;
  getCrimeGroup?: (value: { crimeGroup: CrimeGroupData }) => void;
}
const LinkCrimeGroup = ({
  onClose,
  update,
  crimeGroupIds,
  getCrimeGroup,
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
  } = useLinkCrimeGroup({ onClose, update, crimeGroupIds, getCrimeGroup });

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

export default LinkCrimeGroup;
