import React from 'react';
import { Col, DatePicker, Form, Input, Row, Typography } from 'antd';
import { useIntl } from 'react-intl';

const { Title, Paragraph } = Typography;

interface Props {
  saving: boolean;
}

const IncidentDetails = ({ saving }: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <>
      <Row align="bottom" style={{ marginBottom: 20 }}>
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
        <Col span={6}>
          <Form.Item
            name="date"
            label={intl.formatMessage(
              { defaultMessage: 'Time & Date', id: 'rXTgTq' },
              {}
            )}
            tooltip={intl.formatMessage(
              {
                defaultMessage: 'The date and time that the incident occurred.',
                id: '4eTajC',
              },
              {}
            )}
            rules={[
              {
                required: true,
                message: intl.formatMessage(
                  {
                    defaultMessage: 'Please select a date for the incident.',
                    id: 'Cgy3GX',
                  },
                  {}
                ),
              },
            ]}
          >
            <DatePicker
              disabled={saving}
              disabledDate={(current) =>
                current && current.valueOf() > Date.now()
              }
              format="HH:mm - DD/MM/YY"
              showTime={{ showSecond: false, showNow: true }}
              placeholder={intl.formatMessage(
                { defaultMessage: 'Set Date & Time', id: 'hQHL0E' },
                {}
              )}
            />
          </Form.Item>
        </Col>
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
