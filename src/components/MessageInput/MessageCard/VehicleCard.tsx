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
import { VehicleData } from 'types/DataType';

const { Paragraph } = Typography;

interface Props {
  vehicle: VehicleData;
  removeVehicle?: (value: string | undefined) => void;
  saving?: boolean;
}

const VehicleCard = ({ vehicle, removeVehicle, saving }: Props) => (
  <Card
    style={{ margin: removeVehicle ? 0 : 5, maxWidth: 370, overflow: 'hidden' }}
    bodyStyle={{
      padding: 0,
      marginLeft: -2,
    }}
    size="small"
    className="message-card"
  >
    <Row gutter={5} wrap={false}>
      {removeVehicle && (
        <Popconfirm
          placement="topLeft"
          trigger="click"
          title="Remove the vehicle?"
          onConfirm={() => removeVehicle(vehicle.id)}
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
        {vehicle.images && vehicle.images.length > 0 && (
          <div style={{ width: 100, height: 100 }}>
            <WatermarkImage url={vehicle.images[0].optimised} />
          </div>
        )}
      </Col>

      <Col flex={1} style={{ marginTop: 10, marginLeft: 5 }}>
        <Paragraph
          strong
          ellipsis
          style={{
            marginBottom: '0.5rem',
            fontSize: 15,
          }}
        >
          {vehicle.registration || 'Unidentified Vehicle'}
        </Paragraph>
        <Descriptions size="small">
          <Descriptions.Item label=" Alert ID">
            {vehicle.reference}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions size="small">
          <Descriptions.Item label="Members">
            {vehicle?.totalOffenders || 0}
          </Descriptions.Item>
        </Descriptions>
      </Col>
    </Row>
  </Card>
);

export default VehicleCard;
