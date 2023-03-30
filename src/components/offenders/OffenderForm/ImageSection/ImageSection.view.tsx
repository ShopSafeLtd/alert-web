import React from 'react';
import {
  Button,
  Col,
  Form,
  Popconfirm,
  Row,
  Spin,
  Typography,
  Upload,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUpload, faUsers } from '@fortawesome/pro-light-svg-icons';
import type { UploadProps, RcFile, UploadFile } from 'antd/es/upload/interface';
import WatermarkImage from 'components/images/WatermarkImage.view';

const { Title, Paragraph, Text } = Typography;
interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: string | undefined | null;
  }[];
}
interface Props {
  titleOrder: number;
  imgChange: UploadProps['onChange'];
  removeImage: (uid: string) => void;
  removeImageFromOffender: (data: { image: Image; offenderId: string }) => void;
  beforeUpload: (value: RcFile) => void;
  fileList: Image[];
  setAssignToImage: (image: Image) => void;
  onPreview?: (value: Image) => void;
}

const ImageSection = ({
  titleOrder,
  imgChange,
  fileList,
  beforeUpload,
  setAssignToImage,
  removeImageFromOffender,
  removeImage,
  onPreview,
}: Props): JSX.Element => (
  <Row gutter={20} style={{ marginTop: 50 }}>
    <Col>
      <Row align="middle" style={{ marginBottom: 20 }}>
        <Col>
          <Title style={{ marginBottom: 0 }} level={4}>
            {`${titleOrder}.`}
          </Title>
        </Col>
        <Col>
          <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
            Images
          </Title>
        </Col>
        <Col>
          <Paragraph
            style={{ marginBottom: 1, marginLeft: 5 }}
            type="secondary"
            italic
          >
            - Please add any images that you have of the incident.
          </Paragraph>
        </Col>
        <Col style={{ marginLeft: 30 }}>
          <Upload
            action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
            fileList={fileList}
            onChange={imgChange}
            beforeUpload={beforeUpload}
            accept=".png,.jpeg,.webp"
            showUploadList={false}
          >
            <Button
              icon={
                <FontAwesomeIcon icon={faUpload} style={{ marginRight: 5 }} />
              }
              style={{ color: 'red' }}
            >
              Upload Image
            </Button>
          </Upload>
        </Col>
      </Row>
      <Form.Item name="images">
        <Upload<Image>
          action={import.meta.env.VITE_APP_IMAGE_UPLOAD_ENDPOINT}
          className="incident-form-images"
          onPreview={onPreview}
          listType="picture-card"
          fileList={fileList}
          onChange={imgChange}
          beforeUpload={beforeUpload}
          accept=".png,.jpeg,.webp"
          itemRender={(el, file: Image) => (
            <div className="image-card" key={el.key}>
              {file.url === undefined && (
                <div className="image-card-loading">
                  <Spin />
                </div>
              )}

              <div className="image-card-image">
                <WatermarkImage url={file.url || file.thumbUrl} />
                <div className="image-remove-button">
                  <Popconfirm
                    placement="topLeft"
                    trigger="hover"
                    title="Remove the image?"
                    onConfirm={() => removeImage(file.uid)}
                    okText="Yes"
                    cancelText="No"
                    overlayInnerStyle={{ padding: 10 }}
                  >
                    <Button
                      size="small"
                      icon={<FontAwesomeIcon icon={faTrash} />}
                    />
                  </Popconfirm>
                </div>
              </div>
              <div className="image-card-offenders">
                <Text strong>Offenders:</Text>
                {file.offenders && file.offenders.length === 0 && (
                  <Paragraph>
                    You have not assigned any offender to this image.
                  </Paragraph>
                )}
                {file.offenders?.map((offender) => (
                  <div className="image-card-offender" key={offender.id}>
                    <Text className="image-card-offender-text">
                      {offender.name}
                    </Text>
                    <Popconfirm
                      placement="topLeft"
                      title="Remove the image from the offender?"
                      onConfirm={() => {
                        removeImageFromOffender({
                          image: file,
                          offenderId: offender.id,
                        });
                      }}
                      okText="Yes"
                      cancelText="No"
                      overlayInnerStyle={{ padding: 10 }}
                    >
                      <Button
                        size="small"
                        icon={<FontAwesomeIcon icon={faTrash} />}
                        style={{ color: 'red' }}
                      />
                    </Popconfirm>
                  </div>
                ))}
                <Button
                  size="small"
                  type="primary"
                  style={{ marginTop: 10 }}
                  onClick={() => setAssignToImage(file)}
                  icon={
                    <FontAwesomeIcon
                      icon={faUsers}
                      style={{ marginRight: 5 }}
                    />
                  }
                >
                  Assign Offenders
                </Button>
              </div>
            </div>
          )}
        >
          {fileList.length < 10 && '+ Upload'}
        </Upload>
      </Form.Item>
    </Col>
  </Row>
);
export default ImageSection;
