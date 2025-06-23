import KnowledgeBaseSection from '#/components/data-management/KnowledgeBaseSection';
import ToolCard from '#/components/data-management/ToolCard';
import useSharedStyles from '#/components/data-management/shared.styles';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  faCloudUpload,
  faDatabase,
  faFileImport,
  faFileText,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Space, Typography } from 'antd';
import { useAtomValue } from 'jotai/index';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const customStockAllowed = new Set(['cltr752fn001kwdcafx5pbq29']);

const ImportMenu = () => {
  const classes = useSharedStyles();
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const importTools = [
    ...(customStockAllowed.has(schemeId)
      ? [
          {
            description: (
              <FormattedMessage defaultMessage="Import stock data from a csv/txt file into alert." />
            ),
            icon: <FontAwesomeIcon icon={faDatabase} />,
            iconBackground: '#1890ff',
            iconColor: '#1890ff',
            title: <FormattedMessage defaultMessage="Bulk Stock Import" />,
            to: '/app/scheme-settings/csv-import',
          },
        ]
      : []),
    {
      description: (
        <FormattedMessage defaultMessage="Import data from a csv file into alert." />
      ),
      icon: <FontAwesomeIcon icon={faFileImport} />,
      iconBackground: '#52c41a',
      iconColor: '#52c41a',
      title: <FormattedMessage defaultMessage="CSV Import" />,
      to: '/app/scheme-settings/data-import/csv/stock-items',
    },
    {
      description: (
        <FormattedMessage defaultMessage="Import data from a disc data dump into alert." />
      ),
      icon: <FontAwesomeIcon icon={faDatabase} />,
      iconBackground: '#722ed1',
      iconColor: '#722ed1',
      title: <FormattedMessage defaultMessage="DISC Import" />,
      to: '/app/scheme-settings/data-import/disc',
    },
    {
      description: (
        <FormattedMessage defaultMessage="Import data from a mysafety export into alert." />
      ),
      icon: <FontAwesomeIcon icon={faCloudUpload} />,
      iconBackground: '#fa8c16',
      iconColor: '#fa8c16',
      title: <FormattedMessage defaultMessage="MySafety Import" />,
      to: '/app/scheme-settings/data-import/mysafety',
    },
    {
      description: (
        <FormattedMessage defaultMessage="Import data from a intel one export into alert." />
      ),
      icon: <FontAwesomeIcon icon={faDatabase} />,
      iconBackground: '#13c2c2',
      iconColor: '#13c2c2',
      title: <FormattedMessage defaultMessage="Intel One Import" />,
      to: '/app/scheme-settings/data-import/intel-one',
    },
    {
      description: (
        <FormattedMessage defaultMessage="Import incident data from external sources." />
      ),
      icon: <FontAwesomeIcon icon={faFileText} />,
      iconBackground: '#f5222d',
      iconColor: '#f5222d',
      title: <FormattedMessage defaultMessage="Incident Import" />,
      to: '/app/scheme-settings/data-import/incident-import',
    },
  ];

  const knowledgeBaseSections = [
    {
      content: (
        <Space direction="vertical" size={8}>
          <Typography.Text>
            <FormattedMessage defaultMessage="Ensure your data is properly formatted" />
          </Typography.Text>
          <Typography.Text>
            <FormattedMessage defaultMessage="Check file size limits" />
          </Typography.Text>
        </Space>
      ),
      title: <FormattedMessage defaultMessage="Before You Start" />,
    },
    {
      content: (
        <Space direction="vertical" size={8}>
          <Typography.Text>
            <strong>
              <FormattedMessage defaultMessage="CSV:  " />
            </strong>
            <FormattedMessage defaultMessage="Comma-separated values" />
          </Typography.Text>
          <Typography.Text>
            <strong>
              <FormattedMessage defaultMessage="Excel:  " />
            </strong>
            <FormattedMessage defaultMessage="Spreadsheet files (.xlsx)" />
          </Typography.Text>
        </Space>
      ),
      title: <FormattedMessage defaultMessage="Common File Formats" />,
    },
    {
      content: (
        <Typography.Text style={{ fontSize: 13 }} type="secondary">
          <FormattedMessage defaultMessage="All imported data is validated against your scheme's configuration. Invalid records will be flagged and can be reviewed before final import." />
        </Typography.Text>
      ),
      title: <FormattedMessage defaultMessage="Data Validation" />,
    },
  ];

  return (
    <div className={classes.page}>
      <Row className={classes.mainRow} gutter={16} wrap={false}>
        <Col span={16}>
          <div className={classes.toolsSection}>
            <Typography.Title className={classes.toolsSectionTitle} level={3}>
              <FormattedMessage defaultMessage="Data Import Tools" />
            </Typography.Title>
            <Typography.Text
              className={classes.toolsSectionSubtitle}
              type="secondary"
            >
              <FormattedMessage defaultMessage="Choose the appropriate import tool for your data source." />
            </Typography.Text>
          </div>

          <Row className={classes.toolsGrid} gutter={[16, 16]}>
            {importTools.map((tool, index) => (
              <Col key={index} lg={8} sm={12} xl={8} xs={24} xxl={8}>
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
        </Col>

        {/* Knowledge Base Section */}
        <Col span={8}>
          <KnowledgeBaseSection
            proTip={{
              content: (
                <FormattedMessage defaultMessage="Start with a small test file to verify your data format before importing large datasets." />
              ),
              title: <FormattedMessage defaultMessage="💡 Pro Tip" />,
            }}
            sections={knowledgeBaseSections}
            subtitle={
              <FormattedMessage defaultMessage="Learn how to import your data effectively" />
            }
            title={<FormattedMessage defaultMessage="Import Guide" />}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ImportMenu;
