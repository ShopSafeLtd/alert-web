import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';

import {
  faCircle,
  faDiagramProject,
  faKey,
  faPlus,
  faToggleOff,
  faToggleOn,
  faTrash,
  faUserPlus,
  faUserSlash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Empty, Timeline, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

import WorkflowResultsModal from './WorkflowResultsModal.view';

// Define extended action type with workflow results
type ActionWithWorkflowResults = {
  workflowResults?: {
    checklistId?: string;
    evaluatedAt: string;
    incidentReference?: number;
    trigger: string;
    workflows: unknown[];
  };
} & NonNullable<NonNullable<Props['actions']>[number]>;

dayjs.extend(relativeTime);

const useStyles = createUseStyles({
  actionDescription: {
    color: '#595959',
  },
  actionMeta: {
    color: '#8c8c8c',
    fontSize: 12,
    marginBottom: 8,
  },
  actionTitle: {
    fontWeight: 500,
    marginBottom: 4,
  },
  container: {
    padding: '16px',
  },
  entityLink: {
    '&:hover': {
      textDecoration: 'underline',
    },
    color: '#1890ff',
    cursor: 'pointer',
  },
  timelineItem: {
    paddingBottom: 20,
  },
  viewResultsButton: {
    fontSize: 12,
    height: 24,
    marginTop: 8,
    padding: '0 12px',
  },
});

type ActionData = Exclude<
  Exclude<ViewIncidentQuery['incident'], null | undefined>['actions'],
  null | undefined
>[0];

interface Props {
  actions:
    | Exclude<
        Exclude<ViewIncidentQuery['incident'], null | undefined>['actions'],
        null | undefined
      >
    | null
    | undefined;
  onEntityClick?: (entityType: string, entityId: string) => void;
}

const getActionIcon = (
  type: string
): { color: string; icon: typeof faCircle } => {
  switch (type.toUpperCase()) {
    case 'CREATE': {
      return { color: '#52c41a', icon: faPlus };
    }
    case 'DELETE': {
      return { color: '#ff4d4f', icon: faTrash };
    }
    case 'ADD': {
      return { color: '#1890ff', icon: faPlus };
    }
    case 'REMOVE': {
      return { color: '#ff4d4f', icon: faUserSlash };
    }
    case 'INVITE': {
      return { color: '#722ed1', icon: faUserPlus };
    }
    case 'ENABLE': {
      return { color: '#52c41a', icon: faToggleOn };
    }
    case 'DISABLE': {
      return { color: '#ff7a45', icon: faToggleOff };
    }
    case 'EXTEND': {
      return { color: '#13c2c2', icon: faPlus };
    }
    case 'REDUCE': {
      return { color: '#faad14', icon: faTrash };
    }
    case 'RESET_PASSWORD': {
      return { color: '#1890ff', icon: faKey };
    }
    case 'WORKFLOW_CHECK': {
      return { color: '#722ed1', icon: faDiagramProject };
    }
    default: {
      return { color: '#d9d9d9', icon: faCircle };
    }
  }
};

const HistoryTimeline: React.FC<Props> = ({ actions }) => {
  const classes = useStyles();
  const intl = useIntl();
  const [selectedWorkflowResults, setSelectedWorkflowResults] = useState<
    ActionWithWorkflowResults['workflowResults'] | null
  >(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleViewWorkflowResults = (
    workflowResults: ActionWithWorkflowResults['workflowResults']
  ) => {
    setSelectedWorkflowResults(workflowResults);
    setModalVisible(true);
  };

  const timelineItems = useMemo(() => {
    if (!actions || actions.length === 0) return [];

    return actions.map((action) => {
      const { color, icon } = getActionIcon(action.type || 'CREATE');
      const isWorkflowCheck = action.type?.toUpperCase() === 'WORKFLOW_CHECK';

      return {
        children: (
          <div className={classes.timelineItem}>
            <div className={classes.actionTitle}>
              {getActionDescription(action, intl)}
              {action.reference && (
                <span style={{ color: '#8c8c8c', marginLeft: 8 }}>
                  {intl.formatMessage(
                    { defaultMessage: '#{reference}' },
                    { reference: action.reference }
                  )}
                </span>
              )}
            </div>
            <div className={classes.actionMeta}>
              <Avatar
                size="small"
                style={{ backgroundColor: '#1890ff', marginRight: 8 }}
              >
                {action.byUser.fullName
                  ?.split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase() || intl.formatMessage({ defaultMessage: '?' })}
              </Avatar>
              <span>
                {action.byUser.fullName ||
                  intl.formatMessage({ defaultMessage: 'Unknown user' })}
              </span>
              <span>{intl.formatMessage({ defaultMessage: ' • ' })}</span>
              <Tooltip
                title={dayjs(action.createdAt).format('DD/MM/YYYY HH:mm:ss')}
              >
                <span>{dayjs(action.createdAt).fromNow()}</span>
              </Tooltip>
            </div>
            {isWorkflowCheck &&
              (action as ActionWithWorkflowResults).workflowResults && (
                <Button
                  className={classes.viewResultsButton}
                  onClick={() =>
                    handleViewWorkflowResults(
                      (action as ActionWithWorkflowResults).workflowResults
                    )
                  }
                  size="small"
                  type="link"
                >
                  {intl.formatMessage({ defaultMessage: 'View Results' })}
                </Button>
              )}
          </div>
        ),
        color,
        dot: <FontAwesomeIcon icon={icon} />,
        key: action.id,
      };
    });
  }, [actions, classes, intl]);

  if (!actions || actions.length === 0) {
    return (
      <Empty
        description={intl.formatMessage({
          defaultMessage: 'No history available',
        })}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }

  return (
    <div className={classes.container}>
      <Typography.Title level={4} style={{ marginBottom: 24 }}>
        {intl.formatMessage({ defaultMessage: 'History' })}
      </Typography.Title>
      <Timeline>
        {timelineItems.map((item) => (
          <Timeline.Item color={item.color} dot={item.dot} key={item.key}>
            {item.children}
          </Timeline.Item>
        ))}
      </Timeline>
      <WorkflowResultsModal
        onClose={() => {
          setModalVisible(false);
          setSelectedWorkflowResults(null);
        }}
        visible={modalVisible}
        workflowResults={selectedWorkflowResults}
      />
    </div>
  );
};

const getActionDescription = (
  action: ActionData,
  intl: ReturnType<typeof useIntl>
): string => {
  if (action.description) return action.description;
  if (action.reason) return action.reason;

  // Default message based on action type
  const actionMessages: Record<string, string> = {
    ADD: intl.formatMessage({ defaultMessage: 'Added' }),
    CREATE: intl.formatMessage({ defaultMessage: 'Created' }),
    DELETE: intl.formatMessage({ defaultMessage: 'Deleted' }),
    DISABLE: intl.formatMessage({ defaultMessage: 'Disabled' }),
    ENABLE: intl.formatMessage({ defaultMessage: 'Enabled' }),
    EXTEND: intl.formatMessage({ defaultMessage: 'Extended' }),
    INVITE: intl.formatMessage({ defaultMessage: 'Invited' }),
    REDUCE: intl.formatMessage({ defaultMessage: 'Reduced' }),
    REMOVE: intl.formatMessage({ defaultMessage: 'Removed' }),
    RESET_PASSWORD: intl.formatMessage({ defaultMessage: 'Reset password' }),
    WORKFLOW_CHECK: intl.formatMessage({
      defaultMessage: 'Workflows evaluated',
    }),
  };

  return (
    actionMessages[action.type?.toUpperCase() || ''] ||
    intl.formatMessage({ defaultMessage: 'Action performed' })
  );
};

export default HistoryTimeline;
