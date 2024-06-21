import React from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import { useIntl } from 'react-intl';
import type { LocationData } from 'types/DataType';
import LocatingCard from 'components/map/LocatingCard';
import type { FormInstance } from 'antd';
import type { FormData } from './useAddLocation';

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  location: LocationData | undefined;
  setLocation: (value: LocationData) => void;
  form: FormInstance<FormData>;
  locationData?: LocationData;
  showAlias?: boolean;
}

const AddLocation = ({
  onClose,
  onSubmit,
  saving,
  location,
  setLocation,
  form,
  locationData,
  showAlias,
}: Props): JSX.Element => {
  const intl = useIntl();

  // const businesses = useStoreState((state) => state.user.businesses);

  return (
    <Form
      layout="vertical"
      onFinish={onSubmit}
      form={form}
      initialValues={locationData}
    >
      <Form.Item
        name="location"
        label={intl.formatMessage({
          defaultMessage: 'Location',
        })}
      >
        <LocatingCard
          width="100%"
          height={194}
          location={location}
          setLocation={setLocation}
        />
      </Form.Item>

      <Row gutter={16}>
        {showAlias && (
          <Col span={12}>
            <Form.Item
              name="alias"
              label={intl.formatMessage({
                defaultMessage: 'Label',
              })}
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
            name="building"
            label={intl.formatMessage({
              defaultMessage: 'Building',
            })}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="street"
            label={intl.formatMessage({
              defaultMessage: 'Street',
            })}
            rules={[
              {
                required: !location,
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a street for the new location.',
                }),
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="townCity"
            label={intl.formatMessage({
              defaultMessage: 'Town/City',
            })}
            rules={[
              {
                required: !location,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please enter a town/city for the new location.',
                }),
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="county"
            label={intl.formatMessage({
              defaultMessage: 'County',
            })}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="postcode"
            label={intl.formatMessage({
              defaultMessage: 'Postcode',
            })}
            rules={[
              {
                required: !location,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please enter a postcode for the new location.',
                }),
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={10} justify="end">
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              loading={saving}
              type="primary"
              htmlType="submit"
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
