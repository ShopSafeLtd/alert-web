import { faArrowLeft } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row, Tooltip, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';

import Flow from './views/Flow/Flow.container';

const { Title } = Typography;

const FlowMapPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const intl = useIntl();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div
        style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #f0f0f0',
          padding: '16px',
        }}
      >
        <Row align="middle" gutter={16}>
          <Col>
            <Tooltip
              title={intl.formatMessage({
                defaultMessage: 'Back to Investigation',
              })}
            >
              <Button
                icon={<FontAwesomeIcon icon={faArrowLeft} />}
                onClick={() => navigate(`/investigations/view/${id}`)}
              >
                {intl.formatMessage({ defaultMessage: 'Back' })}
              </Button>
            </Tooltip>
          </Col>
          <Col flex={1}>
            <Title level={4} style={{ margin: 0 }}>
              {intl.formatMessage({
                defaultMessage: 'Investigation - Flow Map',
              })}
            </Title>
          </Col>
        </Row>
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <Flow />
      </div>
    </div>
  );
};

export default FlowMapPage;
