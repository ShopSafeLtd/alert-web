import Loading from '#/components/shared-components/AntD/Loading';
import React, { Suspense } from 'react';

import View from './SchemeDetail.view';
import useSchemeDetail from './useSchemeDetail';

const SchemeDetail = (): JSX.Element => {
  const {
    beforeUpload,
    darkFileList,
    darkImgChange,
    data,
    fileList,
    form,
    imgChange,
    loading,
    onPreview,
    onSubmit,
    saving,
    tags,
    updateTagParent,
  } = useSchemeDetail();

  return (
    <Suspense fallback={<Loading cover="content" />}>
      <View
        beforeUpload={beforeUpload}
        darkFileList={darkFileList}
        darkImgChange={darkImgChange}
        data={data}
        fileList={fileList}
        form={form}
        imgChange={imgChange}
        loading={loading}
        onPreview={onPreview}
        onSubmit={onSubmit}
        saving={saving}
        tags={tags}
        updateTagParent={updateTagParent}
      />
    </Suspense>
  );
};

export default SchemeDetail;
