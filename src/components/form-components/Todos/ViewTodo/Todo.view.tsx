import type { FormInstance, UploadFile, UploadProps } from 'antd';
import {
  Upload,
  Button,
  Col,
  Form,
  InputNumber,
  Row,
  Select,
  Typography,
  Divider,
  Descriptions,
  Skeleton,
} from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';
import type { TodoQuery } from '../../../../graphql/generated';
import type { CustomQuestion } from '../../../../types/DataType';
import CustomQuestions from '../../../../views/incidents/AddIncident/components/IncidentCustom/CustomQuestion.view';
import type { FormData } from './useTodo';

interface Props {
  todo: TodoQuery | undefined;
  form: FormInstance;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  users: { id: string; name: string; timeTaken: number }[];
  availableUsers: { id: string; name: string; timeTaken: number }[];
  setUsers: (users: { id: string; name: string; timeTaken: number }[]) => void;
  setAvailableUsers: (
    users: { id: string; name: string; timeTaken: number }[]
  ) => void;
  loading: boolean;
  onClose: () => void;
  confirmText?: string;
  documentList: UploadFile[];
  documentUploadProps?: UploadProps;
}

const TodoView = ({
  todo,
  form,
  onSubmit,
  saving,
  users,
  availableUsers,
  setUsers,
  setAvailableUsers,
  loading,
  onClose,
  confirmText,
  documentList,
  documentUploadProps,
}: Props) => {
  const intl = useIntl();
  const questions = todo?.todo?.questions.map(({ question, id }) => {
    form.setFieldValue(
      question.id,
      todo?.todo?.answers?.find((answer) => answer?.taskQuestion?.id === id)
        ?.answer
    );

    return (
      {
        answerType: question?.type,
        label: question.questionFormatted,
        questionId: question.id,
        required: false,
        tagQuestionId: id,
        value: todo?.todo?.answers?.find(
          (answer) => answer?.taskQuestion?.id === id
        )?.answer,
        options: question.optionsFormFormatted || [],
      } || []
    );
  }) as CustomQuestion[];

  return (
    <div>
      <Typography.Title level={4}>
        {intl.formatMessage({
          defaultMessage: 'Details',
          id: 'Lv0zJu',
        })}
      </Typography.Title>
      <Descriptions>
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Name',
            id: 'HAlOn1',
          })}
        >
          {loading ? (
            <Skeleton.Input style={{ height: 24 }} />
          ) : (
            todo?.todo?.name || ''
          )}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Created At',
            id: 'wittYy',
          })}
        >
          {todo?.todo ? moment(todo.todo.createdAt).format('DD/MM/YY') : null}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Due Date',
            id: '8XUukm',
          })}
        >
          {todo?.todo ? moment(todo.todo.dueDate).format('DD/MM/YY') : null}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Description',
            id: 'Q8Qw5B',
          })}
        >
          {todo?.todo?.description}
        </Descriptions.Item>
      </Descriptions>
      <Divider style={{ marginTop: 10 }} />
      <Form
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        initialValues={{ questions: [] }}
      >
        {questions && questions.length > 0 ? (
          <Typography.Title level={4}>
            {intl.formatMessage({
              defaultMessage: 'Questions',
              id: 'KV/9Hv',
            })}
          </Typography.Title>
        ) : null}
        {questions && questions.length > 0 ? (
          <CustomQuestions questions={questions} disabled={saving} />
        ) : null}
        {questions && questions.length > 0 ? (
          <Divider style={{ marginTop: 10 }} />
        ) : null}
        <Row>
          <Col span={24}>
            <Typography.Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Time Tracking',
                id: 'm1/6Jj',
              })}
            </Typography.Title>
            <Row>
              <Col flex={1}>
                {users.map((user) => (
                  <Form.Item
                    label={user.name}
                    name={user.id}
                    colon
                    rules={[
                      { required: true, message: 'Add time for this user' },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      addonAfter={intl.formatMessage({
                        defaultMessage: 'mins',
                        id: '6G3yvH',
                      })}
                    />
                  </Form.Item>
                ))}
              </Col>
              <Col>
                <Typography.Paragraph
                  style={{ marginBottom: 5, fontWeight: 600 }}
                >
                  {intl.formatMessage({
                    defaultMessage: 'Add Another User',
                    id: 'sy3PlZ',
                  })}
                </Typography.Paragraph>
                <Select
                  value={null}
                  style={{ width: 200 }}
                  options={availableUsers.map((user) => ({
                    label: user.name,
                    value: user.id,
                  }))}
                  onSelect={(value) => {
                    const user = availableUsers.find((u) => u.id === value);
                    if (user) {
                      setUsers([...users, user]);
                      setAvailableUsers(
                        availableUsers.filter((u) => u.id !== value)
                      );
                    }
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Form.Item
          name="documents"
          label={intl.formatMessage({
            defaultMessage: 'Evidence',
            id: '6g7+6N',
          })}
        >
          <Upload
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...documentUploadProps}
            listType="picture"
            style={{ display: 'flex' }}
            fileList={documentList}
          >
            <Button icon={<UploadOutlined />}>
              {intl.formatMessage({
                defaultMessage: 'Upload Document',
                id: 'Kc9MAV',
              })}
            </Button>
          </Upload>
        </Form.Item>
        <Divider />
        <Form.Item>
          <Row style={{ marginTop: 10 }} gutter={16} justify="end">
            <Col>
              <Button
                disabled={saving}
                onClick={() => {
                  onClose();
                }}
              >
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
                {confirmText ||
                  intl.formatMessage({
                    id: '8fwjt4',
                    defaultMessage: 'Complete Activity',
                  })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TodoView;
