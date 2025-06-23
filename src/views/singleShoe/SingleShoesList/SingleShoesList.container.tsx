import React from 'react';

import View from './SingleShoesList.view';
import useSingleShoesList from './useSingleShoesList';

const SingleShoesList = (): JSX.Element => {
  const {
    addShoe,
    awaitingMatchShoesData,
    awaitingMatchShoesLoading,
    awaitingShippingShoesData,
    awaitingShippingShoesLoading,
    matchedShoesData,
    onDelete,
    onReceivedShoe,
    onShippedShoe,
    saving,
    search,
    setSearch,
    setShoeId,
    setViewData,
    shippedShoesData,
    shippedShoesLoading,
    shoeId,
    toggleAddShoe,
    updateNewShoeList,
    viewData,
  } = useSingleShoesList();

  return (
    <View
      addShoe={addShoe}
      awaitingMatchShoesData={awaitingMatchShoesData}
      awaitingMatchShoesLoading={awaitingMatchShoesLoading}
      awaitingShippingShoesData={awaitingShippingShoesData}
      awaitingShippingShoesLoading={awaitingShippingShoesLoading}
      matchedShoesTotalCount={matchedShoesData?.totalCount || 0}
      onDelete={onDelete}
      onReceivedShoe={onReceivedShoe}
      onShippedShoe={onShippedShoe}
      saving={saving}
      search={search}
      setSearch={setSearch}
      setShoeId={setShoeId}
      setViewData={setViewData}
      shippedShoesData={shippedShoesData}
      shippedShoesLoading={shippedShoesLoading}
      shoeId={shoeId}
      toggleAddShoe={toggleAddShoe}
      updateNewShoeList={updateNewShoeList}
      viewData={viewData}
    />
  );
};

export default SingleShoesList;
