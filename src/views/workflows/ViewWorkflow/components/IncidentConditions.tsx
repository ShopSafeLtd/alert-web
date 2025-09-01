import type { WorkflowProps } from '#/views/workflows/ViewWorkflow/Workflow.view';

import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd';
import { AnswerType, IncidentPriority } from 'graphql/types';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { OverUnder } from '../useWorkflowForm';

type PickedBase = Pick<
  WorkflowProps,
  | 'availableQuestions'
  | 'brandsSelected'
  | 'countriesSelected'
  | 'descriptionCheck'
  | 'divisionsSelected'
  | 'goods'
  | 'goodsTypeCheck'
  | 'groupsSelected'
  | 'lessThanSelected'
  | 'lossValueSelected'
  | 'prefix'
  | 'prioritySelected'
  | 'questions'
  | 'questionsSelected'
  | 'selectedQuestions'
  | 'setAvailableQuestions'
  | 'setSelectedQuestions'
  | 'tags'
  | 'tagsSelected'
  | 'valueSelected'
  | 'brands'
  | 'brandsLoading'
  | 'countries'
  | 'divisions'
  | 'divisionsLoading'
>;

type IncidentConditionsProps = {
  classes: { cardBody: string };
} & PickedBase;

const IncidentConditions: React.FC<IncidentConditionsProps> = ({
  availableQuestions,
  brandsSelected,
  classes,
  countriesSelected,
  descriptionCheck,
  divisionsSelected,
  goods,
  goodsTypeCheck,
  groupsSelected,
  lessThanSelected,
  lossValueSelected,
  prefix,
  prioritySelected,
  questions,
  questionsSelected,
  selectedQuestions,
  setAvailableQuestions,
  setSelectedQuestions,
  tags,
  tagsSelected,
  valueSelected,
  brands,
  brandsLoading,
  countries,
  divisions,
  divisionsLoading,
}) => {
  const intl = useIntl();

  return (
    <>
      {/* Tags Section */}
      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      <div>
        <Row style={{ padding: 20 }} wrap={false}>
          <Col flex={1}>
            <Typography.Title
              level={4}
              style={{
                alignItems: 'center',
                display: 'flex',
                paddingTop: 8,
              }}
            >
              <FormattedMessage defaultMessage="Tags Present" />
            </Typography.Title>
            <Typography.Text type="secondary">
              <FormattedMessage defaultMessage="Only trigger the workflow if the selected tags are present." />
            </Typography.Text>
          </Col>
          <Col span={2}>
            <Form.Item name="tags" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        {tagsSelected && (
          <div className={classes.cardBody}>
            <Form.Item
              label={
                <FormattedMessage defaultMessage="If any or all the selected tags are present" />
              }
              name="tagMethod"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select an option',
                  }),
                  required: true,
                },
              ]}
            >
              <Radio.Group
                optionType="button"
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Any',
                    }),
                    value: 'any',
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'All',
                    }),
                    value: 'all',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={<FormattedMessage defaultMessage="Tags" />}
              name="tagOptions"
            >
              <Select mode="tags" optionFilterProp="label" options={tags} />
            </Form.Item>
          </div>
        )}
      </div>

      {/* Groups Section */}
      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      <div>
        <Row style={{ padding: 20 }} wrap={false}>
          <Col flex={1}>
            <Typography.Title
              level={4}
              style={{
                alignItems: 'center',
                display: 'flex',
                paddingTop: 8,
              }}
            >
              <FormattedMessage defaultMessage="Incident has a group" />
            </Typography.Title>
            <Typography.Text type="secondary">
              <FormattedMessage defaultMessage="Only trigger the workflow if the incident has a specific content group." />
            </Typography.Text>
          </Col>
          <Col>
            <Form.Item name="groups" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        {groupsSelected && (
          <div className={classes.cardBody}>
            <Form.Item
              label={
                <FormattedMessage defaultMessage="If any or all the content groups are present" />
              }
              name="groupMethod"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select an option',
                  }),
                  required: true,
                },
              ]}
            >
              <Radio.Group
                optionType="button"
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Any',
                    }),
                    value: 'any',
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'All',
                    }),
                    value: 'all',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={<FormattedMessage defaultMessage="Content Groups" />}
              name="groupIds"
            >
              <GroupsSelect
                allowClear
                mode={'multiple'}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </div>
        )}
      </div>

      {/* Brands Section */}
      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      <div>
        <Row style={{ padding: 20 }} wrap={false}>
          <Col flex={1}>
            <Typography.Title
              level={4}
              style={{
                alignItems: 'center',
                display: 'flex',
                paddingTop: 8,
              }}
            >
              <FormattedMessage defaultMessage="Brands Present" />
            </Typography.Title>
            <Typography.Text type="secondary">
              <FormattedMessage defaultMessage="Only trigger the workflow if the incident has specified brands present." />
            </Typography.Text>
          </Col>
          <Col span={2}>
            <Form.Item name="brandsCheck" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        {brandsSelected && (
          <div className={classes.cardBody}>
            <Form.Item
              label={
                <FormattedMessage defaultMessage="If any or all the selected brands are present" />
              }
              name="brandsCondition"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select an option',
                  }),
                  required: true,
                },
              ]}
            >
              <Radio.Group
                optionType="button"
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Any',
                    }),
                    value: 'any',
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'All',
                    }),
                    value: 'all',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={<FormattedMessage defaultMessage="Brands" />}
              name="brands"
            >
              <Select
                mode="multiple"
                optionFilterProp="label"
                options={brands}
                loading={brandsLoading}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Select brands...',
                })}
              />
            </Form.Item>
          </div>
        )}
      </div>

      {/* Countries Section */}
      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      <div>
        <Row style={{ padding: 20 }} wrap={false}>
          <Col flex={1}>
            <Typography.Title
              level={4}
              style={{
                alignItems: 'center',
                display: 'flex',
                paddingTop: 8,
              }}
            >
              <FormattedMessage defaultMessage="Countries Present" />
            </Typography.Title>
            <Typography.Text type="secondary">
              <FormattedMessage defaultMessage="Only trigger the workflow if the incident has specified countries present." />
            </Typography.Text>
          </Col>
          <Col span={2}>
            <Form.Item name="countriesCheck" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        {countriesSelected && (
          <div className={classes.cardBody}>
            <Form.Item
              label={
                <FormattedMessage defaultMessage="If any or all the selected countries are present" />
              }
              name="countriesCondition"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select an option',
                  }),
                  required: true,
                },
              ]}
            >
              <Radio.Group
                optionType="button"
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Any',
                    }),
                    value: 'any',
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'All',
                    }),
                    value: 'all',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={<FormattedMessage defaultMessage="Countries" />}
              name="countries"
            >
              <Select
                mode="multiple"
                optionFilterProp="label"
                options={countries}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Select countries...',
                })}
              />
            </Form.Item>
          </div>
        )}
      </div>

      {/* Divisions Section */}
      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      <div>
        <Row style={{ padding: 20 }} wrap={false}>
          <Col flex={1}>
            <Typography.Title
              level={4}
              style={{
                alignItems: 'center',
                display: 'flex',
                paddingTop: 8,
              }}
            >
              <FormattedMessage defaultMessage="Divisions Present" />
            </Typography.Title>
            <Typography.Text type="secondary">
              <FormattedMessage defaultMessage="Only trigger the workflow if the incident has specified divisions present." />
            </Typography.Text>
          </Col>
          <Col span={2}>
            <Form.Item name="divisionsCheck" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        {divisionsSelected && (
          <div className={classes.cardBody}>
            <Form.Item
              label={<FormattedMessage defaultMessage="Divisions" />}
              name="divisions"
            >
              <Select
                mode="multiple"
                optionFilterProp="label"
                options={divisions}
                loading={divisionsLoading}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Select divisions...',
                })}
              />
            </Form.Item>
          </div>
        )}
      </div>

      {/* Priority Section */}
      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      <div>
        <Row style={{ padding: 20 }} wrap={false}>
          <Col flex={1}>
            <Typography.Title
              level={4}
              style={{
                alignItems: 'center',
                display: 'flex',
                paddingTop: 8,
              }}
            >
              <FormattedMessage defaultMessage="Incident Priority" />
            </Typography.Title>
            <Typography.Text type="secondary">
              <FormattedMessage defaultMessage="Only trigger the workflow if the incident has specified priorities." />
            </Typography.Text>
          </Col>
          <Col span={2}>
            <Form.Item name="priorityCheck" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        {prioritySelected && (
          <div className={classes.cardBody}>
            <Form.Item
              label={
                <FormattedMessage defaultMessage="If any or all the selected priorities are present" />
              }
              name="priorityCondition"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select an option',
                  }),
                  required: true,
                },
              ]}
            >
              <Radio.Group
                optionType="button"
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Any',
                    }),
                    value: 'any',
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'All',
                    }),
                    value: 'all',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={<FormattedMessage defaultMessage="Priority" />}
              name="priority"
            >
              <Select
                mode="multiple"
                optionFilterProp="label"
                options={Object.keys(IncidentPriority).map((key) => ({
                  label: key,
                  value: key,
                }))}
              />
            </Form.Item>
          </div>
        )}
      </div>

      {/* Loss Value Section */}
      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      <div>
        <Row style={{ padding: 20 }} wrap={false}>
          <Col flex={1}>
            <Typography.Title
              level={4}
              style={{
                alignItems: 'center',
                display: 'flex',
                paddingTop: 8,
              }}
            >
              <FormattedMessage defaultMessage="Total Loss Value Greater Than" />
            </Typography.Title>
            <Typography.Text type="secondary">
              <FormattedMessage defaultMessage="Only trigger the workflow if the incident total loss value (total loss - recovered) exceeds a specified amount." />
            </Typography.Text>
          </Col>
          <Col span={2}>
            <Form.Item name="lossValueCheck" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        {lossValueSelected && (
          <div className={classes.cardBody}>
            <Form.Item
              label={
                <FormattedMessage defaultMessage="If the total loss value (total loss - recovered) is greater than" />
              }
              name="lossValue"
            >
              <InputNumber min={0} prefix={prefix} style={{ width: '100%' }} />
            </Form.Item>
          </div>
        )}
      </div>

      {/* Value Greater Than Section */}
      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      <div>
        <Row style={{ padding: 20 }} wrap={false}>
          <Col flex={1}>
            <Typography.Title
              level={4}
              style={{
                alignItems: 'center',
                display: 'flex',
                paddingTop: 8,
              }}
            >
              <FormattedMessage defaultMessage="Value Greater Than" />
            </Typography.Title>
            <Typography.Text type="secondary">
              <FormattedMessage defaultMessage="Only trigger the workflow if the incident value exceeds a specified amount." />
            </Typography.Text>
          </Col>
          <Col>
            <Form.Item name="valueCheck" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        {valueSelected && (
          <div className={classes.cardBody}>
            <Form.Item
              label={
                <FormattedMessage defaultMessage="If the total value is over" />
              }
              name="valuePrice"
            >
              <InputNumber min={0} prefix={prefix} style={{ width: '100%' }} />
            </Form.Item>
          </div>
        )}
      </div>

      {/* Value Less Than Section */}
      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      <div>
        <Row style={{ padding: 20 }} wrap={false}>
          <Col flex={1}>
            <Typography.Title
              level={4}
              style={{
                alignItems: 'center',
                display: 'flex',
                paddingTop: 8,
              }}
            >
              <FormattedMessage defaultMessage="Value Less Than" />
            </Typography.Title>
            <Typography.Text type="secondary">
              <FormattedMessage defaultMessage="Only trigger the workflow if the incident value (total loss - recovered) is under a specified amount." />
            </Typography.Text>
          </Col>
          <Col span={2}>
            <Form.Item name="lessThanCheck" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        {lessThanSelected && (
          <div className={classes.cardBody}>
            <Form.Item
              label={
                <FormattedMessage defaultMessage="If the total value (total loss - recovered) is less than" />
              }
              name="lessThanPrice"
            >
              <InputNumber min={0} prefix={prefix} style={{ width: '100%' }} />
            </Form.Item>
          </div>
        )}
      </div>

      {/* Goods Section */}
      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      <div>
        <Row style={{ padding: 20 }} wrap={false}>
          <Col flex={1}>
            <Typography.Title
              level={4}
              style={{
                alignItems: 'center',
                display: 'flex',
                paddingTop: 8,
              }}
            >
              <FormattedMessage defaultMessage="Goods Present" />
            </Typography.Title>
            <Typography.Text type="secondary">
              <FormattedMessage defaultMessage="Only trigger the workflow if the incident has specified goods present." />
            </Typography.Text>
          </Col>
          <Col span={2}>
            <Form.Item name="goodsTypeCheck" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        {goodsTypeCheck && (
          <div className={classes.cardBody}>
            <Form.Item
              label={
                <FormattedMessage defaultMessage="If any or all the selected goods types are present" />
              }
              name="goodsTypeCondition"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select an option',
                  }),
                  required: true,
                },
              ]}
            >
              <Radio.Group
                optionType="button"
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Any',
                    }),
                    value: 'any',
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'All',
                    }),
                    value: 'all',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={<FormattedMessage defaultMessage="Goods" />}
              name="goodsType"
            >
              <Select mode="tags" optionFilterProp="label" options={goods} />
            </Form.Item>
          </div>
        )}
      </div>

      {/* Description Section */}
      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      <div>
        <Row style={{ padding: 20 }} wrap={false}>
          <Col flex={1}>
            <Typography.Title
              level={4}
              style={{
                alignItems: 'center',
                display: 'flex',
                paddingTop: 8,
              }}
            >
              <FormattedMessage defaultMessage="Description Contents" />
            </Typography.Title>
            <Typography.Text type="secondary">
              <FormattedMessage defaultMessage="Trigger the workflow if the incident description contains any or all of the selected words." />
            </Typography.Text>
          </Col>
          <Col>
            <Form.Item name="descriptionCheck" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        {descriptionCheck && (
          <div className={classes.cardBody}>
            <Form.Item
              label={
                <FormattedMessage defaultMessage="If any or all the selected words are present" />
              }
              name="descriptionCondition"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select an option',
                  }),
                  required: true,
                },
              ]}
            >
              <Radio.Group
                optionType="button"
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Any',
                    }),
                    value: 'any',
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'All',
                    }),
                    value: 'all',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={<FormattedMessage defaultMessage="Words" />}
              name="descriptionWords"
            >
              <Select
                dropdownStyle={{ display: 'none' }}
                mode="tags"
                optionFilterProp="label"
              />
            </Form.Item>
          </div>
        )}
      </div>

      {/* Questions Section */}
      <Divider style={{ marginBottom: 0, marginTop: 0 }} />
      <div>
        <Row style={{ padding: 20 }} wrap={false}>
          <Col flex={1}>
            <Typography.Title
              level={4}
              style={{
                alignItems: 'center',
                display: 'flex',
                paddingTop: 8,
              }}
            >
              <FormattedMessage defaultMessage="Question Answers" />
            </Typography.Title>
            <Typography.Text type="secondary">
              <FormattedMessage defaultMessage="Only trigger the workflow custom questions on the incident has specified answers." />
            </Typography.Text>
          </Col>
          <Col>
            <Form.Item name="questionChecked" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        {questionsSelected && (
          <div className={classes.cardBody}>
            <Form.Item
              label={
                <FormattedMessage defaultMessage="If any or all the selected questions are present and answered" />
              }
              name="questionMethod"
              rules={[
                {
                  message: intl.formatMessage({
                    defaultMessage: 'Please select an option',
                  }),
                  required: true,
                },
              ]}
            >
              <Radio.Group
                optionType="button"
                options={[
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'Any',
                    }),
                    value: 'any',
                  },
                  {
                    label: intl.formatMessage({
                      defaultMessage: 'All',
                    }),
                    value: 'all',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label={
                <FormattedMessage defaultMessage="Select a question to check" />
              }
              name="qs"
              style={{ width: '50%' }}
            >
              <Col>
                <Select
                  onChange={(value) => {
                    const question = questions.find(({ id }) => id === value);
                    if (question) {
                      setSelectedQuestions([...selectedQuestions, question]);
                    }
                    setAvailableQuestions(
                      availableQuestions.filter(({ id }) => id !== value)
                    );
                  }}
                  options={availableQuestions.map(({ id, question }) => ({
                    label: question,
                    value: id,
                  }))}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select a question from the list...',
                  })}
                  style={{ width: '100%' }}
                  value={null}
                />
              </Col>
            </Form.Item>
            {selectedQuestions && selectedQuestions.length > 0 && (
              <Form.Item
                label={<FormattedMessage defaultMessage="Checked Questions" />}
                name="placeholder"
              >
                {selectedQuestions.map(
                  ({ answer, id, options, overUnder, question, type }) => (
                    <Row
                      align="bottom"
                      gutter={8}
                      key={id}
                      style={{ marginTop: 12 }}
                      wrap={false}
                    >
                      <Col flex={1}>
                        <Typography.Text>{question}</Typography.Text>
                        {(type === AnswerType.Select ||
                          type === AnswerType.SelectSingle) && (
                          <Select
                            mode="multiple"
                            onChange={(value: string | string[]) => {
                              setSelectedQuestions((prevState) =>
                                prevState.map((q) => {
                                  if (q.id === id) {
                                    return {
                                      ...q,
                                      answer: value,
                                    };
                                  }
                                  return q;
                                })
                              );
                            }}
                            options={options.map(({ label, value }) => ({
                              label,
                              value,
                            }))}
                            value={answer}
                          />
                        )}
                        {type === AnswerType.Boolean && (
                          <div style={{ marginTop: 8 }}>
                            <Radio.Group
                              onChange={(e) => {
                                setSelectedQuestions((prevState) =>
                                  prevState.map((q) => {
                                    if (q.id === id) {
                                      return {
                                        ...q,
                                        answer: e.target.value as string,
                                      };
                                    }
                                    return q;
                                  })
                                );
                              }}
                              optionType="button"
                              options={[
                                {
                                  label: intl.formatMessage({
                                    defaultMessage: 'Yes',
                                  }),
                                  value: 'true',
                                },
                                {
                                  label: intl.formatMessage({
                                    defaultMessage: 'No',
                                  }),
                                  value: 'false',
                                },
                              ]}
                              value={answer}
                            />
                          </div>
                        )}
                        {type === AnswerType.Number && (
                          <div style={{ marginTop: 8 }}>
                            <InputNumber
                              min={0}
                              onChange={(value: null | number | string) => {
                                setSelectedQuestions((prevState) =>
                                  prevState.map((q) => {
                                    if (q.id === id && value) {
                                      return {
                                        ...q,
                                        answer:
                                          typeof value === 'number'
                                            ? value.toString()
                                            : value,
                                      };
                                    }
                                    return q;
                                  })
                                );
                              }}
                              style={{ width: '50%' }}
                              value={
                                Array.isArray(answer) ? answer[0] : answer || 0
                              }
                            />
                            <Radio.Group
                              onChange={(e) => {
                                setSelectedQuestions((prevState) =>
                                  prevState.map((q) => {
                                    if (q.id === id) {
                                      return {
                                        ...q,
                                        overUnder: e.target.value as OverUnder,
                                      };
                                    }
                                    return q;
                                  })
                                );
                              }}
                              optionType="button"
                              options={[
                                {
                                  label: intl.formatMessage({
                                    defaultMessage: 'Over',
                                  }),
                                  value: 'over',
                                },
                                {
                                  label: intl.formatMessage({
                                    defaultMessage: 'Under',
                                  }),
                                  value: 'under',
                                },
                              ]}
                              value={overUnder}
                            />
                          </div>
                        )}
                        {type !== AnswerType.Select &&
                          type !== AnswerType.SelectSingle &&
                          type !== AnswerType.Boolean &&
                          type !== AnswerType.Number && (
                            <Input
                              onChange={(e) => {
                                setSelectedQuestions((prevState) =>
                                  prevState.map((q) => {
                                    if (q.id === id) {
                                      return {
                                        ...q,
                                        answer: e.target.value,
                                      };
                                    }
                                    return q;
                                  })
                                );
                              }}
                              value={answer}
                            />
                          )}
                      </Col>
                      <Col
                        style={{
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        <Button
                          onClick={() => {
                            const q = selectedQuestions.find(
                              ({ id: qid }) => id === qid
                            );
                            if (q) {
                              setAvailableQuestions([...availableQuestions, q]);
                            }
                            setSelectedQuestions(
                              selectedQuestions.filter(
                                ({ id: qid }) => id !== qid
                              )
                            );
                          }}
                        >
                          <FormattedMessage defaultMessage="Remove" />
                        </Button>
                      </Col>
                    </Row>
                  )
                )}
              </Form.Item>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default IncidentConditions;
