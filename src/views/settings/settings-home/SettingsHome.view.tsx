import React from 'react';
import { Typography, Row, Col, Card, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
import useStyles from './SettingsHome.styles';

const SettingsHome = () => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Typography.Title level={3} style={{ marginBottom: 20 }}>
        <FormattedMessage defaultMessage="Admin Home" />
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
                  <FormattedMessage defaultMessage="Add Users" />
                </Typography.Text>
              </Col>
            </Row>
            <div>
              <Typography.Text>
                <FormattedMessage defaultMessage="Add people to your alert organisation and start collaberating." />
              </Typography.Text>
            </div>
            <Row justify="end">
              <Col>
                <Link to="/app/scheme-settings/users">
                  <Button size="small">
                    <FormattedMessage defaultMessage="Manage users" />
                  </Button>
                </Link>
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
                  <FormattedMessage defaultMessage="Incident Settings" />
                </Typography.Text>
              </Col>
            </Row>
            <div>
              <Typography.Text>
                <FormattedMessage defaultMessage="Configure your incident form structure and enable reporting features." />
              </Typography.Text>
            </div>
            <Row justify="end">
              <Col>
                <Link to="/app/scheme-settings/crime-types">
                  <Button size="small">
                    <FormattedMessage defaultMessage="Open settings" />
                  </Button>
                </Link>
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
                  <FormattedMessage defaultMessage="Create Workflows" />
                </Typography.Text>
              </Col>
            </Row>
            <div>
              <Typography.Text>
                <FormattedMessage defaultMessage="Create workflows that tigger from data events and automate actions." />
              </Typography.Text>
            </div>
            <Row justify="end">
              <Col>
                <Link to="/app/scheme-settings/workflow">
                  <Button size="small">
                    <FormattedMessage defaultMessage="Create workflow" />
                  </Button>
                </Link>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsHome;
