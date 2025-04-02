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
            value={857}
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
            value={4576}
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
            value={405}
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
            value={203}
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
            value={1202}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default AiStats;
