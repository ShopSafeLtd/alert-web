import React from 'react';
import { Button, Col, Form, Input, Row, DatePicker, Select } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { SelectOptions } from 'types/DataType';
import { useIntl } from 'react-intl';
import type { FormData } from './useAddTodo';

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  adminUsersData: SelectOptions[] | undefined;
  usersLoading: boolean;
  saving: boolean;
}

const disabledDate: RangePickerProps['disabledDate'] = (current) =>
  current && current.valueOf() < Date.now() - 3600 * 1000 * 24;

const AddTodo = ({
  onSubmit,
  onClose,
  saving,
  adminUsersData,
  usersLoading,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            name="name"
            label={intl.formatMessage({
              id: 'HAlOn1',
              defaultMessage: 'Name',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: '5Ei/wg',
                  defaultMessage: 'Please enter a name for the new to-do.',
                }),
              },
            ]}
          >
            <Input disabled={saving} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            name="dueDate"
            label={intl.formatMessage({
              id: '8XUukm',
              defaultMessage: 'Due Date',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: 'G4f9uY',
                  defaultMessage: 'Please select a due date for the new to-do.',
                }),
              },
            ]}
          >
            <DatePicker
              disabled={saving}
              disabledDate={disabledDate}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            name="assignedUsers"
            label={intl.formatMessage({
              id: 'Y03BBv',
              defaultMessage: 'Assign To Admins',
            })}
            rules={[
              {
                required: true,
                message: intl.formatMessage({
                  id: '/TfPy3',
                  defaultMessage:
                    'Please selected at least one admin for the new to-do.',
                }),
              },
            ]}
          >
            <Select
              loading={usersLoading}
              disabled={saving}
              mode="multiple"
              maxTagCount={3}
              options={adminUsersData}
              optionFilterProp="label"
              optionLabelProp="label"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={23}>
          <Form.Item
            name="description"
            label={intl.formatMessage({
              id: 'Q8Qw5B',
              defaultMessage: 'Description',
            })}
          >
            <Input.TextArea disabled={saving} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Row style={{ marginTop: 30 }} gutter={16} justify="end">
          <Col>
            <Button disabled={saving} onClick={onClose}>
              {intl.formatMessage({
                id: '47FYwb',
                defaultMessage: 'Cancel',
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
                id: 'jtxQPo',
                defaultMessage: 'New Task',
              })}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default AddTodo;
