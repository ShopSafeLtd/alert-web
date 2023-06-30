import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';

const ImportMenu = () => {
  const intl = useIntl();
  return (
    <div style={{ padding: 20 }}>
      <Row>
        <Col>
          <Link to="/app/scheme-settings/data-import/disc">
            <Card
              title={intl.formatMessage({
                defaultMessage: 'DISC Import',
                id: '1BX5Wp',
              })}
            >
              <Typography.Text type="secondary">
                <FormattedMessage
                  defaultMessage="Import data from a disc data dump into alert using a guided form"
                  id="vyqHbw"
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
