import VisionMap from '#/views/vision/vision-centre/components/VisionMap';
import { useAiVisionStatsQuery } from '#/views/vision/vision-centre/components/VisionStats/__generated__/VisionStats.generated';
import { Col, Row } from 'antd';
import React from 'react';

import VisionCameras from './components/VisionCameras/VisionCameras.view';
import VisionEvents from './components/VisionEvents/VisionEvents.view';
import VisionMatches from './components/VisionMatches/VisionMatches.view';
import VisionStats from './components/VisionStats/VisionStats.view';

function duplicateItems(
  inputArray: { count: number; geoLat: number; geoLng: number }[]
): { geoLat: number; geoLng: number }[] {
  const result: { geoLat: number; geoLng: number }[] = [];

  for (const item of inputArray) {
    for (let i = 0; i < item.count; i++) {
      result.push({ ...item });
    }
  }

  return result;
}

const VisionCentre = () => {
  const { data } = useAiVisionStatsQuery({});

  return (
    <div style={{ padding: 20 }}>
      <Row gutter={32}>
        <Col
          span={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'scroll',
          }}
        >
          <VisionMatches />
        </Col>
        <Col span={12}>
          <VisionStats data={data} />
          <VisionMap
            height={300}
            markers={duplicateItems([
              {
                count: data?.aiVisionStats.at(0)?.count.at(0) ?? 0,
                geoLat: 51.581_64,
                geoLng: -0.032_79,
              },
              {
                count: 309,
                geoLat: 53.551_073,
                geoLng: -2.199_565,
              },
              {
                count: 252,
                geoLat: 52.503_21,
                geoLng: -1.875_09,
              },
              {
                count: 383,
                geoLat: 53.875_952,
                geoLng: -1.707_933,
              },
              {
                count: 184,
                geoLat: -34.688_772,
                geoLng: 138.669_197,
              },
            ])}
            width="100%"
          />
          <VisionCameras />
          <VisionEvents />
        </Col>
      </Row>
    </div>
  );
};

export default VisionCentre;
