import type { CrimeGroupData } from 'types/DataType';

import React from 'react';

import View from './LinkCrimeGroup.view';
import useLinkCrimeGroup from './useLinkCrimeGroup';

interface Props {
  crimeGroupIds: string[] | undefined;
  getCrimeGroup?: (value: { crimeGroup: CrimeGroupData }) => void;
  onClose: () => void;
  takeAllSchemes?: boolean;
  update?: (value: CrimeGroupData) => void;
}
const LinkCrimeGroup = ({
  crimeGroupIds,
  getCrimeGroup,
  onClose,
  takeAllSchemes,
  update,
}: Props): JSX.Element => {
  const {
    data,
    loading,
    onPaginationChange,
    onSelect,
    onSubmit,
    saving,
    search,
    selected,
    setSearch,
  } = useLinkCrimeGroup({
    crimeGroupIds,
    getCrimeGroup,
    onClose,
    takeAllSchemes,
    update,
  });

  return (
    <View
      data={data}
      loading={loading}
      onClose={onClose}
      onPaginationChange={onPaginationChange}
      onSelect={onSelect}
      onSubmit={onSubmit}
      saving={saving}
      search={search}
      selected={selected}
      setSearch={setSearch}
    />
  );
};

export default LinkCrimeGroup;
