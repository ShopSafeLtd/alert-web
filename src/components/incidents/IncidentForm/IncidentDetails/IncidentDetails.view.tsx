import React from 'react';
import { Col, Form, Input, Row, Typography } from 'antd';

const { Title, Paragraph } = Typography;

interface Props {
  saving: boolean;
}

const IncidentDetails = ({ saving }: Props): JSX.Element => (
  <>
    <Row align="bottom" style={{ marginBottom: 20 }}>
      <Col>
        <Title style={{ marginBottom: 0 }} level={4}>
          7.
        </Title>
      </Col>
      <Col>
        <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
          Incident Details
        </Title>
      </Col>
      <Col>
        <Paragraph
          style={{ marginBottom: 1, marginLeft: 5 }}
          type="secondary"
          italic
        >
          - Please complete the details for the incident.
        </Paragraph>
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={20}>
        <Form.Item
          name="description"
          label="Description"
          tooltip="A more detailed description of the incident."
          rules={[
            {
              required: true,
              message: 'Please enter a description for the incident.',
            },
          ]}
        >
          <Input.TextArea disabled={saving} />
        </Form.Item>
      </Col>
    </Row>
  </>
);
export default IncidentDetails;
