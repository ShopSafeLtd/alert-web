import type { IncidentCardData } from 'types/DataType';

import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  faCircleXmark,
  faClock,
  faFileSpreadsheet,
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
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';

const { Title } = Typography;

interface Props {
  incident: IncidentCardData;
  onDelete?: (value: string | undefined) => void;
  saving?: boolean;
  triggerLightbox?: (elements: { src: string }[], index: number) => void;
}

const IncidentDetailCard = ({
  incident,
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
            onConfirm={() => onDelete(incident.id)}
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
              style={{ position: 'absolute', right: 0, top: 0, zIndex: 100 }}
              type="text"
            />
          </Popconfirm>
        )}
        <Col>
          {incident.images && incident.images.length > 0 ? (
            <div style={{ height: 140, width: 140 }}>
              <WatermarkImage
                triggerLightbox={triggerLightbox}
                url={
                  incident.images[0].optimised || incident.images[0].url || ''
                }
              />
            </div>
          ) : (
            <Skeleton.Image style={{ height: 140, width: 140 }} />
          )}
        </Col>
        <Col
          flex={1}
          style={{
            marginLeft: 5,
            marginTop: 10,
          }}
        >
          <Title level={4}> {incident.subject}</Title>

          <Descriptions column={1} size="small">
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
              {incident.reference}
            </Descriptions.Item>
            {incident?.policeRef && (
              <Descriptions.Item
                label={
                  <span>
                    <FontAwesomeIcon
                      icon={faFileSpreadsheet}
                      style={{ marginRight: 8 }}
                    />
                    {intl.formatMessage({
                      defaultMessage: 'Crime No.',
                    })}
                  </span>
                }
                style={{ paddingBottom: 0 }}
              >
                {incident?.policeRef}
              </Descriptions.Item>
            )}
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
              {intl.formatNumber(incident?.totalValue || 0, {
                currency,
                style: 'currency',
              })}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <span>
                  <FontAwesomeIcon icon={faClock} style={{ marginRight: 5 }} />
                  {intl.formatMessage({
                    defaultMessage: 'Created At',
                  })}
                </span>
              }
              style={{ paddingBottom: 0 }}
            >
              {incident.dayTime}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};

export default IncidentDetailCard;
