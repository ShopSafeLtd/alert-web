import { currentPermissionsAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { faUser } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Row, Typography } from 'antd';
import { PermissionModel } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import useStyles from './SettingsHome.styles';

const SettingsHome = () => {
  const classes = useStyles();

  const permissions = useAtomValue(currentPermissionsAtom)?.map(
    ({ model }) => model
  );

  const hasUserPerms = permissions.includes(PermissionModel.Users);
  const hasIncidentSettingsPerms = permissions.includes(
    PermissionModel.IncidentOptions
  );
  const hasWorkflowPerms = permissions.includes(PermissionModel.Workflows);
  const hasExportPerms = permissions.includes(PermissionModel.DataExport);

  return (
    <div className={classes.page}>
      <Typography.Title level={3} style={{ marginBottom: 20 }}>
        <FormattedMessage defaultMessage="Admin Home" />
      </Typography.Title>
      <Row gutter={16} style={{}} wrap={true}>
        {hasUserPerms && (
          <Col span={8}>
            <Card>
              <Row align="middle" className={classes.cardRow} gutter={16}>
                <Col>
                  <div className={classes.cardIcon}>
                    <FontAwesomeIcon icon={faUser} size="lg" />
                  </div>
                </Col>
                <Col>
                  <Typography.Text className={classes.cardTitle}>
                    <FormattedMessage defaultMessage="Add Users" />
                  </Typography.Text>
                </Col>
              </Row>
              <div style={{ marginBottom: 15 }}>
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
        )}
        {hasIncidentSettingsPerms && (
          <Col span={8}>
            <Card>
              <Row align="middle" className={classes.cardRow} gutter={16}>
                <Col>
                  <div className={classes.cardIcon}>
                    <FontAwesomeIcon icon={faUser} size="lg" />
                  </div>
                </Col>
                <Col>
                  <Typography.Text className={classes.cardTitle}>
                    <FormattedMessage defaultMessage="Incident Settings" />
                  </Typography.Text>
                </Col>
              </Row>
              <div style={{ marginBottom: 15 }}>
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
        )}
        {hasWorkflowPerms && (
          <Col span={8}>
            <Card>
              <Row align="middle" className={classes.cardRow} gutter={16}>
                <Col>
                  <div className={classes.cardIcon}>
                    <FontAwesomeIcon icon={faUser} size="lg" />
                  </div>
                </Col>
                <Col>
                  <Typography.Text className={classes.cardTitle}>
                    <FormattedMessage defaultMessage="Create Workflows" />
                  </Typography.Text>
                </Col>
              </Row>
              <div style={{ marginBottom: 15 }}>
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
        )}
        {hasExportPerms && (
          <Col span={8}>
            <Card>
              <Row align="middle" className={classes.cardRow} gutter={16}>
                <Col>
                  <div className={classes.cardIcon}>
                    <FontAwesomeIcon icon={faUser} size="lg" />
                  </div>
                </Col>
                <Col>
                  <Typography.Text className={classes.cardTitle}>
                    <FormattedMessage defaultMessage="Export Data" />
                  </Typography.Text>
                </Col>
              </Row>
              <div style={{ marginBottom: 15 }}>
                <Typography.Text>
                  <FormattedMessage defaultMessage="Export data from Alert into a CSV file for user outside of the app." />
                </Typography.Text>
              </div>
              <Row justify="end">
                <Col>
                  <Link to="/app/scheme-settings/data-export/export-incidents">
                    <Button size="small">
                      <FormattedMessage defaultMessage="Export Data" />
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default SettingsHome;
