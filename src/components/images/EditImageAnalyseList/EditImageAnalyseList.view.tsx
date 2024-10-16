import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type { Image, ImageFaceType } from 'types/DataType';

import FacesSelect from '#/components/form-components/FacesSelect/FacesSelect.view';
import { Button, Col, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import UploadImage from '../UploadImage.view';

interface Props {
  beforeUpload: (value: RcFile) => void;
  editImage: Image | null;
  facialRec: boolean;
  fileList: Image[];
  imgChange: UploadProps['onChange'];
  onClose: () => void;
  onCloseSelectFace: () => void;
  onEditImage: (value: Image) => void;
  onRemoveImage: (imageId: string) => void;
  onSelectFace: (value: ImageFaceType) => void;
  onSubmit: () => void;
  primaryImage: string;
  saving: boolean;
  setPrimaryImage: (value: string) => void;
  title: string;
  toggleEditImage: (value?: Image) => void;
  uploadFaces: ImageFaceType[];
  uploading: boolean;
}

const EditImageAnalyseList = ({
  beforeUpload,
  editImage,
  facialRec,
  fileList,
  imgChange,
  onClose,
  onCloseSelectFace,
  onEditImage,
  onRemoveImage,
  onSelectFace,
  onSubmit,
  primaryImage,
  saving,
  setPrimaryImage,
  title,
  toggleEditImage,
  uploadFaces,
  uploading,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <>
      <UploadImage
        beforeUpload={beforeUpload}
        editImage={editImage}
        facialRec={facialRec}
        fileList={fileList}
        imgChange={imgChange}
        onEditImage={onEditImage}
        onRemoveImage={onRemoveImage}
        primaryImage={primaryImage}
        setPrimaryImage={setPrimaryImage}
        title={title}
        toggleEditImage={toggleEditImage}
        uploading={uploading}
      />

      <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
        <Col>
          <Button disabled={saving} onClick={onClose}>
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>
        </Col>
        <Col>
          <Button
            disabled={saving}
            loading={saving}
            // htmlType="submit"
            onClick={onSubmit}
            type="primary"
          >
            {intl.formatMessage({ defaultMessage: 'Save' })}
          </Button>
        </Col>
      </Row>
      <FacesSelect
        faces={uploadFaces}
        onClose={onCloseSelectFace}
        open={!!(uploadFaces && uploadFaces.length > 0)}
        submitFace={onSelectFace}
      />
    </>
  );
};

export default EditImageAnalyseList;
