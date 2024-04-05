/* eslint-disable @typescript-eslint/no-unsafe-member-access,formatjs/no-literal-string-in-jsx,@typescript-eslint/no-unsafe-assignment */
import React, { useMemo } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Drawer,
  PageHeader,
  Row,
  Select,
  Tooltip,
  Typography,
} from 'antd';
import type { ViewTagQuery } from 'graphql/generated';
import { IncidentFormField } from 'graphql/generated';
import { FormattedMessage, useIntl } from 'react-intl';
import RGL, { WidthProvider } from 'react-grid-layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faPenToSquare,
  faPlus,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import EditCrimeType from 'components/form-components/tags/crimeTypes/EditCrimeType';
import { margin, rowHeight } from '../../../../components/reports/utils/utils';
import type { ExtendedLayout } from '../../../reports/types';
import 'react-grid-layout/css/styles.css';
import AddQuestionContainer from '../../../../components/form-components/addQuestion/AddQuestion.container';
import BuildTree from '../../../../utils/tags/tree-helper';
import type {
  Elements,
  FieldLayout,
  IncidentFormFieldState,
} from './useViewTag';
import UpdateQuestionContainer from '../../../../components/form-components/update-question-on-tag/UpdateQuestion.container';

interface Props {
  toggleAddQuestion: () => void;
  addQuestion: boolean;
  data: ViewTagQuery | undefined;
  questionsLayout: ExtendedLayout[];
  setQuestionsLayout: (value: ExtendedLayout[]) => void;
  setQuestionLayoutChanged: (value: boolean) => void;
  incidentFormLayout: ExtendedLayout[];
  setIncidentFormLayout: (value: ExtendedLayout[]) => void;
  setIncidentFormLayoutChanged: (value: boolean) => void;
  toggleField: (field: IncidentFormField) => void;
  incidentFormFields: IncidentFormFieldState;
  questionLayoutChanged: boolean;
  saveQOrder: () => void;
  parentTag: string | undefined | null;
  setParentTag: (value: string) => void;
  updateTagParent: (tagId: string, parentTagId: string | null) => void;
  deleteQuestion: (questionId: string) => void;
  incidentFormLayoutChanged: boolean;
  saveIncidentForm: () => void;
  loading: boolean;
  updateQuestionOnTag: (
    question: string,
    tagId: string,
    dependentOn?: {
      tagQuestionId: string;
      questionId: string;
      answer: string;
    }
  ) => void;
  selectedQuestion: string | null;
  setSelectedQuestion: (value: string | null) => void;
  editIncidentType: string;
  setEditIncidentType: (value: string) => void;
  deleteConfirm: (value: string) => void;
  saving: boolean;
}

