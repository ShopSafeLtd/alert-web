/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { AddressesQuery } from 'graphql/generated';
import {
  Row,
  Col,
  Button,
  Skeleton,
  Form,
  Radio,
  Typography,
  // Checkbox,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/pro-light-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLocationDot } from '@fortawesome/pro-light-svg-icons';

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
}: Props): JSX.Element =>
  loading ? (
    <Skeleton />
  ) : (
    <>
      <Form layout="vertical" onFinish={onSubmit} className="previous-location">
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
            {data?.addresses &&
              data.addresses.map((location) => (
                <Row wrap={false} key={location.id} align="bottom">
                  <Radio value={location.id} key={location.id}>
                    <Paragraph ellipsis key={location.id}>
                      <FontAwesomeIcon
                        style={{ marginRight: 6, color: 'rgb(222, 68, 54)' }}
                        icon={faLocationDot}
                      />
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
                Select Location
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );

export default ViewOffender;
