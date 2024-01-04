import React from 'react';
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
import type { CrimeGroupData } from 'types/DataType';
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
      style={{ width: 120, height: 100 }}
      bodyStyle={{
        paddingTop: 5,
        paddingLeft: 2,
        marginBottom: -5,
      }}
      size="small"
      className="message-card"
    >
      <Row gutter={5} wrap={false}>
        {removeCrimeGroup && (
          <Popconfirm
            placement="topLeft"
            trigger="click"
            title={intl.formatMessage({
              defaultMessage: 'Remove the crime group?',
              id: 'Ek+T43',
            })}
            onConfirm={() => removeCrimeGroup(crimeGroup.id)}
            okText={intl.formatMessage({ defaultMessage: 'Yes', id: 'a5msuh' })}
            cancelText={intl.formatMessage({
              defaultMessage: 'No',
              id: 'oUWADl',
            })}
            overlayInnerStyle={{ padding: 10 }}
          >
            <Button
              size="small"
              disabled={saving}
              style={{ position: 'absolute', top: -5, right: -5, zIndex: 100 }}
              shape="circle"
              type="text"
              icon={<FontAwesomeIcon icon={faCircleXmark} size="lg" />}
            />
          </Popconfirm>
        )}

        <Col flex={1} style={{ marginTop: 10, marginLeft: 5 }}>
          <Title ellipsis level={4} style={{ marginBottom: 5 }}>
            {crimeGroup.alias ||
              intl.formatMessage(
                {
                  defaultMessage: 'Alert ID: {ref}',
                  id: 'umL9sI',
                },
                { ref: crimeGroup.reference }
              )}
          </Title>

          <Descriptions size="small" column={1}>
            {crimeGroup.alias && (
              <Descriptions.Item
                style={{ paddingBottom: 0 }}
                label={intl.formatMessage({
                  defaultMessage: 'Alert ID',
                  id: 'k8ZNgH',
                })}
              >
                {crimeGroup.reference}
              </Descriptions.Item>
            )}

            <Descriptions.Item
              label={intl.formatMessage({
                defaultMessage: 'Members',
                id: '+a+2ug',
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
