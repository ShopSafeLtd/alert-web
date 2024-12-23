import type { VehicleData } from 'types/DataType';

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
  removeVehicle?: (value: string | undefined) => void;
  saving?: boolean;
  triggerLightbox?: (elements: { src: string }[], index: number) => void;
  vehicle: VehicleData;
}

const VehicleCard = ({
  removeVehicle,
  saving,
  triggerLightbox,
  vehicle,
}: Props) => {
  const intl = useIntl();
  const hasImage = vehicle.images && vehicle.images.length > 0;
  return (
    <Card
      bodyStyle={{
        marginLeft: -2,
        padding: 0,
      }}
      className="message-card"
      size="small"
      style={{
        margin: removeVehicle ? 0 : 5,
        overflow: 'hidden',
        width: hasImage ? 280 : 200,
      }}
    >
      <Row gutter={5} wrap={false}>
        {removeVehicle && (
          <Popconfirm
            cancelText={intl.formatMessage({
              defaultMessage: 'No',
            })}
            okText={intl.formatMessage({ defaultMessage: 'Yes' })}
            onConfirm={() => removeVehicle(vehicle.id)}
            overlayInnerStyle={{ padding: 10 }}
            placement="topLeft"
            title={intl.formatMessage({
              defaultMessage: 'Remove the vehicle?',
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
          {hasImage && (
            <div style={{ height: 100, width: 100 }}>
              <WatermarkImage
                triggerLightbox={triggerLightbox}
                // @ts-expect-error  null
                url={vehicle.images[0].optimised || vehicle.images[0].url || ''}
              />
            </div>
          )}
        </Col>

        <Col flex={1} style={{ marginLeft: 5, marginTop: 10 }}>
          <Paragraph
            ellipsis
            strong
            style={{
              fontSize: 15,
              marginBottom: '0.5rem',
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
