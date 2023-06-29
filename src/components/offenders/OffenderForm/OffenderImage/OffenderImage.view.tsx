import React from 'react';
import { Button, Card, Col, Form, Row, Typography, Upload } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUpload } from '@fortawesome/pro-light-svg-icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import WatermarkImage from 'components/images/WatermarkImage.view';
import ImageEditor from 'components/form-components/ImageEditor/ImageEditor.view';
import type { ImagePosition } from 'graphql/generated';
import { useIntl } from 'react-intl';

const { Title, Paragraph } = Typography;

interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: string | undefined | null;
  }[];
  position?: ImagePosition;
  primary?: boolean;
  policeImage?: boolean;
}

interface Props {
  titleOrder: number;
  imgChange: UploadProps['onChange'];
  onRemoveImage: (uid: string) => void;
  beforeUpload: (value: RcFile) => void;
  fileList: Image[];
  onPreview?: (value: Image) => void;
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
  onPreview,
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
                onPreview={onPreview}
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
                      <Button
                        size="small"
                        style={{
                          position: 'absolute',
                          zIndex: 10,
                          padding: '6.5px 10px',
                          top: 5,
                          left: 45,
                        }}
                        onClick={() => onRemoveImage(file.uid)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
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
