import type { ActiveChecklistQuery } from '#/views/checklist/graphql/queries/__generated__/view-active-checklist.generated';
import type { FormInstance } from 'antd';

import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import FormattedMessageFixed from '#/components/util-components/FormattedMessageFixed';
import { getCustomUrls } from '#/providers/GetCustomUrls';
import MediaUrlUploader from '#/views/checklist/active-checklist/media-component';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { faFileUpload } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Badge,
  Button,
  Card,
  Col,
  Collapse,
  Form,
  Input,
  PageHeader,
  Progress,
  Radio,
  Row,
  Select,
  Space,
  Tabs,
  Typography,
  Upload,
} from 'antd';
import FONT_FAMILIES from 'components/onboarding/Onboarding/SchemeTerms/utils/Fonts';
import {
  ChecklistStatus,
  PermissionMethod,
  PermissionModel,
} from 'graphql/types';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import SignatureInput from '../../../components/SignBox';
import SigSeal from '../../../components/onboarding/Onboarding/SchemeTerms/SigSeal';
import { useStoreState } from '../../../state';
import CompletedChecklistView from '../completed-checklist/CompletedChecklist.view';
import { adjustDependentThreshold } from '../utils/adjustDependentThreshold';
import useStyles from './ActiveChecklist.styles';
import {
  type ActiveChecklistSection,
  type FormData,
} from './useActiveChecklist';

type SaveStatus = 'error' | 'idle' | 'saved' | 'saving';

interface CompletionStats {
  answeredQuestions: number;
  completionPercentage: number;
  sectionCompletion: Map<
    number,
    { answered: number; percentage: number; total: number }
  >;
  totalQuestions: number;
}

