import React from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Popconfirm,
  Row,
  Typography,
  Upload,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUpload } from '@fortawesome/pro-light-svg-icons';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import WatermarkImage from 'components/images/WatermarkImage.view';
import ImageEditor from 'components/form-components/ImageEditor/ImageEditor.view';
import { useIntl } from 'react-intl';
import type { Image } from 'types/DataType';

const { Title, Paragraph } = Typography;

interface Props {
  titleOrder: number;
  imgChange: UploadProps['onChange'];
  onRemoveImage: (uid: string) => void;
  beforeUpload: (value: RcFile) => void;
  fileList: Image[];
  toggleEditImage: (value?: Image) => void;
  primaryImage: string;
  editImage: Image | null;
  onEditImage: (value: Image) => void;
  setPrimaryImage: (value: string) => void;
}

const OffenderImage = ({
  titleOrder,
  imgChange,
  fileList,
  beforeUpload,
  editImage,
  onEditImage,
  toggleEditImage,
  onRemoveImage,
  primaryImage,
  setPrimaryImage,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <>
      <Card>
        <Row>
          <Col>
            <Row align="middle" style={{ marginBottom: 20 }}>
              <Col>
                <Title style={{ marginBottom: 0 }} level={4}>
                  {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                  {titleOrder}.
                </Title>
              </Col>
              <Col>
                <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
                  {intl.formatMessage({
                    defaultMessage: 'Images',
                    id: 'Fip4H8',
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
                      '- Please add any images that you have of the offender.',
                    id: 'REcCeM',
                  })}
                </Paragraph>
              </Col>
              <Col style={{ marginLeft: 30 }}>
                <Upload
                  accept=".png,.jpeg,.webp"
                  action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
                  fileList={fileList}
                  onChange={imgChange}
                  beforeUpload={beforeUpload}
                  showUploadList={false}
                >
                  <Button
                    icon={
                      <FontAwesomeIcon
                        icon={faUpload}
                        style={{ marginRight: 5 }}
                      />
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
            </Row>

            <Form.Item name="images">
              <Upload
                accept=".png,.jpeg,.webp"
                action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
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
                    <div style={{ height: 200, width: '100%' }}>
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
                        url={file.url || file.thumbUrl}
                      />
                    </div>
                  </Card>
                )}
              >
                {fileList.length < 10 &&
                  intl.formatMessage({
                    defaultMessage: '+ Upload',
                    id: '3QJWLZ',
                  })}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Card>
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

export default OffenderImage;
