import type { FormInstance } from 'antd';
import {
  Button,
  Card,
  Col,
  Form,
  InputNumber,
  Row,
  Select,
  Typography,
} from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
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
}: Props) => {
  const intl = useIntl();
  const questions = todo?.todo?.questions.map(({ question, id }) => {
    form.setFieldValue(
      id,
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
    <Card loading={loading}>
      <h1>{todo?.todo?.name || ''}</h1>
      <Form form={form} onFinish={onSubmit} layout="vertical">
        <Typography.Title level={4}>
          {intl.formatMessage({
            defaultMessage: 'Questions',
            id: 'KV/9Hv',
          })}
        </Typography.Title>
        {questions ? (
          <CustomQuestions questions={questions} disabled={saving} />
        ) : null}
        <Row>
          <Col span={24}>
            <Typography.Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Users',
                id: 'YDMrKK',
              })}
            </Typography.Title>
            {users.map((user) => (
              <Form.Item label={user.name} name={user.id} colon>
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
        </Row>
        <Row>
          <Col span={24}>
            <Typography.Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Add user',
                id: 'Dra4ET',
              })}
            </Typography.Title>
            <Row>
              <Col span={24}>
                <Select
                  value={null}
                  style={{ width: '50%' }}
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
        <Form.Item>
          <Row style={{ marginTop: 30 }} gutter={16} justify="end">
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
                {intl.formatMessage({
                  id: '8fwjt4',
                  defaultMessage: 'Complete Activity',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TodoView;
