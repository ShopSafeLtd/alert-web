import React from 'react';
import type { FormInstance } from 'antd';
import { Button, Col, Popconfirm, Row, Spin, Typography, Upload } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/pro-light-svg-icons';
import WatermarkImage from 'components/images/WatermarkImage.view';
import ImageEditor from 'components/form-components/ImageEditor/ImageEditor.view';
import type { IncidentFormField } from 'graphql/generated';
import { ImagePosition } from 'graphql/generated';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import type { StateImageData } from './useImageSection';
import useImageSection from './useImageSection';
import type { FormData } from '../../../../views/incidents/AddIncident/useAddIncident';
import { compressImage } from '../../../../utils/compress-images';

const { Title, Paragraph } = Typography;

interface Props {
  incidentForm: IncidentFormField[];
  form: FormInstance<FormData>;
  value?: StateImageData[];
  onChange?: (data: StateImageData[]) => void;
  disabled: boolean;
  primaryImage: string;
  setPrimaryImage: (value: string) => void;
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
  } = useImageSection({
    value,
    incidentForm,
    form,
    onChange,
  });
  const facialRec = useStoreState((state) => state.scheme.facialRecognition);

  return (
    <Row gutter={20}>
      <Col>
        <Row align="middle" style={{ marginBottom: 20 }}>
          <Col>
            <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
              {intl.formatMessage({
                defaultMessage: 'Images & Other Media',
                id: 'OR3nwV',
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
                id: 'Fm/tL0',
              })}
            </Paragraph>
          </Col>
        </Row>
        <Upload
          fileList={images}
          onChange={onImageChange}
          action={
            facialRec
              ? import.meta.env.VITE_APP_IMAGE_ANALYSE_UPLOAD_ENDPOINT
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
        >
          {images.length < 10 &&
            intl.formatMessage({ defaultMessage: '+ Upload', id: '3QJWLZ' })}
        </Upload>
        {/* TODO! */}
        <ImageEditor
          submitImage={onEditImage}
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
