import type { FormInstance } from 'antd';

import { CameraSelect } from '#/views/vision/detection-configs/ViewConfig/components/CameraSelect';
import ConfigHeader from '#/views/vision/detection-configs/ViewConfig/components/DetectionHeader';
import DetectionOutcomes from '#/views/vision/detection-configs/ViewConfig/components/DetectionOutcomes';
import { Col, Drawer, Form, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type {
  FormData,
  Question,
  QuestionGroupData,
} from './useDetectionConfigForm';

import ActivityTemplateForm from '../../../../components/form-components/ActivityTemplate';
import CreateQuestionContainer from '../../../../components/form-components/createQuestion/CreateQuestion.container';
import Loading from '../../../../components/shared-components/AntD/Loading';
import { DetectionConficTrigger, UserManagement } from './components';

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

export interface DetectionConfigProps {
  activityTemplateForm: boolean;
  availableQuestions: Question[];
  createNewQuestion: (id: string, question: string) => void;
  editId?: string;
  form: FormInstance<FormData>;
  loading: boolean;
  newQuestion: boolean;
  onClose: () => void;
  onFinish: (formData: FormData) => void;
  questionGroups: QuestionGroupData[];
  saving: boolean;
  schemeId: string;
  selectedQuestions: Question[];
  setActivityTemplateForm: React.Dispatch<React.SetStateAction<boolean>>;
  setAvailableQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  setNewQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedActivity: (q: QuestionGroupData) => void;
  setSelectedQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  taskQuestions: Question[];
  updateTemplates: (
    item: ListData,
    type: 'create' | 'delete' | 'update'
  ) => void;
}

const DetectionConfigView: React.FC<DetectionConfigProps> = ({
  activityTemplateForm,
  createNewQuestion,
  editId,
  form,
  loading,
  newQuestion,
  onClose,
  onFinish,
  questionGroups,
  saving,
  schemeId,
  setActivityTemplateForm,
  setNewQuestion,
  setSelectedActivity,
  taskQuestions,
  updateTemplates,
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
          <ConfigHeader editId={editId} saving={saving} />

          <Row gutter={16}>
            <Col span={10}>
              <DetectionConficTrigger />
              <CameraSelect form={form} schemeId={schemeId} />
            </Col>

            <Col span={14}>
              <DetectionOutcomes
                form={form}
                questionGroups={questionGroups}
                saving={saving}
                setActivityTemplateForm={setActivityTemplateForm}
                setNewQuestion={setNewQuestion}
                setSelectedActivity={setSelectedActivity}
                taskQuestions={taskQuestions}
              />

              <UserManagement form={form} saving={saving} schemeId={schemeId} />
            </Col>
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

export default DetectionConfigView;
