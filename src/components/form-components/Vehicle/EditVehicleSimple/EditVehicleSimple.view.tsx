import React from 'react';
import type { FormInstance } from 'antd';
import { Button, Col, Form, Input, Row, Skeleton } from 'antd';
import type { VehicleCardData } from 'types/DataType';
import { useIntl } from 'react-intl';
import type { ImageData } from 'components/form-components/ImageSelect/ImageSelect.view';
import ImageSelect from 'components/form-components/ImageSelect/ImageSelect.view';
import type { FormData } from './useEditVehicleSimple';

interface Props {
  onClose: () => void;
  editData: VehicleCardData | undefined | null;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  form: FormInstance<FormData>;
  images?: ImageData[];
}

const EditVehicle = ({
  onClose,
  onSubmit,
  editData,
  saving,
  form,
  images,
}: Props): JSX.Element => {
  const intl = useIntl();
  return editData ? (
    <div>
      <Form<FormData>
        initialValues={{
          make: editData.make || '',
          model: editData.model || '',
          colour: editData.colour || '',
          registration: editData.registration || '',
          images: editData.images || [],
        }}
        layout="vertical"
        onFinish={onSubmit}
        form={form}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="make"
              label={intl.formatMessage({
                defaultMessage: 'Make',
                id: '6AAM0P',
              })}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="model"
              label={intl.formatMessage({
                defaultMessage: 'Model',
                id: 'rhSI1/',
              })}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="colour"
              label={intl.formatMessage({
                defaultMessage: 'Colour',
                id: '+e8vAT',
              })}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="registration"
              label={intl.formatMessage({
                defaultMessage: 'Registration',
                id: 'qv7ied',
              })}
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>

        {images && images.length > 0 && (
          <Form.Item
            name="images"
            label={intl.formatMessage({
              defaultMessage: 'Images',
              id: 'Fip4H8',
            })}
            tooltip={intl.formatMessage({
              defaultMessage: 'Select the images that the vehicle is in.',
              id: '+sAAjK',
            })}
          >
            <ImageSelect images={images} />
          </Form.Item>
        )}
        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={16} justify="end">
            <Col>
              <Button disabled={saving} onClick={onClose}>
                {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                disabled={saving}
                loading={saving}
              >
                {intl.formatMessage({ defaultMessage: 'Save', id: 'jvo0vs' })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  ) : (
    <Skeleton />
  );
};

export default EditVehicle;
