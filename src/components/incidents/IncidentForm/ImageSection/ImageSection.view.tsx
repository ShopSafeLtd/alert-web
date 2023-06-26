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
import { useIntl } from 'react-intl';

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
  const intl = useIntl();
  return (
    <Popconfirm
      placement="topLeft"
      title={intl.formatMessage({
        defaultMessage: 'Remove the image from the offender?',
        id: 'mJMb3v',
      })}
      open={confirmOpen}
      onConfirm={() => {
        removeImageFromOffender({
          image: file,
          offenderId: offender.id,
        });
      }}
      okText={intl.formatMessage({ defaultMessage: 'Yes', id: 'a5msuh' })}
      cancelText={intl.formatMessage({ defaultMessage: 'No', id: 'oUWADl' })}
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
  const intl = useIntl();
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
              {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
              {`${titleOrder}.`}
            </Title>
          </Col>
          <Col>
            <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
              {intl.formatMessage({ defaultMessage: 'Images', id: 'Fip4H8' })}
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
                  '- Please add any images that you have of the incident.',
                id: 'V72sYf',
              })}
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
                {intl.formatMessage({
                  defaultMessage: 'Upload Image',
                  id: 'MntrZe',
                })}
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
                          title={intl.formatMessage({
                            defaultMessage: 'Remove the image?',
                            id: 'bRha+v',
                          })}
                          onConfirm={() => removeImage(file.uid)}
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
                <div className="image-card-offenders">
                  <Text strong>
                    {intl.formatMessage({
                      defaultMessage: 'Offenders:',
                      id: 'HEnuMU',
                    })}
                  </Text>
                  {file.offenders && file.offenders.length === 0 && (
                    <Paragraph>
                      {intl.formatMessage({
                        defaultMessage:
                          'You have not assigned any offender to this image.',
                        id: 'NuUp/9',
                      })}
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
                    {intl.formatMessage({
                      defaultMessage: 'Assign Offenders',
                      id: 'GFrwvj',
                    })}
                  </Button>
                </div>
              </div>
            )}
          >
            {fileList.length < 10 &&
              intl.formatMessage({ defaultMessage: '+ Upload', id: '3QJWLZ' })}
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
