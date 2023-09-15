import React from 'react';
import type { CrimeGroupData } from 'types/DataType';
import View from './LinkCrimeGroup.view';
import useLinkCrimeGroup from './useLinkCrimeGroup';

interface Props {
  onClose: () => void;
  update?: (value: CrimeGroupData) => void;
  crimeGroupIds: string[] | undefined;
  takeAllSchemes?: boolean;
  getCrimeGroup?: (value: { crimeGroup: CrimeGroupData }) => void;
}
const LinkCrimeGroup = ({
  onClose,
  update,
  crimeGroupIds,
  getCrimeGroup,
  takeAllSchemes,
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
  } = useLinkCrimeGroup({
    onClose,
    update,
    crimeGroupIds,
    getCrimeGroup,
    takeAllSchemes,
  });

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
