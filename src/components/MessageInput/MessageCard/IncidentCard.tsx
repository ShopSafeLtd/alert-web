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
import { IncidentCardData } from 'types/DataType';

const { Paragraph } = Typography;

interface Props {
  incident: IncidentCardData;
  removeIncident?: (value: string | undefined) => void;
  saving?: boolean;
}

const IncidentCard = ({ incident, removeIncident, saving }: Props) => (
  <Card
    style={{
      margin: removeIncident ? 0 : 5,
      maxWidth: 370,
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
          title="Remove the incident?"
          onConfirm={() => removeIncident(incident.id)}
          okText="Yes"
          cancelText="No"
          overlayInnerStyle={{ padding: 10 }}
        >
          <Button
            size="small"
            disabled={saving}
            className="info-remove-button"
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
              url={incident.images[0].optimised || incident.images[0].url || ''}
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
          <Descriptions.Item label="Created At">
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

export default IncidentCard;
