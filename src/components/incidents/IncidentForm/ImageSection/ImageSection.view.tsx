import React, { useState } from 'react';
import {
  Button,
  Col,
  Form,
  Popconfirm,
  Row,
  Spin,
  Tag,
  Typography,
  Upload,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrash,
  faUpload,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import WatermarkImage from 'components/images/WatermarkImage.view';
import ImageEditor from 'components/form-components/ImageEditor/ImageEditor.view';
import { ImagePosition } from 'graphql/generated';

const { Title, Paragraph, Text } = Typography;

interface Image extends UploadFile {
  offenders?: {
    id: string;
    name?: string | undefined | null;
  }[];
  position?: ImagePosition;
}

interface ImagePayload extends UploadFile {
  offenders?: {
    id: string;
    name?: string | undefined | null;
  }[];
  position: ImagePosition;
}

interface OffenderTagProps {
  removeImageFromOffender: (data: { image: Image; offenderId: string }) => void;
  file: Image;
  offender: { id: string; name?: string | null };
}

const OffenderTag = ({
  removeImageFromOffender,
  file,
  offender,
}: OffenderTagProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const preventDefault = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setConfirmOpen(true);
  };

  return (
    <Popconfirm
      placement="topLeft"
      title="Remove the image from the offender?"
      open={confirmOpen}
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
      <Tag color="blue" closable onClose={preventDefault}>
        {offender.name}
      </Tag>
    </Popconfirm>
  );
};

interface Props {
  titleOrder: number;
  imgChange: UploadProps['onChange'];
  removeImage: (uid: string) => void;
  removeImageFromOffender: (data: { image: Image; offenderId: string }) => void;
  beforeUpload: (value: RcFile) => void;
  fileList: Image[];
  setAssignToImage: (image: Image) => void;
  onPreview?: (value: Image) => void;
  disabled?: boolean;
  onEditImage: (value: ImagePayload) => void;
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
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
  disabled,
  onEditImage,
  primaryImage,
  setPrimaryImage,
}: Props): JSX.Element => {
  const [editImage, setEditImage] = useState<Image | null>(null);

  const handleEditSubmit = (value: Image) => {
    onEditImage({
      ...value,
      position: value.position || ImagePosition.CenterCenter,
    });
    setEditImage(null);
  };

  return (
    <Row gutter={20}>
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
              disabled={disabled}
            >
              <Button
                disabled={disabled}
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
            disabled={disabled}
            // TODO
            // eslint-disable-next-line react/no-unstable-nested-components
            itemRender={(el, file: Image) => (
              <div className="image-card" key={el.key}>
                {file.url === undefined && (
                  <div className="image-card-loading">
                    <Spin />
                  </div>
                )}

                <div className="image-card-image">
                  <WatermarkImage
                    position={file.position}
                    url={file.url || file.thumbUrl}
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
                          title="Remove the image?"
                          onConfirm={() => removeImage(file.uid)}
                          okText="Yes"
                          cancelText="No"
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
                <div className="image-card-offenders">
                  <Text strong>Offenders:</Text>
                  {file.offenders && file.offenders.length === 0 && (
                    <Paragraph>
                      You have not assigned any offender to this image.
                    </Paragraph>
                  )}
                  <Row gutter={[8, 8]}>
                    {file.offenders?.map((offender) => (
                      // <div className="image-card-offender" key={offender.id}>
                      //   <Text className="image-card-offender-text">
                      //     {offender.name}
                      //   </Text>
                      //   <Popconfirm
                      //     placement="topLeft"
                      //     title="Remove the image from the offender?"
                      //     onConfirm={() => {
                      //       removeImageFromOffender({
                      //         image: file,
                      //         offenderId: offender.id,
                      //       });
                      //     }}
                      //     okText="Yes"
                      //     cancelText="No"
                      //     overlayInnerStyle={{ padding: 10 }}
                      //   >
                      //     <Button
                      //       size="small"
                      //       disabled={disabled}
                      //       icon={<FontAwesomeIcon icon={faTrash} />}
                      //       style={{ color: 'red' }}
                      //     />
                      //   </Popconfirm>
                      // </div>
                      <Col span={24} key={offender.id}>
                        <OffenderTag
                          file={file}
                          offender={offender}
                          removeImageFromOffender={removeImageFromOffender}
                        />
                      </Col>
                    ))}
                  </Row>
                  <Button
                    size="small"
                    type="primary"
                    style={{ marginTop: 10 }}
                    onClick={() => setAssignToImage(file)}
                    disabled={disabled}
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
        {/* TODO! */}
        <ImageEditor
          submitImage={handleEditSubmit}
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
