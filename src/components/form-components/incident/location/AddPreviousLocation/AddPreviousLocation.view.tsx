import React from 'react';
import type { AddressesQuery } from 'graphql/generated';
import { Button, Col, Form, Radio, Row, Skeleton, Typography } from 'antd';
import { useIntl } from 'react-intl';

const { Paragraph } = Typography;

interface FormData {
  selectedLocation: string;
}

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  saving: boolean;
  data: AddressesQuery | undefined;
  loading: boolean;
}

const ViewOffender = ({
  onClose,
  onSubmit,
  saving,
  data,
  loading,
}: Props): JSX.Element => {
  const intl = useIntl();

  return !data && loading ? (
    <Skeleton />
  ) : (
    <Form layout="vertical" onFinish={onSubmit} className="previous-location">
      <Form.Item
        name="selectedLocation"
        label={intl.formatMessage({
          defaultMessage: 'Previous Locations:',
          id: 'tIUIJt',
        })}
        rules={[
          {
            required: true,
            message: intl.formatMessage({
              defaultMessage:
                'Please select at least one location for the incident.',
              id: 'AG8qKq',
            }),
          },
        ]}
      >
        <Radio.Group>
          {data?.addresses &&
            data.addresses.map((location) => (
              <Row wrap={false} key={location.id} align="bottom">
                <Radio
                  value={location.id}
                  key={location.id}
                  style={{ placeItems: 'normal' }}
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
        <Row style={{ marginTop: 30 }} gutter={10} justify="end">
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              loading={saving}
              type="primary"
              htmlType="submit"
            >
              {intl.formatMessage({
                defaultMessage: 'Select Location',
                id: 'yNCChc',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default ViewOffender;
