import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type { Image } from 'types/DataType';

import { Button, Col, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import UploadImage from '../UploadImage.view';

interface Props {
  beforeUpload: (value: RcFile) => void;
  editImage: Image | null;
  facialDet: boolean;
  fileList: Image[];
  imgChange: UploadProps['onChange'];
  onClose: () => void;
  onEditImage: (value: Image) => void;
  onRemoveImage: (imageId: string) => void;
  onSubmit: () => void;
  primaryImage: string;
  saving: boolean;
  setPrimaryImage: (value: string) => void;
  title: string;
  toggleEditImage: (value?: Image) => void;
}

const EditImageList = ({
  beforeUpload,
  editImage,
  facialDet,
  fileList,
  imgChange,
  onClose,
  onEditImage,
  onRemoveImage,
  onSubmit,
  primaryImage,
  saving,
  setPrimaryImage,
  title,
  toggleEditImage,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <>
      <UploadImage
        beforeUpload={beforeUpload}
        editImage={editImage}
        facialRec={facialDet}
        fileList={fileList}
        imgChange={imgChange}
        onEditImage={onEditImage}
        onRemoveImage={onRemoveImage}
        primaryImage={primaryImage}
        setPrimaryImage={setPrimaryImage}
        title={title}
        toggleEditImage={toggleEditImage}
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
    </>
  );
};

export default EditImageList;
