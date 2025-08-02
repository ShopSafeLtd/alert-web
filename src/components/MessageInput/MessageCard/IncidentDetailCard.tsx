import type { IncidentCardData } from 'types/DataType';

import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useStoreState } from '#/state';
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
  Popconfirm,
  Row,
  Skeleton,
  Space,
  Typography,
} from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';

const { Text, Title } = Typography;

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
  const currentTheme = useStoreState((state) => state.theme.currentTheme);

  return (
    <Card
      bodyStyle={{
        padding: 0,
      }}
      size="small"
      style={{
        backgroundColor: currentTheme === 'dark' ? '#1b2531' : '#FFF',
        border: '1px solid var(--ant-color-border)',
        borderRadius: 8,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
        overflow: 'hidden',
      }}
    >
      <Row gutter={5} style={{ position: 'relative' }} wrap={false}>
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
              danger
              disabled={saving}
              icon={<FontAwesomeIcon icon={faCircleXmark} />}
              size="small"
              style={{ position: 'absolute', right: 8, top: 8, zIndex: 100 }}
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
          <Title level={4} style={{ marginBottom: 12 }}>
            {incident.subject}
          </Title>

          <Space direction="vertical" size={8} style={{ width: '100%' }}>
            <div>
              <Text style={{ fontSize: 12 }} type="secondary">
                <FontAwesomeIcon
                  icon={faIdCardClip}
                  style={{ marginRight: 5 }}
                />
                {intl.formatMessage({ defaultMessage: 'ID' })}
              </Text>
              <div>
                <Text strong>{incident.reference}</Text>
              </div>
            </div>

            {incident?.policeRef && (
              <div>
                <Text style={{ fontSize: 12 }} type="secondary">
                  <FontAwesomeIcon
                    icon={faFileSpreadsheet}
                    style={{ marginRight: 8 }}
                  />
                  {intl.formatMessage({ defaultMessage: 'Crime No.' })}
                </Text>
                <div>
                  <Text strong>{incident.policeRef}</Text>
                </div>
              </div>
            )}

            <div>
              <Text style={{ fontSize: 12 }} type="secondary">
                <FontAwesomeIcon
                  icon={faSterlingSign}
                  style={{ marginRight: 10 }}
                />
                {intl.formatMessage({ defaultMessage: 'Loss' })}
              </Text>
              <div>
                <Text strong>
                  {intl.formatNumber(incident?.totalValue || 0, {
                    currency,
                    style: 'currency',
                  })}
                </Text>
              </div>
            </div>

            <div>
              <Text style={{ fontSize: 12 }} type="secondary">
                <FontAwesomeIcon icon={faClock} style={{ marginRight: 5 }} />
                {intl.formatMessage({ defaultMessage: 'Created At' })}
              </Text>
              <div>
                <Text strong>{incident.dayTime}</Text>
              </div>
            </div>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default IncidentDetailCard;
