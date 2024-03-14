import React from 'react';
import { Typography, Row, Col, Card, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/pro-light-svg-icons';
import useStyles from './SettingsHome.styles';

const SettingsHome = () => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Typography.Title level={3} style={{ marginBottom: 20 }}>
        <FormattedMessage id="xTQDJF" defaultMessage="Admin Home" />
      </Typography.Title>
      <Row wrap={false} gutter={16} style={{}}>
        <Col span={8}>
          <Card>
            <Row align="middle" gutter={16} className={classes.cardRow}>
              <Col>
                <div className={classes.cardIcon}>
                  <FontAwesomeIcon size="lg" icon={faUser} />
                </div>
              </Col>
              <Col>
                <Typography.Text className={classes.cardTitle}>
                  <FormattedMessage id="ShE8aY" defaultMessage="Add Users" />
                </Typography.Text>
              </Col>
            </Row>
            <div>
              <Typography.Text>
                <FormattedMessage
                  id="R7Jc2D"
                  defaultMessage="Add people to your alert organisation and start collaberating."
                />
              </Typography.Text>
            </div>
            <Row justify="end">
              <Col>
                <Button size="small">
                  <FormattedMessage id="mJk+ls" defaultMessage="Manage users" />
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Row align="middle" gutter={16} className={classes.cardRow}>
              <Col>
                <div className={classes.cardIcon}>
                  <FontAwesomeIcon size="lg" icon={faUser} />
                </div>
              </Col>
              <Col>
                <Typography.Text className={classes.cardTitle}>
                  <FormattedMessage
                    id="2hZ6rA"
                    defaultMessage="Incident Settings"
                  />
                </Typography.Text>
              </Col>
            </Row>
            <div>
              <Typography.Text>
                <FormattedMessage
                  id="Bn2KTC"
                  defaultMessage="Configure your incident form structure and enable reporting features."
                />
              </Typography.Text>
            </div>
            <Row justify="end">
              <Col>
                <Button size="small">
                  <FormattedMessage
                    id="iubKfx"
                    defaultMessage="Open settings"
                  />
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Row align="middle" gutter={16} className={classes.cardRow}>
              <Col>
                <div className={classes.cardIcon}>
                  <FontAwesomeIcon size="lg" icon={faUser} />
                </div>
              </Col>
              <Col>
                <Typography.Text className={classes.cardTitle}>
                  <FormattedMessage
                    id="RCKxnY"
                    defaultMessage="Create Workflows"
                  />
                </Typography.Text>
              </Col>
            </Row>
            <div>
              <Typography.Text>
                <FormattedMessage
                  id="6mosFm"
                  defaultMessage="Create workflows that tigger from data events and automate actions."
                />
              </Typography.Text>
            </div>
            <Row justify="end">
              <Col>
                <Button size="small">
                  <FormattedMessage
                    id="4s+f7f"
                    defaultMessage="Create workflow"
                  />
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsHome;