const ViewTag = ({
  toggleAddQuestion,
  addQuestion,
  data,
  setQuestionsLayout,
  questionsLayout,
  setQuestionLayoutChanged,
  questionLayoutChanged,
  saveQOrder,
  parentTag,
  setParentTag,
  updateTagParent,
  deleteQuestion,
  incidentFormLayout,
  setIncidentFormLayout,
  setIncidentFormLayoutChanged,
  toggleField,
  incidentFormFields,
  incidentFormLayoutChanged,
  saveIncidentForm,
  loading,
  updateQuestionOnTag,
  selectedQuestion,
  setSelectedQuestion,
  deleteConfirm,
  editIncidentType,
  setEditIncidentType,
  saving,
}: Props): JSX.Element => {
  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);
  const intl = useIntl();

  const tagqs = data?.tag?.tagQuestions?.map((tagq) => ({
    i: tagq.id,
    question: tagq.question.questionFormatted,
    type: tagq.question.type,
    qId: tagq.question.id,
    required: tagq.req,
    dependOn: tagq.dependentQuestions[0],
  }));

  const tagQsFormatted = useMemo(
    () =>
      data?.tag?.tagQuestions
        ?.map((tag) => ({
          questionId: tag.question.id,
          tagQuestionId: tag.id,
          question: tag.question.questionFormatted,
          type: tag.question.type,
          options: tag.question.optionsFormatted || [],
        }))
        .filter((tag) => tag.questionId !== selectedQuestion) || [],
    [data, selectedQuestion]
  );

  const findDep = () => {
    const found = data?.tag?.tagQuestions?.find(
      (tagq) => tagq.question.id === selectedQuestion
    );
    if (found && found.dependentQuestions[0]) {
      const dependentOn = found.dependentQuestions[0].tagQuestionId;
      const dependentAnswer = found.dependentQuestions[0].answer;
      return {
        dependentOn,
        dependentAnswer,
      };
    }
    return null;
  };

  const incidentFormElements: Elements = {
    tags: (
      <div
        key="tags"
        style={{
          cursor: 'grab',
        }}
      >
        <Card
          style={{ marginBottom: 0, outline: '1px solid #ccc' }}
          title={<FormattedMessage defaultMessage="Tags" id="1EYCdR" />}
        >
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Tags" id="1EYCdR" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Is required',
                  id: 'kWXp6p',
                })}
              >
                <Checkbox checked={incidentFormFields.TYPES} disabled />
              </Tooltip>
            </Col>
          </Row>
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Impact" id="W2JBdp" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Hide/Show field on form',
                  id: '+AMnGS',
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
              <FormattedMessage defaultMessage="Involved" id="YSNAqY" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Hide/Show field on form',
                  id: '+AMnGS',
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
          title={<FormattedMessage defaultMessage="When/Where" id="d7OWp+" />}
        >
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="When/Where" id="d7OWp+" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Hide/Show field on form',
                  id: '+AMnGS',
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
    goods: (
      <div
        key="goods"
        style={{
          cursor: 'grab',
        }}
      >
        <Card
          style={{ marginBottom: 0, outline: '1px solid #ccc' }}
          title={<FormattedMessage defaultMessage="Goods" id="u5dS1t" />}
        >
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Goods" id="u5dS1t" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Hide/Show field on form',
                  id: '+AMnGS',
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
    profiles: (
      <div
        key="profiles"
        style={{
          cursor: 'grab',
        }}
      >
        <Card
          style={{ marginBottom: 0, outline: '1px solid #ccc' }}
          title={<FormattedMessage defaultMessage="Profiles" id="2zJXeA" />}
        >
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Offenders" id="xb54TN" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Hide/Show field on form',
                  id: '+AMnGS',
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
              <FormattedMessage defaultMessage="Witnesses" id="sjTqbX" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Hide/Show field on form',
                  id: '+AMnGS',
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
              <FormattedMessage defaultMessage="Victims" id="PAMKVQ" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Hide/Show field on form',
                  id: '+AMnGS',
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
    images: (
      <div
        key="images"
        style={{
          cursor: 'grab',
        }}
      >
        <Card
          style={{ marginBottom: 0, outline: '1px solid #ccc' }}
          title={<FormattedMessage defaultMessage="Images" id="Fip4H8" />}
        >
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Images" id="Fip4H8" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Hide/Show field on form',
                  id: '+AMnGS',
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
          title={
            <FormattedMessage defaultMessage="Details/Police" id="dosgOV" />
          }
        >
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Police" id="f53wTf" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Hide/Show field on form',
                  id: '+AMnGS',
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
              <FormattedMessage defaultMessage="Details" id="Lv0zJu" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Is required',
                  id: 'kWXp6p',
                })}
              >
                <Checkbox checked={incidentFormFields.DETAILS} disabled />
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
          title={<FormattedMessage defaultMessage="Groups" id="hzmswI" />}
        >
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Groups" id="hzmswI" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Is required',
                  id: 'kWXp6p',
                })}
              >
                <Checkbox
                  disabled
                  checked={incidentFormFields.GROUPS}
                  onChange={() => {}}
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
          title={<FormattedMessage defaultMessage="Custom" id="Sjo1P4" />}
        >
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="Custom" id="Sjo1P4" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Hide/Show field on form',
                  id: '+AMnGS',
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
    cctv: (
      <div
        key="cctv"
        style={{
          cursor: 'grab',
        }}
      >
        <Card
          style={{ marginBottom: 0, outline: '1px solid #ccc' }}
          title={<FormattedMessage defaultMessage="CCTV" id="r9rHbW" />}
        >
          <Row>
            <Col flex={1}>
              <FormattedMessage defaultMessage="CCTV" id="r9rHbW" />
            </Col>
            <Col>
              <Tooltip
                title={intl.formatMessage({
                  defaultMessage: 'Hide/Show field on form',
                  id: '+AMnGS',
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
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Col
                style={{
                  width: '60%',
                }}
                flex={1}
              >
                <FontAwesomeIcon style={{ marginRight: 10 }} icon={faBars} />
                <Typography.Text
                  style={{ maxWidth: '90%' }}
                  ellipsis={{ tooltip: message }}
                >
                  {message}
                </Typography.Text>
                {found?.required && (
                  <Typography.Text
                    style={{
                      marginLeft: 5,
                      color: '#ff0000',
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
                        marginRight: 10,
                        color: '#1890ff',
                        height: '100%',
                      }}
                    >
                      {intl.formatMessage({
                        defaultMessage: 'Dependent',
                        id: 'R1OkyM',
                      })}
                    </Typography.Text>
                  </Tooltip>
                </Col>
              )}
              <Col>
                <Tooltip
                  title={intl.formatMessage({
                    defaultMessage: 'Edit Question',
                    id: 'Pa9Li0',
                  })}
                >
                  <Button
                    size="small"
                    onClick={() => {
                      setSelectedQuestion(found?.qId || '');
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
                    onClick={() => {
                      deleteQuestion(layout.i);
                    }}
                    icon={<FontAwesomeIcon icon={faTrash} />}
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
        onBack={() => window.history.back()}
        title={data?.tag?.name || ''}
        extra={[
          <Button
            key="3"
            onClick={() => toggleAddQuestion()}
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
          >
            <FormattedMessage defaultMessage="Add question" id="0eJKDI" />
          </Button>,
          <Button
            key="2"
            disabled={saving}
            onClick={() => setEditIncidentType(data?.tag.id || '')}
            icon={
              <FontAwesomeIcon
                size="lg"
                icon={faPenToSquare}
                style={{ marginRight: 5 }}
              />
            }
          >
            {intl.formatMessage({
              defaultMessage: 'Edit Crime Type',
              id: 'zwQmkF',
            })}
          </Button>,
          <Button
            key="1"
            type="primary"
            disabled={saving}
            onClick={() => deleteConfirm(data?.tag.id || '')}
            icon={
              <FontAwesomeIcon
                size="lg"
                icon={faTrash}
                style={{ marginRight: 5 }}
              />
            }
          >
            {intl.formatMessage({
              defaultMessage: 'Delete Crime Type',
              id: 'uymNG3',
            })}
          </Button>,
        ]}
      />
      <Row gutter={[8, 8]}>
        <Col span={16}>
          <Card loading={loading}>
            <FormattedMessage defaultMessage="Parent Tag:" id="TqRfhz" />
            <Select
              style={{ width: '100%', marginTop: 5 }}
              value={parentTag}
              onSelect={(value) => {
                setParentTag(value);
              }}
              options={data?.listTags.tags
                .map((tag) => ({
                  label: tag.name,
                  value: tag.id,
                }))
                .filter((tag) => tag.value !== data?.tag?.id)}
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
                <FormattedMessage
                  defaultMessage="Custom Questions"
                  id="QUZrro"
                />
              </Col>
              <Col>
                {questionLayoutChanged && (
                  <Button onClick={() => saveQOrder()} type="primary">
                    <FormattedMessage defaultMessage="Save Order" id="qXJOUd" />
                  </Button>
                )}
              </Col>
            </Row>
            <Row>
              <Col flex={1}>
                <ReactGridLayout
                  layout={questionsLayout}
                  cols={1}
                  rowHeight={rowHeight}
                  width={20}
                  isDraggable
                  isResizable={false}
                  autoSize
                  isBounded
                  margin={margin}
                  onLayoutChange={(newLayout) => {
                    setQuestionsLayout(newLayout);
                    if (!questionLayoutChanged) setQuestionLayoutChanged(true);
                  }}
                >
                  {qElements}
                </ReactGridLayout>
              </Col>
            </Row>
          </Card>
          <Card
            loading={loading}
            style={{
              minHeight: 370,
              marginBottom: 20,
            }}
          >
            <Row>
              <Col flex={1}>
                <FormattedMessage
                  defaultMessage="Custom Incident Form"
                  id="TQS/+P"
                />
              </Col>
              <Col>
                {incidentFormLayoutChanged && (
                  <Button onClick={() => saveIncidentForm()} type="primary">
                    <FormattedMessage defaultMessage="Save Order" id="qXJOUd" />
                  </Button>
                )}
              </Col>
            </Row>
            <Col flex={1}>
              <ReactGridLayout
                layout={incidentFormLayout}
                cols={1}
                rowHeight={rowHeight}
                width={20}
                isDraggable
                isResizable={false}
                autoSize
                isBounded
                margin={margin}
                onLayoutChange={(newLayout) => {
                  setIncidentFormLayout(newLayout);
                  if (!incidentFormLayoutChanged)
                    setIncidentFormLayoutChanged(true);
                }}
              >
                {incidentFormFormatted}
              </ReactGridLayout>
            </Col>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{
              minHeight: 500,
            }}
            loading={loading}
          >
            <FormattedMessage defaultMessage="Tag hierarchy" id="I5HrhC" />
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
        title={intl.formatMessage({
          defaultMessage: 'Add/Create Question',
          id: '/vx2Ey',
        })}
        open={addQuestion}
        width={800}
        onClose={toggleAddQuestion}
      >
        {addQuestion ? (
          <AddQuestionContainer
            tagQuestions={tagQsFormatted || []}
            onClose={() => toggleAddQuestion()}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add/Create Question',
          id: '/vx2Ey',
        })}
        open={!!selectedQuestion}
        width={800}
        onClose={() => setSelectedQuestion(null)}
      >
        {selectedQuestion ? (
          <UpdateQuestionContainer
            onClose={() => setSelectedQuestion(null)}
            questionId={selectedQuestion}
            updateQuestionOnTag={updateQuestionOnTag}
            tagQId={
              tagqs?.find((tagq) => tagq.qId === selectedQuestion)?.i || ''
            }
            required={
              !!tagqs?.find((tagq) => tagq.qId === selectedQuestion)?.required
            }
            tagQuestions={tagQsFormatted || []}
            dependent={findDep() || undefined}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Edit Incident Type',
          id: 'xTR8wo',
        })}
        open={!!editIncidentType}
        width="400"
        onClose={() => setEditIncidentType('')}
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
