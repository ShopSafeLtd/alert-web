import React from 'react';

import View from './MyStockRequests.view';
import useMyStockRequests from './useMyStockRequests';

const MyStockRequests = (): JSX.Element => {
  const {
    data,
    isStoreUser,
    isUserInDCGroup,
    isUserInPAPGroup,
    loading,
    markAsPickedData,
    markAsPickedOpen,
    setMarkAsPickedOpen,
    setViewOpen,
    userBusinessIds,
    viewOpen,
  } = useMyStockRequests();

  return (
    <View
      data={data}
      isStoreUser={isStoreUser}
      isUserInDCGroup={isUserInDCGroup}
      isUserInPAPGroup={isUserInPAPGroup}
      loading={loading}
      markAsPickedData={markAsPickedData}
      markAsPickedOpen={markAsPickedOpen}
      setMarkAsPickedOpen={setMarkAsPickedOpen}
      setViewOpen={setViewOpen}
      userBusinessIds={userBusinessIds}
      viewOpen={viewOpen}
    />
  );
};

export default MyStockRequests;
