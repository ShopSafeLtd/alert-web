import type { InvestigationData } from 'types/DataType';

import { InvestigationStatus } from '#/graphql/types';
import GetInvestigationStatusValues from '#/types/enums/investigation-status';
import {
  faBadgeCheck,
  faCircleXmark,
  faClock,
  faIdCardClip,
  faSquareXmark,
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
  investigation: InvestigationData;
  onDelete?: (value: string | undefined) => void;
  saving?: boolean;
}
const getTextStatus = (value: InvestigationStatus) => {
  if (value === InvestigationStatus.Open) return 'success';
  if (value === InvestigationStatus.Closed) return 'danger';
  if (value === InvestigationStatus.Paused) return 'warning';
  return 'success';
};
const InvestigationDetailCard = ({
  investigation,
  onDelete,
  saving,
}: Props) => {
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
            onConfirm={() => onDelete(investigation.id)}
            overlayInnerStyle={{ padding: 10 }}
            placement="topLeft"
            title={intl.formatMessage({
              defaultMessage: 'Remove the investigation?',
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
            {investigation.name}
          </Title>
          <Descriptions column={1} size="small">
            <Descriptions.Item
              label={
                <span>
                  <FontAwesomeIcon
                    icon={faIdCardClip}
                    style={{ marginRight: 5 }}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'ID',
                  })}
                </span>
              }
              style={{ paddingBottom: 0 }}
            >
              {investigation.reference}
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
              <Typography.Text type={getTextStatus(investigation.status)}>
                {GetInvestigationStatusValues[investigation.status]}
              </Typography.Text>
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span>
                  <FontAwesomeIcon icon={faClock} style={{ marginRight: 8 }} />
                  {intl.formatMessage({
                    defaultMessage: 'Date Opened',
                  })}
                </span>
              }
              style={{ paddingBottom: 0 }}
            >
              {investigation.createdAt}
            </Descriptions.Item>

            {investigation.closedAt && (
              <Descriptions.Item
                label={
                  <span>
                    <FontAwesomeIcon
                      icon={faSquareXmark}
                      style={{ marginRight: 8 }}
                    />
                    {intl.formatMessage({
                      defaultMessage: 'Date Closed',
                    })}
                  </span>
                }
                style={{ paddingBottom: 0 }}
              >
                {investigation.closedAt}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};

export default InvestigationDetailCard;
