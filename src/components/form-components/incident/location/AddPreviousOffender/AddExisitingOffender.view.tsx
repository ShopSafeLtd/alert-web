/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { AddressesQuery } from 'graphql/generated';
import { Row, Col, Button, Skeleton, Form, Radio, Typography } from 'antd';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLocationDot } from '@fortawesome/pro-light-svg-icons';

const { Paragraph } = Typography;
interface FormData {
  selectedLocation: string;
}

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  data: Exclude<AddressesQuery['addresses'], undefined | null> | undefined;
  loading: boolean;
}

const ViewOffender = ({
  onClose,
  onSubmit,
  saving,
  data,
  loading,
}: Props): JSX.Element =>
  loading ? (
    <Skeleton />
  ) : (
    <>
      <Form layout="vertical" onFinish={onSubmit}>
        {/* <Row>
        <Col span={8}> */}
        <Form.Item
          name="selectedLocation"
          label="Previous Locations:"
          rules={[
            {
              required: true,
              message: 'Please at least select an location for the incident.',
            },
          ]}
        >
          <Radio.Group>
            {data?.map((location) => (
              <Row wrap={false} key={location.id}>
                <Col>
                  <Radio value={location.id} key={location.id}>
                    <Paragraph ellipsis key={location.id}>
                      {/* <FontAwesomeIcon icon={faLocationDot} /> */}
                      {location.full}
                    </Paragraph>
                  </Radio>
                </Col>
              </Row>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={10} justify="end">
            <Col>
              <Button disabled={saving} onClick={onClose}>
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                disabled={saving}
                loading={saving}
                type="primary"
                htmlType="submit"
              >
                select location
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );

export default ViewOffender;
