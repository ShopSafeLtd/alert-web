import React from 'react';
import View from './business.view';
import useBusiness from './use-business';

const Business = () => {
  const { data, loading, selectedBusiness, dateRange, setDateRange } =
    useBusiness();

  return (
    <View
      data={data}
      loading={loading}
      selectedBusiness={selectedBusiness}
      dateRange={dateRange}
      setDateRange={setDateRange}
    />
  );
};

export default Business;
