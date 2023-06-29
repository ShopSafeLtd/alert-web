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
import type { VehicleData } from 'types/DataType';
import { useIntl } from 'react-intl';

const { Paragraph } = Typography;

interface Props {
  vehicle: VehicleData;
  removeVehicle?: (value: string | undefined) => void;
  saving?: boolean;
}

const VehicleCard = ({ vehicle, removeVehicle, saving }: Props) => {
  const intl = useIntl();
  return (
    <Card
      style={{
        margin: removeVehicle ? 0 : 5,
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
        {removeVehicle && (
          <Popconfirm
            placement="topLeft"
            trigger="click"
            title={intl.formatMessage({
              defaultMessage: 'Remove the vehicle?',
              id: 'hHs0lD',
            })}
            onConfirm={() => removeVehicle(vehicle.id)}
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
              <WatermarkImage
                url={vehicle.images[0].optimised || vehicle.images[0].url || ''}
              />
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
            {vehicle.registration ||
              intl.formatMessage({
                defaultMessage: 'Unidentified Vehicle',
                id: 'I3q18K',
              })}
          </Paragraph>
          <Descriptions size="small">
            <Descriptions.Item
              label={intl.formatMessage({
                defaultMessage: 'Alert ID',
                id: 'k8ZNgH',
              })}
            >
              {vehicle.reference}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions size="small">
            <Descriptions.Item
              label={intl.formatMessage({
                defaultMessage: 'Members',
                id: '+a+2ug',
              })}
            >
              {vehicle?.totalOffenders || 0}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};

export default VehicleCard;
