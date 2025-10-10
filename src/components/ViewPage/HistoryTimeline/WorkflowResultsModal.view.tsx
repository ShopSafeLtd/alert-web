import {
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Badge,
  Card,
  Col,
  Collapse,
  Descriptions,
  Modal,
  Row,
  Space,
  Statistic,
  Tag,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

const { Panel } = Collapse;
const { Text, Title } = Typography;

const useStyles = createUseStyles({
  conditionCard: {
    marginBottom: 12,
  },
  conditionDescription: {
    fontSize: 13,
    opacity: 0.85,
  },
  conditionLabel: {
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 4,
    opacity: 0.85,
    textTransform: 'uppercase',
  },
  failReason: {
    color: '#ff4d4f',
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 8,
  },
  modalContent: {
    maxHeight: '70vh',
    overflow: 'auto',
  },
  statCard: {
    textAlign: 'center',
  },
  summaryCard: {
    marginBottom: 16,
  },
  workflowPanel: {
    '& .ant-collapse-header': {
      '& .ant-collapse-header-text': {
        fontWeight: 600,
      },
      alignItems: 'center !important',
    },
  },
});

interface NamedEntity {
  id: string;
  name: string;
}

interface QuestionEntity {
  id: string;
  name?: string;
  text: string;
}

interface GroupsCondition {
  allOrAny?: 'all' | 'any';
  failReason: string;
  groupsOnCondition?: Array<NamedEntity | string>;
  groupsOnIncident?: Array<NamedEntity | string>;
  passed: boolean;
}

interface WorkflowCondition {
  actual?: number;
  allOrAny?: 'all' | 'any';
  brandsOnCondition?: Array<NamedEntity | string>;
  brandsOnIncident?: Array<NamedEntity | string>;
  checklistTemplateId?: string;
  countriesOnCondition?: Array<NamedEntity | string>;
  countriesOnIncident?: Array<NamedEntity | string>;
  divisionsOnCondition?: Array<NamedEntity | string>;
  divisionsOnIncident?: Array<NamedEntity | string>;
  expected?: number;
  expectedTemplates?: string[];
  expectedWords?: string[];
  failReason: string;
  goodsTypesOnCondition?: Array<NamedEntity | string>;
  goodsTypesOnIncident?: Array<NamedEntity | string>;
  greaterThan?: boolean;
  passed: boolean;
  prioritiesOnCondition?: string[];
  priorityOnIncident?: string;
  questionsOnCondition?: Array<QuestionEntity | string>;
  questionsOnIncident?: Array<QuestionEntity | string>;
  score?: number;
  tagsOnCondition?: Array<NamedEntity | string>;
  tagsOnIncident?: Array<NamedEntity | string>;
  threshold?: number;
  wordsInDescription?: string[];
}

interface WorkflowActionsTriggered {
  activitiesCreated: number;
  autoApproved: boolean;
  emailsSent: number;
  notificationsSent: number;
  prioritySet: false | string;
}

interface WorkflowEvaluation {
  actionsTriggered?: WorkflowActionsTriggered;
  conditions: {
    brands?: WorkflowCondition;
    countries?: WorkflowCondition;
    description?: WorkflowCondition;
    division?: WorkflowCondition;
    goodsType?: WorkflowCondition;
    groups?: WorkflowCondition;
    lessThanValue?: WorkflowCondition;
    lossValue?: WorkflowCondition;
    priority?: WorkflowCondition;
    questions?: WorkflowCondition;
    score?: WorkflowCondition;
    tags?: WorkflowCondition;
    template?: WorkflowCondition;
    totalValue?: WorkflowCondition;
  };
  passed: boolean;
  workflowActionId?: string;
  workflowId: string;
  workflowName: string;
}

interface WorkflowResults {
  checklistId?: string;
  evaluatedAt: string;
  incidentReference?: number;
  trigger: string;
  workflows: WorkflowEvaluation[];
}

interface Props {
  onClose: () => void;
  visible: boolean;
  workflowResults: WorkflowResults | null | undefined;
}

const getEntityName = (item: NamedEntity | string): string => {
  if (typeof item === 'string') return item;
  return item.name;
};

const getEntityKey = (item: NamedEntity | string): string => {
  if (typeof item === 'string') return item;
  return item.id;
};

const getQuestionText = (item: QuestionEntity | string): string => {
  if (typeof item === 'string') return item;
  return item.text || item.name || '';
};

const getQuestionKey = (item: QuestionEntity | string): string => {
  if (typeof item === 'string') return item;
  return item.id;
};

const WorkflowResultsModal: React.FC<Props> = ({
  onClose,
  visible,
  workflowResults,
}) => {
  const classes = useStyles();
  const intl = useIntl();

  if (!workflowResults) return null;

  const passedWorkflows = workflowResults.workflows.filter((w) => w.passed);
  const failedWorkflows = workflowResults.workflows.filter((w) => !w.passed);

  const renderConditionDetails = (
    conditionName: string,
    condition: WorkflowCondition
  ) => {
    const conditionLabels: Record<string, string> = {
      brands: intl.formatMessage({ defaultMessage: 'Brands' }),
      countries: intl.formatMessage({ defaultMessage: 'Countries' }),
      description: intl.formatMessage({ defaultMessage: 'Description' }),
      division: intl.formatMessage({ defaultMessage: 'Division' }),
      goodsType: intl.formatMessage({ defaultMessage: 'Goods Type' }),
      groups: intl.formatMessage({ defaultMessage: 'Groups' }),
      lessThanValue: intl.formatMessage({ defaultMessage: 'Less Than Value' }),
      lossValue: intl.formatMessage({ defaultMessage: 'Loss Value' }),
      priority: intl.formatMessage({ defaultMessage: 'Priority' }),
      questions: intl.formatMessage({ defaultMessage: 'Questions' }),
      score: intl.formatMessage({ defaultMessage: 'Score' }),
      tags: intl.formatMessage({ defaultMessage: 'Tags' }),
      template: intl.formatMessage({ defaultMessage: 'Template' }),
      totalValue: intl.formatMessage({ defaultMessage: 'Total Value' }),
    };

    return (
      <Card
        className={classes.conditionCard}
        key={conditionName}
        size="small"
        type="inner"
      >
        <Row align="middle" gutter={8}>
          <Col>
            <FontAwesomeIcon
              color={condition.passed ? '#52c41a' : '#ff4d4f'}
              icon={condition.passed ? faCheckCircle : faExclamationCircle}
              size="lg"
            />
          </Col>
          <Col flex={1}>
            <div className={classes.conditionLabel}>
              {conditionLabels[conditionName] || conditionName}
            </div>
            <div className={classes.conditionDescription}>
              {renderConditionContent(conditionName, condition)}
            </div>
            {!condition.passed && condition.failReason && (
              <div className={classes.failReason}>{condition.failReason}</div>
            )}
          </Col>
        </Row>
      </Card>
    );
  };

  const renderConditionContent = (
    conditionName: string,
    condition: WorkflowCondition
  ): React.ReactNode => {
    // Value-based conditions
    if ('expected' in condition && 'actual' in condition) {
      return intl.formatMessage(
        {
          defaultMessage: 'Expected: {expected}, Actual: {actual}',
        },
        {
          actual: condition.actual,
          expected: condition.expected,
        }
      );
    }

    // Score condition
    if ('score' in condition && 'threshold' in condition) {
      return intl.formatMessage(
        {
          defaultMessage: 'Score {score} {comparison} threshold {threshold}',
        },
        {
          comparison: condition.greaterThan
            ? intl.formatMessage({ defaultMessage: '>' })
            : intl.formatMessage({ defaultMessage: '<' }),
          score: condition.score,
          threshold: condition.threshold,
        }
      );
    }

    // Array-based conditions
    if (conditionName === 'tags' && condition.tagsOnIncident) {
      return (
        <Space wrap>
          <Text strong style={{ opacity: 0.85 }}>
            {intl.formatMessage({ defaultMessage: 'On incident:' })}
          </Text>
          {condition.tagsOnIncident.map((tag) => (
            <Tag key={getEntityKey(tag)}>{getEntityName(tag)}</Tag>
          ))}
        </Space>
      );
    }

    if (conditionName === 'questions' && condition.questionsOnIncident) {
      return (
        <Space wrap>
          <Text strong style={{ opacity: 0.85 }}>
            {intl.formatMessage({ defaultMessage: 'On incident:' })}
          </Text>
          {condition.questionsOnIncident.map((q) => (
            <Tag key={getQuestionKey(q)}>{getQuestionText(q)}</Tag>
          ))}
        </Space>
      );
    }

    if (conditionName === 'brands' && condition.brandsOnIncident) {
      return (
        <Space wrap>
          <Text strong style={{ opacity: 0.85 }}>
            {intl.formatMessage({ defaultMessage: 'On incident:' })}
          </Text>
          {condition.brandsOnIncident.map((brand) => (
            <Tag key={getEntityKey(brand)}>{getEntityName(brand)}</Tag>
          ))}
        </Space>
      );
    }

    if (conditionName === 'priority' && condition.priorityOnIncident) {
      return (
        <Space>
          <Text strong style={{ opacity: 0.85 }}>
            {intl.formatMessage({ defaultMessage: 'Priority:' })}
          </Text>
          <Tag>{condition.priorityOnIncident}</Tag>
        </Space>
      );
    }

    if (conditionName === 'countries' && condition.countriesOnIncident) {
      return (
        <Space wrap>
          <Text strong style={{ opacity: 0.85 }}>
            {intl.formatMessage({ defaultMessage: 'On incident:' })}
          </Text>
          {condition.countriesOnIncident.map((country) => (
            <Tag key={getEntityKey(country)}>{getEntityName(country)}</Tag>
          ))}
        </Space>
      );
    }

    if (conditionName === 'division' && condition.divisionsOnIncident) {
      return (
        <Space wrap>
          <Text strong style={{ opacity: 0.85 }}>
            {intl.formatMessage({ defaultMessage: 'On incident:' })}
          </Text>
          {condition.divisionsOnIncident.map((division) => (
            <Tag key={getEntityKey(division)}>{getEntityName(division)}</Tag>
          ))}
        </Space>
      );
    }

    if (conditionName === 'goodsType' && condition.goodsTypesOnIncident) {
      return (
        <Space wrap>
          <Text strong style={{ opacity: 0.85 }}>
            {intl.formatMessage({ defaultMessage: 'On incident:' })}
          </Text>
          {condition.goodsTypesOnIncident.map((goodsType) => (
            <Tag key={getEntityKey(goodsType)}>{getEntityName(goodsType)}</Tag>
          ))}
        </Space>
      );
    }

    if (conditionName === 'groups') {
      const groupsCondition = condition as GroupsCondition & WorkflowCondition;
      if (groupsCondition.groupsOnIncident) {
        return (
          <Space wrap>
            <Text strong style={{ opacity: 0.85 }}>
              {intl.formatMessage({ defaultMessage: 'On incident:' })}
            </Text>
            {groupsCondition.groupsOnIncident.map((group) => (
              <Tag key={getEntityKey(group)}>{getEntityName(group)}</Tag>
            ))}
          </Space>
        );
      }
    }

    if (conditionName === 'description' && condition.wordsInDescription) {
      return (
        <Space wrap>
          <Text strong style={{ opacity: 0.85 }}>
            {intl.formatMessage({ defaultMessage: 'Words found:' })}
          </Text>
          {condition.wordsInDescription.map((word) => (
            <Tag key={word}>{word}</Tag>
          ))}
        </Space>
      );
    }

    return intl.formatMessage({ defaultMessage: 'Condition evaluated' });
  };

  const renderActionsTriggered = (actions: WorkflowActionsTriggered) => (
    <Card
      size="small"
      title={intl.formatMessage({ defaultMessage: 'Actions Triggered' })}
      type="inner"
    >
      <Row gutter={[16, 16]}>
        {actions.emailsSent > 0 && (
          <Col span={12}>
            <Statistic
              title={intl.formatMessage({ defaultMessage: 'Emails Sent' })}
              value={actions.emailsSent}
            />
          </Col>
        )}
        {actions.notificationsSent > 0 && (
          <Col span={12}>
            <Statistic
              title={intl.formatMessage({
                defaultMessage: 'Notifications Sent',
              })}
              value={actions.notificationsSent}
            />
          </Col>
        )}
        {actions.activitiesCreated > 0 && (
          <Col span={12}>
            <Statistic
              title={intl.formatMessage({
                defaultMessage: 'Activities Created',
              })}
              value={actions.activitiesCreated}
            />
          </Col>
        )}
        {actions.autoApproved && (
          <Col span={12}>
            <Tag color="green" style={{ fontSize: 14, padding: '8px 16px' }}>
              {intl.formatMessage({ defaultMessage: 'Auto Approved' })}
            </Tag>
          </Col>
        )}
        {actions.prioritySet && typeof actions.prioritySet === 'string' && (
          <Col span={12}>
            <div>
              <Text type="secondary">
                {intl.formatMessage({ defaultMessage: 'Priority Set:' })}
              </Text>
              <Tag color="orange" style={{ marginLeft: 8 }}>
                {actions.prioritySet}
              </Tag>
            </div>
          </Col>
        )}
      </Row>
    </Card>
  );

  return (
    <Modal
      footer={null}
      onCancel={onClose}
      open={visible}
      title={intl.formatMessage({
        defaultMessage: 'Workflow Evaluation Results',
      })}
      width={900}
    >
      <div className={classes.modalContent}>
        {/* Summary Section */}
        <Card className={classes.summaryCard}>
          <Descriptions column={2} size="small">
            <Descriptions.Item
              label={intl.formatMessage({ defaultMessage: 'Evaluated At' })}
            >
              {dayjs(workflowResults.evaluatedAt).format('DD/MM/YYYY HH:mm:ss')}
            </Descriptions.Item>
            <Descriptions.Item
              label={intl.formatMessage({ defaultMessage: 'Trigger' })}
            >
              <Tag color="blue">{workflowResults.trigger}</Tag>
            </Descriptions.Item>
            {workflowResults.incidentReference && (
              <Descriptions.Item
                label={intl.formatMessage({ defaultMessage: 'Alert ID' })}
              >
                {workflowResults.incidentReference}
              </Descriptions.Item>
            )}
            {workflowResults.checklistId && (
              <Descriptions.Item
                label={intl.formatMessage({ defaultMessage: 'Checklist ID' })}
              >
                {workflowResults.checklistId}
              </Descriptions.Item>
            )}
          </Descriptions>

          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Card className={classes.statCard} size="small">
                <Statistic
                  prefix={
                    <FontAwesomeIcon color="#52c41a" icon={faCheckCircle} />
                  }
                  title={intl.formatMessage({ defaultMessage: 'Passed' })}
                  value={passedWorkflows.length}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card className={classes.statCard} size="small">
                <Statistic
                  prefix={
                    <FontAwesomeIcon
                      color="#ff4d4f"
                      icon={faExclamationCircle}
                    />
                  }
                  title={intl.formatMessage({ defaultMessage: 'Failed' })}
                  value={failedWorkflows.length}
                />
              </Card>
            </Col>
          </Row>
        </Card>

        {/* Workflows Section */}
        <Title level={5}>
          {intl.formatMessage({ defaultMessage: 'Workflow Details' })}
        </Title>
        <Collapse accordion className={classes.workflowPanel}>
          {workflowResults.workflows.map((workflow) => (
            <Panel
              extra={
                <Badge
                  count={
                    workflow.passed
                      ? intl.formatMessage({ defaultMessage: 'PASSED' })
                      : intl.formatMessage({ defaultMessage: 'FAILED' })
                  }
                  style={{
                    backgroundColor: workflow.passed ? '#52c41a' : '#ff4d4f',
                  }}
                />
              }
              header={
                <Space>
                  <FontAwesomeIcon
                    color={workflow.passed ? '#52c41a' : '#ff4d4f'}
                    icon={workflow.passed ? faCheckCircle : faExclamationCircle}
                  />
                  <Text strong>{workflow.workflowName}</Text>
                </Space>
              }
              key={workflow.workflowId}
            >
              {/* Conditions */}
              <div style={{ marginBottom: 16 }}>
                <Title level={5} style={{ marginBottom: 12 }}>
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    style={{ marginRight: 8 }}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'Conditions Evaluated',
                  })}
                </Title>
                {Object.entries(workflow.conditions).map(([key, condition]) =>
                  renderConditionDetails(key, condition)
                )}
              </div>

              {/* Actions Triggered */}
              {workflow.actionsTriggered &&
                renderActionsTriggered(workflow.actionsTriggered)}
            </Panel>
          ))}
        </Collapse>
      </div>
    </Modal>
  );
};

export default WorkflowResultsModal;
