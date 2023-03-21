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
import { OffenderCardData } from 'types/DataType';
import moment from 'moment';

const { Title } = Typography;

interface Props {
  offender: OffenderCardData;
  removeOffender?: (value: string | undefined) => void;
  saving?: boolean;
}

const OffenderCard = ({ offender, removeOffender, saving }: Props) => (
  <Card
    style={{
      margin: removeOffender ? 0 : 5,
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
      {removeOffender && (
        <Popconfirm
          placement="topLeft"
          trigger="click"
          title="Remove the offender?"
          onConfirm={() => removeOffender(offender.id)}
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
        {offender.images && offender.images.length > 0 && (
          <div style={{ width: 100, height: 100 }}>
            <WatermarkImage url={offender.images[0].optimised} />
          </div>
        )}
      </Col>

      <Col flex={1} style={{ marginTop: 10, marginLeft: 5 }}>
        <Title level={4}> {offender.name}</Title>
        <Descriptions size="small">
          <Descriptions.Item label="Last Active">
            {moment(offender.updatedAt || moment()).format(
              `ddd MMM DD YYYY - HH:mm`
            )}
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  </Card>
);

export default OffenderCard;
