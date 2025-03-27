import type { ListData } from '#/views/adminTodo/TodoList/useTodoList';

import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Drawer, Row, Table, Tooltip } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import ActivityTemplateForm from '../../../components/form-components/ActivityTemplate';
import AddTodo from '../../../components/form-components/Todos/AddTodo';

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
    <div className="list-view" style={{ paddingTop: 0 }}>
      <Row gutter={8} style={{ marginBottom: 15 }}>
        <Col flex={1} />
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
            type="primary"
          >
            {intl.formatMessage({
              defaultMessage: 'New Template',
            })}
          </Button>
        </Col>
      </Row>
      <Card loading={loading}>
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
                <Row>
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
                        style={{ marginRight: 5 }}
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
                        style={{ marginRight: 5 }}
                      />
                    </Tooltip>
                  </Col>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Remove Question',
                      })}
                    >
                      <Button
                        icon={<FontAwesomeIcon icon={faTrash} />}
                        onClick={() => {
                          deleteQuestion(record.id);
                        }}
                        size="small"
                        type="primary"
                      />
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
          defaultMessage: 'Create Activity Template',
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
