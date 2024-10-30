import type { FormInstance } from 'antd';
import type { ImageData } from 'components/form-components/ImageSelect/ImageSelect.view';
import type { VehicleData } from 'types/DataType';

import { Button, Col, Form, Input, Row, Skeleton } from 'antd';
import ImageSelect from 'components/form-components/ImageSelect/ImageSelect.view';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useEditVehicleSimple';

interface Props {
  editData: VehicleData | null | undefined;
  form: FormInstance<FormData>;
  images?: ImageData[];
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const EditVehicle = ({
  editData,
  form,
  images,
  onClose,
  onSubmit,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();
  const filteredImages = images?.filter(
    (el) => !editData?.images?.find((el2) => el2.url === el.url)
  );
  const vehicleImages = editData?.images?.map((el) => ({ ...el, uid: el.id }));
  const allImages = vehicleImages
    ? [...(filteredImages || []), ...vehicleImages]
    : images;
  return editData ? (
    <div>
      <Form<FormData>
        form={form}
        initialValues={{
          colour: editData.colour || '',
          images: editData.images || null,
          make: editData.make || '',
          model: editData.model || '',
          registration: editData.registration || '',
        }}
        layout="vertical"
        onFinish={onSubmit}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Make',
              })}
              name="make"
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Model',
              })}
              name="model"
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Colour',
              })}
              name="colour"
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Registration',
              })}
              name="registration"
            >
              <Input disabled={saving} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label={intl.formatMessage({
            defaultMessage: 'Images',
          })}
          name="images"
          tooltip={intl.formatMessage({
            defaultMessage: 'Select the images that the vehicle is in.',
          })}
        >
          <ImageSelect images={allImages} value={editData.images} />
        </Form.Item>
        <Form.Item>
          <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
            <Col>
              <Button disabled={saving} onClick={onClose}>
                {intl.formatMessage({ defaultMessage: 'Cancel' })}
              </Button>
            </Col>
            <Col>
              <Button
                disabled={saving}
                htmlType="submit"
                loading={saving}
                type="primary"
              >
                {intl.formatMessage({ defaultMessage: 'Save' })}
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
