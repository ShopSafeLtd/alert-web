import React from 'react';
import { Col, Form, Input, Row, Typography } from 'antd';
import { useIntl } from 'react-intl';

const { Title, Paragraph } = Typography;

interface Props {
  saving: boolean;
  number: number;
}

const IncidentDetails = ({ saving, number }: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <>
      <Row align="bottom" style={{ marginBottom: 20 }}>
        <Col>
          <Title style={{ marginBottom: 0 }} level={4}>
            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
            {number}.
          </Title>
        </Col>
        <Col>
          <Title style={{ marginBottom: 0, marginLeft: 5 }} level={4}>
            {intl.formatMessage({
              defaultMessage: 'Incident Details',
              id: 'Imc8gS',
            })}
          </Title>
        </Col>
        <Col>
          <Paragraph
            style={{ marginBottom: 1, marginLeft: 5 }}
            type="secondary"
            italic
          >
            {intl.formatMessage({
              defaultMessage: '- Please complete the details for the incident.',
              id: '27//14',
            })}
          </Paragraph>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={20}>
          <Form.Item
            name="description"
            label={intl.formatMessage({
              defaultMessage: 'Description',
              id: 'Q8Qw5B',
            })}
            tooltip={intl.formatMessage({
              defaultMessage: 'A more detailed description of the incident.',
              id: 'gL4S9+',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please enter a description for the incident.',
                  id: 'AIkkvf',
                }),
              },
            ]}
          >
            <Input.TextArea disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
export default IncidentDetails;
