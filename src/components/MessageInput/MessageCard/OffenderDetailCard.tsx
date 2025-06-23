import type { OffenderCardData } from 'types/DataType';

import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  faCircleXmark,
  faClock,
  faExclamationCircle,
  faIdCardClip,
  faSterlingSign,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Popconfirm,
  Row,
  Skeleton,
  Typography,
} from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';
import FormatCalendar from 'utils/format-calendar-24h';

const { Title } = Typography;

interface Props {
  offender: OffenderCardData;
  onDelete?: (value: string | undefined) => void;
  saving?: boolean;
  triggerLightbox?: (elements: { src: string }[], index: number) => void;
}

const OffenderDetailCard = ({
  offender,
  onDelete,
  saving,
  triggerLightbox,
}: Props) => {
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);

  return (
    <Card
      bodyStyle={{
        padding: 0,
      }}
      size="small"
      // style={{
      //   width: 350,
      // }}
    >
      <Row gutter={5} wrap={false}>
        {onDelete && (
          <Popconfirm
            cancelText={intl.formatMessage({
              defaultMessage: 'No',
            })}
            okText={intl.formatMessage({ defaultMessage: 'Yes' })}
            onConfirm={() => onDelete(offender.id)}
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
              style={{ position: 'absolute', right: 0, top: 0, zIndex: 100 }}
              type="text"
            />
          </Popconfirm>
        )}

        <Col>
          {offender.images && offender.images.length > 0 ? (
            <div style={{ height: 140, width: 130 }}>
              <WatermarkImage
                triggerLightbox={triggerLightbox}
                url={
                  offender.images[0].optimised || offender.images[0].url || ''
                }
              />
            </div>
          ) : (
            <Skeleton.Image style={{ height: 140, width: 130 }} />
          )}
        </Col>

        <Col flex={1} style={{ marginLeft: 5, marginTop: 10 }}>
          <Title level={4}> {offender.name}</Title>
          <Descriptions column={1}>
            <Descriptions.Item
              label={
                <span>
                  <FontAwesomeIcon
                    icon={faIdCardClip}
                    style={{ marginRight: 5 }}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'ID',
                  })}
                </span>
              }
              style={{ paddingBottom: 0 }}
            >
              {offender.reference}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <span>
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    style={{ marginRight: 5 }}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'Incidents',
                  })}
                </span>
              }
              style={{ paddingBottom: 0 }}
            >
              {offender.totalIncidents || 0}
            </Descriptions.Item>
            <Descriptions.Item
              label={
                <span>
                  <FontAwesomeIcon
                    icon={faSterlingSign}
                    style={{ marginRight: 10 }}
                  />
                  {intl.formatMessage({
                    defaultMessage: 'Loss',
                  })}
                </span>
              }
              style={{ paddingBottom: 0 }}
            >
              {intl.formatNumber(offender?.totalValue || 0, {
                currency,
                style: 'currency',
              })}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <span>
                  <FontAwesomeIcon icon={faClock} style={{ marginRight: 5 }} />
                  {intl.formatMessage({
                    defaultMessage: 'Last Active',
                  })}
                </span>
              }
              style={{ paddingBottom: 0 }}
            >
              {FormatCalendar(offender.updatedAt || dayjs(), intl)}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};

export default OffenderDetailCard;
