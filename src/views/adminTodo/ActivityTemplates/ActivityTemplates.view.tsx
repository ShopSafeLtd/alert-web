import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Drawer,
  Popconfirm,
  Row,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import ActivityTemplateForm from '../../../components/form-components/ActivityTemplate';
import AddTodo from '../../../components/form-components/Todos/AddTodo';

interface ListData {
  defaultDueDays: number;
  description: string;
  id: string;
  name: string;
  questions: {
    id: string;
    question: string;
  }[];
  requiredQuestionIds: string[];
}

interface Props {
  activityTemplateForm: boolean;
  addActivity: boolean;
  createActivity: (id: null | string) => void;
  deleteQuestion: (id: string) => void;
  loading: boolean;
  onClose: () => void;
  selectedActivity: ListData | null;
  tableData: ListData[];
  toggleAddTemplate: () => void;
  toggleEdit: (id: null | string) => void;
  updateTemplates: (
    item: ListData,
    type: 'create' | 'delete' | 'update'
  ) => void;
}

const questionsToReadable = (questions: string[]) => questions.join(', ');

const ActivityTemplatesView = ({
  activityTemplateForm,
  addActivity,
  createActivity,
  deleteQuestion,
  loading,
  onClose,
  selectedActivity,
  tableData,
  toggleAddTemplate,
  toggleEdit,
  updateTemplates,
}: Props) => {
  const intl = useIntl();
  return (
    <div className="list-view" style={{ padding: 20 }}>
      <Row gutter={8} style={{ marginBottom: 15 }}>
        <Col flex={1}>
          <Typography.Title level={3}>
            <FormattedMessage defaultMessage="Activity Templates" />
          </Typography.Title>
        </Col>
        <Col>
          <Button
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            onClick={() => toggleAddTemplate()}
          >
            {intl.formatMessage({
              defaultMessage: 'New Template',
            })}
          </Button>
        </Col>
      </Row>
      <Card
        bodyStyle={{ overflow: 'hidden', padding: 0, paddingTop: 4 }}
        loading={loading}
        style={{ overflow: 'hidden' }}
      >
        <Table
          columns={[
            {
              dataIndex: 'name',
              key: 'name',
              title: intl.formatMessage({
                defaultMessage: 'Name',
              }),
            },
            {
              dataIndex: 'description',
              ellipsis: true,
              key: 'description',
              title: intl.formatMessage({
                defaultMessage: 'Description',
              }),
            },

            {
              dataIndex: 'defaultDueDays',
              key: 'dueDate',
              render: (value: number) => (
                <FormattedMessage
                  defaultMessage="{v} days"
                  values={{
                    v: value,
                  }}
                />
              ),
              title: intl.formatMessage({
                defaultMessage: 'Due Date',
              }),
              width: 120,
            },
            {
              dataIndex: 'questions',
              ellipsis: true,
              key: 'questions',
              render: (_, item: ListData) => (
                <Tooltip
                  title={questionsToReadable(
                    item.questions.map((q) => q.question)
                  )}
                >
                  {item.questions.length}
                </Tooltip>
              ),

              title: intl.formatMessage({
                defaultMessage: 'Questions',
              }),
              width: 160,
            },
            {
              dataIndex: 'actions',
              key: 'actions',
              render: (_, record) => (
                <Row gutter={8}>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Create Activity',
                      })}
                    >
                      <Button
                        icon={<FontAwesomeIcon icon={faPlus} />}
                        onClick={() => {
                          createActivity(record.id || null);
                        }}
                        size="small"
                      />
                    </Tooltip>
                  </Col>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Edit',
                      })}
                    >
                      <Button
                        icon={<FontAwesomeIcon icon={faPenToSquare} />}
                        onClick={() => {
                          toggleEdit(record.id || null);
                        }}
                        size="small"
                      />
                    </Tooltip>
                  </Col>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Delete Template',
                      })}
                    >
                      <Popconfirm
                        onConfirm={() => {
                          deleteQuestion(record.id);
                        }}
                        overlayInnerStyle={{ padding: 14 }}
                        title={intl.formatMessage({
                          defaultMessage:
                            'Are you sure you want to delete this template?',
                        })}
                      >
                        <Button
                          icon={<FontAwesomeIcon icon={faTrash} />}
                          size="small"
                        />
                      </Popconfirm>
                    </Tooltip>
                  </Col>
                </Row>
              ),
              width: 150,
            },
          ]}
          dataSource={tableData}
          loading={loading}
          pagination={{
            hideOnSinglePage: true,
          }}
          size="small"
        />
      </Card>
      <Drawer
        onClose={() => onClose()}
        open={addActivity}
        title={intl.formatMessage({
          defaultMessage: 'Create Activity',
        })}
        width={800}
      >
        {addActivity ? (
          <AddTodo
            initData={selectedActivity ?? undefined}
            onClose={() => onClose()}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => onClose()}
        open={activityTemplateForm}
        title={intl.formatMessage({
          defaultMessage: ' Activity Template',
        })}
        width={800}
      >
        {activityTemplateForm ? (
          <ActivityTemplateForm
            id={selectedActivity?.id ?? undefined}
            initData={selectedActivity ?? undefined}
            onClose={() => onClose()}
            update={updateTemplates}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ActivityTemplatesView;
