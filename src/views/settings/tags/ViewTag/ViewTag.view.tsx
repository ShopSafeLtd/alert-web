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
} from 'antd';
import type { ViewTagQuery } from 'graphql/generated';
import { IncidentFormField } from 'graphql/generated';
import { FormattedMessage, useIntl } from 'react-intl';
import RGL, { WidthProvider } from 'react-grid-layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
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
}: Props): JSX.Element => {
  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);
  const intl = useIntl();

  const tagqs = data?.tag?.tagQuestions?.map((tagq) => ({
    i: tagq.id,
    question: tagq.question.questionFormatted,
    type: tagq.question.type,
  }));

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
      questionsLayout.map((layout) => (
        <div
          key={layout.i}
          style={{
            cursor: 'grab',
          }}
        >
          <Row>
            <Col flex={1}>
              <FontAwesomeIcon style={{ marginRight: 10 }} icon={faBars} />
              {tagqs?.find((tagq) => tagq.i === layout.i)?.question}
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
      )),
    [questionsLayout, tagqs]
  );

  return (
    <div className="page-view">
      <PageHeader
        onBack={() => window.history.back()}
        title={data?.tag?.name || ''}
        extra={[
          <Button
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
        ]}
      />
      <Row gutter={[8, 8]}>
        <Col span={12}>
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
        <Col span={12}>
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
        visible={addQuestion}
        width="800"
        onClose={toggleAddQuestion}
      >
        {addQuestion ? (
          <AddQuestionContainer onClose={() => toggleAddQuestion()} />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ViewTag;
