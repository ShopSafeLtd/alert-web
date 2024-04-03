import React from 'react';
import { Button, Col, Row } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import { useIntl } from 'react-intl';
import type { Image, ImageFaceType } from 'types/DataType';
import FacesSelect from '#/components/form-components/FacesSelect/FacesSelect.view';
import UploadImage from '../UploadImage.view';

interface Props {
  onClose: () => void;
  onSubmit: () => void;
  saving: boolean;
  imgChange: UploadProps['onChange'];
  beforeUpload: (value: RcFile) => void;
  fileList: Image[];
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
  editImage: Image | null;
  onEditImage: (value: Image) => void;
  onRemoveImage: (imageId: string) => void;
  toggleEditImage: (value?: Image) => void;
  title: string;
  onSelectFace: (value: ImageFaceType) => void;
  setUploadFaces: (value: ImageFaceType[]) => void;
  uploadFaces: ImageFaceType[];
  facialRec: boolean;
}

const EditImageAnalyseList = ({
  onSubmit,
  saving,
  imgChange,
  beforeUpload,
  fileList,
  onRemoveImage,
  onEditImage,
  toggleEditImage,
  editImage,
  primaryImage,
  setPrimaryImage,
  onClose,
  title,
  onSelectFace,
  setUploadFaces,
  uploadFaces,
  facialRec,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <>
      <UploadImage
        imgChange={imgChange}
        beforeUpload={beforeUpload}
        fileList={fileList}
        editImage={editImage}
        onEditImage={onEditImage}
        toggleEditImage={toggleEditImage}
        onRemoveImage={onRemoveImage}
        primaryImage={primaryImage}
        setPrimaryImage={setPrimaryImage}
        title={title}
        facialRec={facialRec}
      />

      <Row style={{ marginTop: 30 }} gutter={16} justify="end">
        <Col>
          <Button disabled={saving} onClick={onClose}>
            {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            // htmlType="submit"
            onClick={onSubmit}
            disabled={saving}
            loading={saving}
          >
            {intl.formatMessage({ defaultMessage: 'Save', id: 'jvo0vs' })}
          </Button>
        </Col>
      </Row>
      <FacesSelect
        submitFace={onSelectFace}
        onClose={() => setUploadFaces([])}
        open={!!(uploadFaces && uploadFaces.length > 0)}
        faces={uploadFaces}
      />
    </>
  );
};

export default EditImageAnalyseList;
