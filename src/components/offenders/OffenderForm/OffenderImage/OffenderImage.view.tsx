import type { UploadFile } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type { Image, ImageFaceType } from 'types/DataType';

import FacesSelect from '#/components/form-components/FacesSelect/FacesSelect.view';
import { getCustomUrls } from '#/providers/GetCustomUrls';
import { currentSchemeAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  faEdit,
  faFileArrowUp,
  faImages,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
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
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { useIntl } from 'react-intl';

import customRequest from '../../../../utils/custom-request';

const { Paragraph, Title } = Typography;

interface Props {
  beforeUpload: (value: RcFile) => void;
  documentList: UploadFile[];
  documentUploadProps?: UploadProps;
  editImage: Image | null;
  fileList: Image[];
  imgChange: UploadProps['onChange'];
  onCloseFaces: () => void;
  onEditImage: (value: Image) => void;
  onRemoveImage: (uid: string) => void;
  onSelectFace: (value: ImageFaceType) => void;
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
  titleOrder: number;
  toggleEditImage: (value?: Image) => void;
  uploadFaces: ImageFaceType[];
  uploading: boolean;
}

const OffenderImage = ({
  beforeUpload,
  documentList,
  documentUploadProps,
  editImage,
  fileList,
  imgChange,
  onCloseFaces,
  onEditImage,
  onRemoveImage,
  onSelectFace,
  primaryImage,
  setPrimaryImage,
  titleOrder,
  toggleEditImage,
  uploadFaces,
  uploading,
}: Props): JSX.Element => {
  const intl = useIntl();
  const facialRec = useAtomValue(currentSchemeAtom)?.facialRecognition;
  const { imageAnalyseGo } = getCustomUrls();

  return (
    <>
      <Card>
        <Row align="middle" style={{ marginBottom: 20 }}>
          <Col>
            <Title level={4} style={{ marginBottom: 0 }}>
              {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
              {titleOrder}.
            </Title>
          </Col>
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
                  '- Please add any images & media that you have of the offender.',
              })}
            </Paragraph>
          </Col>
          <Col style={{ marginLeft: 30 }}>
            <Upload
              accept=".png,.jpeg,.webp"
              action={facialRec ? imageAnalyseGo : undefined}
              beforeUpload={beforeUpload}
              customRequest={facialRec ? undefined : customRequest}
              fileList={fileList}
              onChange={imgChange}
              showUploadList={false}
            >
              <Tooltip
                placement="bottom"
                title={intl.formatMessage({
                  defaultMessage:
                    'Upload any images you have for the offender.',
                })}
              >
                <Button
                  icon={
                    <FontAwesomeIcon
                      icon={faImages}
                      style={{ marginRight: 5 }}
                    />
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
          <Col style={{ marginLeft: 10 }}>
            <Upload
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...documentUploadProps}
              fileList={documentList}
              listType="picture"
              showUploadList={false}
              style={{ display: 'flex' }}
            >
              <Tooltip
                placement="bottom"
                title={intl.formatMessage({
                  defaultMessage:
                    'Add documents to the offender such as PDFs or videos.',
                })}
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
              </Tooltip>
            </Upload>
          </Col>
        </Row>
        {(fileList && fileList.length > 0) ||
        (documentList && documentList.length > 0) ? (
          <>
            {fileList && fileList.length > 0 && (
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Images',
                })}
                name="images"
              >
                <Upload
                  accept=".png,.jpeg,.webp"
                  action={facialRec ? imageAnalyseGo : undefined}
                  beforeUpload={beforeUpload}
                  customRequest={facialRec ? undefined : customRequest}
                  fileList={fileList}
                  // eslint-disable-next-line react/no-unstable-nested-components
                  itemRender={(el, file: Image) => (
                    <Card
                      bodyStyle={{
                        borderRadius: 10,
                        overflow: 'hidden',
                        padding: 0,
                      }}
                      key={el.key}
                    >
                      <div style={{ height: 200, width: '100%' }}>
                        <Button
                          onClick={() => toggleEditImage(file)}
                          size="small"
                          style={{
                            left: 5,
                            padding: '6.5px 10px',
                            position: 'absolute',
                            top: 5,
                            zIndex: 10,
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
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
                            size="small"
                            style={{
                              left: 45,
                              padding: '6.5px 10px',
                              position: 'absolute',
                              top: 5,
                              zIndex: 10,
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </Popconfirm>
                        {uploading && (
                          <div
                            style={{
                              position: 'absolute',
                              right: '45%',
                              top: '45%',
                              zIndex: 10,
                            }}
                          >
                            <Spin />
                          </div>
                        )}
                        <WatermarkImage
                          position={file.position}
                          url={file.url || file.thumbUrl}
                        />
                      </div>
                    </Card>
                  )}
                  listType="picture-card"
                  onChange={imgChange}
                >
                  {/* {fileList.length < 10 &&
                  intl.formatMessage({
                    defaultMessage: '+ Upload',
                    id: '3QJWLZ',
                  })} */}
                </Upload>
              </Form.Item>
            )}

            {documentList.length > 0 && (
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
                    fileList={documentList}
                    listType="picture"
                    style={{ display: 'flex' }}
                  />
                  {/* <Button icon={<UploadOutlined />}>
                  {intl.formatMessage({
                    defaultMessage: 'Upload Document',
                    id: 'Kc9MAV',
                  })}
                </Button>
              </Upload> */}
                </Form.Item>
              </div>
            )}
          </>
        ) : (
          <Row justify="center">
            <Empty
              description={intl.formatMessage({
                defaultMessage: 'No images & media added yet.',
              })}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </Row>
        )}
      </Card>
      <ImageEditor
        image={editImage}
        onClose={toggleEditImage}
        open={!!editImage}
        primaryImage={primaryImage}
        setPrimaryImage={setPrimaryImage}
        submitImage={onEditImage}
      />
      <FacesSelect
        faces={uploadFaces}
        onClose={onCloseFaces}
        open={!!(uploadFaces && uploadFaces.length > 0)}
        submitFace={onSelectFace}
      />
    </>
  );
};

export default OffenderImage;
