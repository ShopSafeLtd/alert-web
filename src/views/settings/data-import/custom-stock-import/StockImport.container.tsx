import React from 'react';

import StockImportView from './StockImport.View';
import useImportStock from './useImportStock';

const StockImportContainer = (): JSX.Element => {
  const {
    badData,
    columns,
    current,
    data,
    form,
    formattedDataColumns,
    goodsTypeData,
    header,
    headerToFixed,
    itemToFix,
    loading,
    onFileLoaded,
    onFix,
    onNext,
    onPrev,
    onSubmit,
    setBadData,
    setItemToFix,
    setLoading,
    setOriginalItemToFix,
    uploading,
  } = useImportStock();

  return (
    <StockImportView
      badData={badData}
      columns={columns}
      current={current}
      data={data}
      form={form}
      formattedDataColumns={formattedDataColumns}
      goodsTypeData={goodsTypeData}
      header={header}
      headerToFixed={headerToFixed}
      itemToFix={itemToFix}
      loading={loading}
      onFileLoaded={onFileLoaded}
      onFix={onFix}
      onNext={onNext}
      onPrev={onPrev}
      onSubmit={onSubmit}
      setBadData={setBadData}
      setItemToFix={setItemToFix}
      setLoading={setLoading}
      setOriginalItemToFix={setOriginalItemToFix}
      uploading={uploading}
    />
  );
};
export default StockImportContainer;
