import React from 'react';
import View from './SchemeDetail.view';
import useSchemeDetail from './useSchemeDetail';

function SchemeDetail(): JSX.Element {
  const {
    data,
    loading,
    saving,
    onSubmit,
    beforeUpload,
    handlePreview,
    imgChange,
    fileList,
  } = useSchemeDetail();
  return (
    <View
      data={data}
      loading={loading}
      saving={saving}
      onSubmit={onSubmit}
      fileList={fileList}
      beforeUpload={beforeUpload}
      imgChange={imgChange}
      handlePreview={handlePreview}
    />
  );
}

export default SchemeDetail;
