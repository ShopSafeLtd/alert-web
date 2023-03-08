import React from 'react';
import View from './search.view';
import useOffenderProfile from './use-search';

const OffenderProfile = () => {
  const {
    searchBusinessData,
    searchBusinessLoading,
    searchValue,
    handleSearchChange,
    setSelectedBusiness,
    currentSearchPage,
    onSearchPageChange,
  } = useOffenderProfile();

  return (
    <View
      searchBusinessLoading={searchBusinessLoading}
      searchBusinessData={searchBusinessData}
      searchValue={searchValue}
      handleSearchChange={handleSearchChange}
      setSelectedBusiness={setSelectedBusiness}
      currentSearchPage={currentSearchPage}
      onSearchPageChange={onSearchPageChange}
    />
  );
};

export default OffenderProfile;
