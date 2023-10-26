import React from 'react';
import { Button, Card, Col, Form, Popconfirm, Row, Upload } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/pro-light-svg-icons';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import WatermarkImage from 'components/images/WatermarkImage.view';
import ImageEditor from 'components/form-components/ImageEditor/ImageEditor.view';
import { useIntl } from 'react-intl';
import type { Image } from 'types/DataType';

interface Props {
  imgChange: UploadProps['onChange'];
  onRemoveImage: (uid: string) => void;
  beforeUpload: (value: RcFile) => void;
  fileList: Image[];
  toggleEditImage: (value?: Image) => void;
  primaryImage: string;
  editImage: Image | null;
  onEditImage: (value: Image) => void;
  setPrimaryImage: (value: string) => void;
  title: string;
}

const UploadImage = ({
  imgChange,
  fileList,
  beforeUpload,
  editImage,
  onEditImage,
  toggleEditImage,
  onRemoveImage,
  primaryImage,
  setPrimaryImage,
  title,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <>
      <Row>
        <Col>
          <Form.Item
            name="images"
            label={intl.formatMessage({
              defaultMessage: 'Images',
              id: 'Fip4H8',
            })}
            tooltip={intl.formatMessage(
              {
                defaultMessage: `Please add any images that you have of the {title}.`,
                id: 'zBoD8y',
              },
              { title }
            )}
          >
            <Upload
              accept=".png,.jpeg,.webp"
              className="upload-images"
              action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT_GO}
              listType="picture-card"
              fileList={fileList}
              onChange={imgChange}
              beforeUpload={beforeUpload}
              // eslint-disable-next-line react/no-unstable-nested-components
              itemRender={(el, file: Image) => (
                <Card
                  key={el.key}
                  bodyStyle={{
                    padding: 0,
                    overflow: 'hidden',
                    borderRadius: 10,
                  }}
                >
                  <div style={{ width: '100%', height: 150 }}>
                    <Button
                      size="small"
                      style={{
                        position: 'absolute',
                        zIndex: 10,
                        padding: '6.5px 10px',
                        top: 5,
                        left: 5,
                      }}
                      onClick={() => toggleEditImage(file)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>

                    <Popconfirm
                      placement="topLeft"
                      trigger="hover"
                      title={intl.formatMessage({
                        defaultMessage: 'Remove the image?',
                        id: 'bRha+v',
                      })}
                      onConfirm={() => {
                        onRemoveImage(file.uid);
                      }}
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
                        style={{
                          position: 'absolute',
                          zIndex: 10,
                          padding: '6.5px 10px',
                          top: 5,
                          left: 45,
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </Popconfirm>
                    <WatermarkImage
                      position={file.position}
                      rotation={file.rotation}
                      url={file.url || file.thumbUrl}
                    />
                  </div>
                </Card>
              )}
            >
              {fileList.length < 6 &&
                // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                `+ ${intl.formatMessage({
                  defaultMessage: 'Upload',
                  id: 'p4N05H',
                })}`}
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      <ImageEditor
        submitImage={onEditImage}
        onClose={toggleEditImage}
        open={!!editImage}
        image={editImage}
        primaryImage={primaryImage}
        setPrimaryImage={setPrimaryImage}
      />
    </>
  );
};

export default UploadImage;
