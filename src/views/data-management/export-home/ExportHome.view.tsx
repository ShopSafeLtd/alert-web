import ToolCard from '#/components/data-management/ToolCard';
import useSharedStyles from '#/components/data-management/shared.styles';
import { currentPermissionsAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  faCloudDownload,
  faFileExport,
  faSquareCheck,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Row, Space, Typography } from 'antd';
import { PermissionModel } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const ExportHome = () => {
  const classes = useSharedStyles();
  const permissions = useAtomValue(currentPermissionsAtom)?.map(
    ({ model }) => model
  );

  const hasExportPerms = permissions?.includes(PermissionModel.DataExport);

  const exportTools = [
    {
      description: (
        <FormattedMessage defaultMessage="Export incidents data to CSV format for analysis and reporting outside of Alert." />
      ),
      icon: <FontAwesomeIcon icon={faFileExport} />,
      iconBackground: '#f5222d',
      iconColor: '#f5222d',
      title: <FormattedMessage defaultMessage="Export Incidents" />,
      to: '/app/scheme-settings/data-export/export-incidents',
    },
    {
      description: (
        <FormattedMessage defaultMessage="Export checklist data to CSV format for compliance tracking and external reporting." />
      ),
      icon: <FontAwesomeIcon icon={faSquareCheck} />,
      iconBackground: '#52c41a',
      iconColor: '#52c41a',
      title: <FormattedMessage defaultMessage="Export Checklists" />,
      to: '/app/scheme-settings/data-export/export-checklists',
    },
  ];

  // const knowledgeBaseSections = [
  //   {
  //     content: (
  //       <Space direction="vertical" size={8}>
  //         <Typography.Text>
  //           • <strong>CSV:</strong>{' '}
  //           <FormattedMessage defaultMessage="Best for spreadsheet applications" />
  //         </Typography.Text>
  //       </Space>
  //     ),
  //     title: <FormattedMessage defaultMessage="Export Formats" />,
  //   },
  //   {
  //     content: (
  //       <Space direction="vertical" size={8}>
  //         <Typography.Text>
  //           • <FormattedMessage defaultMessage="Filter by date ranges" />
  //         </Typography.Text>
  //         <Typography.Text>
  //           • <FormattedMessage defaultMessage="Select specific data fields" />
  //         </Typography.Text>
  //         <Typography.Text>
  //           • <FormattedMessage defaultMessage="Apply status filters" />
  //         </Typography.Text>
  //       </Space>
  //     ),
  //     title: <FormattedMessage defaultMessage="Data Filtering" />,
  //   },
  // ];

  return (
    <div className={classes.page}>
      <Row className={classes.mainRow} gutter={16} wrap={false}>
        <Col span={16}>
          <div className={classes.toolsSection}>
            <Typography.Title className={classes.toolsSectionTitle} level={3}>
              <FormattedMessage defaultMessage="Data Export Tools" />
            </Typography.Title>
            <Typography.Text
              className={classes.toolsSectionSubtitle}
              type="secondary"
            >
              <FormattedMessage defaultMessage="Export your data from Alert for external use and analysis." />
            </Typography.Text>
          </div>

          {hasExportPerms ? (
            <Row className={classes.toolsGrid} gutter={[16, 16]}>
              {exportTools.map((tool, index) => (
                <Col key={index} lg={8} sm={12} xs={24}>
                  <ToolCard
                    description={tool.description}
                    icon={tool.icon}
                    iconBackground={tool.iconBackground}
                    iconColor={tool.iconColor}
                    title={tool.title}
                    to={tool.to}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <Card className={classes.permissionCard}>
              <Space direction="vertical" size={16}>
                <FontAwesomeIcon
                  className={classes.permissionIcon}
                  icon={faCloudDownload}
                />
                <Typography.Title className={classes.permissionTitle} level={4}>
                  <FormattedMessage defaultMessage="Export Access Required" />
                </Typography.Title>
                <Typography.Text className={classes.permissionText}>
                  <FormattedMessage defaultMessage="You don't have permission to export data. Please contact your administrator for access." />
                </Typography.Text>
              </Space>
            </Card>
          )}
        </Col>

        {/* Knowledge Base Section */}
        {/* <Col span={8}>*/}
        {/*  <KnowledgeBaseSection*/}
        {/*    // proTip={{*/}
        {/*    //   content: (*/}
        {/*    //     <FormattedMessage defaultMessage="Schedule regular exports to maintain up-to-date external backups of your critical data." />*/}
        {/*    //   ),*/}
        {/*    //   title: <FormattedMessage defaultMessage="💡 Pro Tip" />,*/}
        {/*    // }}*/}
        {/*    sections={knowledgeBaseSections}*/}
        {/*    subtitle={*/}
        {/*      <FormattedMessage defaultMessage="Learn how to export your data effectively" />*/}
        {/*    }*/}
        {/*    title={<FormattedMessage defaultMessage="Export Guide" />}*/}
        {/*  />*/}
        {/* </Col>*/}
      </Row>
    </div>
  );
};

export default ExportHome;
