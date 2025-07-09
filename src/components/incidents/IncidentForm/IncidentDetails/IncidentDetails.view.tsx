import DatePicker from '#/components/util-components/DatePicker';
import { Col, Form, Input, Row, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

const { Paragraph, Title } = Typography;

interface Props {
  saving: boolean;
}

const IncidentDetails = ({ saving }: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <>
      <Row align="bottom" style={{ marginBottom: 20 }}>
        <Col>
          <Title level={4} style={{ marginBottom: 0, marginLeft: 5 }}>
            {intl.formatMessage({
              defaultMessage: 'Incident Details',
            })}
          </Title>
        </Col>
        <Col>
          <Paragraph
            italic
            style={{ marginBottom: 1, marginLeft: 5 }}
            type="secondary"
          >
            {intl.formatMessage({
              defaultMessage: '- Please complete the details for the incident.',
            })}
          </Paragraph>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col md={6} span={24}>
          <Form.Item
            label={intl.formatMessage({ defaultMessage: 'Time & Date' }, {})}
            name="date"
            rules={[
              {
                message: intl.formatMessage(
                  {
                    defaultMessage: 'Please select a date for the incident.',
                  },
                  {}
                ),
                required: true,
              },
            ]}
            tooltip={intl.formatMessage(
              {
                defaultMessage: 'The date and time that the incident occurred.',
              },
              {}
            )}
          >
            <DatePicker
              disabled={saving}
              disabledDate={(current) =>
                current && current.valueOf() > Date.now()
              }
              format="HH:mm - DD/MM/YY"
              placeholder={intl.formatMessage(
                { defaultMessage: 'Set Date & Time' },
                {}
              )}
              showTime={{ showNow: true, showSecond: false }}
            />
          </Form.Item>
        </Col>
        <Col span={20}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Please describe the incident',
            })}
            name="description"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage:
                    'Please enter a description for the incident.',
                }),
                required: true,
              },
            ]}
            tooltip={intl.formatMessage({
              defaultMessage: 'A more detailed description of the incident.',
            })}
          >
            <Input.TextArea disabled={saving} />
          </Form.Item>
        </Col>
        {/* <Col span={12}>*/}
        {/*  <Form.Item*/}
        {/*    label={intl.formatMessage({*/}
        {/*      defaultMessage: 'Completing activities requires authorization?',*/}
        {/*    })}*/}
        {/*    name="activityAuthorised"*/}
        {/*    tooltip={intl.formatMessage({*/}
        {/*      defaultMessage:*/}
        {/*        'Completing activities linked to this incident requires authorization.',*/}
        {/*    })}*/}
        {/*  >*/}
        {/*    <Radio.Group*/}
        {/*      disabled={saving}*/}
        {/*      optionType="button"*/}
        {/*      options={[*/}
        {/*        {*/}
        {/*          label: intl.formatMessage({*/}
        {/*            defaultMessage: 'Yes',*/}
        {/*          }),*/}
        {/*          value: true,*/}
        {/*        },*/}
        {/*        {*/}
        {/*          label: intl.formatMessage({*/}
        {/*            defaultMessage: 'No',*/}
        {/*          }),*/}
        {/*          value: false,*/}
        {/*        },*/}
        {/*      ]}*/}
        {/*    />*/}
        {/*  </Form.Item>*/}
        {/* </Col>*/}
      </Row>
    </>
  );
};
export default IncidentDetails;
