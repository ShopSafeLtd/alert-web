import React from 'react';
import View from './SchemeDetail.view';
import useSchemeDetail from './useSchemeDetail';

const SchemeDetail = (): JSX.Element => {
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
    tags,
    updateTagParent,
    groups,
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
      tags={tags}
      updateTagParent={updateTagParent}
      groups={groups}
    />
  );
};

export default SchemeDetail;
