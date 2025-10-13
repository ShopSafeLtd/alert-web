import React from 'react';

import View from './search.view';
import useOffenderProfile from './use-search';

const OffenderProfile = () => {
  const {
    currentSearchPage,
    handleSearchChange,
    onSearchPageChange,
    searchOffenderLoading,
    searchOffendersData,
    searchValue,
    setSelectedOffender,
  } = useOffenderProfile();

  return (
    <View
      currentSearchPage={currentSearchPage}
      handleSearchChange={handleSearchChange}
      onSearchPageChange={onSearchPageChange}
      searchOffenderLoading={searchOffenderLoading}
      searchOffendersData={searchOffendersData}
      searchValue={searchValue}
      setSelectedOffender={setSelectedOffender}
    />
  );
};

export default OffenderProfile;
