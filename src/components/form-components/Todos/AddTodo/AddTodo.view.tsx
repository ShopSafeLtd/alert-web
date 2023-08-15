import React from 'react';
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
} from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { SelectOptions } from 'types/DataType';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import type { FormData } from './useAddTodo';
import CreateQuestionContainer from '../../createQuestion/CreateQuestion.container';

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  adminUsersData: SelectOptions[] | undefined;
  usersLoading: boolean;
  saving: boolean;
  addQuestion: boolean;
  setAddQuestion: (value: boolean) => void;
  update: (id: string, question: string) => void;
  selectedIds?: string[];
  setSelectedIds: (value: string[]) => void;
  selectedQuestions: { id: string; question: string }[];
  setSelectedQuestions: (value: { id: string; question: string }[]) => void;
}

const disabledDate: RangePickerProps['disabledDate'] = (current) =>
  current && current.valueOf() < Date.now() - 3600 * 1000 * 24;

const AddTodo = ({
  onSubmit,
  onClose,
  saving,
  adminUsersData,
  usersLoading,
  addQuestion,
  setAddQuestion,
  update,
  selectedIds,
  setSelectedIds,
  selectedQuestions,
  setSelectedQuestions,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <>
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
                    defaultMessage:
                      'Please select a due date for the new to-do.',
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
        <Row>
          <Col span={23}>
            <Form.Item
              name="questions"
              label={intl.formatMessage({
                id: 'KV/9Hv',
                defaultMessage: 'Questions',
              })}
            >
              {selectedQuestions.map((question) => (
                <Row>
                  <Col flex={1}>
                    <p>{question.question}</p>
                  </Col>
                  <Col>
                    <Button
                      size="small"
                      onClick={() => {
                        setSelectedQuestions(
                          selectedQuestions.filter((q) => q.id !== question.id)
                        );
                        setSelectedIds(
                          selectedIds?.filter((id) => id !== question.id) || []
                        );
                      }}
                      icon={<FontAwesomeIcon icon={faTrash} />}
                    />
                  </Col>
                </Row>
              ))}
            </Form.Item>
            <Button type="dashed" onClick={() => setAddQuestion(true)}>
              {intl.formatMessage({
                id: 'kgZDDS',
                defaultMessage: 'New Question',
              })}
            </Button>
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
                  id: '6kyt/v',
                  defaultMessage: 'New Activity',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add/Create Question',
          id: '/vx2Ey',
        })}
        visible={addQuestion}
        width="800"
        onClose={() => setAddQuestion(false)}
      >
        {addQuestion ? (
          <CreateQuestionContainer
            onClose={() => setAddQuestion(false)}
            update={update}
            ids={selectedIds}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </>
  );
};

export default AddTodo;
