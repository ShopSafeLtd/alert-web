import type { ColumnsType } from 'antd/es/table/interface';

import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import { faPenToSquare } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row, Tag, Tooltip } from 'antd';
import {
  AiVisionMatchConfidence,
  AiVisionMatchPriority,
  DetectActionType,
  PermissionMethod,
  PermissionModel,
  SortOrder,
} from 'graphql/types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router';

import type { FilterState } from './useListDetectionConfigs';

interface DetectionConfigItem {
  cameraCount: number;
  id: string;
  key: string;
  minimumConfidenceTrigger: AiVisionMatchConfidence;
  minimumPriorityTrigger: AiVisionMatchPriority;
  name: string;
  type: DetectActionType;
}

const getActionTypeLabel = (type: DetectActionType) => {
  switch (type) {
    case DetectActionType.Activity: {
      return 'Activity';
    }
    case DetectActionType.Email: {
      return 'Email';
    }
    case DetectActionType.PushNotification: {
      return 'Push Notification';
    }
    case DetectActionType.Sms: {
      return 'SMS';
    }
    default: {
      return type;
    }
  }
};

const getConfidenceLabel = (confidence: AiVisionMatchConfidence) => {
  switch (confidence) {
    case AiVisionMatchConfidence.High: {
      return 'High';
    }
    case AiVisionMatchConfidence.Medium: {
      return 'Medium';
    }
    case AiVisionMatchConfidence.Low: {
      return 'Low';
    }
    default: {
      return confidence;
    }
  }
};

const getPriorityLabel = (priority: AiVisionMatchPriority) => {
  switch (priority) {
    case AiVisionMatchPriority.Critical: {
      return 'Critical';
    }
    case AiVisionMatchPriority.High: {
      return 'High';
    }
    case AiVisionMatchPriority.Normal: {
      return 'Normal';
    }
    case AiVisionMatchPriority.Low: {
      return 'Low';
    }
    default: {
      return priority;
    }
  }
};

const getPriorityColor = (priority: AiVisionMatchPriority) => {
  switch (priority) {
    case AiVisionMatchPriority.Critical: {
      return 'red';
    }
    case AiVisionMatchPriority.High: {
      return 'orange';
    }
    case AiVisionMatchPriority.Normal: {
      return 'blue';
    }
    case AiVisionMatchPriority.Low: {
      return 'green';
    }
    default: {
      return 'default';
    }
  }
};

interface UseCreateColumnsProps {
  filterState: FilterState;
}

const useCreateColumns = ({ filterState }: UseCreateColumnsProps) => {
  const navigate = useNavigate();

  const columns: ColumnsType<DetectionConfigItem> = [
    {
      dataIndex: 'name',
      key: 'name',
      title: <FormattedMessage defaultMessage="Name" />,
    },
    {
      dataIndex: 'type',
      filteredValue: filterState.type.length > 0 ? filterState.type : null,
      filters: [
        {
          text: 'Activity',
          value: DetectActionType.Activity,
        },
        {
          text: 'Email',
          value: DetectActionType.Email,
        },
        {
          text: 'Push Notification',
          value: DetectActionType.PushNotification,
        },
        {
          text: 'SMS',
          value: DetectActionType.Sms,
        },
      ],
      key: 'type',
      render: (type: DetectActionType) => <Tag>{getActionTypeLabel(type)}</Tag>,
      title: <FormattedMessage defaultMessage="Type" />,
    },
    {
      dataIndex: 'minimumConfidenceTrigger',
      key: 'minimumConfidenceTrigger',
      render: (confidence: AiVisionMatchConfidence) => (
        <Tag
          color={
            confidence === AiVisionMatchConfidence.High
              ? 'green'
              : confidence === AiVisionMatchConfidence.Medium
                ? 'orange'
                : 'red'
          }
        >
          {getConfidenceLabel(confidence)}
        </Tag>
      ),
      title: <FormattedMessage defaultMessage="Min Confidence" />,
    },
    {
      dataIndex: 'minimumPriorityTrigger',
      key: 'minimumPriorityTrigger',
      render: (priority: AiVisionMatchPriority) => (
        <Tag color={getPriorityColor(priority)}>
          {getPriorityLabel(priority)}
        </Tag>
      ),
      title: <FormattedMessage defaultMessage="Min Priority" />,
    },
    {
      dataIndex: 'cameraCount',
      key: 'cameraCount',
      sortOrder: filterState.cameraSort
        ? filterState.cameraSort === SortOrder.Asc
          ? 'ascend'
          : 'descend'
        : null,
      sorter: true,
      title: <FormattedMessage defaultMessage="Cameras" />,
    },
    {
      dataIndex: 'action',
      key: 'action',
      render: (_, record: DetectionConfigItem) => (
        <Row gutter={8} wrap={false}>
          <PermissionCheckWrapper
            permission={{
              method: PermissionMethod.Edit,
              model: PermissionModel.VisionAi,
            }}
            unauthorizedElement={<div />}
          >
            <Col>
              <Tooltip title={<FormattedMessage defaultMessage="Edit" />}>
                <Button
                  icon={<FontAwesomeIcon icon={faPenToSquare} />}
                  onClick={() => {
                    navigate(`edit/${record.key}`);
                  }}
                  size="small"
                  style={{ marginRight: 5 }}
                />
              </Tooltip>
            </Col>
          </PermissionCheckWrapper>
        </Row>
      ),
      title: '',
      width: 100,
    },
  ];

  return columns;
};

export default useCreateColumns;
export type { DetectionConfigItem };
