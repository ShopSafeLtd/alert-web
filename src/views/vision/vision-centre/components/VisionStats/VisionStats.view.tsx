import type { AiVisionStatsQuery } from '#/views/vision/vision-centre/components/VisionStats/__generated__/VisionStats.generated';

import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  data: AiVisionStatsQuery | undefined;
}

const VisionStats = ({ data }: Props) => {
  const intl = useIntl();

  return (
    <Row gutter={16} style={{ marginBottom: 10 }}>
      <Col flex={1}>
        <Card>
          <Statistic
            style={{ textAlign: 'center' }}
            title={intl.formatMessage({
              defaultMessage: 'Total Detections',
            })}
            value={data?.aiVisionStats.at(0)?.count.at(0) ?? 0}
          />
        </Card>
      </Col>
      <Col flex={1}>
        <Card>
          <Statistic
            style={{ textAlign: 'center' }}
            title={intl.formatMessage({
              defaultMessage: 'Total Events',
            })}
            value={data?.aiVisionStats.at(1)?.count.at(0) ?? 0}
          />
        </Card>
      </Col>
      <Col flex={1}>
        <Card>
          <Statistic
            style={{ textAlign: 'center' }}
            title={intl.formatMessage({
              defaultMessage: 'Cameras Online ',
            })}
            value={1}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default VisionStats;
