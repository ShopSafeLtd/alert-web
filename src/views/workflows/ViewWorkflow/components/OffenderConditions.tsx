import {
  Col,
  Divider,
  Form,
  InputNumber,
  Row,
  Switch,
  Typography,
} from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface OffenderConditionsProps {
  classes: { cardBody: string };
  incidentTimeCountCheck: boolean;
}

const OffenderConditions: React.FC<OffenderConditionsProps> = ({
  classes,
  incidentTimeCountCheck,
}) => {
  const intl = useIntl();

  return (
    <>
      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      <div>
        <Row gutter={16} style={{ padding: 20 }} wrap={false}>
          <Col flex={1}>
            <Typography.Title
              level={4}
              style={{
                alignItems: 'center',
                display: 'flex',
                paddingTop: 8,
              }}
            >
              <FormattedMessage defaultMessage="Number of incidents in a period of days" />
            </Typography.Title>
            <Typography.Paragraph
              style={{
                alignItems: 'center',
                display: 'flex',
              }}
              type="secondary"
            >
              <FormattedMessage defaultMessage="Triggers if an offender has a specified number of incidents in a defined period of days." />
            </Typography.Paragraph>
          </Col>
          <Col>
            <Form.Item
              name="incidentTimeCountCheck"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        {incidentTimeCountCheck && (
          <div className={classes.cardBody}>
            <Row gutter={32}>
              <Col>
                <Form.Item
                  initialValue={1}
                  label={
                    <FormattedMessage defaultMessage="Period of days" />
                  }
                  name="incidentTimeCountDays"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage:
                          'Please select an option',
                      }),
                      required: true,
                    },
                  ]}
                  tooltip={
                    <FormattedMessage defaultMessage="Number of days in which to count incidents" />
                  }
                >
                  <InputNumber min={1} />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  initialValue={1}
                  label={
                    <FormattedMessage defaultMessage="Number of incidents" />
                  }
                  name="incidentTimeCountIncidents"
                  rules={[
                    {
                      message: intl.formatMessage({
                        defaultMessage:
                          'Please select an option',
                      }),
                      required: true,
                    },
                  ]}
                  tooltip={
                    <FormattedMessage defaultMessage="Number of incidents in the period required to trigger the workflow" />
                  }
                >
                  <InputNumber min={1} />
                </Form.Item>
              </Col>
            </Row>
          </div>
        )}
      </div>
      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      <div>
        <Row gutter={16} style={{ padding: 20 }} wrap={false}>
          <Col flex={1}>
            <Typography.Title
              level={4}
              style={{
                alignItems: 'center',
                display: 'flex',
                paddingTop: 8,
              }}
            >
              <FormattedMessage defaultMessage="New Incident while banned" />
            </Typography.Title>
            <Typography.Paragraph
              style={{
                alignItems: 'center',
                display: 'flex',
              }}
              type="secondary"
            >
              <FormattedMessage defaultMessage="Triggers when a new incident is added involving this offender and they have an active ban issued against them." />
            </Typography.Paragraph>
          </Col>
          <Col>
            <Form.Item
              name="incidentWhileBanCheck"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OffenderConditions;
