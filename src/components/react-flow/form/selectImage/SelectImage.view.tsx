import React from 'react';
import { Button, Col, Row } from 'antd';
import { ImagesData } from './useSelectImage';
import WatermarkImage from 'components/images/WatermarkImage.view';

interface Props {
  data: ImagesData | undefined;
  onSubmit: (item: { key: string }) => void;
  onClose: () => void;
  loading: boolean;
}

const LinkIncident = ({
  data,
  onSubmit,
  onClose,
  loading,
}: Props): JSX.Element => (
  <div>
    <Row gutter={16} style={{ paddingBottom: 30 }}>
      {data?.offenders?.map((offender) => (
        <Col span={24}>
          <h3>{offender.name}</h3>
          <Row gutter={16}>
            {offender.images?.map(({ url }) => (
              <Col span={6}>
                <div
                  onClick={() => onSubmit({ key: url })}
                  style={{
                    height: 200,
                  }}
                >
                  <WatermarkImage url={url} />
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      ))}
    </Row>
    <Row gutter={16} style={{ paddingBottom: 30 }} justify="end">
      <Col>
        <Button onClick={onClose} type="text">
          Cancel
        </Button>
      </Col>
    </Row>
  </div>
);

export default LinkIncident;
