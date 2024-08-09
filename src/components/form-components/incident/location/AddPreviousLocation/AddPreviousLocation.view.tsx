import type { AddressesQuery } from 'graphql/incidents/queries/__generated__/address.generated';

import { Button, Col, Form, Radio, Row, Skeleton, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

const { Paragraph } = Typography;

interface FormData {
  selectedLocation: string;
}

interface Props {
  data: AddressesQuery | undefined;
  loading: boolean;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const ViewOffender = ({
  data,
  loading,
  onClose,
  onSubmit,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();

  return !data && loading ? (
    <Skeleton />
  ) : (
    <Form className="previous-location" layout="vertical" onFinish={onSubmit}>
      <Form.Item
        label={intl.formatMessage({
          defaultMessage: 'Previous Locations:',
        })}
        name="selectedLocation"
        rules={[
          {
            message: intl.formatMessage({
              defaultMessage:
                'Please select at least one location for the incident.',
            }),
            required: true,
          },
        ]}
      >
        <Radio.Group>
          {data?.addresses?.map((location) => (
            <Row align="bottom" key={location.id} wrap={false}>
              <Radio
                key={location.id}
                style={{ placeItems: 'normal' }}
                value={location.id}
              >
                <Paragraph ellipsis key={location.id}>
                  {location.full}
                </Paragraph>
              </Radio>
            </Row>
          ))}
        </Radio.Group>
      </Form.Item>

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
              {intl.formatMessage({
                defaultMessage: 'Select Location',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default ViewOffender;
