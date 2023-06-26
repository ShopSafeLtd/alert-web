import React from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import type { SelectOptions } from 'types/DataType';
import { useIntl } from 'react-intl';
import type { FormData } from './useAddGroup';

interface Props {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  usersData: SelectOptions[] | undefined;
  adminUsersData: SelectOptions[] | undefined;
  usersLoading: boolean;
  saving: boolean;
  selectedUsers: string[] | undefined;
  setSelectedUsers: (value: string[]) => void;
}

const AddGroup = ({
  onSubmit,
  onClose,
  usersData,
  adminUsersData,
  usersLoading,
  saving,
  selectedUsers,
  setSelectedUsers,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            name="name"
            label={intl.formatMessage({
              defaultMessage: 'Name',
              id: 'HAlOn1',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage: 'Please enter a name for the new group.',
                  id: 'mRLlqQ',
                }),
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>

        <Col span={23}>
          <Form.Item
            name="description"
            label={intl.formatMessage({
              defaultMessage: 'Description',
              id: 'Q8Qw5B',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please enter a description for the new group.',
                  id: 'm36ZnV',
                }),
              },
            ]}
          >
            <Input.TextArea disabled={saving} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            name="users"
            label={intl.formatMessage({
              defaultMessage: 'Users',
              id: 'YDMrKK',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  defaultMessage:
                    'Please select at least one user for the new group.',
                  id: 'mduNlp',
                }),
              },
            ]}
          >
            <Select
              loading={usersLoading}
              disabled={saving}
              mode="multiple"
              maxTagCount={3}
              filterOption
              optionFilterProp="label"
              options={usersData}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              onChange={(value) => setSelectedUsers(value)}
            />
          </Form.Item>
        </Col>
      </Row>
      {selectedUsers && selectedUsers.length > 0 && (
        <Row gutter={16}>
          <Col span={23}>
            <Form.Item
              name="approvers"
              label={intl.formatMessage({
                defaultMessage: 'Approvers',
                id: 'Nm9Hsa',
              })}
            >
              <Select
                loading={usersLoading}
                disabled={saving}
                mode="multiple"
                maxTagCount={3}
                options={adminUsersData?.filter(({ value }) =>
                  selectedUsers.includes(value)
                )}
                optionFilterProp="label"
                optionLabelProp="label"
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={16} justify="end">
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({
                defaultMessage: 'Cancel',
                id: '47FYwb',
              })}
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              disabled={saving}
              loading={saving}
            >
              {intl.formatMessage({
                defaultMessage: 'Create Group',
                id: '8eDBzp',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddGroup;
