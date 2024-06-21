import React from 'react';
import type { FormInstance } from 'antd';
import { Button, Col, Drawer, Form, Input, InputNumber, Row } from 'antd';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import type { FormData } from './useCreateActivityTemplate';
import CreateQuestionContainer from '../createQuestion/CreateQuestion.container';

interface Props {
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  addQuestion: boolean;
  setAddQuestion: (value: boolean) => void;
  update: (id: string, question: string) => void;
  selectedIds?: string[];
  setSelectedIds: (value: string[]) => void;
  selectedQuestions: { id: string; question: string }[];
  setSelectedQuestions: (value: { id: string; question: string }[]) => void;
  form: FormInstance<FormData>;
}

const AddTodo = ({
  onSubmit,
  onClose,
  saving,
  addQuestion,
  setAddQuestion,
  update,
  selectedIds,
  setSelectedIds,
  selectedQuestions,
  setSelectedQuestions,
  form,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <>
      <Form layout="vertical" onFinish={onSubmit} form={form}>
        <Row gutter={16}>
          <Col span={23}>
            <Form.Item
              name="name"
              label={intl.formatMessage({
                defaultMessage: 'Name',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please enter a name for the created activity.',
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
              name="defaultDueDate"
              label={intl.formatMessage({
                defaultMessage: 'Default due days',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    defaultMessage:
                      'Please select a default number of days the activity should be required to be finished by.',
                  }),
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
              name="description"
              label={intl.formatMessage({
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
                  defaultMessage: 'Save',
                })}
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add/Create Question',
        })}
        open={addQuestion}
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
