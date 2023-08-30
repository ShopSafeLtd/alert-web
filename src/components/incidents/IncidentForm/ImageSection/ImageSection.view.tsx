import React from 'react';
import type { FormInstance } from 'antd';
import {
  Empty,
  Form,
  Button,
  Col,
  Popconfirm,
  Row,
  Spin,
  Typography,
  Upload,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUpload } from '@fortawesome/pro-light-svg-icons';
import WatermarkImage from 'components/images/WatermarkImage.view';
import ImageEditor from 'components/form-components/ImageEditor/ImageEditor.view';
import type { IncidentFormField } from 'graphql/generated';
import { ImagePosition } from 'graphql/generated';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import { UploadOutlined } from '@ant-design/icons';
import type { StateImageData } from './useImageSection';
import useImageSection from './useImageSection';
import type { FormData } from '../../../../views/incidents/AddIncident/useAddIncident';
import { compressImage } from '../../../../utils/compress-images';

const { Title, Paragraph } = Typography;

interface Props {
  incidentForm: IncidentFormField[];
  form: FormInstance<FormData>;
  value?: StateImageData[];
  onChange?: (data: StateImageData[]) => void;
  disabled: boolean;
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
  // fileList: UploadFile[];
  // documentUploadProps: UploadProps;
}

const ImageSection = ({
  disabled = false,
  primaryImage,
  setPrimaryImage,
  incidentForm,
  form,
  onChange,
  value,
}: Props): JSX.Element => {
  const intl = useIntl();
  const {
    images,
    onImageChange,
    editImage,
    setEditImage,
    onEditImage,
    onRemoveImage,
    fileList,
    documentUploadProps,
  } = useImageSection({
    value,
    incidentForm,
    form,
    onChange,
  });
  const facialRec = useStoreState((state) => state.scheme.facialRecognition);

  return (
    <Row gutter={20}>
      <Col>
        <Row align="middle" style={{ marginBottom: 20 }}>
          <Col>
            <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
              {intl.formatMessage({
                defaultMessage: 'Images & Other Media',
                id: 'OR3nwV',
              })}
            </Title>
          </Col>
          <Col>
            <Paragraph
              style={{ marginBottom: 1, marginLeft: 5 }}
              type="secondary"
              italic
            >
              {intl.formatMessage({
                defaultMessage:
                  '- Please add other images & media that you have related to this incident.',
                id: 'Fm/tL0',
              })}
            </Paragraph>
          </Col>
          <Col style={{ marginLeft: 30 }}>
            <Upload
              fileList={images}
              onChange={onImageChange}
              action={
                facialRec
                  ? import.meta.env.VITE_APP_IMAGE_ANALYSE_UPLOAD_ENDPOINT
                  : import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT
              }
              className="incident-form-images-no-offenders"
              accept=".png,.jpeg"
              disabled={disabled}
              beforeUpload={async (file) => compressImage(file)}
              showUploadList={false}
            >
              <Button
                icon={
                  <FontAwesomeIcon icon={faUpload} style={{ marginRight: 5 }} />
                }
                style={{ color: 'red' }}
              >
                {intl.formatMessage({
                  defaultMessage: 'Upload Image',
                  id: 'MntrZe',
                })}
              </Button>
            </Upload>
          </Col>
          <Col style={{ marginLeft: 30 }}>
            <Upload
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...documentUploadProps}
              listType="picture"
              style={{ display: 'flex' }}
              fileList={fileList}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />} style={{ color: 'red' }}>
                {intl.formatMessage({
                  defaultMessage: 'Upload Document',
                  id: 'Kc9MAV',
                })}
              </Button>
            </Upload>
          </Col>
        </Row>
        {(fileList && fileList.length > 0) || (images && images.length > 0) ? (
          <>
            {images && images.length > 0 && (
              <Form.Item
                name="images"
                label={intl.formatMessage({
                  defaultMessage: 'Images',
                  id: 'Fip4H8',
                })}
              >
                <Upload
                  fileList={images}
                  onChange={onImageChange}
                  action={
                    facialRec
                      ? import.meta.env.VITE_APP_IMAGE_ANALYSE_UPLOAD_ENDPOINT
                      : import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT
                  }
                  className="incident-form-images-no-offenders"
                  listType="picture-card"
                  accept=".png,.jpeg"
                  disabled={disabled}
                  beforeUpload={async (file) => compressImage(file)}
                  // TODO
                  // eslint-disable-next-line react/no-unstable-nested-components
                  itemRender={(el, file: StateImageData) => (
                    <div
                      className="image-card"
                      style={{ width: 200 }}
                      key={el.key}
                    >
                      {file.url === undefined && (
                        <div className="image-card-loading">
                          <Spin />
                        </div>
                      )}

                      <div className="image-card-image">
                        <WatermarkImage
                          position={file.position || ImagePosition.CenterCenter}
                          url={file.url || file.thumbUrl || ''}
                        />
                        <div className="image-remove-button">
                          <Row gutter={4}>
                            <Col>
                              <Button
                                size="small"
                                disabled={disabled}
                                onClick={() => setEditImage(file)}
                                icon={<FontAwesomeIcon icon={faEdit} />}
                              />
                            </Col>
                            <Col>
                              <Popconfirm
                                placement="topLeft"
                                trigger="hover"
                                title={intl.formatMessage({
                                  defaultMessage: 'Remove the image?',
                                  id: 'bRha+v',
                                })}
                                onConfirm={() => onRemoveImage(file.uid)}
                                okText={intl.formatMessage({
                                  defaultMessage: 'Yes',
                                  id: 'a5msuh',
                                })}
                                cancelText={intl.formatMessage({
                                  defaultMessage: 'No',
                                  id: 'oUWADl',
                                })}
                                overlayInnerStyle={{ padding: 10 }}
                              >
                                <Button
                                  size="small"
                                  disabled={disabled}
                                  icon={<FontAwesomeIcon icon={faTrash} />}
                                />
                              </Popconfirm>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                  )}
                >
                  {images.length < 10 &&
                    intl.formatMessage({
                      defaultMessage: '+ Upload',
                      id: '3QJWLZ',
                    })}
                </Upload>
              </Form.Item>
            )}
            {fileList && fileList.length > 0 && (
              <Form.Item
                name="documents"
                label={intl.formatMessage({
                  defaultMessage: 'Other Media',
                  id: 'w9BFSc',
                })}
              >
                <Upload
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...documentUploadProps}
                  listType="picture"
                  style={{ display: 'flex' }}
                  fileList={fileList}
                >
                  <Button icon={<UploadOutlined />}>
                    {intl.formatMessage({
                      defaultMessage: 'Upload Document',
                      id: 'Kc9MAV',
                    })}
                  </Button>
                </Upload>
              </Form.Item>
            )}
          </>
        ) : (
          <Row justify="center">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={intl.formatMessage({
                defaultMessage: 'No images & media added yet.',
                id: 'EgTScc',
              })}
            />
          </Row>
        )}

        {/* TODO! */}
        <ImageEditor
          submitImage={onEditImage}
          onClose={() => setEditImage(null)}
          open={!!editImage}
          image={editImage}
          primaryImage={primaryImage}
          setPrimaryImage={setPrimaryImage}
        />
      </Col>
    </Row>
  );
};
export default ImageSection;
