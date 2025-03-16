import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

const AiStats = () => {
  const intl = useIntl();
  return (
    <Row gutter={16} style={{ marginBottom: 10 }}>
      <Col flex={1}>
        <Card>
          <Statistic
            style={{ textAlign: 'center' }}
            title={intl.formatMessage({
              defaultMessage: 'Suggestions',
            })}
            value={0}
          />
        </Card>
      </Col>
      <Col flex={1}>
        <Card>
          <Statistic
            style={{ textAlign: 'center' }}
            title={intl.formatMessage({
              defaultMessage: 'Enrichments',
            })}
            value={0}
          />
        </Card>
      </Col>
      <Col flex={1}>
        <Card>
          <Statistic
            style={{ textAlign: 'center' }}
            title={intl.formatMessage({
              defaultMessage: 'Face IDs',
            })}
            value={0}
          />
        </Card>
      </Col>
      <Col flex={1}>
        <Card>
          <Statistic
            style={{ textAlign: 'center' }}
            title={intl.formatMessage({
              defaultMessage: 'Name Matches',
            })}
            value={0}
          />
        </Card>
      </Col>
      <Col flex={1}>
        <Card>
          <Statistic
            style={{ textAlign: 'center' }}
            title={intl.formatMessage({
              defaultMessage: 'Police Reports',
            })}
            value={0}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default AiStats;
