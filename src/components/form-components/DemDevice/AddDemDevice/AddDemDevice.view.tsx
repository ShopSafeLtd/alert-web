import type { DemDeviceData, SelectOptions } from '#/types/DataType';
import type { FormInstance } from 'antd';

import { Button, Col, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useAddDemDevice';

import BusinessesSelect from '../../BusinessesSelect/BusinessesSelect.view';
import DemGroupsSelect from '../../DemGroupsSelect/DemGroupsSelect.view';

interface Props {
  businessId?: string;
  editData?: DemDeviceData;
  form: FormInstance<FormData>;
  loading: boolean;
  modelsData: SelectOptions[] | undefined;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const AddDemDevice = ({
  businessId,
  editData,
  form,
  loading,
  modelsData,
  onClose,
  onSubmit,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();
  const demGroups = Form.useWatch('demGroups', form);

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        {!editData && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Name',
                })}
                name="name"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage: 'Please enter a name for the dem device.',
                    }),
                    required: true,
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Serial Number',
                })}
                name="serialNumber"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage:
                        'Please enter the serial number for the dem device.',
                    }),
                    required: true,
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Model',
                })}
                name="modelId"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage:
                        'Please select one model for the dem device.',
                    }),
                    required: true,
                  },
                ]}
              >
                <Select
                  disabled={saving}
                  loading={loading}
                  optionFilterProp="label"
                  optionLabelProp="label"
                  options={modelsData}
                />
              </Form.Item>
            </Col>
          </Row>
        )}
        <Row gutter={16}>
          {!businessId && (
            <Col span={24}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Business',
                })}
                name="business"
                rules={[
                  {
                    message: intl.formatMessage({
                      defaultMessage:
                        'Please select one business for the dem device.',
                    }),
                    required: !businessId,
                  },
                ]}
              >
                <BusinessesSelect
                  allowClear
                  disabled={saving || !!businessId}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Search for a business...',
                  })}
                  showSearch
                  style={{ width: '100%' }}
                  value={businessId}
                />
              </Form.Item>
            </Col>
          )}
          <Col span={24}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Dem Groups',
              })}
              name="demGroups"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please select at least one group for the dem device.',
                  }),
                  required: true,
                },
              ]}
            >
              <DemGroupsSelect
                disabled={saving}
                maxTagCount={3}
                mode="multiple"
                optionFilterProp="label"
                optionLabelProp="label"
                value={demGroups}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
            <Col>
              <Button disabled={saving} onClick={onClose}>
                {intl.formatMessage({
                  defaultMessage: 'Cancel',
                })}
              </Button>
            </Col>

            <Col>
              <Button
                disabled={saving}
                htmlType="submit"
                loading={saving}
                type="primary"
              >
                {intl.formatMessage({
                  defaultMessage: 'Create',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddDemDevice;
