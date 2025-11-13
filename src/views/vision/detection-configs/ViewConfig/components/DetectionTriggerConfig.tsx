import { Card, Col, Form, Input, Radio, Row, Typography } from 'antd';
import { AiVisionMatchConfidence, AiVisionMatchPriority } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const DetectionTriggerConfig = () => {
  const intl = useIntl();

  return (
    <Card>
      <Typography.Title level={3} style={{ marginBottom: 30 }}>
        <FormattedMessage defaultMessage="Detection Trigger" />
      </Typography.Title>
      <Form.Item
        label={<FormattedMessage defaultMessage="Name for the config" />}
        name="name"
        rules={[
          {
            message: intl.formatMessage({
              defaultMessage: 'Please enter a name',
            }),
            required: true,
          },
        ]}
        tooltip={intl.formatMessage({
          defaultMessage:
            'Friendly name for the detection which you can use to identify it later.',
        })}
      >
        <Input />
      </Form.Item>

      <Row gutter={16} style={{ width: '100%' }}>
        <Col span={24}>
          <Form.Item
            label={
              <FormattedMessage defaultMessage="Minimum Confidence Trigger" />
            }
            name="minimumConfidenceTrigger"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please select a confidence level',
                }),
                required: true,
              },
            ]}
            tooltip={intl.formatMessage({
              defaultMessage:
                'The minimum confidence level required to trigger the detection.',
            })}
          >
            <Radio.Group
              optionType="button"
              options={[
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Low',
                  }),
                  value: AiVisionMatchConfidence.Low,
                },
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Medium',
                  }),
                  value: AiVisionMatchConfidence.Medium,
                },
                {
                  label: intl.formatMessage({
                    defaultMessage: 'High',
                  }),
                  value: AiVisionMatchConfidence.High,
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={
              <FormattedMessage defaultMessage="Minimum Priority Trigger" />
            }
            name="minimumPriorityTrigger"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please select a priority level',
                }),
                required: true,
              },
            ]}
            tooltip={intl.formatMessage({
              defaultMessage:
                'The minimum priority level required to trigger the detection.',
            })}
          >
            <Radio.Group
              optionType="button"
              options={[
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Low',
                  }),
                  value: AiVisionMatchPriority.Low,
                },
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Normal',
                  }),
                  value: AiVisionMatchPriority.Normal,
                },
                {
                  label: intl.formatMessage({
                    defaultMessage: 'High',
                  }),
                  value: AiVisionMatchPriority.High,
                },
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Critical',
                  }),
                  value: AiVisionMatchPriority.Critical,
                },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default DetectionTriggerConfig;
