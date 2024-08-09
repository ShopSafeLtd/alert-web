import type { FormInstance } from 'antd';

import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { ImageData } from '../../ImageSelect/ImageSelect.view';
import type { FormData } from './useAddVehicleSimple';

import ImageSelect from '../../ImageSelect/ImageSelect.view';

interface Props {
  form: FormInstance<FormData>;
  images?: ImageData[] | undefined;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving?: boolean;
}

const AddVehicle = ({
  form,
  images,
  onClose,
  onSubmit,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div>
      <Form<FormData> form={form} layout="vertical" onFinish={onSubmit}>
        <Row gutter={16}>
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
        </Row>
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
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Groups',
              })}
              name="groupIds"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Select at least one group for the vehicle',
                  }),
                  required: true,
                },
              ]}
            >
              <GroupsSelect disabled={saving} mode="multiple" />
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
          <ImageSelect images={images} />
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
                {intl.formatMessage({
                  defaultMessage: 'Create Vehicle',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddVehicle;
