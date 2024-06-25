import React, { Suspense } from 'react';
import View from './SchemeDetail.view';
import useSchemeDetail from './useSchemeDetail';
import Loading from '#/components/shared-components/AntD/Loading';

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
    form,
  } = useSchemeDetail();

  return (
    <Suspense fallback={<Loading cover="content" />}>
      <View
        form={form}
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
      />
    </Suspense>
  );
};

export default SchemeDetail;
