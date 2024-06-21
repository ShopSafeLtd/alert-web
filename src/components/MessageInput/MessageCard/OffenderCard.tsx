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
import type { OffenderCardData } from 'types/DataType';
import { useIntl } from 'react-intl';
import FormatCalendar from 'utils/format-calendar-24h';
import moment from 'moment';

const { Title } = Typography;

interface Props {
  offender: OffenderCardData;
  removeOffender?: (value: string | undefined) => void;
  saving?: boolean;
}

const OffenderCard = ({ offender, removeOffender, saving }: Props) => {
  const intl = useIntl();
  const hasImage = offender.images && offender.images.length > 0;

  return (
    <Card
      style={{
        margin: removeOffender ? 0 : 5,
        width: hasImage ? 300 : 200,
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
            title={intl.formatMessage({
              defaultMessage: 'Remove the offender?',
            })}
            onConfirm={() => removeOffender(offender.id)}
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
                url={
                  // @ts-expect-error  null
                  offender.images[0].optimised || offender.images[0].url || ''
                }
              />
            </div>
          )}
        </Col>

        <Col flex={1} style={{ marginTop: 10, marginLeft: 5 }}>
          <Title level={4}> {offender.name}</Title>
          <Descriptions size="small">
            <Descriptions.Item
              label={intl.formatMessage({
                defaultMessage: 'Last Active',
              })}
            >
              {FormatCalendar(offender.updatedAt || moment())}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};

export default OffenderCard;
