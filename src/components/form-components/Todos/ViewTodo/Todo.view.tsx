import type { TodoQuery } from '#/components/form-components/Todos/ViewTodo/graphql/__generated__/view-task.generated';
import type { CustomQuestion } from '#/types/DataType';
import type { FormInstance, UploadFile, UploadProps } from 'antd';

import MapCard from '#/components/map/LocatingCard/MapCard.view';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Descriptions,
  Divider,
  Form,
  InputNumber,
  Row,
  Select,
  Skeleton,
  Typography,
  Upload,
} from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { FormData } from './useTodo';

import CustomQuestions from '../../../../views/incidents/AddIncident/components/IncidentCustom/CustomQuestion.view';

interface Props {
  availableUsers: { id: string; name: string; timeTaken: number }[];
  confirmText?: string;
  documentList: UploadFile[];
  documentUploadProps?: UploadProps;
  form: FormInstance;
  loading: boolean;
  minimal?: boolean;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  setAvailableUsers: (
    users: { id: string; name: string; timeTaken: number }[]
  ) => void;
  setUsers: (users: { id: string; name: string; timeTaken: number }[]) => void;
  todo: TodoQuery | undefined;
  users: { id: string; name: string; timeTaken: number }[];
}

const TodoView = ({
  availableUsers,
  confirmText,
  documentList,
  documentUploadProps,
  form,
  loading,
  minimal = false,
  onClose,
  onSubmit,
  saving,
  setAvailableUsers,
  setUsers,
  todo,
  users,
}: Props) => {
  const intl = useIntl();
  const questions = todo?.todo?.questions.map(({ id, question }) => {
    form.setFieldValue(
      question.id,
      todo?.todo?.answers?.find((answer) => answer?.taskQuestion?.id === id)
        ?.answer
    );

    return {
      answerType: question?.type,
      label: question.questionFormatted,
      options: question.optionsFormFormatted || [],
      questionId: question.id,
      required: false,
      tagQuestionId: id,
      value: todo?.todo?.answers?.find(
        (answer) => answer?.taskQuestion?.id === id
      )?.answer,
    };
  }) as CustomQuestion[];

  return (
    <div>
      <Typography.Title level={4}>
        {intl.formatMessage({
          defaultMessage: 'Details',
        })}
      </Typography.Title>
      <Descriptions>
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Name',
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
          })}
        >
          {todo?.todo ? dayjs(todo.todo.createdAt).format('DD/MM/YY') : null}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Due Date',
          })}
        >
          {todo?.todo ? dayjs(todo.todo.dueDate).format('DD/MM/YY') : null}
        </Descriptions.Item>
        <Descriptions.Item
          label={intl.formatMessage({
            defaultMessage: 'Description',
          })}
        >
          {todo?.todo?.description}
        </Descriptions.Item>
      </Descriptions>
      <Divider style={{ marginTop: 10 }} />
      <Row>
        {todo?.todo.business ? (
          <Typography.Text
            style={{ fontSize: 16, fontWeight: 500, marginBottom: 10 }}
          >
            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
            <FormattedMessage defaultMessage="Business" /> -{' '}
            {todo.todo.business.name}
          </Typography.Text>
        ) : null}
      </Row>
      {todo?.todo.business?.locations[0].geoLat &&
        todo?.todo.business?.locations[0].geoLng && (
          <>
            <Typography.Text style={{ fontSize: 16, fontWeight: 500 }}>
              {intl.formatMessage({ defaultMessage: 'Location' })}
            </Typography.Text>
            <MapCard
              height={194}
              viewport={{
                latitude: todo?.todo.business?.locations[0].geoLat,
                longitude: todo?.todo.business?.locations[0].geoLng,
              }}
              width="100%"
            />
            <Divider style={{ marginTop: 10 }} />
          </>
        )}

      <Form
        form={form}
        hidden={minimal}
        initialValues={{ questions: [] }}
        layout="vertical"
        onFinish={onSubmit}
      >
        {questions && questions.length > 0 ? (
          <Typography.Title level={4}>
            {intl.formatMessage({
              defaultMessage: 'Questions',
            })}
          </Typography.Title>
        ) : null}
        {questions && questions.length > 0 ? (
          <CustomQuestions disabled={saving} questions={questions} />
        ) : null}
        {questions && questions.length > 0 ? (
          <Divider style={{ marginTop: 10 }} />
        ) : null}
        <Row>
          <Col span={24}>
            <Typography.Title level={4}>
              {intl.formatMessage({
                defaultMessage: 'Time Tracking',
              })}
            </Typography.Title>
            <Row>
              <Col flex={1}>
                {users.map((user) => (
                  <Form.Item
                    colon
                    label={user.name}
                    name={user.id}
                    rules={[
                      { message: 'Add time for this user', required: true },
                    ]}
                  >
                    <InputNumber
                      addonAfter={intl.formatMessage({
                        defaultMessage: 'mins',
                      })}
                      min={0}
                    />
                  </Form.Item>
                ))}
              </Col>
              <Col>
                <Typography.Paragraph
                  style={{ fontWeight: 600, marginBottom: 5 }}
                >
                  {intl.formatMessage({
                    defaultMessage: 'Add Another User',
                  })}
                </Typography.Paragraph>
                <Select
                  onSelect={(value) => {
                    const user = availableUsers.find((u) => u.id === value);
                    if (user) {
                      setUsers([...users, user]);
                      setAvailableUsers(
                        availableUsers.filter((u) => u.id !== value)
                      );
                    }
                  }}
                  options={availableUsers.map((user) => ({
                    label: user.name,
                    value: user.id,
                  }))}
                  style={{ width: 200 }}
                  value={null}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Form.Item
          label={intl.formatMessage({
            defaultMessage: 'Evidence',
          })}
          name="documents"
        >
          <Upload
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...documentUploadProps}
            fileList={documentList}
            listType="picture"
            style={{ display: 'flex' }}
          >
            <Button icon={<UploadOutlined />}>
              {intl.formatMessage({
                defaultMessage: 'Upload Document',
              })}
            </Button>
          </Upload>
        </Form.Item>
        <Divider />
        <Form.Item>
          <Row gutter={16} justify="end" style={{ marginTop: 10 }}>
            <Col>
              <Button
                disabled={saving}
                onClick={() => {
                  onClose();
                }}
              >
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
                {confirmText ||
                  intl.formatMessage({
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
