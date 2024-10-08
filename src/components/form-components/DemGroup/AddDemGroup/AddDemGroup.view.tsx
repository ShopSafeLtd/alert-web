import type { DemGroupData, SelectOptions } from '#/types/DataType';
import type { FormInstance } from 'antd';

import { Button, Col, Form, Input, Row, Select, Tooltip } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useAddDemGroup';

interface Props {
  devicesData: SelectOptions[] | undefined;
  editData?: DemGroupData;
  form: FormInstance<FormData>;
  loading: boolean;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const AddDemGroup = ({
  devicesData,
  editData,
  form,
  loading,
  onClose,
  onSubmit,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();

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
                      defaultMessage: 'Please enter a name for the dem group.',
                    }),
                    required: true,
                  },
                ]}
              >
                <Input disabled={saving} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Enter the dem ID for the dem group',
                })}
              >
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Dem ID',
                  })}
                  name="groupId"
                >
                  <Input disabled={saving || !!editData} />
                </Form.Item>
              </Tooltip>
            </Col>
          </Row>
        )}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Dem Devices',
              })}
              name="demDevices"
            >
              <Select
                disabled={saving}
                loading={loading}
                maxTagCount={3}
                mode="multiple"
                optionFilterProp="label"
                optionLabelProp="label"
                options={devicesData}
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

export default AddDemGroup;
