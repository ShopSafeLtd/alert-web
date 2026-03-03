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
  mode: 'HIDE' | 'SHOW';
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
  availableRoles: { id: string; name: string; type: string }[];
  currentConditions?: ModuleCondition[];
  moduleType: IncidentFormField;
  onClose: () => void;
  onSave: (conditions: ModuleCondition[]) => void;
  open: boolean;
}

const ModuleConditionsModal: React.FC<Props> = ({
  availableBusinessGroups,
  availableQuestions,
  availableRoles,
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

  const updateConditionMode = (index: number, mode: 'HIDE' | 'SHOW') => {
    const updated = [...conditions];
    updated[index] = {
      ...updated[index],
      mode,
    };
    setConditions(updated);
  };

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
        mode: 'SHOW',
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

  const getRoleNames = (roleIds: string[]): string[] =>
    roleIds.map((id) => availableRoles.find((r) => r.id === id)?.name || id);

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
              <Col span={4}>
                <Select
                  onChange={(mode) => updateConditionMode(index, mode)}
                  style={{ width: '100%' }}
                  value={condition.mode || 'SHOW'}
                >
                  <Option value="SHOW">
                    <FormattedMessage defaultMessage="Show when" />
                  </Option>
                  <Option value="HIDE">
                    <FormattedMessage defaultMessage="Hide when" />
                  </Option>
                </Select>
              </Col>

              <Col span={5}>
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
                <Col span={13}>
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
                      <Option key={role.id} value={role.id}>
                        {role.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
              )}

              {condition.type === 'BUSINESS_GROUPS' && (
                <Col span={13}>
                  <Select
                    mode="multiple"
                    onChange={(values) => updateConditionValues(index, values)}
                    optionFilterProp="children"
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
                  <Col span={6}>
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
                  <Col span={7}>
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
            <>
              <FormattedMessage defaultMessage="All conditions must be met (AND logic):" />
              <ul style={{ marginBottom: 0, marginTop: 8 }}>
                <li>
                  <FormattedMessage defaultMessage="Multiple SHOW: Module appears only if ALL SHOW conditions are true" />
                </li>
                <li>
                  <FormattedMessage defaultMessage="Multiple HIDE: Module is hidden if ALL HIDE conditions are true" />
                </li>
                <li>
                  <FormattedMessage defaultMessage="Mixed: ALL SHOW must be true AND ALL HIDE must be true to hide" />
                </li>
              </ul>
            </>
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
              <FormattedMessage defaultMessage="This module will be:" />
            </Text>
            <ul style={{ marginTop: 8 }}>
              {conditions.map((cond, i) => (
                <li key={i}>
                  <strong
                    style={{
                      color: cond.mode === 'SHOW' ? '#52c41a' : '#ff4d4f',
                    }}
                  >
                    {cond.mode === 'SHOW' ? (
                      <FormattedMessage defaultMessage="SHOWN " />
                    ) : (
                      <FormattedMessage defaultMessage="HIDDEN " />
                    )}
                  </strong>
                  <FormattedMessage defaultMessage="when " />
                  {cond.type === 'USER_ROLE' ? (
                    <>
                      <FormattedMessage defaultMessage="user has role: " />
                      <strong>
                        {getRoleNames(cond.conditionValues).join(' OR ')}
                      </strong>
                    </>
                  ) : cond.type === 'BUSINESS_GROUPS' ? (
                    <>
                      <FormattedMessage defaultMessage="business is in groups: " />
                      <strong>
                        {getGroupNames(cond.conditionValues).join(' OR ')}
                      </strong>
                    </>
                  ) : (
                    <>
                      <FormattedMessage defaultMessage="question " />
                      <strong>
                        <FormattedMessage
                          defaultMessage='"{questionText}"'
                          values={{
                            questionText: getQuestionText(cond.questionId),
                          }}
                        />
                      </strong>
                      <FormattedMessage defaultMessage=" equals: " />
                      <strong>{getAnswerLabels(cond).join(' OR ')}</strong>
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
