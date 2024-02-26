import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

const ImportMenu = () => {
  const intl = useIntl();
  return (
    <div style={{ padding: 20 }}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Link to="/app/scheme-settings/data-import/csv/stock-items">
            <Card
              title={intl.formatMessage({
                defaultMessage: 'CSV Import',
                id: 'kvnrW/',
              })}
            >
              <Typography.Text type="secondary">
                <FormattedMessage
                  defaultMessage="Import data from a csv file into alert."
                  id="82WowD"
                />
              </Typography.Text>
            </Card>
          </Link>
        </Col>
        <Col span={8}>
          <Link to="/app/scheme-settings/data-import/disc">
            <Card
              title={intl.formatMessage({
                defaultMessage: 'DISC Import',
                id: '1BX5Wp',
              })}
            >
              <Typography.Text type="secondary">
                <FormattedMessage
                  defaultMessage="Import data from a disc data dump into alert."
                  id="m7BIIE"
                />
              </Typography.Text>
            </Card>
          </Link>
        </Col>
        <Col span={8}>
          <Link to="/app/scheme-settings/data-import/mysafety">
            <Card
              title={intl.formatMessage({
                defaultMessage: 'MySafety Import',
                id: '2HeyWv',
              })}
            >
              <Typography.Text type="secondary">
                <FormattedMessage
                  defaultMessage="Import data from a mysafety export into alert."
                  id="dsmmty"
                />
              </Typography.Text>
            </Card>
          </Link>
        </Col>
        <Col span={8}>
          <Link to="/app/scheme-settings/data-import/intel-one">
            <Card
              title={intl.formatMessage({
                defaultMessage: 'Intel One Import',
                id: '0gOWfx',
              })}
            >
              <Typography.Text type="secondary">
                <FormattedMessage
                  defaultMessage="Import data from a intel one export into alert."
                  id="qYoS6H"
                />
              </Typography.Text>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default ImportMenu;
