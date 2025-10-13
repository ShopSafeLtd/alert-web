import type { FormInstance } from 'antd';

// import type { FormInstance } from 'antd';
import { Button, Col, Form, Row, Select, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useCopyOffender';

const { Text } = Typography;

interface Props {
  form: FormInstance<FormData>;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  selectSchemeId: string;
  setSelectSchemeId: (value: string) => void;
  userSchemes: { label: string; value: string }[];
}

const CopyOffender = ({
  form,
  groups,
  groupsLoading,
  onClose,
  onSubmit,
  saving,
  selectSchemeId,
  setSelectSchemeId,
  userSchemes,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <Form<FormData> form={form} layout="vertical" onFinish={onSubmit}>
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <Text type="secondary">
            {intl.formatMessage({
              defaultMessage: 'Copy offender details to another scheme.',
            })}
          </Text>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Scheme',
            })}
            name="scheme"
            rules={[
              {
                message: intl.formatMessage({
                  defaultMessage: 'Please select one scheme.',
                }),
                required: true,
              },
            ]}
          >
            <Select
              disabled={saving}
              maxLength={1}
              onChange={(value: string) => {
                setSelectSchemeId(value);
                form.setFieldValue('groups', []);
              }}
              options={userSchemes}
            />
          </Form.Item>
        </Col>

        {selectSchemeId && (
          <Col span={24}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Groups',
              })}
              name="groups"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please select at least one group for the offender.',
                  }),
                  required: true,
                },
              ]}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Select the groups that you would like this offender to be visible to .',
              })}
            >
              <Select
                disabled={saving}
                loading={groupsLoading}
                maxTagCount={3}
                mode="multiple"
                options={groups}
              />
            </Form.Item>
          </Col>
        )}
      </Row>

      <Form.Item>
        <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
          </Col>
          <Col>
            <Button
              disabled={saving}
              htmlType="submit"
              loading={saving}
              type="primary"
            >
              {intl.formatMessage({ defaultMessage: 'Copy' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default CopyOffender;
