import type {
  Filters,
  QuestionNode,
} from '#/views/settings/questions/useQuestions';

import AddQuestionContainer from '#/components/form-components/addQuestion/AddQuestion.container';
import UpdateQuestionContainer from '#/components/form-components/update-question-on-activity/UpdateQuestion.container';
import DebouncedInput from '#/utils/debounced-input';
import QuestionViewModal from '#/views/settings/questions/components/QuestionViewModal';
import { QuestionModeSelect } from '#/views/settings/questions/components/question-model-select';
import { faEdit, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Drawer,
  Popconfirm,
  Row,
  Space,
  Table,
} from 'antd';
import { AnswerType, QuestionModel } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  answerTypeLabels: Record<AnswerType, string>;
  closeDrawer: () => void;
  deleteQuestion: (id: string) => void;
  filters: Filters;
  isDrawerOpen: boolean;
  isModalOpen: null | string;
  loading: boolean;
  modelTypeLabels: Record<QuestionModel, string>;
  openDrawer: (id: string) => void;
  page: number;
  pageSize: number;
  questions: QuestionNode[];
  selectedQuestionId: null | string;
  selectedQuestionModes: string[];
  setActivityQuestionsFilter: (activityQuestions: boolean) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSearchFilter: (search: string) => void;
  setTagQuestionsFilter: (tagQuestions: boolean) => void;
  setTypeFilter: (type: AnswerType[]) => void;

  toggleModal: (id?: string) => void;
  total: number;
}

const QuestionsView = ({
  answerTypeLabels,
  closeDrawer,
  deleteQuestion,
  filters,
  isDrawerOpen,
  isModalOpen,
  loading,
  modelTypeLabels,
  openDrawer,
  page,
  pageSize,
  questions,
  selectedQuestionId,
  selectedQuestionModes,
  setActivityQuestionsFilter,
  setPage,
  setPageSize,
  setSearchFilter,
  setTagQuestionsFilter,
  setTypeFilter,
  toggleModal,
  total,
}: Props) => {
  const intl = useIntl();

  return (
    <div className="feed-container">
      <Card
        bodyStyle={{ padding: 10 }}
        style={{ marginBottom: 5, marginRight: 10 }}
      >
        <Row
          align="middle"
          gutter={[12, 12]}
          style={{ marginBottom: 15, marginRight: 10 }}
        >
          <Col span={8} xxl={24}>
            <DebouncedInput
              allowClear
              defaultValue={filters.search || ''}
              onChange={(e) => setSearchFilter(e.target.value)}
              // style={{ width: 350 }}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search Questions...',
              })}
              size="small"
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={6}>
            <QuestionModeSelect
              intl={intl}
              selected={selectedQuestionModes}
              setActivityQuestionsFilter={setActivityQuestionsFilter}
              setTagQuestionsFilter={setTagQuestionsFilter}
            />
          </Col>
          <Col flex={1} />
        </Row>
        <Row gutter={[12, 12]}>
          <Col flex={1}>
            <Space direction={'horizontal'} size={'large'}>
              {Object.values(AnswerType).map((type) => (
                <Checkbox
                  checked={filters.type?.includes(type)}
                  onChange={() => {
                    const addingOrRemoving = filters.type?.includes(type);
                    const newTypeFilter = addingOrRemoving
                      ? filters.type?.filter((t) => t !== type)
                      : [...(filters.type || []), type];
                    setTypeFilter(newTypeFilter || []);
                  }}
                  style={{ userSelect: 'none', verticalAlign: 'middle' }}
                >
                  {answerTypeLabels[type]}
                </Checkbox>
              ))}
            </Space>
          </Col>
        </Row>
      </Card>
      <Card
        bodyStyle={{ padding: 10 }}
        style={{ marginBottom: 5, marginRight: 10 }}
      >
        <Row gutter={[12, 12]} style={{ marginRight: 10, marginTop: 15 }}>
          <Col span={24}>
            <Table
              columns={[
                {
                  dataIndex: 'question',
                  key: 'question',
                  render: (text, record) => (
                    <a onClick={() => toggleModal(record.id)}>
                      {record.question}
                    </a>
                  ),
                  title: intl.formatMessage({
                    defaultMessage: 'Question',
                  }),
                },
                {
                  dataIndex: 'type',
                  key: 'type',
                  render: (text, record) => (
                    <span>{answerTypeLabels[record.type]}</span>
                  ),
                  title: intl.formatMessage({
                    defaultMessage: 'Type',
                  }),
                },
                {
                  dataIndex: 'modelType',
                  key: 'modelType',
                  render: (text, record) => (
                    <span>{modelTypeLabels[record.model]}</span>
                  ),
                  title: intl.formatMessage({
                    defaultMessage: 'Model Type',
                  }),
                },
                {
                  dataIndex: 'count',
                  key: 'count',
                  render: (text, record) => {
                    if (record.model === QuestionModel.Tag) {
                      return <span>{record.tagsCount}</span>;
                    }
                    return <span>{record.activityCount}</span>;
                  },
                  title: intl.formatMessage({
                    defaultMessage: 'Count',
                  }),
                },
                {
                  dataIndex: 'actions',
                  key: 'actions',
                  render: (_, record) => (
                    <Space>
                      <Button
                        onClick={() => openDrawer(record.id)}
                        size="small"
                      >
                        <FontAwesomeIcon icon={faEdit} size="1x" />
                      </Button>

                      <Popconfirm
                        onConfirm={() => deleteQuestion(record.id)}
                        overlayInnerStyle={{
                          padding: '12px 16px',
                        }}
                        title={intl.formatMessage({
                          defaultMessage: 'Are you sure?',
                        })}
                      >
                        <Button size="small" type="primary">
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </Popconfirm>
                    </Space>
                  ),
                  title: intl.formatMessage({
                    defaultMessage: 'Actions',
                  }),
                },
              ]}
              dataSource={questions}
              loading={loading}
              pagination={{
                current: page,
                onChange: (page, size) => {
                  setPage(page);
                  setPageSize(size);
                },
                pageSize,
                total,
              }}
              rowKey="id"
            />
          </Col>
        </Row>
      </Card>
      <Drawer
        onClose={() => closeDrawer()}
        open={isDrawerOpen}
        title={intl.formatMessage({
          defaultMessage: 'Add Question',
        })}
        width="800"
      >
        <AddQuestionContainer onClose={() => closeDrawer()} />
      </Drawer>
      <Drawer
        onClose={() => closeDrawer()}
        open={!!(isDrawerOpen && selectedQuestionId)}
        title={intl.formatMessage({
          defaultMessage: 'Edit Question',
        })}
        width="800"
      >
        {selectedQuestionId ? (
          <UpdateQuestionContainer
            onClose={() => closeDrawer()}
            questionId={selectedQuestionId}
            required
          />
        ) : (
          <div />
        )}
      </Drawer>
      <QuestionViewModal
        closeModal={() => toggleModal()}
        questionId={isModalOpen}
      />
    </div>
  );
};

export default QuestionsView;
