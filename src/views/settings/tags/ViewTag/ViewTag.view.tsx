/* eslint-disable @typescript-eslint/no-unsafe-member-access,formatjs/no-literal-string-in-jsx,@typescript-eslint/no-unsafe-assignment */
import type { ExtendedLayout } from '#/views/reports/types';
import type { ViewTagQuery } from '#/views/settings/tags/ViewTag/graphql/__generated__/view-tag.generated';
import type { Dispatch, SetStateAction } from 'react';

import { margin, rowHeight } from '#/components/reports/utils/utils';
import {
  faBars,
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Drawer,
  Input,
  PageHeader,
  Row,
  Select,
  Tooltip,
  Typography,
} from 'antd';
import EditCrimeType from 'components/form-components/tags/crimeTypes/EditCrimeType';
import { IncidentFormField } from 'graphql/types';
import React, { useMemo } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { FormattedMessage, useIntl } from 'react-intl';

import type {
  Elements,
  FieldLayout,
  IncidentFormFieldState,
} from './useViewTag';

import AddQuestionContainer from '../../../../components/form-components/addQuestion/AddQuestion.container';
import UpdateQuestionContainer from '../../../../components/form-components/update-question-on-tag/UpdateQuestion.container';
import BuildTree from '../../../../utils/tags/tree-helper';

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
  data: ViewTagQuery | undefined;
  deleteConfirm: (value: string) => void;
  deleteQuestion: (questionId: string) => void;
  draftState: {
    draftButton: string;
    draftDescription: string;
    draftTitle: string;
  };
  editIncidentType: string;
  incidentFormFields: IncidentFormFieldState;
  incidentFormLayout: ExtendedLayout[];
  incidentFormLayoutChanged: boolean;
  loading: boolean;
  parentTag: null | string | undefined;
  questionLayoutChanged: boolean;
  questionsLayout: ExtendedLayout[];
  saveIncidentForm: () => void;
  saveQOrder: () => void;
  saving: boolean;
  selectedQuestion: null | string;
  setDraftState: Dispatch<
    SetStateAction<{
      draftButton: string;
      draftDescription: string;
      draftTitle: string;
    }>
  >;
  setEditIncidentType: (value: string) => void;
  setIncidentFormLayout: (value: ExtendedLayout[]) => void;
  setIncidentFormLayoutChanged: (value: boolean) => void;
  setParentTag: (value: string) => void;
  setQuestionLayoutChanged: (value: boolean) => void;
  setQuestionsLayout: (value: ExtendedLayout[]) => void;
  setSelectedQuestion: (value: null | string) => void;
  showDraft: boolean;
  toggleAddQuestion: () => void;
  toggleField: (field: IncidentFormField) => void;
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
  data,
  deleteConfirm,
  deleteQuestion,
  draftState,
  editIncidentType,
  incidentFormFields,
  incidentFormLayout,
  incidentFormLayoutChanged,
  loading,
  parentTag,
  questionLayoutChanged,
  questionsLayout,
  saveIncidentForm,
  saveQOrder,
  saving,
  selectedQuestion,
  setDraftState,
  setEditIncidentType,
  setIncidentFormLayout,
  setIncidentFormLayoutChanged,
  setParentTag,
  setQuestionLayoutChanged,
  setQuestionsLayout,
  setSelectedQuestion,
  showDraft,
  toggleAddQuestion,
  toggleField,
  updateQuestionOnTag,
  updateTagParent,
}: Props): JSX.Element => {
  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);
  const intl = useIntl();

  const tagqs = data?.tag?.tagQuestions?.map((tagq) => ({
    dependOn: tagq.dependentQuestions[0],
    i: tagq.id,
    qId: tagq.question.id,
    question: tagq.question.questionFormatted,
    required: tagq.req,
    type: tagq.question.type,
  }));

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
      return {
        dependentAnswer,
        dependentOn,
      };
    }
    return null;
  };

  const incidentFormElements: Elements = {
    cctv: (
      <div
        key="cctv"
        style={{
          cursor: 'grab',
        }}
      >
        <Card
          style={{ marginBottom: 0, outline: '1px solid #ccc' }}
          title={<FormattedMessage defaultMessage="CCTV" />}
        >
          {/* <FromFieldsConfig />*/}
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="CCTV" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Hide/Show field on form',
                })}
              >
                <Checkbox
                  checked={incidentFormFields.CCTV}
                  onChange={() => {
                    toggleField(IncidentFormField.Cctv);
                  }}
                />
              </Tooltip>
            </Col>
          </Row>
        </Card>
      </div>
    ),
    custom: (
      <div
        key="custom"
        style={{
          cursor: 'grab',
        }}
      >
        <Card
          style={{ marginBottom: 0, outline: '1px solid #ccc' }}
          title={<FormattedMessage defaultMessage="Custom" />}
        >
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Custom" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Hide/Show field on form',
                })}
              >
                <Checkbox
                  checked={incidentFormFields.CUSTOM}
                  onChange={() => {
                    toggleField(IncidentFormField.Custom);
                  }}
                />
              </Tooltip>
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
            cursor: 'grab',
          }}
        >
          <Card
            style={{ marginBottom: 0, outline: '1px solid #ccc' }}
            title={<FormattedMessage defaultMessage="Save as draft" />}
          >
            <Row gutter={[16, 16]}>
              <Col flex={1}>
                <FormattedMessage defaultMessage="Draft" />
              </Col>
              <Col>
                <Tooltip
                  title={intl.formatMessage({
                    defaultMessage: 'Hide/Show field on form',
                  })}
                >
                  <Checkbox
                    checked={incidentFormFields.DRAFT}
                    onChange={() => {
                      toggleField(IncidentFormField.Draft);
                    }}
                  />
                </Tooltip>
              </Col>

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
          cursor: 'grab',
        }}
      >
        <Card
          style={{ marginBottom: 0, outline: '1px solid #ccc' }}
          title={<FormattedMessage defaultMessage="Goods" />}
        >
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Goods" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Hide/Show field on form',
                })}
              >
                <Checkbox
                  checked={incidentFormFields.GOODS}
                  onChange={() => {
                    toggleField(IncidentFormField.Goods);
                  }}
                />
              </Tooltip>
            </Col>
          </Row>
        </Card>
      </div>
    ),
    groups: (
      <div
        key="groups"
        style={{
          cursor: 'grab',
        }}
      >
        <Card
          style={{ marginBottom: 0, outline: '1px solid #ccc' }}
          title={<FormattedMessage defaultMessage="Groups" />}
        >
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Groups" />
            </Col>
            <Col>
              <Checkbox
                checked={incidentFormFields.GROUPS}
                onChange={() => toggleField(IncidentFormField.Groups)}
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
          cursor: 'grab',
        }}
      >
        <Card
          style={{ marginBottom: 0, outline: '1px solid #ccc' }}
          title={<FormattedMessage defaultMessage="Images" />}
        >
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Images" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Hide/Show field on form',
                })}
              >
                <Checkbox
                  checked={incidentFormFields.IMAGES}
                  onChange={() => {
                    toggleField(IncidentFormField.Images);
                  }}
                />
              </Tooltip>
            </Col>
          </Row>
        </Card>
      </div>
    ),
    police: (
      <div
        key="police"
        style={{
          cursor: 'grab',
        }}
      >
        <Card
          style={{ marginBottom: 0, outline: '1px solid #ccc' }}
          title={<FormattedMessage defaultMessage="Details/Police" />}
        >
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Police" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Hide/Show field on form',
                })}
              >
                <Checkbox
                  checked={incidentFormFields.POLICE}
                  onChange={() => {
                    toggleField(IncidentFormField.Police);
                  }}
                />
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Details" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Is required',
                })}
              >
                <Checkbox checked={incidentFormFields.DETAILS} disabled />
              </Tooltip>
            </Col>
          </Row>
        </Card>
      </div>
    ),
    profiles: (
      <div
        key="profiles"
        style={{
          cursor: 'grab',
        }}
      >
        <Card
          style={{ marginBottom: 0, outline: '1px solid #ccc' }}
          title={<FormattedMessage defaultMessage="Profiles" />}
        >
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Offenders" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Hide/Show field on form',
                })}
              >
                <Checkbox
                  checked={incidentFormFields.OFFENDERS}
                  onChange={() => {
                    toggleField(IncidentFormField.Offenders);
                  }}
                />
              </Tooltip>
            </Col>
          </Row>
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
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Witnesses" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Hide/Show field on form',
                })}
              >
                <Checkbox
                  checked={incidentFormFields.WITNESSES}
                  onChange={() => {
                    toggleField(IncidentFormField.Witnesses);
                  }}
                />
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Victims" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Hide/Show field on form',
                })}
              >
                <Checkbox
                  checked={incidentFormFields.VICTIMS}
                  onChange={() => {
                    toggleField(IncidentFormField.Victims);
                  }}
                />
              </Tooltip>
            </Col>
          </Row>
        </Card>
      </div>
    ),
    tags: (
      <div
        key="tags"
        style={{
          cursor: 'grab',
        }}
      >
        <Card
          style={{ marginBottom: 0, outline: '1px solid #ccc' }}
          title={<FormattedMessage defaultMessage="Tags" />}
        >
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Tags" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Is required',
                })}
              >
                <Checkbox checked={incidentFormFields.TYPES} disabled />
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Impact" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Hide/Show field on form',
                })}
              >
                <Checkbox
                  checked={incidentFormFields.IMPACT}
                  onChange={() => {
                    toggleField(IncidentFormField.Impact);
                  }}
                />
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Involved" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Hide/Show field on form',
                })}
              >
                <Checkbox
                  checked={incidentFormFields.INVOLVED}
                  onChange={() => {
                    toggleField(IncidentFormField.Involved);
                  }}
                />
              </Tooltip>
            </Col>
          </Row>
        </Card>
      </div>
    ),
    when: (
      <div
        key="when"
        style={{
          cursor: 'grab',
        }}
      >
        <Card
          style={{ marginBottom: 0, outline: '1px solid #ccc' }}
          title={<FormattedMessage defaultMessage="When/Where" />}
        >
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="When/Where" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Hide/Show field on form',
                })}
              >
                <Checkbox
                  checked={incidentFormFields.WHERE}
                  onChange={() => {
                    toggleField(IncidentFormField.Where);
                  }}
                />
              </Tooltip>
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
    [incidentFormLayout, incidentFormFields]
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
    [questionsLayout, tagqs]
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
              </Col>
              <Col>
                {questionLayoutChanged && (
                  <Button onClick={() => saveQOrder()} type="primary">
                    <FormattedMessage defaultMessage="Save Order" />
                  </Button>
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
                    if (!questionLayoutChanged) setQuestionLayoutChanged(true);
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
              </Col>
              <Col>
                {incidentFormLayoutChanged && (
                  <Button onClick={() => saveIncidentForm()} type="primary">
                    <FormattedMessage defaultMessage="Save Order" />
                  </Button>
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
                margin={margin}
                onLayoutChange={(newLayout) => {
                  setIncidentFormLayout(newLayout);
                  if (!incidentFormLayoutChanged)
                    setIncidentFormLayoutChanged(true);
                }}
                rowHeight={rowHeight}
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
    </div>
  );
};

export default ViewTag;
