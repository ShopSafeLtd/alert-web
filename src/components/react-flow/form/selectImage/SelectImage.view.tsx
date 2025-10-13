import { Button, Col, Row } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type { ImagesData } from './useSelectImage';

interface Props {
  data: ImagesData | undefined;
  loading: boolean;
  onClose: () => void;
  onSubmit: (item: { key: string }) => void;
}

const LinkIncident = ({
  data,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loading,
  onClose,
  onSubmit,
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
    <Row gutter={16} justify="end" style={{ paddingBottom: 30 }}>
      <Col>
        <Button onClick={onClose} type="text">
          <FormattedMessage defaultMessage="Cancel" />
        </Button>
      </Col>
    </Row>
  </div>
);

export default LinkIncident;
