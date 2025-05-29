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

const ExportHome = () => {
  const classes = useStyles();

  const permissions = useAtomValue(currentPermissionsAtom)?.map(
    ({ model }) => model
  );

  const hasExportPerms = permissions.includes(PermissionModel.DataExport);

  return (
    <div className={classes.page}>
      <Typography.Title level={3} style={{ marginBottom: 20 }}>
        <FormattedMessage defaultMessage="Export Home" />
      </Typography.Title>
      <Row gutter={16} style={{}} wrap={false}>
        {hasExportPerms && (
          <>
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
                      <FormattedMessage defaultMessage="Export Incidents" />
                    </Typography.Text>
                  </Col>
                </Row>
                <div style={{ marginBottom: 15 }}>
                  <Typography.Text>
                    <FormattedMessage defaultMessage="Export incidents from Alert into a CSV file for user outside of the app." />
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
                      <FormattedMessage defaultMessage="Export Checklists" />
                    </Typography.Text>
                  </Col>
                </Row>
                <div style={{ marginBottom: 15 }}>
                  <Typography.Text>
                    <FormattedMessage defaultMessage="Export checklists from Alert into a CSV file for user outside of the app." />
                  </Typography.Text>
                </div>
                <Row justify="end">
                  <Col>
                    <Link to="/app/scheme-settings/data-export/export-checklists">
                      <Button size="small">
                        <FormattedMessage defaultMessage="Export Data" />
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default ExportHome;
