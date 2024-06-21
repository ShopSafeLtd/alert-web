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
import WatermarkImage from 'components/images/WatermarkImage.view';
import type { IncidentCardData } from 'types/DataType';
import { useIntl } from 'react-intl';

const { Paragraph } = Typography;

interface Props {
  incident: IncidentCardData;
  removeIncident?: (value: string | undefined) => void;
  saving?: boolean;
}

const IncidentCard = ({ incident, removeIncident, saving }: Props) => {
  const intl = useIntl();
  return (
    <Card
      style={{
        margin: removeIncident ? 0 : 5,
        overflow: 'hidden',
      }}
      bodyStyle={{
        padding: 0,
        marginLeft: -2,
      }}
      size="small"
      className="message-card"
    >
      <Row gutter={5} wrap={false}>
        {removeIncident && (
          <Popconfirm
            placement="topLeft"
            trigger="click"
            title={intl.formatMessage({
              defaultMessage: 'Remove the incident?',
            })}
            onConfirm={() => removeIncident(incident.id)}
            okText={intl.formatMessage({ defaultMessage: 'Yes' })}
            cancelText={intl.formatMessage({
              defaultMessage: 'No',
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
        <Col>
          {incident?.images && incident.images.length > 0 && (
            <div style={{ width: 100, height: 100 }}>
              <WatermarkImage
                url={
                  incident.images[0].optimised || incident.images[0].url || ''
                }
              />
            </div>
          )}
        </Col>
        <Col
          flex={1}
          style={{
            marginTop: 10,
            marginLeft: 5,
          }}
        >
          <Paragraph
            strong
            ellipsis
            style={{
              marginBottom: '0.5rem',
              fontSize: 15,
            }}
          >
            {incident.subject}
          </Paragraph>
          <Descriptions size="small">
            <Descriptions.Item
              label={intl.formatMessage({
                defaultMessage: 'Created At',
              })}
            >
              {incident.dayTime}
            </Descriptions.Item>
          </Descriptions>
          <Paragraph
            type="secondary"
            ellipsis
            style={{
              marginBottom: '0.5rem',
            }}
          >
            {incident.description}
          </Paragraph>
        </Col>
      </Row>
    </Card>
  );
};

export default IncidentCard;
