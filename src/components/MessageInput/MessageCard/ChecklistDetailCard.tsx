import type { ChecklistData } from 'types/DataType';

import { ChecklistStatus } from '#/graphql/types';
import {
  faBadgeCheck,
  faBadgePercent,
  faCircleXmark,
  faHundredPoints,
  faShop,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Popconfirm,
  Row,
  Typography,
} from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

const { Title } = Typography;

interface Props {
  checklist: ChecklistData;
  onDelete?: (value: string | undefined) => void;
  saving?: boolean;
}

const ChecklistDetailCard = ({ checklist, onDelete, saving }: Props) => {
  const intl = useIntl();

  return (
    <Card
      bodyStyle={{
        padding: '5px 10px',
      }}
      size="small"
      style={{
        height: 140,
      }}
    >
      <Row gutter={5} wrap={false}>
        {onDelete && (
          <Popconfirm
            cancelText={intl.formatMessage({
              defaultMessage: 'No',
            })}
            okText={intl.formatMessage({ defaultMessage: 'Yes' })}
            onConfirm={() => onDelete(checklist.id)}
            overlayInnerStyle={{ padding: 10 }}
            placement="topLeft"
            title={intl.formatMessage({
              defaultMessage: 'Remove the checklist?',
            })}
            trigger="click"
          >
            <Button
              disabled={saving}
              icon={<FontAwesomeIcon icon={faCircleXmark} size="lg" />}
              shape="circle"
              size="small"
              style={{ position: 'absolute', right: 0, top: 0, zIndex: 100 }}
              type="text"
            />
          </Popconfirm>
        )}

        <Col flex={1} style={{ marginLeft: 5, marginTop: 10 }}>
          <Title ellipsis level={4} style={{ marginBottom: 5 }}>
            {checklist.name}
          </Title>
          <Descriptions column={1}>
            <Descriptions.Item
              label={
                <span>
                  <FontAwesomeIcon icon={faShop} style={{ marginRight: 5 }} />
                  {intl.formatMessage({
                    defaultMessage: 'Business',
                  })}
                </span>
              }
              style={{ paddingBottom: 0 }}
            >
              {checklist.business?.name}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <span>
                  <FontAwesomeIcon
                    icon={faBadgePercent}
                    style={{ marginRight: 8 }}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'percentComplete',
                  })}
                </span>
              }
              style={{ paddingBottom: 0 }}
            >
              {checklist?.percentComplete || 0}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span>
                  <FontAwesomeIcon
                    icon={faHundredPoints}
                    style={{ marginRight: 8 }}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'score',
                  })}
                </span>
              }
              style={{ paddingBottom: 0 }}
            >
              {checklist.percentageScore || 0}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span>
                  <FontAwesomeIcon
                    icon={faBadgeCheck}
                    style={{ marginRight: 8 }}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'status',
                  })}
                </span>
              }
              style={{ paddingBottom: 0 }}
            >
              {checklist.status === ChecklistStatus.InProgress ? (
                <Typography.Text type="warning">
                  {intl.formatMessage({
                    defaultMessage: 'In Progress',
                  })}
                </Typography.Text>
              ) : (
                <Typography.Text type="success">
                  {intl.formatMessage({
                    defaultMessage: 'Completed',
                  })}
                </Typography.Text>
              )}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};

export default ChecklistDetailCard;
