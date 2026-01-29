/* eslint-disable @typescript-eslint/no-unsafe-member-access,formatjs/no-literal-string-in-jsx,@typescript-eslint/no-unsafe-assignment */
import type { ExtendedLayout } from '#/views/reports/types';
import type { ViewTagQuery } from '#/views/settings/tags/ViewTag/graphql/__generated__/view-tag.generated';
import type { Dispatch, SetStateAction } from 'react';

import { margin, rowHeight } from '#/components/reports/utils/utils';
import {
  faBars,
  faFilter,
  faGripVertical,
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Badge,
  Button,
  Card,
  Col,
  Drawer,
  Input,
  PageHeader,
  Row,
  Select,
  Switch,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import EditCrimeType from 'components/form-components/tags/crimeTypes/EditCrimeType';
import { IncidentFormField } from 'graphql/types';
import React, { useCallback, useMemo } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { FormattedMessage, useIntl } from 'react-intl';

import type { ModuleCondition } from './components/ModuleConditionsModal';
import type {
  Elements,
  FieldLayout,
  IncidentFormFieldState,
} from './useViewTag';

import AddQuestionContainer from '../../../../components/form-components/addQuestion/AddQuestion.container';
import UpdateQuestionContainer from '../../../../components/form-components/update-question-on-tag/UpdateQuestion.container';
import BuildTree from '../../../../utils/tags/tree-helper';
import ModuleConditionsModal from './components/ModuleConditionsModal';

// const FromFieldsConfig = () => {
//   const [configOpen, setConfigOpen] = useState(false);
//
//   const toggleConfigOpen = () => {
//     setConfigOpen(!configOpen);
//   };
//
//   return (
//     <>
//       <Button
//         className="cancelDrag"
//         onClick={toggleConfigOpen}
//         shape="round"
//         size="small"
//         style={{ position: 'absolute', right: 10, top: 10 }}
//       >
//         <FontAwesomeIcon icon={faCogs} />
//       </Button>
//       <Modal onCancel={toggleConfigOpen} open={configOpen}>
//         <Form>
//           <Form.Item name="tooltip">
//             <Input />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

interface Props {
  addQuestion: boolean;
  availableBusinessGroups: { id: string; name: string }[];
  availableRoles: { id: string; name: string; type: string }[];
  conditionsModalOpen: boolean;
  currentModuleConditions: ModuleCondition[];
  data: ViewTagQuery | undefined;
  deleteConfirm: (value: string) => void;
  deleteQuestion: (questionId: string) => void;
  draftState: {
    draftButton: string;
    draftDescription: string;
    draftTitle: string;
  };
  editIncidentType: string;
  fieldTitles: Record<string, string>;
  incidentFormFields: IncidentFormFieldState;
  incidentFormLayout: ExtendedLayout[];
  incidentFormLayoutChanged: boolean;
  involvedMode: boolean;
  loading: boolean;
  parentTag: null | string | undefined;
  questionLayoutChanged: boolean;
  questionsLayout: ExtendedLayout[];
  saveAllChanges: () => void;
  saveModuleConditions: (conditions: ModuleCondition[]) => void;
  saving: boolean;
  selectedModule: IncidentFormField | null;
  selectedQuestion: null | string;
  setConditionsModalOpen: (open: boolean) => void;
  setDraftState: Dispatch<
    SetStateAction<{
      draftButton: string;
      draftDescription: string;
      draftTitle: string;
    }>
  >;
  setEditIncidentType: (value: string) => void;
  setFieldTitles: (value: Record<string, string>) => void;
  setIncidentFormLayout: (value: ExtendedLayout[]) => void;
  setIncidentFormLayoutChanged: (value: boolean) => void;
  setParentTag: (value: string) => void;
  setQuestionLayoutChanged: (value: boolean) => void;
  setQuestionsLayout: (value: ExtendedLayout[]) => void;
  setSelectedModule: (field: IncidentFormField | null) => void;
  setSelectedQuestion: (value: null | string) => void;
  setShowDamagedQuantity: (value: boolean) => void;
  showDamagedQuantity: boolean;
  showDraft: boolean;
  toggleAddQuestion: () => void;
  toggleField: (field: IncidentFormField) => void;
  toggleInvolvedMode: (value: boolean) => void;
  updateQuestionOnTag: (
    question: string,
    tagId: string,
    dependentOn?: {
      answer: string;
      questionId: string;
      tagQuestionId: string;
    }
  ) => void;
  updateTagParent: (tagId: string, parentTagId: null | string) => void;
}

const ViewTag = ({
  addQuestion,
  availableBusinessGroups,
  availableRoles,
  conditionsModalOpen,
  currentModuleConditions,
  data,
  deleteConfirm,
  deleteQuestion,
  draftState,
  editIncidentType,
  fieldTitles,
  incidentFormFields,
  incidentFormLayout,
  incidentFormLayoutChanged,
  involvedMode,
  loading,
  parentTag,
  questionLayoutChanged,
  questionsLayout,
  saveAllChanges,
  saveModuleConditions,
  saving,
  selectedModule,
  selectedQuestion,
  setConditionsModalOpen,
  setDraftState,
  setEditIncidentType,
  setFieldTitles,
  setIncidentFormLayout,
  setIncidentFormLayoutChanged,
  setParentTag,
  setQuestionLayoutChanged,
  setQuestionsLayout,
  setSelectedModule,
  setSelectedQuestion,
  setShowDamagedQuantity,
  showDamagedQuantity,
  showDraft,
  toggleAddQuestion,
  toggleField,
  toggleInvolvedMode,
  updateQuestionOnTag,
  updateTagParent,
}: Props): JSX.Element => {
  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);
  const intl = useIntl();

  const tagqs = useMemo(
    () =>
      data?.tag?.tagQuestions?.map((tagq) => ({
        dependOn: tagq.dependentQuestions[0],
        i: tagq.id,
        qId: tagq.question.id,
        question: tagq.question.questionFormatted,
        required: tagq.req,
        type: tagq.question.type,
      })),
    [data]
  );

  const tagQsFormatted = useMemo(
    () =>
      data?.tag?.tagQuestions
        ?.map((tag) => ({
          options: tag.question.optionsFormatted || [],
          question: tag.question.questionFormatted,
          questionId: tag.question.id,
          tagQuestionId: tag.id,
          type: tag.question.type,
        }))
        .filter((tag) => tag.questionId !== selectedQuestion) || [],
    [data, selectedQuestion]
  );

  const findDep = () => {
    const found = data?.tag?.tagQuestions?.find(
      (tagq) => tagq.question.id === selectedQuestion
    );
    if (found?.dependentQuestions[0]) {
      const dependentOn = found.dependentQuestions[0].tagQuestionId;
      const dependentAnswer = found.dependentQuestions[0].answer;
      // eslint-disable-next-line prefer-destructuring
      const dependentMatchMode = found.dependentQuestions[0].dependentMatchMode;
      return {
        dependentAnswer,
        dependentMatchMode,
        dependentOn,
      };
    }
    return null;
  };

  // Helper to get condition count for a module
  const getConditionCount = useCallback(
    (fieldType: IncidentFormField) => {
      const moduleConditions = data?.tag?.incidentForm?.fields?.find(
        (field) => field.type === fieldType
      )?.conditions;
      return Array.isArray(moduleConditions) ? moduleConditions.length : 0;
    },
    [data]
  );

  const incidentFormElements: Elements = {
    cctv: (
      <div
        key="cctv"
        style={{
          cursor: 'move',
        }}
      >
        <Card
          style={{
            border: incidentFormFields.CCTV
              ? '1px solid #1890ff'
              : '1px solid #d9d9d9',
            marginBottom: 0,
            opacity: incidentFormFields.CCTV ? 1 : 0.7,
            transition: 'all 0.3s ease',
          }}
        >
          <Row align="middle" gutter={8}>
            <Col span={1}>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Drag to reorder',
                })}
              >
                <FontAwesomeIcon
                  icon={faGripVertical}
                  size="lg"
                  style={{ color: '#8c8c8c', cursor: 'grab' }}
                />
              </Tooltip>
            </Col>
            <Col flex={1}>
              <FormattedMessage defaultMessage="CCTV" />
              {getConditionCount(IncidentFormField.Cctv) > 0 && (
                <Badge
                  count={getConditionCount(IncidentFormField.Cctv)}
                  style={{ marginLeft: 12 }}
                  title={intl.formatMessage(
                    {
                      defaultMessage: '{count} condition(s) active',
                    },
                    { count: getConditionCount(IncidentFormField.Cctv) }
                  )}
                />
              )}
            </Col>
            <Col>
              <Button
                className="cancelDrag"
                icon={<FontAwesomeIcon icon={faFilter} />}
                onClick={() => {
                  setSelectedModule(IncidentFormField.Cctv);
                  setConditionsModalOpen(true);
                }}
                size="small"
                type={
                  getConditionCount(IncidentFormField.Cctv) > 0
                    ? 'primary'
                    : 'default'
                }
              >
                Conditions
              </Button>
            </Col>
            <Col>
              <Switch
                checked={incidentFormFields.CCTV}
                checkedChildren="On"
                className="cancelDrag"
                onChange={() => {
                  toggleField(IncidentFormField.Cctv);
                }}
                unCheckedChildren="Off"
              />
            </Col>
          </Row>
        </Card>
      </div>
    ),
    custom: (
      <div
        key="custom"
        style={{
          cursor: 'move',
        }}
      >
        <Card
          style={{
            border: incidentFormFields.CUSTOM
              ? '1px solid #1890ff'
              : '1px solid #d9d9d9',
            marginBottom: 0,
            opacity: incidentFormFields.CUSTOM ? 1 : 0.7,
            transition: 'all 0.3s ease',
          }}
        >
          <Row align="middle" gutter={8}>
            <Col span={1}>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Drag to reorder',
                })}
              >
                <FontAwesomeIcon
                  icon={faGripVertical}
                  size="lg"
                  style={{ color: '#8c8c8c', cursor: 'grab' }}
                />
              </Tooltip>
            </Col>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Custom" />
              {getConditionCount(IncidentFormField.Custom) > 0 && (
                <Badge
                  count={getConditionCount(IncidentFormField.Custom)}
                  style={{ marginLeft: 12 }}
                  title={intl.formatMessage(
                    {
                      defaultMessage: '{count} condition(s) active',
                    },
                    { count: getConditionCount(IncidentFormField.Custom) }
                  )}
                />
              )}
            </Col>
            <Col>
              <Button
                className="cancelDrag"
                icon={<FontAwesomeIcon icon={faFilter} />}
                onClick={() => {
                  setSelectedModule(IncidentFormField.Custom);
                  setConditionsModalOpen(true);
                }}
                size="small"
                type={
                  getConditionCount(IncidentFormField.Custom) > 0
                    ? 'primary'
                    : 'default'
                }
              >
                Conditions
              </Button>
            </Col>
            <Col>
              <Switch
                checked={incidentFormFields.CUSTOM}
                checkedChildren="On"
                className="cancelDrag"
                onChange={() => {
                  toggleField(IncidentFormField.Custom);
                }}
                unCheckedChildren="Off"
              />
            </Col>
          </Row>
        </Card>
      </div>
    ),
    draft:
      showDraft && !loading ? (
        <div
          key="draft"
          style={{
            cursor: 'move',
          }}
        >
          <Card
            style={{
              border: incidentFormFields.DRAFT
                ? '1px solid #1890ff'
                : '1px solid #d9d9d9',
              marginBottom: 0,
              opacity: incidentFormFields.DRAFT ? 1 : 0.7,
              transition: 'all 0.3s ease',
            }}
          >
            <Row align="middle" gutter={8}>
              <Col span={1}>
                <Tooltip
                  title={intl.formatMessage({
                    defaultMessage: 'Drag to reorder',
                  })}
                >
                  <FontAwesomeIcon
                    icon={faGripVertical}
                    size="lg"
                    style={{ color: '#8c8c8c', cursor: 'grab' }}
                  />
                </Tooltip>
              </Col>
              <Col flex={1}>
                <FormattedMessage defaultMessage="Save as draft" />
              </Col>
              <Col>
                <Switch
                  checked={incidentFormFields.DRAFT}
                  checkedChildren="On"
                  className="cancelDrag"
                  onChange={() => {
                    toggleField(IncidentFormField.Draft);
                  }}
                  unCheckedChildren="Off"
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              {/* Draft Title Input */}
              <Col span={24}>
                <Input
                  addonBefore={intl.formatMessage({
                    defaultMessage: 'Draft Title',
                  })}
                  defaultValue={draftState.draftTitle}
                  onChange={(e) =>
                    setDraftState((prev) => ({
                      ...prev,
                      draftTitle: e.target.value,
                    }))
                  }
                  placeholder="Draft Title"
                />
              </Col>

              {/* Draft Description Input */}
              <Col span={24}>
                <Input
                  addonBefore={intl.formatMessage({
                    defaultMessage: 'Draft Description',
                  })}
                  defaultValue={draftState.draftDescription}
                  onChange={(e) =>
                    setDraftState((prev) => ({
                      ...prev,
                      draftDescription: e.target.value,
                    }))
                  }
                  placeholder="Draft Description"
                />
              </Col>

              {/* Draft Button Label Input */}
              <Col span={24}>
                <Input
                  addonBefore={intl.formatMessage({
                    defaultMessage: 'Draft Button',
                  })}
                  defaultValue={draftState.draftButton}
                  onChange={(e) =>
                    setDraftState((prev) => ({
                      ...prev,
                      draftButton: e.target.value,
                    }))
                  }
                  placeholder="Draft Button Label"
                />
              </Col>
            </Row>
          </Card>
        </div>
      ) : undefined,
    goods: (
      <div
        key="goods"
        style={{
          cursor: 'move',
        }}
      >
        <Card
          style={{
            border: incidentFormFields.GOODS
              ? '1px solid #1890ff'
              : '1px solid #d9d9d9',
            marginBottom: 0,
            opacity: incidentFormFields.GOODS ? 1 : 0.7,
            transition: 'all 0.3s ease',
          }}
        >
          <Row align="middle" gutter={8}>
            <Col span={1}>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Drag to reorder',
                })}
              >
                <FontAwesomeIcon
                  icon={faGripVertical}
                  size="lg"
                  style={{ color: '#8c8c8c', cursor: 'grab' }}
                />
              </Tooltip>
            </Col>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Goods" />
              {getConditionCount(IncidentFormField.Goods) > 0 && (
                <Badge
                  count={getConditionCount(IncidentFormField.Goods)}
                  style={{ marginLeft: 12 }}
                  title={intl.formatMessage(
                    {
                      defaultMessage: '{count} condition(s) active',
                    },
                    { count: getConditionCount(IncidentFormField.Goods) }
                  )}
                />
              )}
            </Col>
            <Col>
              <Button
                className="cancelDrag"
                icon={<FontAwesomeIcon icon={faFilter} />}
                onClick={() => {
                  setSelectedModule(IncidentFormField.Goods);
                  setConditionsModalOpen(true);
                }}
                size="small"
                type={
                  getConditionCount(IncidentFormField.Goods) > 0
                    ? 'primary'
                    : 'default'
                }
              >
                Conditions
              </Button>
            </Col>
            <Col>
              <Switch
                checked={incidentFormFields.GOODS}
                checkedChildren="On"
                className="cancelDrag"
                onChange={() => {
                  toggleField(IncidentFormField.Goods);
                }}
                unCheckedChildren="Off"
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 8 }}>
            <Col span={1} />
            <Col flex={1}>
              <Typography.Text>Show Damaged Quantity</Typography.Text>
            </Col>
            <Col>
              <Switch
                checked={showDamagedQuantity}
                className="cancelDrag"
                disabled={!incidentFormFields.GOODS}
                onChange={(checked) => {
                  setShowDamagedQuantity(checked);
                  if (!incidentFormLayoutChanged) {
                    setIncidentFormLayoutChanged(true);
                  }
                }}
                size="small"
              />
            </Col>
          </Row>
        </Card>
      </div>
    ),
    groups: (
      <div
        key="groups"
        style={{
          cursor: 'move',
        }}
      >
        <Card
          style={{
            border: incidentFormFields.GROUPS
              ? '1px solid #1890ff'
              : '1px solid #d9d9d9',
            marginBottom: 0,
            opacity: incidentFormFields.GROUPS ? 1 : 0.7,
            transition: 'all 0.3s ease',
          }}
        >
          <Row align="middle" gutter={8}>
            <Col span={1}>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Drag to reorder',
                })}
              >
                <FontAwesomeIcon
                  icon={faGripVertical}
                  size="lg"
                  style={{ color: '#8c8c8c', cursor: 'grab' }}
                />
              </Tooltip>
            </Col>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Groups" />
              {getConditionCount(IncidentFormField.Groups) > 0 && (
                <Badge
                  count={getConditionCount(IncidentFormField.Groups)}
                  style={{ marginLeft: 12 }}
                  title={intl.formatMessage(
                    {
                      defaultMessage: '{count} condition(s) active',
                    },
                    { count: getConditionCount(IncidentFormField.Groups) }
                  )}
                />
              )}
            </Col>
            <Col>
              <Button
                className="cancelDrag"
                icon={<FontAwesomeIcon icon={faFilter} />}
                onClick={() => {
                  setSelectedModule(IncidentFormField.Groups);
                  setConditionsModalOpen(true);
                }}
                size="small"
                type={
                  getConditionCount(IncidentFormField.Groups) > 0
                    ? 'primary'
                    : 'default'
                }
              >
                Conditions
              </Button>
            </Col>
            <Col>
              <Switch
                checked={incidentFormFields.GROUPS}
                checkedChildren="On"
                className="cancelDrag"
                onChange={() => toggleField(IncidentFormField.Groups)}
                unCheckedChildren="Off"
              />
            </Col>
          </Row>
        </Card>
      </div>
    ),
    images: (
      <div
        key="images"
        style={{
          cursor: 'move',
        }}
      >
        <Card
          style={{
            border: incidentFormFields.IMAGES
              ? '1px solid #1890ff'
              : '1px solid #d9d9d9',
            marginBottom: 0,
            opacity: incidentFormFields.IMAGES ? 1 : 0.7,
            transition: 'all 0.3s ease',
          }}
        >
          <Row align="middle" gutter={8}>
            <Col span={1}>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Drag to reorder',
                })}
              >
                <FontAwesomeIcon
                  icon={faGripVertical}
                  size="lg"
                  style={{ color: '#8c8c8c', cursor: 'grab' }}
                />
              </Tooltip>
            </Col>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Images" />
              {getConditionCount(IncidentFormField.Images) > 0 && (
                <Badge
                  count={getConditionCount(IncidentFormField.Images)}
                  style={{ marginLeft: 12 }}
                  title={intl.formatMessage(
                    {
                      defaultMessage: '{count} condition(s) active',
                    },
                    { count: getConditionCount(IncidentFormField.Images) }
                  )}
                />
              )}
            </Col>
            <Col>
              <Button
                className="cancelDrag"
                icon={<FontAwesomeIcon icon={faFilter} />}
                onClick={() => {
                  setSelectedModule(IncidentFormField.Images);
                  setConditionsModalOpen(true);
                }}
                size="small"
                type={
                  getConditionCount(IncidentFormField.Images) > 0
                    ? 'primary'
                    : 'default'
                }
              >
                Conditions
              </Button>
            </Col>
            <Col>
              <Switch
                checked={incidentFormFields.IMAGES}
                checkedChildren="On"
                className="cancelDrag"
                onChange={() => {
                  toggleField(IncidentFormField.Images);
                }}
                unCheckedChildren="Off"
              />
            </Col>
          </Row>
        </Card>
      </div>
    ),
    police: (
      <div
        key="police"
        style={{
          cursor: 'move',
        }}
      >
        <Card
          style={{
            border: '1px solid #1890ff',
            marginBottom: 0,
            opacity: 1,
            transition: 'all 0.3s ease',
          }}
        >
          {/* Details Section - Always On */}
          <Row align="middle" gutter={8}>
            <Col span={1}>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Drag to reorder',
                })}
              >
                <FontAwesomeIcon
                  icon={faGripVertical}
                  size="lg"
                  style={{ color: '#8c8c8c', cursor: 'grab' }}
                />
              </Tooltip>
            </Col>
            <Col flex={1}>
              <div>
                <FormattedMessage defaultMessage="Details" />
                <Tag color="red" style={{ marginLeft: 8 }}>
                  <FormattedMessage defaultMessage="Required" />
                </Tag>
              </div>
            </Col>
            <Col>
              <Typography.Text type="secondary">
                <FormattedMessage defaultMessage="Always enabled" />
              </Typography.Text>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginLeft: 24, marginTop: 8 }}>
            <Col span={24}>
              <Input
                addonBefore={intl.formatMessage({
                  defaultMessage: 'Description Field Title',
                })}
                className="cancelDrag"
                onChange={(e) => {
                  setFieldTitles({
                    ...fieldTitles,
                    description: e.target.value,
                  });
                  if (!incidentFormLayoutChanged) {
                    setIncidentFormLayoutChanged(true);
                  }
                }}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Please describe the incident',
                })}
                value={fieldTitles.description || ''}
              />
            </Col>
          </Row>

          {/* Police Section - Toggleable */}
          <Row align="middle" gutter={8} style={{ marginTop: 16 }}>
            <Col span={1} />
            <Col flex={1}>
              <div>
                <FormattedMessage defaultMessage="Police Reporting" />
                {getConditionCount(IncidentFormField.Police) > 0 && (
                  <Badge
                    count={getConditionCount(IncidentFormField.Police)}
                    style={{ marginLeft: 12 }}
                    title={intl.formatMessage(
                      {
                        defaultMessage: '{count} condition(s) active',
                      },
                      { count: getConditionCount(IncidentFormField.Police) }
                    )}
                  />
                )}
              </div>
            </Col>
            <Col>
              <Button
                className="cancelDrag"
                icon={<FontAwesomeIcon icon={faFilter} />}
                onClick={() => {
                  setSelectedModule(IncidentFormField.Police);
                  setConditionsModalOpen(true);
                }}
                size="small"
                type={
                  getConditionCount(IncidentFormField.Police) > 0
                    ? 'primary'
                    : 'default'
                }
              >
                Conditions
              </Button>
            </Col>
            <Col>
              <Switch
                checked={incidentFormFields.POLICE}
                checkedChildren="On"
                className="cancelDrag"
                onChange={() => {
                  toggleField(IncidentFormField.Police);
                }}
                unCheckedChildren="Off"
              />
            </Col>
          </Row>
        </Card>
      </div>
    ),
    profiles: (
      <div
        key="profiles"
        style={{
          cursor: 'move',
        }}
      >
        <Card
          style={{
            border: incidentFormFields.OFFENDERS
              ? '1px solid #1890ff'
              : '1px solid #d9d9d9',
            marginBottom: 0,
            opacity: incidentFormFields.OFFENDERS ? 1 : 0.7,
            transition: 'all 0.3s ease',
          }}
        >
          <Row align="middle" gutter={8}>
            <Col span={1}>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Drag to reorder',
                })}
              >
                <FontAwesomeIcon
                  icon={faGripVertical}
                  size="lg"
                  style={{ color: '#8c8c8c', cursor: 'grab' }}
                />
              </Tooltip>
            </Col>
            <Col flex={1}>
              <div>
                <FormattedMessage defaultMessage="Profiles" />
                {getConditionCount(IncidentFormField.Offenders) > 0 && (
                  <Badge
                    count={getConditionCount(IncidentFormField.Offenders)}
                    style={{ marginLeft: 12 }}
                    title={intl.formatMessage(
                      {
                        defaultMessage: '{count} condition(s) active',
                      },
                      { count: getConditionCount(IncidentFormField.Offenders) }
                    )}
                  />
                )}
              </div>
            </Col>
            <Col>
              <Button
                className="cancelDrag"
                icon={<FontAwesomeIcon icon={faFilter} />}
                onClick={() => {
                  setSelectedModule(IncidentFormField.Offenders);
                  setConditionsModalOpen(true);
                }}
                size="small"
                type={
                  getConditionCount(IncidentFormField.Offenders) > 0
                    ? 'primary'
                    : 'default'
                }
              >
                Conditions
              </Button>
            </Col>
            <Col>
              <Switch
                checked={incidentFormFields.OFFENDERS}
                checkedChildren="On"
                className="cancelDrag"
                onChange={() => {
                  toggleField(IncidentFormField.Offenders);
                }}
                unCheckedChildren="Off"
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 8 }}>
            {/* TODO Put back when native form is updated */}
            {/* <Row> */}
            {/*  <Col flex={1}> */}
            {/*    <FormattedMessage defaultMessage="Vehicles" id="r6wuJ3" /> */}
            {/*  </Col> */}
            {/*  <Col> */}
            {/*    <Tooltip */}
            {/*      title={intl.formatMessage({ */}
            {/*        defaultMessage: 'Hide/Show field on form', */}
            {/*        id: '+AMnGS', */}
            {/*      })} */}
            {/*    > */}
            {/*      <Checkbox */}
            {/*        checked={incidentFormFields.VEHICLES} */}
            {/*        onChange={() => { */}
            {/*          toggleField(IncidentFormField.Vehicles); */}
            {/*        }} */}
            {/*      /> */}
            {/*    </Tooltip> */}
            {/*  </Col> */}
            {/* </Row> */}
            <Col span={1} />
            <Col flex={1}>
              <Typography.Text>Witnesses</Typography.Text>
            </Col>
            <Col>
              <Switch
                checked={incidentFormFields.WITNESSES}
                className="cancelDrag"
                onChange={() => {
                  toggleField(IncidentFormField.Witnesses);
                }}
                size="small"
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 8 }}>
            <Col span={1} />
            <Col flex={1}>
              <Typography.Text>Victims</Typography.Text>
            </Col>
            <Col>
              <Switch
                checked={incidentFormFields.VICTIMS}
                className="cancelDrag"
                onChange={() => {
                  toggleField(IncidentFormField.Victims);
                }}
                size="small"
              />
            </Col>
          </Row>
        </Card>
      </div>
    ),
    tags: (
      <div
        key="tags"
        style={{
          cursor: 'move',
        }}
      >
        <Card
          style={{
            border: '1px solid #1890ff',
            marginBottom: 0,
            opacity: 1,
            transition: 'all 0.3s ease',
          }}
        >
          <Row align="middle" gutter={8}>
            <Col span={1}>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Drag to reorder',
                })}
              >
                <FontAwesomeIcon
                  icon={faGripVertical}
                  size="lg"
                  style={{ color: '#8c8c8c', cursor: 'grab' }}
                />
              </Tooltip>
            </Col>
            <Col flex={1}>
              <div>
                <FormattedMessage defaultMessage="Tags" />
                <Tag color="red" style={{ marginLeft: 8 }}>
                  <FormattedMessage defaultMessage="Required" />
                </Tag>
              </div>
            </Col>
            <Col>
              <Typography.Text type="secondary">
                <FormattedMessage defaultMessage="Always enabled" />
              </Typography.Text>
            </Col>
          </Row>
          <Row style={{ marginTop: 12 }}>
            <Col span={1} />
            <Col flex={1}>
              <Typography.Text>Impact</Typography.Text>
            </Col>
            <Col>
              <Switch
                checked={incidentFormFields.IMPACT}
                className="cancelDrag"
                onChange={() => {
                  toggleField(IncidentFormField.Impact);
                }}
                size="small"
              />
            </Col>
          </Row>
          <Row align="middle" style={{ marginTop: 8 }}>
            <Col span={1} />
            <Col flex={1}>
              <Typography.Text>Involved</Typography.Text>
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Single selection mode',
                })}
              >
                <Switch
                  checked={involvedMode}
                  checkedChildren="Single"
                  className="cancelDrag"
                  disabled={!incidentFormFields.INVOLVED}
                  onChange={(checked) => {
                    toggleInvolvedMode(checked);
                  }}
                  size="small"
                  style={{ width: 70 }}
                  unCheckedChildren="Multi"
                />
              </Tooltip>
            </Col>
            <Col style={{ marginLeft: 8 }}>
              <Switch
                checked={incidentFormFields.INVOLVED}
                className="cancelDrag"
                onChange={() => {
                  toggleField(IncidentFormField.Involved);
                }}
                size="small"
              />
            </Col>
          </Row>
        </Card>
      </div>
    ),
    when: (
      <div
        key="when"
        style={{
          cursor: 'move',
        }}
      >
        <Card
          style={{
            border: incidentFormFields.WHERE
              ? '1px solid #1890ff'
              : '1px solid #d9d9d9',
            marginBottom: 0,
            opacity: incidentFormFields.WHERE ? 1 : 0.7,
            transition: 'all 0.3s ease',
          }}
        >
          <Row align="middle" gutter={8}>
            <Col span={1}>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Drag to reorder',
                })}
              >
                <FontAwesomeIcon
                  icon={faGripVertical}
                  size="lg"
                  style={{ color: '#8c8c8c', cursor: 'grab' }}
                />
              </Tooltip>
            </Col>
            <Col flex={1}>
              <FormattedMessage defaultMessage="When/Where" />
              {getConditionCount(IncidentFormField.Where) > 0 && (
                <Badge
                  count={getConditionCount(IncidentFormField.Where)}
                  style={{ marginLeft: 12 }}
                  title={intl.formatMessage(
                    {
                      defaultMessage: '{count} condition(s) active',
                    },
                    { count: getConditionCount(IncidentFormField.Where) }
                  )}
                />
              )}
            </Col>
            <Col>
              <Button
                className="cancelDrag"
                icon={<FontAwesomeIcon icon={faFilter} />}
                onClick={() => {
                  setSelectedModule(IncidentFormField.Where);
                  setConditionsModalOpen(true);
                }}
                size="small"
                type={
                  getConditionCount(IncidentFormField.Where) > 0
                    ? 'primary'
                    : 'default'
                }
              >
                Conditions
              </Button>
            </Col>
            <Col>
              <Switch
                checked={incidentFormFields.WHERE}
                checkedChildren="On"
                className="cancelDrag"
                onChange={() => {
                  toggleField(IncidentFormField.Where);
                }}
                unCheckedChildren="Off"
              />
            </Col>
          </Row>
        </Card>
      </div>
    ),
  };

  const incidentFormFormatted = useMemo(
    () =>
      incidentFormLayout.map(
        (component) => incidentFormElements[component.i as FieldLayout]
      ),
    [
      incidentFormLayout,
      incidentFormFields,
      involvedMode,
      fieldTitles,
      draftState,
      showDamagedQuantity,
      data,
      showDraft,
      loading,
    ]
  );

  const qElements = useMemo(
    () =>
      questionsLayout.map((layout) => {
        const found = tagqs?.find((tagq) => tagq.i === layout.i);
        const findDepQ = tagqs?.find(
          (tagq) => tagq.qId === found?.dependOn?.questionId
        );

        const message = `${layout.y + 1}. ${found?.question || ''}`;
        return (
          <div
            key={layout.i}
            style={{
              cursor: 'grab',
            }}
          >
            <Row
              style={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <Col
                flex={1}
                style={{
                  width: '60%',
                }}
              >
                <FontAwesomeIcon icon={faBars} style={{ marginRight: 10 }} />
                <Typography.Text
                  ellipsis={{ tooltip: message }}
                  style={{ maxWidth: '90%' }}
                >
                  {message}
                </Typography.Text>
                {found?.required && (
                  <Typography.Text
                    style={{
                      color: '#ff0000',
                      marginLeft: 5,
                    }}
                  >
                    *
                  </Typography.Text>
                )}
              </Col>

              {findDepQ && (
                <Col>
                  <Tooltip title={findDepQ.question}>
                    <Typography.Text
                      style={{
                        color: '#1890ff',
                        height: '100%',
                        marginRight: 10,
                      }}
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Dependent',
                      })}
                    </Typography.Text>
                  </Tooltip>
                </Col>
              )}
              <Col>
                <Tooltip
                  title={intl.formatMessage({
                    defaultMessage: 'Edit Question',
                  })}
                >
                  <Button
                    className="cancelDrag"
                    icon={<FontAwesomeIcon icon={faPenToSquare} />}
                    onClick={() => {
                      setSelectedQuestion(found?.qId || '');
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
                    className="cancelDrag"
                    icon={<FontAwesomeIcon icon={faTrash} />}
                    onClick={() => {
                      deleteQuestion(layout.i);
                    }}
                    size="small"
                  />
                </Tooltip>
              </Col>
            </Row>
          </div>
        );
      }),
    [questionsLayout, tagqs, intl, setSelectedQuestion, deleteQuestion]
  );

  return (
    <div className="page-view">
      <PageHeader
        extra={[
          <Button
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            key="3"
            onClick={() => toggleAddQuestion()}
          >
            <FormattedMessage defaultMessage="Add question" />
          </Button>,
          <Button
            disabled={saving}
            icon={
              <FontAwesomeIcon
                icon={faPenToSquare}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            key="2"
            onClick={() => setEditIncidentType(data?.tag.id || '')}
          >
            {intl.formatMessage({
              defaultMessage: 'Edit Crime Type',
            })}
          </Button>,
          <Button
            disabled={saving}
            icon={
              <FontAwesomeIcon
                icon={faTrash}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            key="1"
            onClick={() => deleteConfirm(data?.tag.id || '')}
            type="primary"
          >
            {intl.formatMessage({
              defaultMessage: 'Delete Crime Type',
            })}
          </Button>,
        ]}
        onBack={() => window.history.back()}
        title={data?.tag?.name || ''}
      />
      <Row gutter={[8, 8]}>
        <Col span={16}>
          <Card loading={loading}>
            <FormattedMessage defaultMessage="Parent Tag:" />
            <Select
              onSelect={(value) => {
                setParentTag(value);
              }}
              options={data?.listTags.tags
                .map((tag) => ({
                  label: tag.name,
                  value: tag.id,
                }))
                .filter((tag) => tag.value !== data?.tag?.id)}
              style={{ marginTop: 5, width: '100%' }}
              value={parentTag}
            />
          </Card>
          <Card
            loading={loading}
            style={{
              minHeight: 370,
            }}
          >
            <Row>
              <Col flex={1}>
                <FormattedMessage defaultMessage="Custom Questions" />
                {questionLayoutChanged && (
                  <Tag color="orange" style={{ marginLeft: 8 }}>
                    <FormattedMessage defaultMessage="Unsaved changes" />
                  </Tag>
                )}
              </Col>
            </Row>
            <Row>
              <Col flex={1}>
                <ReactGridLayout
                  autoSize
                  cols={1}
                  draggableCancel=".cancelDrag"
                  isBounded
                  isDraggable
                  isResizable={false}
                  layout={questionsLayout}
                  margin={margin}
                  onLayoutChange={(newLayout) => {
                    setQuestionsLayout(newLayout);
                    // Only mark as changed if user actually moved something
                    const hasActualChange = newLayout.some(
                      (item, index) =>
                        item.y !== questionsLayout[index]?.y ||
                        item.x !== questionsLayout[index]?.x
                    );
                    if (hasActualChange && !questionLayoutChanged) {
                      setQuestionLayoutChanged(true);
                    }
                  }}
                  rowHeight={rowHeight}
                  width={20}
                >
                  {qElements}
                </ReactGridLayout>
              </Col>
            </Row>
          </Card>
          <Card
            loading={loading}
            style={{
              marginBottom: 20,
              minHeight: 370,
            }}
          >
            <Row>
              <Col flex={1}>
                <FormattedMessage defaultMessage="Custom Incident Form" />
                {incidentFormLayoutChanged && (
                  <Tag color="orange" style={{ marginLeft: 8 }}>
                    <FormattedMessage defaultMessage="Unsaved changes" />
                  </Tag>
                )}
              </Col>
            </Row>
            <Col flex={1}>
              <ReactGridLayout
                autoSize
                cols={1}
                draggableCancel=".cancelDrag"
                isBounded
                isDraggable
                isResizable={false}
                layout={incidentFormLayout}
                margin={[0, 8]}
                onLayoutChange={(newLayout) => {
                  setIncidentFormLayout(newLayout);
                  if (!incidentFormLayoutChanged)
                    setIncidentFormLayoutChanged(true);
                }}
                rowHeight={30}
                width={20}
              >
                {incidentFormFormatted}
              </ReactGridLayout>
            </Col>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            loading={loading}
            style={{
              minHeight: 500,
            }}
          >
            <FormattedMessage defaultMessage="Tag hierarchy" />
            <BuildTree
              InitData={
                data?.listTags.tags.map((tag) => ({
                  id: tag.id,
                  name: tag.name,
                  parentId: tag.parentTag?.id || null,
                })) || []
              }
              updateTagParent={updateTagParent}
            />
          </Card>
        </Col>
      </Row>
      <Drawer
        onClose={toggleAddQuestion}
        open={addQuestion}
        title={intl.formatMessage({
          defaultMessage: 'Add/Create Question',
        })}
        width={800}
      >
        {addQuestion ? (
          <AddQuestionContainer
            onClose={() => toggleAddQuestion()}
            tagQuestions={tagQsFormatted || []}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setSelectedQuestion(null)}
        open={!!selectedQuestion}
        title={intl.formatMessage({
          defaultMessage: 'Add/Create Question',
        })}
        width={800}
      >
        {selectedQuestion ? (
          <UpdateQuestionContainer
            dependent={findDep() || undefined}
            onClose={() => setSelectedQuestion(null)}
            questionId={selectedQuestion}
            required={
              !!tagqs?.find((tagq) => tagq.qId === selectedQuestion)?.required
            }
            tagQId={
              tagqs?.find((tagq) => tagq.qId === selectedQuestion)?.i || ''
            }
            tagQuestions={tagQsFormatted || []}
            updateQuestionOnTag={updateQuestionOnTag}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setEditIncidentType('')}
        open={!!editIncidentType}
        title={intl.formatMessage({
          defaultMessage: 'Edit Incident Type',
        })}
        width="400"
      >
        {editIncidentType && (
          <EditCrimeType
            incidentId={editIncidentType}
            onClose={() => setEditIncidentType('')}
          />
        )}
      </Drawer>
      {selectedModule && (
        <ModuleConditionsModal
          availableBusinessGroups={availableBusinessGroups}
          availableQuestions={
            data?.tag?.tagQuestions?.map((tq) => ({
              answerType: tq.question.type,
              id: tq.question.id,
              options: tq.question.optionsFormatted?.map((opt) => ({
                label: opt,
                value: opt,
              })),
              question: tq.question.questionFormatted,
            })) || []
          }
          availableRoles={availableRoles}
          currentConditions={currentModuleConditions}
          moduleType={selectedModule}
          onClose={() => {
            setConditionsModalOpen(false);
            setSelectedModule(null);
          }}
          onSave={saveModuleConditions}
          open={conditionsModalOpen}
        />
      )}

      {/* Floating Save Bar */}
      {(incidentFormLayoutChanged || questionLayoutChanged) && (
        <Card
          bodyStyle={{
            alignItems: 'center',
            display: 'flex',
            gap: 16,
            padding: '8px',
          }}
          style={{
            bottom: 24,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            padding: '8px 16px',
            position: 'fixed',
            right: 24,
            zIndex: 1000,
          }}
        >
          <Typography.Text strong>
            <FormattedMessage defaultMessage="You have unsaved changes" />
          </Typography.Text>
          <Button loading={saving} onClick={saveAllChanges} type="primary">
            <FormattedMessage defaultMessage="Save All Changes" />
          </Button>
        </Card>
      )}
    </div>
  );
};

export default ViewTag;
