import VisionMap from '#/views/vision/vision-centre/components/VisionMap/VisionMap';
import { useAiVisionStatsQuery } from '#/views/vision/vision-centre/components/VisionStats/__generated__/VisionStats.generated';
import { Button, Col, Row } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';

import VisionCameras from './components/VisionCameras/VisionCameras.view';
import VisionMatches from './components/VisionMatches/VisionMatches.view';
import VisionStats from './components/VisionStats/VisionStats.view';

const VisionCentre = () => {
  const { data } = useAiVisionStatsQuery({});
  const visionId = useParams().id || '';

  return (
    <div style={{ marginTop: 16, paddingLeft: 16, paddingRight: 16 }}>
      <Row gutter={32}>
        <Col
          span={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 16px)',
            overflow: 'scroll',
          }}
        >
          <VisionMatches initId={visionId} />
        </Col>
        <Col span={12}>
          <VisionConfig />
          <VisionStats data={data} />
          <VisionMap height={300} width="100%" />
          <VisionCameras />
        </Col>
      </Row>
    </div>
  );
};

const VisionConfig = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const onManageCameras = () => navigate('/app/vision/cameras');
  const onDetectionConfigs = () => navigate('/app/vision/detection-configs');

  return (
    <Row style={{ justifyContent: 'space-between', marginBottom: 10 }}>
      <div />
      <div>
        <Button
          onClick={onManageCameras}
          style={{ marginRight: 8, padding: '6px 12px' }}
        >
          {intl.formatMessage({
            defaultMessage: 'Manage Cameras',
          })}
        </Button>
        <Button onClick={onDetectionConfigs} style={{ padding: '6px 12px' }}>
          {intl.formatMessage({
            defaultMessage: 'Detection Configs',
          })}
        </Button>
      </div>
    </Row>
  );
};

export default VisionCentre;
