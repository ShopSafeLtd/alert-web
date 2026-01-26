import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import { Card, Col, Form, Input, Row, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

// export interface CameraUpsertForm {
//   make: string | null | undefined;
//   model: string | null | undefined;
//   serialNumber: string;
//   groups: string[];
//   businessId: string;
//   duplicateMatchTimeout: string;
// }

const CameraDetails = () => {
  const intl = useIntl();

  return (
    <Card>
      <Typography.Title level={3} style={{ marginBottom: 30 }}>
        <FormattedMessage defaultMessage="Camera Details" />
      </Typography.Title>

      <Row gutter={16} style={{ width: '100%' }}>
        <Col span={12}>
          <Form.Item
            label={<FormattedMessage defaultMessage="Make" />}
            name="make"
            tooltip={intl.formatMessage({
              defaultMessage: 'The manufacturer of the camera',
            })}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<FormattedMessage defaultMessage="Model" />}
            name="model"
            tooltip={intl.formatMessage({
              defaultMessage: 'The model of the camera',
            })}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label={<FormattedMessage defaultMessage="Serial Number" />}
        name="serialNumber"
        rules={[
          {
            message: intl.formatMessage({
              defaultMessage: 'Please enter a serial number',
            }),
            required: true,
          },
        ]}
        tooltip={intl.formatMessage({
          defaultMessage: 'The unique serial number of the camera',
        })}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={<FormattedMessage defaultMessage="Groups" />}
        name="groups"
        tooltip={intl.formatMessage({
          defaultMessage: 'The groups this camera belongs to',
        })}
      >
        <GroupsSelect
          allowClear
          maxTagCount={2}
          mode="multiple"
          placeholder={intl.formatMessage({
            defaultMessage: 'Groups',
          })}
          size="small"
        />
      </Form.Item>

      <Form.Item
        label={<FormattedMessage defaultMessage="Business" />}
        name="businessId"
        rules={[
          {
            message: intl.formatMessage({
              defaultMessage: 'Please select a business',
            }),
            required: true,
          },
        ]}
        tooltip={intl.formatMessage({
          defaultMessage: 'The business associated with this camera',
        })}
      >
        <BusinessesSelect
          allowClear
          // disabled={saving || forceTemplateSelection || !!businessId}
          placeholder={intl.formatMessage({
            defaultMessage: 'Search for a business...',
          })}
          showSearch
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        label={<FormattedMessage defaultMessage="Duplicate Match Timeout" />}
        tooltip={intl.formatMessage({
          defaultMessage: 'Timeout period for duplicate match detection',
        })}
      >
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item
              name={['duplicateMatchTimeout', 'hours']}
              noStyle
              rules={[
                { message: '', required: true },
                {
                  validator: (_, value) => {
                    const num = Number(value);
                    if (Number.isNaN(num) || num < 0 || num > 99) {
                      return Promise.reject();
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              validateTrigger={['onChange', 'onBlur']}
            >
              <Input
                addonAfter={<FormattedMessage defaultMessage="Hours" />}
                max={99}
                min={0}
                type="number"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={['duplicateMatchTimeout', 'minutes']}
              noStyle
              rules={[
                { message: '', required: true },
                {
                  validator: (_, value) => {
                    const num = Number(value);
                    if (Number.isNaN(num) || num < 0 || num > 59) {
                      return Promise.reject();
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              validateTrigger={['onChange', 'onBlur']}
            >
              <Input
                addonAfter={<FormattedMessage defaultMessage="Minutes" />}
                max={59}
                min={0}
                type="number"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name={['duplicateMatchTimeout', 'seconds']}
              noStyle
              rules={[
                { message: '', required: true },
                {
                  validator: (_, value) => {
                    const num = Number(value);
                    if (Number.isNaN(num) || num < 0 || num > 59) {
                      return Promise.reject();
                    }
                    return Promise.resolve();
                  },
                },
              ]}
              validateTrigger={['onChange', 'onBlur']}
            >
              <Input
                addonAfter={<FormattedMessage defaultMessage="Seconds" />}
                max={59}
                min={0}
                type="number"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
    </Card>
  );
};

export default CameraDetails;
