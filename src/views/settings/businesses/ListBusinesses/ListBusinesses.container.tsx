import React from 'react';

import View from './ListBusinesses.view';
import useListBusinesses from './useListBusinesses';

const ListBusinesses = () => {
  const {
    addVisible,
    canDelete,
    canMerge,
    currencyFilter,
    data,
    deleteConfirm,
    divisionFilter,
    filtersOpen,
    getSelectedBusinesses,
    groupData,
    groupFilter,
    handleMergeConfirm,
    handleRowSelectionChange,
    linkVisible,
    loading,
    mergeModalVisible,
    merging,
    onSearchChange,
    onSubmit,
    onUpdateLinkBusiness,
    pagination,
    parentData,
    parentFilter,
    policeAreaFilter,
    saving,
    searchValue,
    selectedBusinessIds,
    setCurrencyFilter,
    setDivisionFilter,
    setGroupFilter,
    setPagination,
    setParentFilter,
    setPoliceAreaFilter,
    setTagFilter,
    tagFilter,
    tags,
    toggleAddVisible,
    toggleFiltersOpen,
    toggleLinkVisible,
    toggleMergeModal,
  } = useListBusinesses();

  return (
    <View
      addVisible={addVisible}
      canDelete={canDelete}
      canMerge={canMerge}
      currencyFilter={currencyFilter}
      data={data}
      deleteConfirm={deleteConfirm}
      divisionFilter={divisionFilter}
      filtersOpen={filtersOpen}
      getSelectedBusinesses={getSelectedBusinesses}
      groupData={groupData}
      groupFilter={groupFilter}
      handleMergeConfirm={handleMergeConfirm}
      handleRowSelectionChange={handleRowSelectionChange}
      linkVisible={linkVisible}
      loading={loading}
      mergeModalVisible={mergeModalVisible}
      merging={merging}
      onSearchChange={onSearchChange}
      onSubmit={onSubmit}
      onUpdateLinkBusiness={onUpdateLinkBusiness}
      pagination={pagination}
      parentData={parentData}
      parentFilter={parentFilter}
      policeAreaFilter={policeAreaFilter}
      saving={saving}
      searchValue={searchValue}
      selectedBusinessIds={selectedBusinessIds}
      setCurrencyFilter={setCurrencyFilter}
      setDivisionFilter={setDivisionFilter}
      setGroupFilter={setGroupFilter}
      setPagination={setPagination}
      setParentFilter={setParentFilter}
      setPoliceAreaFilter={setPoliceAreaFilter}
      setTagFilter={setTagFilter}
      tagFilter={tagFilter}
      tags={tags}
      toggleAddVisible={toggleAddVisible}
      toggleFiltersOpen={toggleFiltersOpen}
      toggleLinkVisible={toggleLinkVisible}
      toggleMergeModal={toggleMergeModal}
    />
  );
};

export default ListBusinesses;
