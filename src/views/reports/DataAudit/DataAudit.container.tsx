import React from 'react';
import View from './DataAudit.view';
import useDataAudit from './useDataAudit';

const DataAudit = () => {
  const {
    data,
    loading,

    offenderId,
    setOffenderId,
  } = useDataAudit();

  return (
    <View
      loading={loading}
      data={data}
      offenderId={offenderId}
      setOffenderId={setOffenderId}
    />
  );
};

export default DataAudit;
