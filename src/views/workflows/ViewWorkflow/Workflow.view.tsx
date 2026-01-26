import type { FormInstance } from 'antd';
import type { Model } from 'graphql/types';

import { Col, Drawer, Form, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type {
  FormData,
  LabelValue,
  Question,
  QuestionGroupData,
} from './useWorkflowForm';

import ActivityTemplateForm from '../../../components/form-components/ActivityTemplate';
import CreateQuestionContainer from '../../../components/form-components/createQuestion/CreateQuestion.container';
import Loading from '../../../components/shared-components/AntD/Loading';
import {
  UserManagement,
  WorkflowConditions,
  WorkflowHeader,
  WorkflowOutcomes,
  WorkflowTriggerConfig,
} from './components';

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

export interface WorkflowProps {
  activityClosedSelected: boolean;
  activityCompletedBySelected: boolean;
  activityOverdueSelected: boolean;
  activityRaisedBySelected: boolean;
  activityTemplateForm: boolean;
  availableQuestions: Question[];
  banTypeSelected: boolean;
  // new
  brands: LabelValue[];
  brandsLoading: boolean;
  brandsSelected: boolean;
  checklistOption: { label: string; value: string }[];
  countries: LabelValue[];
  countriesSelected: boolean;
  createNewQuestion: (id: string, question: string) => void;
  daysUntilExpirySelected: boolean;
  descriptionCheck: boolean;
  divisions: LabelValue[];
  divisionsLoading: boolean;
  divisionsSelected: boolean;
  editId?: string;
  form: FormInstance<FormData>;
  goods: { label: string; value: string }[];
  goodsTypeCheck: boolean;
  groups: LabelValue[];
  groupsSelected: boolean;
  incidentTimeCountCheck: boolean;
  lessThanSelected: boolean;
  loading: boolean;
  lossValueBetweenSelected: boolean;
  lossValueSelected: boolean;
  modelSelected: Model | null | undefined;
  newQuestion: boolean;
  onClose: () => void;
  onFinish: (formData: FormData) => void;
  prefix: string;
  prioritySelected: boolean;
  questionGroups: QuestionGroupData[];
  questions: Question[];
  questionsSelected: boolean;
  saving: boolean;
  schemeId: string;
  selectedQuestions: Question[];
  sendEmailCheck: boolean;
  sendNotificationCheck: boolean;
  setActivityTemplateForm: React.Dispatch<React.SetStateAction<boolean>>;
  setAvailableQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  setNewQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedActivity: (q: QuestionGroupData) => void;
  setSelectedQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  tags: { label: string; value: string }[];
  tagsSelected: boolean;
  taskOutcome: boolean;
  taskQuestions: Question[];

  typeWatch: string;
  updateIncidentCheck: boolean;
  updateTemplates: (
    item: ListData,
    type: 'create' | 'delete' | 'update'
  ) => void;
  valueSelected: boolean;
  workflowTypeWatch: Model | null | undefined;
}

const WorkflowView: React.FC<WorkflowProps> = ({
  activityClosedSelected,
  activityCompletedBySelected,
  activityOverdueSelected,
  activityRaisedBySelected,
  activityTemplateForm,
  availableQuestions,
  banTypeSelected,
  brands,
  brandsLoading,
  brandsSelected,
  checklistOption,
  countries,
  countriesSelected,
  createNewQuestion,
  daysUntilExpirySelected,
  descriptionCheck,
  divisions,
  divisionsLoading,
  divisionsSelected,
  editId,
  form,
  goods,
  goodsTypeCheck,
  groups,
  groupsSelected,
  incidentTimeCountCheck,
  lessThanSelected,
  loading,
  lossValueBetweenSelected,
  lossValueSelected,
  modelSelected,
  newQuestion,
  onClose,
  onFinish,
  prefix,
  prioritySelected,
  questionGroups,
  questions,
  questionsSelected,
  saving,
  schemeId,
  selectedQuestions,
  sendEmailCheck,
  sendNotificationCheck,
  setActivityTemplateForm,
  setAvailableQuestions,
  setNewQuestion,
  setSelectedActivity,
  setSelectedQuestions,
  tags,
  tagsSelected,
  taskOutcome,
  taskQuestions,
  typeWatch,
  updateIncidentCheck,
  updateTemplates,
  valueSelected,
  workflowTypeWatch,
}) => {
  const intl = useIntl();

  if (loading) {
    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
        }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <div style={{ padding: 15, width: '100%' }}>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Form<FormData>
          disabled={saving}
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ width: '100%' }}
        >
          <WorkflowHeader editId={editId} saving={saving} />

          <Row gutter={16}>
            <Col span={10}>
              <WorkflowTriggerConfig
                editId={editId}
                form={form}
                modelSelected={modelSelected}
                typeWatch={typeWatch}
              />

              {modelSelected && (
                <WorkflowConditions
                  activityClosedSelected={activityClosedSelected}
                  activityCompletedBySelected={activityCompletedBySelected}
                  activityOverdueSelected={activityOverdueSelected}
                  activityRaisedBySelected={activityRaisedBySelected}
                  availableQuestions={availableQuestions}
                  banTypeSelected={banTypeSelected}
                  brands={brands}
                  brandsLoading={brandsLoading}
                  brandsSelected={brandsSelected}
                  checklistOption={checklistOption}
                  countries={countries}
                  countriesSelected={countriesSelected}
                  daysUntilExpirySelected={daysUntilExpirySelected}
                  descriptionCheck={descriptionCheck}
                  divisions={divisions}
                  divisionsLoading={divisionsLoading}
                  divisionsSelected={divisionsSelected}
                  form={form}
                  goods={goods}
                  goodsTypeCheck={goodsTypeCheck}
                  groups={groups}
                  groupsSelected={groupsSelected}
                  incidentTimeCountCheck={incidentTimeCountCheck}
                  lessThanSelected={lessThanSelected}
                  loading={loading}
                  lossValueBetweenSelected={lossValueBetweenSelected}
                  lossValueSelected={lossValueSelected}
                  modelSelected={modelSelected}
                  prefix={prefix}
                  prioritySelected={prioritySelected}
                  questions={questions}
                  questionsSelected={questionsSelected}
                  schemeId={schemeId}
                  selectedQuestions={selectedQuestions}
                  setActivityTemplateForm={setActivityTemplateForm}
                  setAvailableQuestions={setAvailableQuestions}
                  setNewQuestion={setNewQuestion}
                  setSelectedActivity={setSelectedActivity}
                  setSelectedQuestions={setSelectedQuestions}
                  tags={tags}
                  tagsSelected={tagsSelected}
                  taskQuestions={taskQuestions}
                  typeWatch={typeWatch}
                  valueSelected={valueSelected}
                />
              )}
            </Col>

            {typeWatch && (
              <Col span={14}>
                <WorkflowOutcomes
                  form={form}
                  modelSelected={modelSelected}
                  questionGroups={questionGroups}
                  saving={saving}
                  sendEmailCheck={sendEmailCheck}
                  sendNotificationCheck={sendNotificationCheck}
                  setActivityTemplateForm={setActivityTemplateForm}
                  setNewQuestion={setNewQuestion}
                  setSelectedActivity={setSelectedActivity}
                  taskOutcome={taskOutcome}
                  taskQuestions={taskQuestions}
                  typeWatch={typeWatch}
                  updateIncidentCheck={updateIncidentCheck}
                />

                <UserManagement
                  groups={groups}
                  saving={saving}
                  schemeId={schemeId}
                  sendEmailCheck={sendEmailCheck}
                  sendNotificationCheck={sendNotificationCheck}
                  taskOutcome={taskOutcome}
                  typeWatch={typeWatch}
                  workflowTypeWatch={workflowTypeWatch}
                />
              </Col>
            )}
          </Row>
        </Form>

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
              id={undefined}
              initData={undefined}
              onClose={() => onClose()}
              update={updateTemplates}
            />
          ) : (
            <div />
          )}
        </Drawer>

        <Drawer
          onClose={() => onClose()}
          open={newQuestion}
          title={intl.formatMessage({
            defaultMessage: 'Add/Create Question',
          })}
          width="800"
        >
          {newQuestion ? (
            <CreateQuestionContainer
              ids={taskQuestions.map(({ id }) => id)}
              onClose={() => onClose()}
              update={createNewQuestion}
            />
          ) : (
            <div />
          )}
        </Drawer>
      </div>
    </div>
  );
};

export default WorkflowView;
