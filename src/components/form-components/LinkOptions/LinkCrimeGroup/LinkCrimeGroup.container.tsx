import React from 'react';
import { CrimeGroupCardData } from 'types/DataType';
import View from './LinkCrimeGroup.view';
import useLinkCrimeGroup from './useLinkCrimeGroup';

interface Props {
  onClose: () => void;
  update?: (value: string) => void;
  crimeGroupIds: string[] | undefined;
  getCrimeGroup?: (value: { crimeGroup: CrimeGroupCardData }) => void;
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
