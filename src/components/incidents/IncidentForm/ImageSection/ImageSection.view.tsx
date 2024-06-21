import React from 'react';
import type { FormInstance } from 'antd';
import {
  Button,
  Col,
  Empty,
  Form,
  Popconfirm,
  Row,
  Spin,
  Tooltip,
  Typography,
  Upload,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faFileArrowUp,
  faImages,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import WatermarkImage from 'components/images/WatermarkImage.view';
import ImageEditor from 'components/form-components/ImageEditor/ImageEditor.view';

import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import type { StateImageData } from './useImageSection';
import useImageSection from './useImageSection';
import type { FormData } from '../../../../views/incidents/AddIncident/useAddIncident';
import { compressImage } from '../../../../utils/compress-images';
import type { IncidentFormField } from 'graphql/types';
import { ImagePosition } from 'graphql/types';

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
  const facialDetection = useStoreState(
    (state) => state.scheme.facialDetection
  );

  return (
    <div>
      <Row align="middle" style={{ marginBottom: 20 }}>
        <Col>
          <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
            {intl.formatMessage({
              defaultMessage: 'Images & Other Media',
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
            })}
          </Paragraph>
        </Col>
        <Col style={{ marginLeft: 30 }}>
          <Upload
            fileList={images}
            onChange={onImageChange}
            action={
              facialDetection
                ? import.meta.env.VITE_APP_IMAGE_ANALYSE_UPLOAD_ENDPOINT_GO
                : import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT
            }
            className="incident-form-images-no-offenders"
            // listType="picture-card"
            accept=".png,.jpeg"
            disabled={disabled}
            beforeUpload={async (file) => compressImage(file)}
            showUploadList={false}
          >
            <Tooltip
              title={intl.formatMessage({
                defaultMessage: 'Upload any images you have for the offender.',
              })}
              placement="bottom"
            >
              <Button
                icon={
                  <FontAwesomeIcon icon={faImages} style={{ marginRight: 5 }} />
                }
                style={{ color: 'red' }}
              >
                {intl.formatMessage({
                  defaultMessage: 'Upload Image',
                })}
              </Button>
            </Tooltip>
          </Upload>
        </Col>
        <Col style={{ marginLeft: 30 }}>
          <Tooltip
            title={intl.formatMessage({
              defaultMessage:
                'Add documents to the offender such as PDFs or videos.',
            })}
            placement="bottom"
          >
            <Upload
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...documentUploadProps}
              listType="picture"
              style={{ display: 'flex' }}
              fileList={fileList}
              showUploadList={false}
            >
              <Button
                icon={
                  <FontAwesomeIcon
                    icon={faFileArrowUp}
                    style={{ marginRight: 5 }}
                  />
                }
                type="text"
              >
                {intl.formatMessage({
                  defaultMessage: 'Upload Document',
                })}
              </Button>
            </Upload>
          </Tooltip>
        </Col>
      </Row>
      {images && images.length === 0 && (
        <Row justify="center">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={intl.formatMessage({
              defaultMessage: 'No images & media added yet.',
            })}
          />
        </Row>
      )}
      <Form.Item
        name="images"
        label={
          images && images.length === 0
            ? undefined
            : intl.formatMessage({
                defaultMessage: 'Images',
              })
        }
        style={
          images && images.length === 0
            ? {
                height: 0,
                marginBottom: 0,
              }
            : undefined
        }
      >
        <Upload
          fileList={images}
          onChange={onImageChange}
          action={
            facialDetection
              ? import.meta.env.VITE_APP_IMAGE_ANALYSE_UPLOAD_ENDPOINT_GO
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
            <div className="image-card" style={{ width: 200 }} key={el.key}>
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
                        })}
                        onConfirm={() => onRemoveImage(file.uid)}
                        okText={intl.formatMessage({
                          defaultMessage: 'Yes',
                        })}
                        cancelText={intl.formatMessage({
                          defaultMessage: 'No',
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
        />
      </Form.Item>
      {fileList && fileList.length > 0 && (
        <div style={{ width: '35%' }}>
          <Form.Item
            name="documents"
            label={intl.formatMessage({
              defaultMessage: 'Other Media',
            })}
          >
            <Upload
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...documentUploadProps}
              listType="picture"
              style={{ display: 'flex' }}
              fileList={fileList}
            />
          </Form.Item>
        </div>
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
    </div>
  );
};
export default ImageSection;
