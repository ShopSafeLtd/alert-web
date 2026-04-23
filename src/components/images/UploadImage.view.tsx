import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import type { Image } from 'types/DataType';

import { getCustomUrls } from '#/providers/GetCustomUrls';
import { faEdit, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Form, Popconfirm, Row, Spin, Upload } from 'antd';
import ImageEditor from 'components/form-components/ImageEditor/ImageEditor.view';
import WatermarkImage from 'components/images/WatermarkImage.view';
import React from 'react';
import { useIntl } from 'react-intl';

import customRequest from '../../utils/custom-request';

interface Props {
  beforeUpload: (value: RcFile) => void;
  editImage: Image | null;
  facialRec?: boolean;
  fileList: Image[];
  imgChange: UploadProps['onChange'];
  onEditImage: (value: Image) => void;
  onRemoveImage: (uid: string) => void;
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
  title: string;
  toggleEditImage: (value?: Image) => void;
  uploading?: boolean;
}

const UploadImage = ({
  beforeUpload,
  editImage,
  facialRec,
  fileList,
  imgChange,
  onEditImage,
  onRemoveImage,
  primaryImage,
  setPrimaryImage,
  title,
  toggleEditImage,
  uploading,
}: Props): JSX.Element => {
  const intl = useIntl();
  const { imageAnalyseGo } = getCustomUrls();
  return (
    <>
      <Row>
        <Col>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Images',
            })}
            name="images"
            tooltip={intl.formatMessage(
              {
                defaultMessage:
                  'Please add any images that you have of the {title}.',
              },
              { title }
            )}
          >
            <Upload
              accept=".png,.jpeg,.webp"
              action={facialRec ? imageAnalyseGo : undefined}
              beforeUpload={beforeUpload}
              className="upload-images"
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
                  <div style={{ height: 150, width: '100%' }}>
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
                      onConfirm={() => {
                        onRemoveImage(file.uid);
                      }}
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
                      rotation={file.rotation}
                      url={file.url || file.thumbUrl}
                    />
                  </div>
                </Card>
              )}
              listType="picture-card"
              onChange={imgChange}
            >
              {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
              {`+ ${intl.formatMessage({ defaultMessage: 'Upload' })}`}
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      <ImageEditor
        image={editImage}
        onClose={toggleEditImage}
        open={!!editImage}
        primaryImage={primaryImage}
        setPrimaryImage={setPrimaryImage}
        submitImage={onEditImage}
      />
    </>
  );
};

export default UploadImage;