interface Props {
  activeKeys: string[];
  completionStats: CompletionStats;
  data: ActiveChecklistQuery | undefined;
  file: { file: string; name: string } | null;
  form: FormInstance<FormData>;
  id: string | undefined;
  loading: boolean;
  name: string;
  onFinish: (data: FormData) => void;
  saveDraft: () => void;
  saveStatus: SaveStatus;
  sections: ActiveChecklistSection[];
  selectedBusinessId: null | string;
  selectedFont: string;
  setActiveKeys: (keys: string[]) => void;
  setFile: (value: { file: string; name: string } | null) => void;
  setSelectedBusinessId: (value: null | string) => void;
  setSelectedFont: (value: string) => void;
  setSign: (value: string) => void;
  setTab: (value: string) => void;
  sign: string;
  submitting: boolean;
  tab: string;
  update: (value: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
const normFile = (e: { fileList: never | never[] }) => {
  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const ActiveChecklistView = ({
  activeKeys,
  completionStats,
  data,
  file,
  form,
  id,
  loading,
  name: userName,
  onFinish,
  saveDraft,
  saveStatus,
  sections,
  selectedBusinessId,
  selectedFont,
  setActiveKeys,
  setFile,
  setSelectedBusinessId,
  setSelectedFont,
  setSign,
  setTab,
  sign,
  submitting,
  tab,
  update,
}: Props) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const classes = useStyles();
  const theme = useStoreState((state) => state.theme.currentTheme);
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get('edit') === 'true';
  const schemeRequired = !!data?.activeChecklist.scheme?.checklistRequired;
  const watching = Form.useWatch('sections', form);

  // Render save status indicator
  const renderSaveStatus = () => {
    if (saveStatus === 'idle') return null;

    const statusConfig = {
      error: {
        className: classes.saveIndicatorError,
        icon: <CloseCircleOutlined />,
        text: intl.formatMessage({ defaultMessage: 'Save failed' }),
      },
      saved: {
        className: classes.saveIndicatorSaved,
        icon: <CheckCircleOutlined />,
        text: intl.formatMessage({ defaultMessage: 'Saved' }),
      },
      saving: {
        className: classes.saveIndicatorSaving,
        icon: <LoadingOutlined spin />,
        text: intl.formatMessage({ defaultMessage: 'Saving...' }),
      },
    };

    const config = statusConfig[saveStatus];

    return (
      <div className={`${classes.saveIndicator} ${config.className}`}>
        {config.icon}
        {config.text}
      </div>
    );
  };

  localStorage.setItem(
    'data',
    JSON.stringify({
      additionalInfo: data?.activeChecklist.comments || '',
      checklistSections: sections,
      completedAt: data?.activeChecklist.completedAt
        ? new Date(data?.activeChecklist.completedAt).toLocaleDateString(
            'en-GB'
          )
        : '',
      completedByUser: data?.activeChecklist.completedBy?.origName || '',
      logo: data?.activeChecklist.scheme?.logo?.urlPersisted || '',
      signature: data?.activeChecklist.signature || '',
      storeName: data?.activeChecklist.business?.name || '',
      title: data?.activeChecklist.name || '',
    })
  );
  if (
    data &&
    data?.activeChecklist.status === ChecklistStatus.Completed &&
    !isEditMode
  ) {
    return (
      <CompletedChecklistView
        additionalInfo={data?.activeChecklist.comments || ''}
        checklistId={id}
        checklistSections={sections}
        completedAt={
          data.activeChecklist?.completedAt
            ? new Date(
                data?.activeChecklist?.completedAt || ''
              ).toLocaleDateString('en-GB')
            : ''
        }
        completedByUser={data?.activeChecklist?.completedBy?.origName || ''}
        logo={data?.activeChecklist.scheme?.logo?.urlPersisted || ''}
        onBack={() => navigate('/app/checklists')}
        reference={data?.activeChecklist.reference}
        signature={data?.activeChecklist.signature || ''}
        storeName={data?.activeChecklist.business?.name || ''}
        theme={theme}
        title={data?.activeChecklist.name || ''}
      />
    );
  }
  const { checklistUpload } = getCustomUrls();
  return (
    <div className="page-view">
      <PageHeader
        onBack={() => navigate('/app/checklists')}
        subTitle={
          data?.activeChecklist.reference
            ? intl.formatMessage(
                { defaultMessage: 'Alert ID: {reference}' },
                { reference: data.activeChecklist.reference }
              )
            : undefined
        }
        title={
          data?.activeChecklist.name ||
          intl.formatMessage({
            defaultMessage: 'Checklist',
          })
        }
      />
      {/* Edit Mode Indicator */}
      {isEditMode &&
        data?.activeChecklist.status === ChecklistStatus.Completed && (
          <div
            style={{
              backgroundColor: '#fff7e6',
              border: '1px solid #ffd591',
              borderRadius: 4,
              marginBottom: 16,
              padding: 12,
            }}
          >
            <Typography.Text strong style={{ color: '#fa8c16' }}>
              {intl.formatMessage({
                defaultMessage:
                  'Editing Completed Checklist - Changes will preserve original signature and completion date',
              })}
            </Typography.Text>
          </div>
        )}

      {/* Store Selector - Edit Mode */}
      {isEditMode && (
        <PermissionCheckWrapper
          permission={{
            method: PermissionMethod.Edit,
            model: PermissionModel.Checklist,
          }}
        >
          <Card style={{ marginBottom: 16 }}>
            <Form.Item
              help={intl.formatMessage({
                defaultMessage:
                  'Changes will be saved when you submit the checklist',
              })}
              label={intl.formatMessage({ defaultMessage: 'Store' })}
            >
              <BusinessesSelect
                allowClear
                onChange={(ids) => setSelectedBusinessId(ids[0] || null)}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Select a store (optional)',
                })}
                style={{ maxWidth: 500, width: '100%' }}
                value={selectedBusinessId ? [selectedBusinessId] : undefined}
              />
            </Form.Item>
          </Card>
        </PermissionCheckWrapper>
      )}

      {/* Save Status Indicator */}
      {renderSaveStatus()}

