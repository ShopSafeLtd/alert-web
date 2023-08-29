import React from 'react';
// import type { FormInstance } from 'antd';
import { Button, Col, Form, Row, Select, Typography } from 'antd';
import type { FormInstance } from 'antd';
import { useIntl } from 'react-intl';
import type { FormData } from './useCopyOffender';

const { Text } = Typography;

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  saving: boolean;
  userSchemes: { value: string; label: string }[];
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  selectSchemeId: string;
  setSelectSchemeId: (value: string) => void;
  form: FormInstance<FormData>;
}

const CopyOffender = ({
  onSubmit,
  onClose,
  saving,
  userSchemes,
  groupsLoading,
  groups,
  selectSchemeId,
  setSelectSchemeId,
  form,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <Form<FormData> layout="vertical" onFinish={onSubmit} form={form}>
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <Text type="secondary">
            {intl.formatMessage({
              defaultMessage: 'Copy offender details to another scheme.',
              id: 'CGV/n+',
            })}
          </Text>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="scheme"
            label={intl.formatMessage({
              defaultMessage: 'Scheme',
              id: 'C357Ss',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please select one scheme.',
                  id: 'VJ3QNh',
                }),
              },
            ]}
          >
            <Select
              disabled={saving}
              options={userSchemes}
              maxLength={1}
              onChange={(value: string) => {
                setSelectSchemeId(value);
                form.setFieldValue('groups', []);
              }}
            />
          </Form.Item>
        </Col>

        {selectSchemeId && (
          <Col span={24}>
            <Form.Item
              name="groups"
              label={intl.formatMessage({
                defaultMessage: 'Groups',
                id: 'hzmswI',
              })}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Select the groups that you would like this offender to be visible to .',
                id: 'Z7d+BS',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please select at least one group for the offender.',
                    id: 'hK3zLA',
                  }),
                },
              ]}
            >
              <Select
                loading={groupsLoading}
                disabled={saving}
                mode="multiple"
                maxTagCount={3}
                options={groups}
              />
            </Form.Item>
          </Col>
        )}
      </Row>

      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={16} justify="end">
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              disabled={saving}
              loading={saving}
            >
              {intl.formatMessage({ defaultMessage: 'Copy', id: '4l6vz1' })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default CopyOffender;
