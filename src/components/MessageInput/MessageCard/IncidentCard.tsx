import type { IncidentCardData } from 'types/DataType';

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
import React from 'react';
import { useIntl } from 'react-intl';

const { Paragraph } = Typography;

interface Props {
  incident: IncidentCardData;
  removeIncident?: (value: string | undefined) => void;
  saving?: boolean;
  triggerLightbox?: (elements: { src: string }[], index: number) => void;
}

const IncidentCard = ({
  incident,
  removeIncident,
  saving,
  triggerLightbox,
}: Props) => {
  const intl = useIntl();
  return (
    <Card
      bodyStyle={{
        marginLeft: -2,
        padding: 0,
      }}
      className="message-card"
      size="small"
      style={{
        margin: removeIncident ? 0 : 5,
        overflow: 'hidden',
      }}
    >
      <Row gutter={5} wrap={false}>
        {removeIncident && (
          <Popconfirm
            cancelText={intl.formatMessage({
              defaultMessage: 'No',
            })}
            okText={intl.formatMessage({ defaultMessage: 'Yes' })}
            onConfirm={() => removeIncident(incident.id)}
            overlayInnerStyle={{ padding: 10 }}
            placement="topLeft"
            title={intl.formatMessage({
              defaultMessage: 'Remove the incident?',
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
        <Col>
          {incident?.images && incident.images.length > 0 && (
            <div style={{ height: 100, width: 100 }}>
              <WatermarkImage
                triggerLightbox={triggerLightbox}
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
            marginLeft: 5,
            marginTop: 10,
          }}
        >
          <Paragraph
            ellipsis
            strong
            style={{
              fontSize: 15,
              marginBottom: '0.5rem',
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
            ellipsis
            style={{
              marginBottom: '0.5rem',
            }}
            type="secondary"
          >
            {incident.description}
          </Paragraph>
        </Col>
      </Row>
    </Card>
  );
};

export default IncidentCard;
