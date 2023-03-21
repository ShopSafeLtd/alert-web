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
    onPreview,
    imgChange,
    fileList,
    darkImgChange,
    darkFileList,
  } = useSchemeDetail();
  return (
    <View
      darkFileList={darkFileList}
      darkImgChange={darkImgChange}
      data={data}
      loading={loading}
      saving={saving}
      onSubmit={onSubmit}
      fileList={fileList}
      beforeUpload={beforeUpload}
      imgChange={imgChange}
      onPreview={onPreview}
    />
  );
}

export default SchemeDetail;
