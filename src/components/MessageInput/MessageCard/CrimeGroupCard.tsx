import type { CrimeGroupData } from 'types/DataType';

import { faCircleXmark } from '@fortawesome/pro-light-svg-icons';
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
  crimeGroup: CrimeGroupData;
  removeCrimeGroup?: (value: string | undefined) => void;
  saving?: boolean;
}

const CrimeGroupCard = ({ crimeGroup, removeCrimeGroup, saving }: Props) => {
  const intl = useIntl();
  return (
    <Card
      bodyStyle={{
        marginBottom: -5,
        paddingLeft: 2,
        paddingTop: 5,
      }}
      className="message-card"
      size="small"
      style={{ height: 100, width: 120 }}
    >
      <Row gutter={5} wrap={false}>
        {removeCrimeGroup && (
          <Popconfirm
            cancelText={intl.formatMessage({
              defaultMessage: 'No',
            })}
            okText={intl.formatMessage({ defaultMessage: 'Yes' })}
            onConfirm={() => removeCrimeGroup(crimeGroup.id)}
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
              style={{ position: 'absolute', right: -5, top: -5, zIndex: 100 }}
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

          <Descriptions column={1} size="small">
            {crimeGroup.alias && (
              <Descriptions.Item
                label={intl.formatMessage({
                  defaultMessage: 'Alert ID',
                })}
                style={{ paddingBottom: 0 }}
              >
                {crimeGroup.reference}
              </Descriptions.Item>
            )}

            <Descriptions.Item
              label={intl.formatMessage({
                defaultMessage: 'Members',
              })}
            >
              {crimeGroup?.totalOffenders || 0}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};

export default CrimeGroupCard;
