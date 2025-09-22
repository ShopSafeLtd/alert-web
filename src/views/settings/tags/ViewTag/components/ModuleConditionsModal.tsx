import type { IncidentFormField } from 'graphql/types';
import type { AnswerType } from 'graphql/types';

import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  Card,
  Col,
  Modal,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const { Option } = Select;
const { Text } = Typography;

export interface ModuleCondition {
  conditionValues: string[];
  questionId?: string;
  type: 'BUSINESS_GROUPS' | 'CUSTOM_QUESTION' | 'USER_ROLE';
}

interface Props {
  availableBusinessGroups: { id: string; name: string }[];
  availableQuestions: {
    answerType: AnswerType;
    id: string;
    options?: { label: string; value: string }[];
    question: string;
  }[];
  currentConditions?: ModuleCondition[];
  moduleType: IncidentFormField;
  onClose: () => void;
  onSave: (conditions: ModuleCondition[]) => void;
  open: boolean;
}

const availableRoles = [
  { label: 'User', value: 'USER' },
  { label: 'Scheme Admin', value: 'SCHEME_ADMIN' },
  { label: 'Group Admin', value: 'GROUP_ADMIN' },
  { label: 'Content Admin', value: 'CONTENT_ADMIN' },
  { label: 'Shopsafe Admin', value: 'SHOPSAFE_ADMIN' },
  { label: 'Any Custom Role', value: 'CUSTOM' },
];

const getRoleLabels = (roleValues: string[]): string[] =>
  roleValues.map(
    (value) => availableRoles.find((r) => r.value === value)?.label || value
  );

