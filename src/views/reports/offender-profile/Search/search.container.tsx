import React from 'react';
import View from './search.view';
import useOffenderProfile from './use-search';

const OffenderProfile = () => {
  const {
    searchOffenderLoading,
    searchOffendersData,
    searchValue,
    handleSearchChange,
    setSelectedOffender,
    currentSearchPage,
    onSearchPageChange,
  } = useOffenderProfile();

  return (
    <View
      searchOffenderLoading={searchOffenderLoading}
      searchOffendersData={searchOffendersData}
      searchValue={searchValue}
      handleSearchChange={handleSearchChange}
      setSelectedOffender={setSelectedOffender}
      currentSearchPage={currentSearchPage}
      onSearchPageChange={onSearchPageChange}
    />
  );
};

export default OffenderProfile;
