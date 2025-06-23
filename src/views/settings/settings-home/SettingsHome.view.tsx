import { currentPermissionsAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { ArrowRightOutlined } from '@ant-design/icons';
import {
  faBuilding,
  faCloudDownload,
  faCloudUpload,
  faCogs,
  faDesktop,
  faFileText,
  faGraduationCap,
  faShield,
  faTags,
  faText,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Row, Typography } from 'antd';
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

  const hasUserPerms = permissions?.includes(PermissionModel.Users);
  const hasIncidentSettingsPerms = permissions?.includes(
    PermissionModel.IncidentOptions
  );
  const hasWorkflowPerms = permissions?.includes(PermissionModel.Workflows);
  const hasExportPerms = permissions?.includes(PermissionModel.DataExport);
  const hasImportPerms = permissions?.includes(PermissionModel.DataImport);
  const hasBrandsPerms = permissions?.includes(PermissionModel.Brands);
  const hasDemPerms = permissions?.includes(PermissionModel.Dem);
  const hasBusinessPerms = permissions?.includes(PermissionModel.Businesses);

  // Quick access cards data
  const quickAccessCards = [
    {
      category: 'access',
      description: (
        <FormattedMessage defaultMessage="Add, manage users, assign roles, and control permissions" />
      ),
      icon: <FontAwesomeIcon icon={faUsers} />,
      title: <FormattedMessage defaultMessage="User Management" />,
      to: '/app/scheme-settings/users',
      visible: hasUserPerms,
    },
    {
      category: 'content',
      description: (
        <FormattedMessage defaultMessage="Customize incident types, categories, and workflows" />
      ),
      icon: <FontAwesomeIcon icon={faFileText} />,
      title: <FormattedMessage defaultMessage="Incident Configuration" />,
      to: '/app/scheme-settings/crime-types',
      visible: hasIncidentSettingsPerms,
    },
    {
      category: 'content',
      description: (
        <FormattedMessage defaultMessage="Design automated workflows and business rules" />
      ),
      icon: <FontAwesomeIcon icon={faCogs} />,
      title: <FormattedMessage defaultMessage="Workflow Automation" />,
      to: '/app/scheme-settings/workflow',
      visible: hasWorkflowPerms,
    },
    {
      category: 'data',
      description: (
        <FormattedMessage defaultMessage="Export data for analysis and reporting" />
      ),
      icon: <FontAwesomeIcon icon={faCloudDownload} />,
      title: <FormattedMessage defaultMessage="Data Export" />,
      to: '/app/scheme-settings/data-export',
      visible: hasExportPerms,
    },
    {
      category: 'data',
      description: (
        <FormattedMessage defaultMessage="Import data from external systems" />
      ),
      icon: <FontAwesomeIcon icon={faCloudUpload} />,
      title: <FormattedMessage defaultMessage="Data Import" />,
      to: '/app/scheme-settings/data-import',
      visible: hasImportPerms,
    },
    {
      category: 'access',
      description: (
        <FormattedMessage defaultMessage="Configure security settings and access controls" />
      ),
      icon: <FontAwesomeIcon icon={faShield} />,
      title: <FormattedMessage defaultMessage="Security & Access" />,
      to: '/app/scheme-settings/roles',
      visible: hasUserPerms,
    },
  ];

  const managementCards = [
    {
      description: (
        <FormattedMessage defaultMessage="Manage incident categories and tags" />
      ),
      icon: <FontAwesomeIcon icon={faTags} />,
      title: <FormattedMessage defaultMessage="Crime Types & Tags" />,
      to: '/app/scheme-settings/crime-types',
      visible: hasIncidentSettingsPerms,
    },
    {
      description: (
        <FormattedMessage defaultMessage="Manage business locations and contacts" />
      ),
      icon: <FontAwesomeIcon icon={faBuilding} />,
      title: <FormattedMessage defaultMessage="Business Directory" />,
      to: '/app/scheme-settings/businesses',
      visible: hasBusinessPerms,
    },
    {
      description: (
        <FormattedMessage defaultMessage="Configure your different brands" />
      ),
      icon: <FontAwesomeIcon icon={faText} />,
      title: <FormattedMessage defaultMessage="Brands" />,
      to: '/app/scheme-settings/brands',
      visible: hasBrandsPerms,
    },
    {
      description: (
        <FormattedMessage defaultMessage="Digital Evidence Management settings" />
      ),
      icon: <FontAwesomeIcon icon={faDesktop} />,
      title: <FormattedMessage defaultMessage="DEM Configuration" />,
      to: '/app/scheme-settings/dem',
      visible: hasDemPerms,
    },
  ];

  return (
    <div className={classes.page}>
      {/* Quick Access Section */}
      <div className={classes.section}>
        <Typography.Title className={classes.sectionTitle} level={3}>
          <FontAwesomeIcon
            className={classes.sectionIcon}
            icon={faGraduationCap}
          />
          <FormattedMessage defaultMessage="Quick Access" />
        </Typography.Title>
        <Typography.Text className={classes.sectionDescription}>
          <FormattedMessage defaultMessage="Access the most commonly used configuration areas" />
        </Typography.Text>

        <Row className={classes.cardGrid} gutter={[20, 20]}>
          {quickAccessCards
            .filter((card) => card.visible)
            .map((card, index) => (
              <Col key={index} lg={8} sm={12} xl={6} xs={24}>
                <Link to={card.to}>
                  <Card
                    bodyStyle={{ padding: 0 }}
                    className={classes.quickCard}
                    hoverable
                  >
                    <div className={classes.cardContent}>
                      <div className={classes.cardIconWrapper}>
                        <div style={{ fontSize: 24 }}>{card.icon}</div>
                      </div>
                      <Typography.Title className={classes.cardTitle} level={5}>
                        {card.title}
                      </Typography.Title>
                      <Typography.Text className={classes.cardDescription}>
                        {card.description}
                      </Typography.Text>
                    </div>
                    <div className={classes.cardAction}>
                      <ArrowRightOutlined className={classes.actionIcon} />
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
        </Row>
      </div>

      {/* System Management Section */}
      <div className={classes.section}>
        <Typography.Title className={classes.sectionTitle} level={3}>
          <FontAwesomeIcon className={classes.sectionIcon} icon={faCogs} />
          <FormattedMessage defaultMessage="System Management" />
        </Typography.Title>
        <Typography.Text className={classes.sectionDescription}>
          <FormattedMessage defaultMessage="Advanced configuration and system administration" />
        </Typography.Text>

        <Row className={classes.cardGrid} gutter={[20, 20]}>
          {managementCards
            .filter((card) => card.visible)
            .map((card, index) => (
              <Col key={index} lg={8} sm={12} xl={6} xs={24}>
                <Link to={card.to}>
                  <Card
                    bodyStyle={{ padding: 0 }}
                    className={classes.managementCard}
                    hoverable
                  >
                    <div className={classes.cardContent}>
                      <div className={classes.managementIconWrapper}>
                        {card.icon}
                      </div>
                      <Typography.Title className={classes.cardTitle} level={5}>
                        {card.title}
                      </Typography.Title>
                      <Typography.Text className={classes.cardDescription}>
                        {card.description}
                      </Typography.Text>
                    </div>
                    <div className={classes.cardAction}>
                      <ArrowRightOutlined className={classes.actionIcon} />
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
        </Row>
      </div>

      {/* Help & Resources Section */}
      {/* <div className={classes.section}>*/}
      {/*  <Row gutter={[24, 24]}>*/}
      {/*    <Col xs={24} xxl={16}>*/}
      {/*      <Card className={classes.helpCard}>*/}
      {/*        <div className={classes.helpContent}>*/}
      {/*          <div>*/}
      {/*            <Typography.Title className={classes.helpTitle} level={4}>*/}
      {/*              <FormattedMessage defaultMessage="Need Help Getting Started?" />*/}
      {/*            </Typography.Title>*/}
      {/*            <Typography.Text className={classes.helpDescription}>*/}
      {/*              <FormattedMessage defaultMessage="Check out our comprehensive guides and documentation to make the most of your system configuration." />*/}
      {/*            </Typography.Text>*/}
      {/*            <div className={classes.helpActions}>*/}
      {/*              <Button icon={<InfoCircleOutlined />} type="primary">*/}
      {/*                <FormattedMessage defaultMessage="View Documentation" />*/}
      {/*              </Button>*/}
      {/*              <Button type="default">*/}
      {/*                <FormattedMessage defaultMessage="Contact Support" />*/}
      {/*              </Button>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </Card>*/}
      {/*    </Col>*/}
      {/*  </Row>*/}
      {/* </div>*/}
    </div>
  );
};

export default SettingsHome;
