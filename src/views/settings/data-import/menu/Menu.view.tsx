import { useStoreState } from '#/state';
import { Card, Col, Row, Typography } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

const customStockAllowed = new Set(['cltr752fn001kwdcafx5pbq29']);

const ImportMenu = () => {
  const intl = useIntl();
  const schemeId = useStoreState((s) => s.scheme.id);

  return (
    <div style={{ padding: 20 }}>
      <Row gutter={[16, 16]}>
        {customStockAllowed.has(schemeId) && (
          <Col span={8}>
            <Link to="/app/scheme-settings/csv-import">
              <Card
                title={intl.formatMessage({
                  defaultMessage: 'Bulk Stock Import',
                })}
              >
                <Typography.Text type="secondary">
                  <FormattedMessage defaultMessage="Import stock data from a csv/txt file into alert." />
                </Typography.Text>
              </Card>
            </Link>
          </Col>
        )}
        <Col span={8}>
          <Link to="/app/scheme-settings/data-import/csv/stock-items">
            <Card
              title={intl.formatMessage({
                defaultMessage: 'CSV Import',
              })}
            >
              <Typography.Text type="secondary">
                <FormattedMessage defaultMessage="Import data from a csv file into alert." />
              </Typography.Text>
            </Card>
          </Link>
        </Col>
        <Col span={8}>
          <Link to="/app/scheme-settings/data-import/disc">
            <Card
              title={intl.formatMessage({
                defaultMessage: 'DISC Import',
              })}
            >
              <Typography.Text type="secondary">
                <FormattedMessage defaultMessage="Import data from a disc data dump into alert." />
              </Typography.Text>
            </Card>
          </Link>
        </Col>
        <Col span={8}>
          <Link to="/app/scheme-settings/data-import/mysafety">
            <Card
              title={intl.formatMessage({
                defaultMessage: 'MySafety Import',
              })}
            >
              <Typography.Text type="secondary">
                <FormattedMessage defaultMessage="Import data from a mysafety export into alert." />
              </Typography.Text>
            </Card>
          </Link>
        </Col>
        <Col span={8}>
          <Link to="/app/scheme-settings/data-import/intel-one">
            <Card
              title={intl.formatMessage({
                defaultMessage: 'Intel One Import',
              })}
            >
              <Typography.Text type="secondary">
                <FormattedMessage defaultMessage="Import data from a intel one export into alert." />
              </Typography.Text>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default ImportMenu;