const ModuleConditionsModal: React.FC<Props> = ({
  availableBusinessGroups,
  availableQuestions,
  currentConditions = [],
  onClose,
  onSave,
  open,
}) => {
  const intl = useIntl();
  const [conditions, setConditions] =
    useState<ModuleCondition[]>(currentConditions);

  useEffect(() => {
    setConditions(currentConditions);
  }, [currentConditions, open]);

  const updateConditionType = (
    index: number,
    type: ModuleCondition['type']
  ) => {
    const updated = [...conditions];
    updated[index] = {
      ...updated[index],
      conditionValues: [],
      questionId: undefined,
      type,
    };
    setConditions(updated);
  };

  const updateConditionValues = (index: number, values: string[]) => {
    const updated = [...conditions];
    updated[index] = {
      ...updated[index],
      conditionValues: values,
    };
    setConditions(updated);
  };

  const updateQuestionId = (index: number, questionId: string) => {
    const updated = [...conditions];
    updated[index] = {
      ...updated[index],
      conditionValues: [],
      questionId,
    };
    setConditions(updated);
  };

  const addNewCondition = () => {
    setConditions([
      ...conditions,
      {
        conditionValues: [],
        type: 'BUSINESS_GROUPS',
      },
    ]);
  };

  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const getQuestionOptions = (questionId?: string) => {
    if (!questionId) return [];
    const question = availableQuestions.find((q) => q.id === questionId);
    return question?.options || [];
  };

  const getQuestionText = (questionId?: string) => {
    if (!questionId) return '';
    const question = availableQuestions.find((q) => q.id === questionId);
    return question?.question || '';
  };

  const getGroupNames = (groupIds: string[]): string[] =>
    groupIds.map(
      (id) => availableBusinessGroups.find((g) => g.id === id)?.name || id
    );

  const getAnswerLabels = (condition: ModuleCondition): string[] => {
    const options = getQuestionOptions(condition.questionId);
    return condition.conditionValues.map(
      (value) => options.find((o) => o.value === value)?.label || value
    );
  };

  const handleSave = () => {
    // Filter out empty conditions
    const validConditions = conditions.filter(
      (c) => c.conditionValues.length > 0
    );
    onSave(validConditions);
    onClose();
  };

  return (
    <Modal
      cancelText={<FormattedMessage defaultMessage="Cancel" />}
      okText={<FormattedMessage defaultMessage="Save" />}
      onCancel={onClose}
      onOk={handleSave}
      open={open}
      title={<FormattedMessage defaultMessage="Module Display Conditions" />}
      width={800}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {conditions.map((condition, index) => (
          <Card key={index} size="small">
            <Row align="middle" gutter={16}>
              <Col span={6}>
                <Select
                  onChange={(type) => updateConditionType(index, type)}
                  style={{ width: '100%' }}
                  value={condition.type}
                >
                  <Option value="BUSINESS_GROUPS">
                    <FormattedMessage defaultMessage="Business Groups" />
                  </Option>
                  <Option value="CUSTOM_QUESTION">
                    <FormattedMessage defaultMessage="Custom Question" />
                  </Option>
                  <Option value="USER_ROLE">
                    <FormattedMessage defaultMessage="User Role" />
                  </Option>
                </Select>
              </Col>

              {condition.type === 'USER_ROLE' && (
                <Col span={16}>
                  <Select
                    mode="multiple"
                    onChange={(values) => updateConditionValues(index, values)}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Select user roles',
                    })}
                    style={{ width: '100%' }}
                    value={condition.conditionValues}
                  >
                    {availableRoles.map((role) => (
                      <Option key={role.value} value={role.value}>
                        {role.label}
                      </Option>
                    ))}
                  </Select>
                </Col>
              )}

              {condition.type === 'BUSINESS_GROUPS' && (
                <Col span={16}>
                  <Select
                    mode="multiple"
                    onChange={(values) => updateConditionValues(index, values)}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Select business groups',
                    })}
                    style={{ width: '100%' }}
                    value={condition.conditionValues}
                  >
                    {availableBusinessGroups.map((group) => (
                      <Option key={group.id} value={group.id}>
                        {group.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
              )}

              {condition.type === 'CUSTOM_QUESTION' && (
                <>
                  <Col span={8}>
                    <Select
                      onChange={(questionId) =>
                        updateQuestionId(index, questionId)
                      }
                      placeholder={intl.formatMessage({
                        defaultMessage: 'Select question',
                      })}
                      style={{ width: '100%' }}
                      value={condition.questionId}
                    >
                      {availableQuestions.map((q) => (
                        <Option key={q.id} value={q.id}>
                          {q.question}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                  <Col span={8}>
                    <Select
                      disabled={!condition.questionId}
                      mode="multiple"
                      onChange={(values) =>
                        updateConditionValues(index, values)
                      }
                      placeholder={intl.formatMessage({
                        defaultMessage: 'Select answers',
                      })}
                      style={{ width: '100%' }}
                      value={condition.conditionValues}
                    >
                      {getQuestionOptions(condition.questionId).map((opt) => (
                        <Option key={opt.value} value={opt.value}>
                          {opt.label}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                </>
              )}

              <Col span={2}>
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeCondition(index)}
                  type="text"
                />
              </Col>
            </Row>
          </Card>
        ))}

        <Button
          block
          icon={<PlusOutlined />}
          onClick={addNewCondition}
          type="dashed"
        >
          <FormattedMessage defaultMessage="Add Condition" />
        </Button>

        <Alert
          description={
            <FormattedMessage defaultMessage="All conditions must be met (AND logic) for this module to be displayed." />
          }
          message={<FormattedMessage defaultMessage="Condition Logic" />}
          type="info"
        />

        {conditions.length > 0 && (
          <Card
            size="small"
            title={<FormattedMessage defaultMessage="Display Preview" />}
          >
            <Text>
              <FormattedMessage defaultMessage="This module will be shown when:" />
            </Text>
            <ul style={{ marginTop: 8 }}>
              {conditions.map((cond, i) => (
                <li key={i}>
                  {cond.type === 'USER_ROLE' ? (
                    <>
                      <FormattedMessage defaultMessage="User has role: " />
                      {getRoleLabels(cond.conditionValues).join(' OR ')}
                    </>
                  ) : cond.type === 'BUSINESS_GROUPS' ? (
                    <>
                      <FormattedMessage defaultMessage="Business is in groups: " />
                      {getGroupNames(cond.conditionValues).join(', ')}
                    </>
                  ) : (
                    <>
                      <FormattedMessage defaultMessage="Question" />{' '}
                      <FormattedMessage
                        defaultMessage='"{question}":'
                        values={{ question: getQuestionText(cond.questionId) }}
                      />{' '}
                      {getAnswerLabels(cond).join(' OR ')}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        )}
      </Space>
    </Modal>
  );
};

export default ModuleConditionsModal;
