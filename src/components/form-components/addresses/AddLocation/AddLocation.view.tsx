import type { FormInstance } from 'antd';
import type { LocationData } from 'types/DataType';

import { Button, Col, Form, Input, Row } from 'antd';
import LocatingCard from 'components/map/LocatingCard';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useAddLocation';

interface Props {
  form: FormInstance<FormData>;
  location: LocationData | undefined;
  locationData?: LocationData;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  setLocation: (value: LocationData) => void;
  showAlias?: boolean;
}

const AddLocation = ({
  form,
  location,
  locationData,
  onClose,
  onSubmit,
  saving,
  setLocation,
  showAlias,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <Form
      form={form}
      initialValues={locationData}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Form.Item
        label={intl.formatMessage({
          defaultMessage: 'Location',
        })}
        name="location"
      >
        <LocatingCard
          height={194}
          location={location}
          setLocation={setLocation}
          width="100%"
        />
      </Form.Item>

      <Row gutter={16}>
        {showAlias && (
          <Col span={12}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Label',
              })}
              name="alias"
              tooltip={intl.formatMessage({
                defaultMessage:
                  'A friendly name for the address to identify it, such as home',
              })}
            >
              <Input />
            </Form.Item>
          </Col>
        )}
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Building',
            })}
            name="building"
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Street',
            })}
            name="street"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a street for the new location.',
                }),
                required: !location,
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Town/City',
            })}
            name="townCity"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage:
                    'Please enter a town/city for the new location.',
                }),
                required: !location,
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'County',
            })}
            name="county"
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Postcode',
            })}
            name="postcode"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage:
                    'Please enter a postcode for the new location.',
                }),
                required: !location,
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Row gutter={10} justify="end" style={{ marginTop: 30 }}>
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
  );
};

export default AddLocation;
