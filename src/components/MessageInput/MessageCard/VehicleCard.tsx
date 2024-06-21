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
  const hasImage = vehicle.images && vehicle.images.length > 0;
  return (
    <Card
      style={{
        margin: removeVehicle ? 0 : 5,
        width: hasImage ? 280 : 200,
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
            })}
            onConfirm={() => removeVehicle(vehicle.id)}
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
          {hasImage && (
            <div style={{ width: 100, height: 100 }}>
              <WatermarkImage
                // @ts-expect-error  null
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
              })}
          </Paragraph>
          <Descriptions size="small">
            <Descriptions.Item
              label={intl.formatMessage({
                defaultMessage: 'Alert ID',
              })}
            >
              {vehicle.reference}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions size="small">
            <Descriptions.Item
              label={intl.formatMessage({
                defaultMessage: 'Members',
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
