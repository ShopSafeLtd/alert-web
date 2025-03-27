import type { OffenderCardData } from 'types/DataType';

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
import dayjs from 'dayjs';
import React from 'react';
import { useIntl } from 'react-intl';
import FormatCalendar from 'utils/format-calendar-24h';

const { Title } = Typography;

interface Props {
  offender: OffenderCardData;
  removeOffender?: (value: string | undefined) => void;
  saving?: boolean;
  triggerLightbox?: (elements: { src: string }[], index: number) => void;
}

const OffenderCard = ({
  offender,
  removeOffender,
  saving,
  triggerLightbox,
}: Props) => {
  const intl = useIntl();
  const hasImage = offender.images && offender.images.length > 0;

  return (
    <Card
      bodyStyle={{
        marginLeft: -2,
        padding: 0,
      }}
      className="message-card"
      size="small"
      style={{
        margin: removeOffender ? 0 : 5,
        overflow: 'hidden',
        width: hasImage ? 300 : 200,
      }}
    >
      <Row gutter={5} wrap={false}>
        {removeOffender && (
          <Popconfirm
            cancelText={intl.formatMessage({
              defaultMessage: 'No',
            })}
            okText={intl.formatMessage({ defaultMessage: 'Yes' })}
            onConfirm={() => removeOffender(offender.id)}
            overlayInnerStyle={{ padding: 10 }}
            placement="topLeft"
            title={intl.formatMessage({
              defaultMessage: 'Remove the offender?',
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
            <div
              // onClick={() => {
              //   if (triggerLightbox && offender?.images && offender?.images[0])
              //     triggerLightbox(
              //       [
              //         {
              //           src:
              //             offender.images[0].optimised ||
              //             offender.images[0].url ||
              //             '',
              //         },
              //       ],
              //       0
              //     );
              // }}
              style={{ height: 100, width: 100 }}
            >
              <WatermarkImage
                triggerLightbox={triggerLightbox}
                url={
                  // @ts-expect-error  null
                  offender.images[0].optimised || offender.images[0].url || ''
                }
              />
            </div>
          )}
        </Col>

        <Col flex={1} style={{ marginLeft: 5, marginTop: 10 }}>
          <Title level={4}> {offender.name}</Title>
          <Descriptions size="small">
            <Descriptions.Item
              label={intl.formatMessage({
                defaultMessage: 'Last Active',
              })}
            >
              {(FormatCalendar(offender.updatedAt || dayjs(), intl))}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};

export default OffenderCard;
