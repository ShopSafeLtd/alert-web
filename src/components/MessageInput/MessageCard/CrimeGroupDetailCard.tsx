import type { CrimeGroupData } from 'types/DataType';

import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  faCircleXmark,
  faExclamationCircle,
  faIdCardClip,
  faSterlingSign,
  faUsers,
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
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';

const { Title } = Typography;

interface Props {
  crimeGroup: CrimeGroupData;
  onDelete?: (value: string | undefined) => void;
  saving?: boolean;
}

const CrimeGroupDetailCard = ({ crimeGroup, onDelete, saving }: Props) => {
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);

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
            onConfirm={() => onDelete(crimeGroup.id)}
            overlayInnerStyle={{ padding: 10 }}
            placement="topLeft"
            title={intl.formatMessage({
              defaultMessage: 'Remove the crime group?',
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
            {crimeGroup.alias ||
              intl.formatMessage(
                {
                  defaultMessage: 'Alert ID: {ref}',
                },
                { ref: crimeGroup.reference }
              )}
          </Title>
          <Descriptions column={1}>
            {crimeGroup.alias && (
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
                {crimeGroup.reference}
              </Descriptions.Item>
            )}
            <Descriptions.Item
              label={
                <span>
                  <FontAwesomeIcon icon={faUsers} style={{ marginRight: 5 }} />
                  {intl.formatMessage({
                    defaultMessage: 'Members',
                  })}
                </span>
              }
              style={{ paddingBottom: 0 }}
            >
              {crimeGroup?.totalOffenders || 0}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span>
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    style={{ marginRight: 8 }}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'Incidents',
                  })}
                </span>
              }
              style={{ paddingBottom: 0 }}
            >
              {crimeGroup.totalIncidents || 0}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span>
                  <FontAwesomeIcon
                    icon={faSterlingSign}
                    style={{ marginRight: 12 }}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'Loss',
                  })}
                </span>
              }
              style={{ paddingBottom: 0 }}
            >
              {intl.formatNumber(crimeGroup.totalValue || 0, {
                currency,
                style: 'currency',
              })}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};

export default CrimeGroupDetailCard;