      {/* Progress Bar */}
      {!loading && completionStats.totalQuestions > 0 && (
        <div className={classes.progressContainer}>
          <Progress
            className={classes.progressBar}
            percent={completionStats.completionPercentage}
            status={
              completionStats.completionPercentage === 100
                ? 'success'
                : 'active'
            }
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#52c41a',
            }}
          />
          <div className={classes.progressText}>
            {intl.formatMessage(
              { defaultMessage: '{answered} of {total} questions answered' },
              {
                answered: completionStats.answeredQuestions,
                total: completionStats.totalQuestions,
              }
            )}
          </div>
        </div>
      )}

      <Form<FormData>
        autoComplete="off"
        className={classes.form}
        colon={false}
        form={form}
        layout="horizontal"
        name="checklist_form"
        onFinish={onFinish}
        preserve
      >
        {loading ? (
          <Card loading={loading} style={{ height: '100vh' }} />
        ) : (
          <Form.List name="sections">
            {(fields) => {
              const isSectionVisible = (sectionIndex: number): boolean => {
                const section = sections[sectionIndex];
                if (!section) return false;

                const depends = section.dependsOnWeight;
                if (!depends) return true;

                const dependencyIndex = Number(depends.dependsOn) - 1;
                const threshold = Number(depends.weight);

                if (!isSectionVisible(dependencyIndex)) return false;

                const dependSection = form.getFieldValue([
                  'sections',
                  dependencyIndex,
                ]) as ActiveChecklistSection | undefined;

                if (!dependSection) return false;

                const totalWeight = dependSection.subsections
                  .flatMap((sub) =>
                    sub.questions.map((q) =>
                      q.answer === 'N/A'
                        ? 0
                        : q.weights.find((w) => w.answer === q.answer)
                            ?.weight || 0
                    )
                  )
                  .reduce((a, b) => a + b, 0);

                // Adjust threshold to account for N/A answers
                const adjustedThreshold = adjustDependentThreshold(
                  dependSection,
                  threshold
                );

                return totalWeight <= adjustedThreshold;
              };

              // Filter sections and map with field info
              const collapseItems = fields
                .map(({ name }, fieldIndex) => {
                  const section = sections[fieldIndex];
                  if (!section) return null;

                  if (!isSectionVisible(fieldIndex)) return null;

                  // Get section completion status
                  const sectionStats = completionStats.sectionCompletion.get(
                    section.section
                  );
                  const isComplete =
                    sectionStats && sectionStats.percentage === 100;

                  return {
                    fieldName: name,
                    isComplete,
                    section,
                    sectionIndex: fieldIndex,
                    sectionStats,
                  };
                })
                .filter(Boolean);

              return (
                <Collapse
                  activeKey={activeKeys}
                  className={classes.collapsePanel}
                  onChange={(keys) =>
                    setActiveKeys(Array.isArray(keys) ? keys : [keys])
                  }
                >
                  {collapseItems.map(
                    (item) =>
                      item && (
                        <Collapse.Panel
                          extra={
                            <Badge
                              className={
                                item.isComplete
                                  ? classes.sectionBadgeComplete
                                  : classes.sectionBadgeIncomplete
                              }
                              count={
                                item.isComplete ? (
                                  <CheckCircleOutlined />
                                ) : (
                                  <ClockCircleOutlined />
                                )
                              }
                              showZero
                            />
                          }
                          header={
                            <span>
                              {item.section.titleLocaled}
                              <span className={classes.sectionBadge}>
                                {item.sectionStats
                                  ? intl.formatMessage(
                                      { defaultMessage: '{answered}/{total}' },
                                      {
                                        answered: item.sectionStats.answered,
                                        total: item.sectionStats.total,
                                      }
                                    )
                                  : ''}
                              </span>
                            </span>
                          }
                          key={item.sectionIndex.toString()}
                        >
                          {/* Render Subsections */}
                          <Form.List name={[item.fieldName, 'subsections']}>
                            {(subsectionsFields) => (
                              <>
                                {subsectionsFields.map(
                                  (
                                    { name: subsectionName },
                                    subsectionIndex
                                  ) => {
                                    const subsection =
                                      sections[item.sectionIndex]?.subsections[
                                        subsectionIndex
                                      ];

                                    return (
                                      <div
                                        className={classes.subsectionContainer}
                                        key={subsectionIndex}
                                      >
                                        <h3
                                          className={classes.subsectionHeader}
                                        >
                                          {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                                          {subsectionIndex + 1}.{' '}
                                          {subsection?.titleLocaled}
                                        </h3>

                                        {/* Render Questions */}
                                        <Form.List
                                          name={[subsectionName, 'questions']}
                                        >
                                          {(questionFields) => (
                                            <>
                                              {questionFields.map(
                                                (
                                                  { name: questionName },
                                                  questionIndex
                                                ) => {
                                                  const question =
                                                    subsection?.questions[
                                                      questionIndex
                                                    ];
                                                  const depend =
                                                    question?.dependent;

                                                  // Check question dependency
                                                  if (depend) {
                                                    let shouldShow = false;
                                                    if (watching.length === 0)
                                                      return null;

                                                    for (const subFields of watching) {
                                                      for (const qFields of subFields.subsections) {
                                                        for (const ques of qFields.questions) {
                                                          if (
                                                            ques.ogName ===
                                                              depend.question &&
                                                            ques.answer ===
                                                              depend.answer
                                                          ) {
                                                            shouldShow = true;
                                                          }
                                                        }
                                                      }
                                                    }

                                                    if (!shouldShow)
                                                      return null;
                                                  }

                                                  // Check if question is answered
                                                  const formValues =
                                                    form.getFieldsValue();
                                                  const answer =
                                                    formValues.sections?.[
                                                      item.sectionIndex
                                                    ]?.subsections?.[
                                                      subsectionIndex
                                                    ]?.questions?.[
                                                      questionIndex
                                                    ]?.answer;
                                                  const isAnswered =
                                                    answer &&
                                                    answer !== '' &&
                                                    answer !== null;

                                                  return (
                                                    <div
                                                      className={`${classes.questionCard} ${isAnswered ? classes.questionCardAnswered : ''}`}
                                                      key={questionIndex}
                                                    >
                                                      <h4
                                                        className={
                                                          classes.questionHeader
                                                        }
                                                      >
                                                        {question?.question.en}
                                                      </h4>

                                                      {/* Render Answer Field - Full Width */}
                                                      <Form.Item
                                                        className={
                                                          classes.answerGroup
                                                        }
                                                        name={[
                                                          questionName,
                                                          'answer',
                                                        ]}
                                                        required={
                                                          schemeRequired
                                                        }
                                                        rules={
                                                          schemeRequired
                                                            ? [
                                                                {
                                                                  message:
                                                                    intl.formatMessage(
                                                                      {
                                                                        defaultMessage:
                                                                          'This question is required',
                                                                      }
                                                                    ),
                                                                  required:
                                                                    true,
                                                                },
                                                              ]
                                                            : []
                                                        }
                                                      >
                                                        {question?.type ===
                                                        'TEXT' ? (
                                                          <Input.TextArea
                                                            autoSize={{
                                                              minRows: 4,
                                                            }}
                                                            maxLength={1000}
                                                            placeholder={intl.formatMessage(
                                                              {
                                                                defaultMessage:
                                                                  'Enter your answer here...',
                                                              }
                                                            )}
                                                            showCount
                                                          />
                                                        ) : question?.type ===
                                                          'MEDIA' ? (
                                                          <MediaUrlUploader />
                                                        ) : (
                                                          <Radio.Group
                                                            buttonStyle="solid"
                                                            optionType="button"
                                                            options={question?.availableAnswers.map(
                                                              (answer) => ({
                                                                label: (
                                                                  <FormattedMessageFixed
                                                                    defaultMessage={
                                                                      answer.answer
                                                                    }
                                                                    id={
                                                                      answer.answer
                                                                    }
                                                                  />
                                                                ),
                                                                value:
                                                                  answer.answer,
                                                              })
                                                            )}
                                                          />
                                                        )}
                                                      </Form.Item>

                                                      {/* Optional Sections - Side by Side */}
                                                      {question?.type !==
                                                        'TEXT' &&
                                                        question?.type !==
                                                          'MEDIA' && (
                                                          <Row gutter={16}>
                                                            {/* Collapsible Additional Comments */}
                                                            <Col span={12}>
                                                              <div
                                                                className={
                                                                  classes.optionalSection
                                                                }
                                                              >
                                                                <Collapse
                                                                  bordered={
                                                                    false
                                                                  }
                                                                  className={
                                                                    classes.optionalCollapse
                                                                  }
                                                                  expandIconPosition="end"
                                                                >
                                                                  <Collapse.Panel
                                                                    header={
                                                                      <span
                                                                        className={
                                                                          classes.optionalHeader
                                                                        }
                                                                      >
                                                                        {intl.formatMessage(
                                                                          {
                                                                            defaultMessage:
                                                                              '+ Add Comment (Optional)',
                                                                          }
                                                                        )}
                                                                      </span>
                                                                    }
                                                                    key="1"
                                                                  >
                                                                    <Form.Item
                                                                      name={[
                                                                        questionName,
                                                                        'additionalComments',
                                                                      ]}
                                                                    >
                                                                      <Input.TextArea
                                                                        maxLength={
                                                                          500
                                                                        }
                                                                        placeholder={intl.formatMessage(
                                                                          {
                                                                            defaultMessage:
                                                                              'Enter your comment here...',
                                                                          }
                                                                        )}
                                                                        rows={3}
                                                                        showCount
                                                                      />
                                                                    </Form.Item>
                                                                  </Collapse.Panel>
                                                                </Collapse>
                                                              </div>
                                                            </Col>

                                                            {/* Collapsible Image Upload */}
                                                            <Col span={12}>
                                                              <div
                                                                className={
                                                                  classes.optionalSection
                                                                }
                                                              >
                                                                <Collapse
                                                                  bordered={
                                                                    false
                                                                  }
                                                                  className={
                                                                    classes.optionalCollapse
                                                                  }
                                                                  expandIconPosition="end"
                                                                >
                                                                  <Collapse.Panel
                                                                    header={
                                                                      <span
                                                                        className={
                                                                          classes.optionalHeader
                                                                        }
                                                                      >
                                                                        {intl.formatMessage(
                                                                          {
                                                                            defaultMessage:
                                                                              '+ Attach Images (Optional)',
                                                                          }
                                                                        )}
                                                                      </span>
                                                                    }
                                                                    key="1"
                                                                  >
                                                                    <Form.Item
                                                                      getValueFromEvent={
                                                                        normFile
                                                                      }
                                                                      name={[
                                                                        questionName,
                                                                        'images',
                                                                      ]}
                                                                      valuePropName="fileList"
                                                                    >
                                                                      <Upload
                                                                        action={
                                                                          checklistUpload
                                                                        }
                                                                        className={
                                                                          classes.imageUpload
                                                                        }
                                                                        listType="picture-card"
                                                                      >
                                                                        <div>
                                                                          <PlusOutlined />
                                                                          <div
                                                                            style={{
                                                                              marginTop: 8,
                                                                            }}
                                                                          >
                                                                            {intl.formatMessage(
                                                                              {
                                                                                defaultMessage:
                                                                                  'Upload',
                                                                              }
                                                                            )}
                                                                          </div>
                                                                        </div>
                                                                      </Upload>
                                                                    </Form.Item>
                                                                  </Collapse.Panel>
                                                                </Collapse>
                                                              </div>
                                                            </Col>
                                                          </Row>
                                                        )}
                                                    </div>
                                                  );
                                                }
                                              )}
                                            </>
                                          )}
                                        </Form.List>
                                      </div>
                                    );
                                  }
                                )}
                              </>
                            )}
                          </Form.List>
                        </Collapse.Panel>
                      )
                  )}
                </Collapse>
              );
            }}
          </Form.List>
        )}
        <Card className={classes.signatureSection} loading={loading}>
          <h3 className={classes.signatureHeader}>
            {isEditMode &&
            data?.activeChecklist.status === ChecklistStatus.Completed
              ? intl.formatMessage({
                  defaultMessage: 'Additional Information',
                })
              : intl.formatMessage({
                  defaultMessage: 'Additional Information & Signature',
                })}
          </h3>
          <Col span={24}>
            <Col span={13}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Additional Comments:',
                })}
                name="additionalInfo"
                shouldUpdate
              >
                <Input.TextArea
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Enter your comment here...',
                  })}
                  rows={4}
                />
              </Form.Item>
            </Col>
          </Col>
          {/* Hide signature section when editing a completed checklist */}
          {!(
            isEditMode &&
            data?.activeChecklist.status === ChecklistStatus.Completed
          ) && (
            <Col span={24}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Sign here',
                })}
                rules={[
                  () => ({
                    validator() {
                      if (tab === 'generate') {
                        if (selectedFont) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('Please select a signature!')
                        );
                      }
                      if (tab === 'upload') {
                        if (file) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('Please upload a signature!')
                        );
                      }
                      if (tab === 'draw') {
                        if (sign) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Please sign!'));
                      }
                      return Promise.reject(
                        new Error('Please select/enter a signature!')
                      );
                    },
                  }),
                ]}
              >
                <div style={{ display: 'flex', width: '100%' }}>
                  <Tabs
                    activeKey={tab}
                    destroyInactiveTabPane
                    onChange={(tabKey) => {
                      setTab(tabKey);
                      if (tabKey === 'upload' && file?.file) {
                        setSign('');

                        update(
                          ReactDOMServer.renderToString(
                            <img
                              // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                              alt="file"
                              height={100}
                              src={`data:application/pdf;base64,${file?.file}`}
                              width={300}
                            />
                          )
                        );
                      }
                      if (tabKey === 'generate') {
                        setSign('');
                        update(
                          ReactDOMServer.renderToString(
                            <SigSeal
                              font={selectedFont}
                              height={100}
                              key={selectedFont}
                              name={userName}
                              width={300}
                            />
                          )
                        );
                      }
                      if (tabKey === 'draw') {
                        update('');
                      }
                    }}
                    style={{ height: 250, width: 500 }}
                    type="card"
                  >
                    <Tabs.TabPane key="generate" tab="Generate">
                      <Select
                        defaultValue={selectedFont}
                        onChange={(value) => {
                          setSelectedFont(value);
                          update(
                            ReactDOMServer.renderToString(
                              <SigSeal
                                font={selectedFont}
                                height={100}
                                key={selectedFont}
                                name={userName}
                                width={300}
                              />
                            )
                          );
                        }}
                        style={{
                          fontFamily: selectedFont,
                          marginBottom: 20,
                        }}
                      >
                        {FONT_FAMILIES.map((font) => (
                          <Select.Option
                            key={font}
                            style={{
                              fontFamily: font,
                            }}
                            value={font}
                          >
                            {userName}
                          </Select.Option>
                        ))}
                      </Select>
                      <SigSeal
                        font={selectedFont}
                        height={100}
                        key={selectedFont}
                        name={userName}
                        width={300}
                      />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="upload" tab="Upload">
                      <>
                        <Upload
                          beforeUpload={(f) => {
                            const reader = new FileReader();
                            reader.addEventListener('load', (e) => {
                              if (e.target) {
                                const base64File = e.target.result;
                                if (typeof base64File === 'string') {
                                  const base64result = base64File.split(',')[1];

                                  setFile({
                                    file: base64result,
                                    name: f.name,
                                  });
                                  update(
                                    ReactDOMServer.renderToString(
                                      <img
                                        // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                                        alt="file"
                                        height={100}
                                        src={base64File}
                                        width={300}
                                      />
                                    )
                                  );
                                }
                              }
                            });
                            reader.readAsDataURL(f);
                            // Prevent upload
                            return false;
                          }}
                          showUploadList={false}
                        >
                          <Button key="uploadButton" type="primary">
                            <FontAwesomeIcon
                              icon={faFileUpload}
                              style={{ fontSize: 16, marginRight: '10px' }}
                            />
                            {intl.formatMessage({
                              defaultMessage: 'Upload',
                            })}
                          </Button>
                        </Upload>
                        {file && (
                          <div style={{ paddingLeft: 10, paddingTop: 10 }}>
                            <img
                              // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                              alt="file"
                              height={100}
                              src={`data:application/pdf;base64,${file.file}`}
                              width={300}
                            />
                          </div>
                        )}
                      </>
                    </Tabs.TabPane>
                    <Tabs.TabPane key="draw" tab="Draw">
                      <SignatureInput
                        hidden={false}
                        onChange={(val: string) => {
                          update(val);
                          setSign(val);
                        }}
                      />
                    </Tabs.TabPane>
                  </Tabs>
                </div>
              </Form.Item>
            </Col>
          )}
        </Card>

        <Row>
          <Col flex={1} />
          <Space>
            <Col>
              <Form.Item>
                <Button
                  loading={loading || submitting}
                  onClick={() => navigate('/app/checklists')}
                >
                  {id
                    ? intl.formatMessage({
                        defaultMessage: 'Cancel',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Back',
                      })}
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button
                  loading={loading || submitting}
                  onClick={() => saveDraft()}
                  type="primary"
                >
                  {intl.formatMessage({
                    defaultMessage: 'Save Draft',
                  })}
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button
                  htmlType="submit"
                  loading={loading || submitting}
                  type="primary"
                >
                  {intl.formatMessage({
                    defaultMessage: 'Submit',
                  })}
                </Button>
              </Form.Item>
            </Col>
          </Space>
        </Row>
      </Form>
    </div>
  );
};
export default ActiveChecklistView;
