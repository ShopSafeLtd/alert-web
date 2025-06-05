import type { FormData } from '#/views/incidents/AddIncident/types/formData';
import type { IncidentFormState } from '#/views/incidents/AddIncident/useAddIncident';
import type { FormInstance } from 'antd';

import { getCustomUrls } from '#/providers/GetCustomUrls';
import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { compressImage } from '#/utils/compress-images';
import hasRolePermission from '#/utils/has-role-permission';
import {
  faEdit,
  faFileArrowUp,
  faImages,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import ImageEditor from 'components/form-components/ImageEditor/ImageEditor.view';
import WatermarkImage from 'components/images/WatermarkImage.view';
import {
  ImagePosition,
  PermissionMethod,
  PermissionModel,
} from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { useIntl } from 'react-intl';

import type { StateImageData } from './useImageSection';

import useImageSection from './useImageSection';

const { Paragraph, Title } = Typography;

interface Props {
  disabled: boolean;
  form: FormInstance<FormData>;
  incidentForm: IncidentFormState;
  onChange?: (data: StateImageData[]) => void;
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
  value?: StateImageData[];
}

const ImageSection = ({
  disabled = false,
  form,
  incidentForm,
  onChange,
  primaryImage,
  setPrimaryImage,
  value,
}: Props): JSX.Element => {
  const intl = useIntl();
  const {
    documentUploadProps,
    editImage,
    fileList,
    images,
    onEditImage,
    onImageChange,
    onRemoveImage,
    setEditImage,
  } = useImageSection({
    form,
    incidentForm,
    onChange,
    value,
  });
  const facialDetection =
    useAtomValue(currentSchemeAtom)?.facialDetection ?? false;

  const addOffenderRights = hasRolePermission({
    permission: {
      method: PermissionMethod.Write,
      model: PermissionModel.Offenders,
    },
  });

  const { imageAnalyseGo, imageUpload } = getCustomUrls();
  return (
    <div>
      <Row align="middle" gutter={[8, 8]} style={{ marginBottom: 20 }}>
        <Col>
          <Row>
            <Col>
              <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
                {intl.formatMessage({
                  defaultMessage: 'Images & Other Media',
                })}
              </Title>
            </Col>
            <Col>
              <Paragraph
                italic
                style={{ marginBottom: 1, marginLeft: 5 }}
                type="secondary"
              >
                {intl.formatMessage({
                  defaultMessage:
                    '- Please add other images & media that you have related to this incident.',
                })}
              </Paragraph>
            </Col>
          </Row>
        </Col>
        <Col>
          <Upload
            // listType="picture-card"
            accept=".png,.jpeg"
            action={
              facialDetection && addOffenderRights
                ? imageAnalyseGo
                : imageUpload
            }
            beforeUpload={async (file) => compressImage(file)}
            className="incident-form-images-no-offenders"
            disabled={disabled}
            fileList={images}
            onChange={onImageChange}
            showUploadList={false}
          >
            <Tooltip
              placement="bottom"
              title={intl.formatMessage({
                defaultMessage: 'Upload any images you have for the offender.',
              })}
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
        <Col>
          <Tooltip
            placement="bottom"
            title={intl.formatMessage({
              defaultMessage:
                'Add documents to the offender such as PDFs or videos.',
            })}
          >
            <Upload
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...documentUploadProps}
              fileList={fileList}
              listType="picture"
              showUploadList={false}
              style={{ display: 'flex' }}
            >
              <Button
                icon={
                  <FontAwesomeIcon
                    icon={faFileArrowUp}
                    style={{ marginRight: 5 }}
                  />
                }
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
            description={intl.formatMessage({
              defaultMessage: 'No images & media added yet.',
            })}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </Row>
      )}
      <Form.Item
        label={
          images && images.length === 0
            ? undefined
            : intl.formatMessage({
                defaultMessage: 'Images',
              })
        }
        name="images"
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
          accept=".png,.jpeg"
          action={
            facialDetection && addOffenderRights ? imageAnalyseGo : imageUpload
          }
          beforeUpload={async (file) => compressImage(file)}
          className="incident-form-images-no-offenders"
          disabled={disabled}
          fileList={images}
          // eslint-disable-next-line react/no-unstable-nested-components
          itemRender={(el, file: StateImageData) => (
            <div className="image-card" key={el.key} style={{ width: 200 }}>
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
                        disabled={disabled}
                        icon={<FontAwesomeIcon icon={faEdit} />}
                        onClick={() => setEditImage(file)}
                        size="small"
                      />
                    </Col>
                    <Col>
                      <Popconfirm
                        cancelText={intl.formatMessage({
                          defaultMessage: 'No',
                        })}
                        okText={intl.formatMessage({
                          defaultMessage: 'Yes',
                        })}
                        onConfirm={() => onRemoveImage(file.uid)}
                        overlayInnerStyle={{ padding: 10 }}
                        placement="topLeft"
                        title={intl.formatMessage({
                          defaultMessage: 'Remove the image?',
                        })}
                        trigger="hover"
                      >
                        <Button
                          disabled={disabled}
                          icon={<FontAwesomeIcon icon={faTrash} />}
                          size="small"
                        />
                      </Popconfirm>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          )}
          listType="picture-card"
          // TODO
          onChange={onImageChange}
        />
      </Form.Item>
      {fileList && fileList.length > 0 && (
        <div style={{ width: '35%' }}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Other Media',
            })}
            name="documents"
          >
            <Upload
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...documentUploadProps}
              fileList={fileList}
              listType="picture"
              style={{ display: 'flex' }}
            />
          </Form.Item>
        </div>
      )}

      {/* TODO! */}
      <ImageEditor
        image={editImage}
        onClose={() => setEditImage(null)}
        open={!!editImage}
        primaryImage={primaryImage}
        setPrimaryImage={setPrimaryImage}
        submitImage={onEditImage}
      />
    </div>
  );
};
export default ImageSection;
