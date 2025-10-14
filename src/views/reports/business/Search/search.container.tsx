import React from 'react';

import View from './search.view';
import useOffenderProfile from './use-search';

const OffenderProfile = () => {
  const {
    currentSearchPage,
    handleSearchChange,
    onSearchPageChange,
    searchBusinessData,
    searchBusinessLoading,
    searchValue,
    setSelectedBusiness,
  } = useOffenderProfile();

  return (
    <View
      currentSearchPage={currentSearchPage}
      handleSearchChange={handleSearchChange}
      onSearchPageChange={onSearchPageChange}
      searchBusinessData={searchBusinessData}
      searchBusinessLoading={searchBusinessLoading}
      searchValue={searchValue}
      setSelectedBusiness={setSelectedBusiness}
    />
  );
};

export default OffenderProfile;
