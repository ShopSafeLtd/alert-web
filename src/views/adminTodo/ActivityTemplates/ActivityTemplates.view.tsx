import React from 'react';
import { Button, Card, Col, Drawer, Row, Table, Tooltip } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import type { ListData } from '../useActivities';
import AddTodo from '../../../components/form-components/Todos/AddTodo';
import ActivityTemplateForm from '../../../components/form-components/ActivityTemplate';

interface Props {
  tableData: ListData[];
  loading: boolean;
  updateTemplates: (
    item: ListData,
    type: 'create' | 'update' | 'delete'
  ) => void;
  toggleAddTemplate: () => void;
  createActivity: (id: string | null) => void;
  toggleEdit: (id: string | null) => void;
  deleteQuestion: (id: string) => void;
  addActivity: boolean;
  onClose: () => void;
  selectedActivity: ListData | null;
  activityTemplateForm: boolean;
}

const questionsToReadable = (questions: string[]) => questions.join(', ');

const ActivityTemplatesView = ({
  tableData,
  loading,
  updateTemplates,
  toggleAddTemplate,
  createActivity,
  toggleEdit,
  deleteQuestion,
  addActivity,
  onClose,
  selectedActivity,
  activityTemplateForm,
}: Props) => {
  const intl = useIntl();
  return (
    <div className="list-view" style={{ paddingTop: 0 }}>
      <Row gutter={8} style={{ marginBottom: 15 }}>
        <Col flex={1} />
        <Col>
          <Button
            type="primary"
            onClick={() => toggleAddTemplate()}
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
          >
            {intl.formatMessage({
              defaultMessage: 'New Template',
              id: '4jpdwo',
            })}
          </Button>
        </Col>
      </Row>
      <Card loading={loading}>
        <Table
          dataSource={tableData}
          loading={loading}
          pagination={{
            hideOnSinglePage: true,
          }}
          columns={[
            {
              key: 'name',
              dataIndex: 'name',
              title: intl.formatMessage({
                defaultMessage: 'Name',
                id: 'HAlOn1',
              }),
            },
            {
              key: 'description',
              dataIndex: 'description',
              title: intl.formatMessage({
                defaultMessage: 'Description',
                id: 'Q8Qw5B',
              }),
              ellipsis: true,
            },

            {
              key: 'dueDate',
              dataIndex: 'defaultDueDays',
              title: intl.formatMessage({
                defaultMessage: 'Due Date',
                id: '8XUukm',
              }),
              width: 120,
              render: (value: number) => (
                <FormattedMessage
                  defaultMessage="{v} days"
                  id="205ouO"
                  values={{
                    v: value,
                  }}
                />
              ),
            },
            {
              key: 'questions',
              dataIndex: 'questions',
              title: intl.formatMessage({
                defaultMessage: 'Questions',
                id: 'KV/9Hv',
              }),
              width: 160,

              ellipsis: true,
              render: (_, item: ListData) => (
                <Tooltip
                  title={questionsToReadable(
                    item.questions.map((q) => q.question)
                  )}
                >
                  {item.questions.length}
                </Tooltip>
              ),
            },
            {
              dataIndex: 'actions',
              key: 'actions',
              width: 150,
              render: (_, record) => (
                <Row>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Create Activity',
                        id: '8RIxKm',
                      })}
                    >
                      <Button
                        size="small"
                        onClick={() => {
                          createActivity(record.id || null);
                        }}
                        style={{ marginRight: 5 }}
                        icon={<FontAwesomeIcon icon={faPlus} />}
                      />
                    </Tooltip>
                  </Col>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Edit',
                        id: 'wEQDC6',
                      })}
                    >
                      <Button
                        size="small"
                        onClick={() => {
                          toggleEdit(record.id || null);
                        }}
                        style={{ marginRight: 5 }}
                        icon={<FontAwesomeIcon icon={faPenToSquare} />}
                      />
                    </Tooltip>
                  </Col>
                  <Col>
                    <Tooltip
                      title={intl.formatMessage({
                        defaultMessage: 'Remove Question',
                        id: 'CvVrAx',
                      })}
                    >
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => {
                          deleteQuestion(record.id);
                        }}
                        icon={<FontAwesomeIcon icon={faTrash} />}
                      />
                    </Tooltip>
                  </Col>
                </Row>
              ),
            },
          ]}
        />
      </Card>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Create Activity',
          id: '8RIxKm',
        })}
        open={addActivity}
        width={800}
        onClose={() => onClose()}
      >
        {addActivity ? (
          <AddTodo
            onClose={() => onClose()}
            initData={selectedActivity ?? undefined}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Create Activity Template',
          id: '+zA4DH',
        })}
        open={activityTemplateForm}
        width={800}
        onClose={() => onClose()}
      >
        {activityTemplateForm ? (
          <ActivityTemplateForm
            update={updateTemplates}
            onClose={() => onClose()}
            initData={selectedActivity ?? undefined}
            id={selectedActivity?.id ?? undefined}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ActivityTemplatesView;
