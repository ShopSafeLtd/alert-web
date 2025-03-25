import type { Theme } from '#/configs/ThemeConfig';

import {
  faCar,
  faExclamationCircle,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Row, Typography } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles((theme: Theme) => ({
  buttonCard: {
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
    cursor: 'pointer',
  },
  page: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '5%',
  },
}));

const ReportOnly = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Row gutter={[16, 16]} wrap={false}>
        <Col>
          <Link to="/app/incidents/add">
            <Card className={classes.buttonCard}>
              <Row gutter={16}>
                <Col>
                  <FontAwesomeIcon icon={faExclamationCircle} size="2xl" />
                </Col>
                <Col>
                  <Typography.Title level={3}>
                    <FormattedMessage defaultMessage="Report Incident" />
                  </Typography.Title>
                </Col>
              </Row>

              <Typography.Paragraph>
                <FormattedMessage defaultMessage="Log a new incident. Include details, images, and descriptions to keep your team informed and take appropriate action." />
              </Typography.Paragraph>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/app/offenders/add">
            <Card className={classes.buttonCard}>
              <Row gutter={16}>
                <Col>
                  <FontAwesomeIcon icon={faUser} size="2xl" />
                </Col>
                <Col>
                  <Typography.Title level={3}>
                    <FormattedMessage defaultMessage="Report Offender" />
                  </Typography.Title>
                </Col>
              </Row>
              <Typography.Paragraph type="secondary">
                <FormattedMessage defaultMessage="Click to record details of a known or suspected offender. Add descriptions, images, and known behaviours to alert your team" />
              </Typography.Paragraph>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/app/vehicles/add">
            <Card className={classes.buttonCard}>
              <Row gutter={16}>
                <Col>
                  <FontAwesomeIcon icon={faCar} size="2xl" />
                </Col>
                <Col>
                  <Typography.Title level={3}>
                    <FormattedMessage defaultMessage="Report Vehicle" />
                  </Typography.Title>
                </Col>
              </Row>
              <Typography.Paragraph type="secondary">
                <FormattedMessage defaultMessage="Click to report a suspicious or known vehicle. Include licence plate, make, model, and any relevant notes to assist identification." />
              </Typography.Paragraph>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default ReportOnly;
