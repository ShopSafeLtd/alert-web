import type { FormInstance } from 'antd';

import UpdateQuestionContainer from '#/components/form-components/update-question-on-activity/UpdateQuestion.container';
import { faEdit, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Drawer, Form, Input, InputNumber, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { FormData } from './useCreateActivityTemplate';

import CreateQuestionContainer from '../createQuestion/CreateQuestion.container';

interface Props {
  addQuestion: boolean;
  editQuestion: null | string;
  form: FormInstance<FormData>;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  selectedIds?: string[];
  selectedQuestions: { id: string; question: string }[];
  setAddQuestion: (value: boolean) => void;
  setEditQuestion: (value: null | string) => void;
  setSelectedIds: (value: string[]) => void;
  setSelectedQuestions: (value: { id: string; question: string }[]) => void;
  update: (id: string, question: string) => void;
}

const AddTodo = ({
  addQuestion,
  editQuestion,
  form,
  onClose,
  onSubmit,
  saving,
  selectedIds,
  selectedQuestions,
  setAddQuestion,
  setEditQuestion,
  setSelectedIds,
  setSelectedQuestions,
  update,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Row gutter={16}>
          <Col span={23}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Name',
              })}
              name="name"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please enter a name for the created activity.',
                  }),
                  required: true,
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
              label={intl.formatMessage({
                defaultMessage: 'Default due days',
              })}
              name="defaultDueDate"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please select a default number of days the activity should be required to be finished by.',
                  }),
                  required: true,
                },
              ]}
            >
              <InputNumber disabled={saving} min={0} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={23}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Description',
              })}
              name="description"
            >
              <Input.TextArea disabled={saving} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={23}>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Questions',
              })}
              name="questions"
            >
              {selectedQuestions.map((question) => (
                <Row gutter={8}>
                  <Col flex={1}>
                    <p>{question.question}</p>
                  </Col>
                  <Col>
                    <Button
                      icon={<FontAwesomeIcon icon={faEdit} />}
                      onClick={() => {
                        setEditQuestion(question.id);
                      }}
                      size="small"
                    />
                  </Col>
                  <Col>
                    <Button
                      icon={<FontAwesomeIcon icon={faTrash} />}
                      onClick={() => {
                        setSelectedQuestions(
                          selectedQuestions.filter((q) => q.id !== question.id)
                        );
                        setSelectedIds(
                          selectedIds?.filter((id) => id !== question.id) || []
                        );
                      }}
                      size="small"
                    />
                  </Col>
                </Row>
              ))}
            </Form.Item>
            <Button onClick={() => setAddQuestion(true)} type="dashed">
              {intl.formatMessage({
                defaultMessage: 'New Question',
              })}
            </Button>
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
                  defaultMessage: 'Save',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Drawer
        onClose={() => setAddQuestion(false)}
        open={addQuestion}
        title={intl.formatMessage({
          defaultMessage: 'Add/Create Question',
        })}
        width="800"
      >
        {addQuestion ? (
          <CreateQuestionContainer
            ids={selectedIds}
            onClose={() => setAddQuestion(false)}
            update={update}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setEditQuestion(null)}
        open={editQuestion !== null}
        title={intl.formatMessage({
          defaultMessage: 'Add/Create Question',
        })}
        width="800"
      >
        {editQuestion === null ? (
          <div />
        ) : (
          <UpdateQuestionContainer
            onClose={() => setEditQuestion(null)}
            questionId={editQuestion}
            required
          />
        )}
      </Drawer>
    </>
  );
};

export default AddTodo;
