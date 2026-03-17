/* eslint-disable react/no-unknown-property */
import type { AvailableDashboardElements } from '#/state/dashboard-model';
import type { Dispatch, SetStateAction } from 'react';
import type RGL from 'react-grid-layout';

import {
  faBan,
  faBoxCheck,
  faBoxes,
  faBuilding,
  faCalendarAlt,
  faChartBar,
  faChartPie,
  faClock,
  faDollarSign,
  faExclamationTriangle,
  faEye,
  faGripVertical,
  faHashtag,
  faLightbulb,
  faListAlt,
  faMapMarkerAlt,
  faNewspaper,
  faStore,
  faTasks,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Drawer, Row, Space, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

const DashboardSelectorDrawer = ({
  layout,
  open,
  setDroppingItem,
  setOpen,
}: {
  layout: RGL.Layout[];
  open: boolean;
  setDroppingItem: Dispatch<
    SetStateAction<
      | {
          h: number;
          i: string;
          maxH?: number;
          maxW?: number;
          minH: number;
          minW: number;
          w: number;
        }
      | undefined
    >
  >;
  setOpen: (open: boolean) => void;
}) => {
  // Generate unique ID for new elements
  const generateUniqueId = (baseType: AvailableDashboardElements): string => {
    const existingIds = layout
      .map(({ i }) => i)
      .filter((id) => id === baseType || id.startsWith(`${baseType}-`));

    // If no existing elements of this type, return the base type
    if (existingIds.length === 0) {
      return baseType;
    }

    // Find all numbers from existing IDs
    const numbers = existingIds
      .map((id) => {
        // Handle base ID without suffix as 0
        if (id === baseType) return 0;

        const match = id.match(new RegExp(`^${baseType}-(\\d+)$`));
        return match ? Number.parseInt(match[1], 10) : -1;
      })
      .filter((n) => n >= 0);

    // Find the next available number
    let counter = 1;
    if (numbers.length > 0) {
      counter = Math.max(...numbers) + 1;
    }

    return `${baseType}-${counter}`;
  };
  const onClose = () => {
    setOpen(false);
  };

  const intl = useIntl();

  // Component configuration with metadata
  const components: Array<{
    category: string;
    defaultSize: { h: number; w: number };
    description: string;
    icon: typeof faChartBar;
    id: AvailableDashboardElements;
    maxH?: number;
    maxW?: number;
    minH: number;
    minW: number;
    name: string;
  }> = [
    {
      category: 'Analytics',
      defaultSize: { h: 5, w: 3 },
      description: intl.formatMessage({
        defaultMessage: 'Configurable data visualization',
      }),
      icon: faChartBar,
      id: 'dashboardGraph',
      minH: 3,
      minW: 2,
      name: intl.formatMessage({ defaultMessage: 'Custom Graph' }),
    },
    {
      category: 'Metrics',
      defaultSize: { h: 3, w: 2 },
      description: intl.formatMessage({
        defaultMessage: 'Total number of incidents',
      }),
      icon: faHashtag,
      id: 'incidentCount',
      minH: 3,
      minW: 2,
      name: intl.formatMessage({ defaultMessage: 'Incident Count' }),
    },
    {
      category: 'Metrics',
      defaultSize: { h: 3, w: 2 },
      description: intl.formatMessage({
        defaultMessage: 'Total value of incidents',
      }),
      icon: faDollarSign,
      id: 'incidentValue',
      minH: 3,
      minW: 2,
      name: intl.formatMessage({ defaultMessage: 'Incident Value' }),
    },
    {
      category: 'Analytics',
      defaultSize: { h: 5, w: 3 },
      description: intl.formatMessage({
        defaultMessage: 'Incidents by day of week',
      }),
      icon: faCalendarAlt,
      id: 'dayOfWeekBar',
      minH: 3,
      minW: 2,
      name: intl.formatMessage({ defaultMessage: 'Day of Week' }),
    },
    {
      category: 'Analytics',
      defaultSize: { h: 3, w: 3 },
      description: intl.formatMessage({ defaultMessage: 'Incidents by hour' }),
      icon: faClock,
      id: 'timeOfDayBar',
      minH: 3,
      minW: 2,
      name: intl.formatMessage({ defaultMessage: 'Time of Day' }),
    },
    {
      category: 'Analytics',
      defaultSize: { h: 3, w: 3 },
      description: intl.formatMessage({
        defaultMessage: 'Most frequently targeted items',
      }),
      icon: faBoxes,
      id: 'targetedGoods',
      minH: 3,
      minW: 2,
      name: intl.formatMessage({ defaultMessage: 'Targeted Goods' }),
    },
    {
      category: 'Offenders',
      defaultSize: { h: 5, w: 3 },
      description: intl.formatMessage({
        defaultMessage: 'Recently active offenders',
      }),
      icon: faUsers,
      id: 'activeOffender',
      minH: 3,
      minW: 2,
      name: intl.formatMessage({ defaultMessage: 'Active Offenders' }),
    },
    {
      category: 'Metrics',
      defaultSize: { h: 3, w: 3 },
      description: intl.formatMessage({
        defaultMessage: 'Most recent incident details',
      }),
      icon: faExclamationTriangle,
      id: 'latestIncident',
      minH: 3,
      minW: 2,
      name: intl.formatMessage({ defaultMessage: 'Latest Incident' }),
    },
    {
      category: 'Incidents',
      defaultSize: { h: 3, w: 3 },
      description: intl.formatMessage({
        defaultMessage: 'List of recent incidents',
      }),
      icon: faListAlt,
      id: 'latestIncidents',
      minH: 3,
      minW: 2,
      name: intl.formatMessage({ defaultMessage: 'Latest Incidents' }),
    },
    {
      category: 'Incidents',
      defaultSize: { h: 3, w: 3 },
      description: intl.formatMessage({
        defaultMessage: 'Pending draft incidents',
      }),
      icon: faExclamationTriangle,
      id: 'draftIncidents',
      minH: 3,
      minW: 2,
      name: intl.formatMessage({ defaultMessage: 'Draft Incidents' }),
    },
    {
      category: 'Content',
      defaultSize: { h: 5, w: 3 },
      description: intl.formatMessage({
        defaultMessage: 'Latest articles and news',
      }),
      icon: faNewspaper,
      id: 'articlesSection',
      minH: 3,
      minW: 2,
      name: intl.formatMessage({ defaultMessage: 'Articles' }),
    },
    {
      category: 'Content',
      defaultSize: { h: 5, w: 3 },
      description: intl.formatMessage({
        defaultMessage: 'Recent activity stream',
      }),
      icon: faListAlt,
      id: 'feedItemCol',
      minH: 3,
      minW: 2,
      name: intl.formatMessage({ defaultMessage: 'Activity Feed' }),
    },
    {
      category: 'Management',
      defaultSize: { h: 5, w: 3 },
      description: intl.formatMessage({
        defaultMessage: 'Administrative to-do items',
      }),
      icon: faTasks,
      id: 'adminTodos',
      minH: 3,
      minW: 2,
      name: intl.formatMessage({ defaultMessage: 'Admin Tasks' }),
    },
    {
      category: 'Management',
      defaultSize: { h: 5, w: 3 },
      description: intl.formatMessage({
        defaultMessage: 'Stock removal requests requiring action',
      }),
      icon: faBoxCheck,
      id: 'myStockRequests',
      minH: 3,
      minW: 2,
      name: intl.formatMessage({ defaultMessage: 'My Stock Requests' }),
    },
    // Store Dashboard widgets
    {
      category: 'Store Dashboard',
      defaultSize: { h: 3, w: 12 },
      description: intl.formatMessage({
        defaultMessage: 'KPI summary for your store',
      }),
      icon: faStore,
      id: 'storeSummary',
      maxH: 4,
      maxW: 12,
      minH: 3,
      minW: 6,
      name: intl.formatMessage({ defaultMessage: 'Store Summary' }),
    },
    {
      category: 'Store Dashboard',
      defaultSize: { h: 7, w: 6 },
      description: intl.formatMessage({
        defaultMessage: 'Offenders on the watchlist for your store',
      }),
      icon: faEye,
      id: 'offenderWatchlist',
      minH: 5,
      minW: 3,
      name: intl.formatMessage({ defaultMessage: 'Offender Watchlist' }),
    },
    {
      category: 'Store Dashboard',
      defaultSize: { h: 7, w: 4 },
      description: intl.formatMessage({
        defaultMessage: 'Insights and trends from the watchlist',
      }),
      icon: faChartBar,
      id: 'watchlistInsights',
      minH: 5,
      minW: 3,
      name: intl.formatMessage({ defaultMessage: 'Watchlist Insights' }),
    },
    {
      category: 'Store Dashboard',
      defaultSize: { h: 6, w: 6 },
      description: intl.formatMessage({
        defaultMessage: 'Currently active bans at your store',
      }),
      icon: faBan,
      id: 'storeActiveBans',
      minH: 4,
      minW: 3,
      name: intl.formatMessage({ defaultMessage: 'Active Bans' }),
    },
    {
      category: 'Store Dashboard',
      defaultSize: { h: 6, w: 6 },
      description: intl.formatMessage({
        defaultMessage: 'Recent incidents at your store',
      }),
      icon: faExclamationTriangle,
      id: 'storeRecentIncidents',
      minH: 4,
      minW: 3,
      name: intl.formatMessage({ defaultMessage: 'Recent Incidents' }),
    },
    {
      category: 'Store Dashboard',
      defaultSize: { h: 6, w: 6 },
      description: intl.formatMessage({
        defaultMessage: 'Crime pattern analysis for your store',
      }),
      icon: faChartPie,
      id: 'storeCrimePatterns',
      minH: 5,
      minW: 4,
      name: intl.formatMessage({ defaultMessage: 'Crime Patterns' }),
    },
    {
      category: 'Store Dashboard',
      defaultSize: { h: 6, w: 4 },
      description: intl.formatMessage({
        defaultMessage: 'Crime and incident context for the local area',
      }),
      icon: faMapMarkerAlt,
      id: 'localAreaContext',
      minH: 4,
      minW: 3,
      name: intl.formatMessage({ defaultMessage: 'Local Area Context' }),
    },
    {
      category: 'Store Dashboard',
      defaultSize: { h: 5, w: 12 },
      description: intl.formatMessage({
        defaultMessage: 'Recommended actions and outstanding tasks',
      }),
      icon: faTasks,
      id: 'storeActionItems',
      minH: 4,
      minW: 6,
      name: intl.formatMessage({ defaultMessage: 'Action Items' }),
    },
    // Retail Dashboard widgets
    {
      category: 'Retail Dashboard',
      defaultSize: { h: 3, w: 12 },
      description: intl.formatMessage({
        defaultMessage: 'KPI summary across all stores',
      }),
      icon: faBuilding,
      id: 'adminSummary',
      maxH: 4,
      maxW: 12,
      minH: 3,
      minW: 8,
      name: intl.formatMessage({ defaultMessage: 'Admin Summary' }),
    },
    {
      category: 'Retail Dashboard',
      defaultSize: { h: 7, w: 7 },
      description: intl.formatMessage({
        defaultMessage: 'Most active offenders across the estate',
      }),
      icon: faUsers,
      id: 'retailTopOffenders',
      minH: 5,
      minW: 4,
      name: intl.formatMessage({ defaultMessage: 'Top Offenders' }),
    },
    {
      category: 'Retail Dashboard',
      defaultSize: { h: 7, w: 5 },
      description: intl.formatMessage({
        defaultMessage: 'Repeat offender recidivism insights',
      }),
      icon: faEye,
      id: 'retailRepeatOffenders',
      minH: 5,
      minW: 3,
      name: intl.formatMessage({ defaultMessage: 'Repeat Offender Insights' }),
    },
    {
      category: 'Retail Dashboard',
      defaultSize: { h: 6, w: 6 },
      description: intl.formatMessage({
        defaultMessage: 'Breakdown of incidents by crime type',
      }),
      icon: faChartPie,
      id: 'crimeTypeDistribution',
      minH: 5,
      minW: 4,
      name: intl.formatMessage({ defaultMessage: 'Crime Type Distribution' }),
    },
    {
      category: 'Retail Dashboard',
      defaultSize: { h: 6, w: 6 },
      description: intl.formatMessage({
        defaultMessage: 'Business-level intelligence and loss metrics',
      }),
      icon: faLightbulb,
      id: 'businessIntelligence',
      minH: 5,
      minW: 4,
      name: intl.formatMessage({ defaultMessage: 'Business Intelligence' }),
    },
    {
      category: 'Retail Dashboard',
      defaultSize: { h: 6, w: 8 },
      description: intl.formatMessage({
        defaultMessage: 'Crime pattern analysis across the estate',
      }),
      icon: faChartBar,
      id: 'retailCrimePatterns',
      minH: 5,
      minW: 4,
      name: intl.formatMessage({ defaultMessage: 'Crime Patterns' }),
    },
    {
      category: 'Retail Dashboard',
      defaultSize: { h: 6, w: 6 },
      description: intl.formatMessage({
        defaultMessage: 'Most frequently targeted goods',
      }),
      icon: faBoxes,
      id: 'retailTargetedGoods',
      minH: 4,
      minW: 3,
      name: intl.formatMessage({ defaultMessage: 'Targeted Goods' }),
    },
    {
      category: 'Retail Dashboard',
      defaultSize: { h: 6, w: 6 },
      description: intl.formatMessage({
        defaultMessage: 'Incidents and tasks requiring operational attention',
      }),
      icon: faListAlt,
      id: 'operationalQueue',
      minH: 4,
      minW: 3,
      name: intl.formatMessage({ defaultMessage: 'Operational Queue' }),
    },
  ];

  // Group components by category
  const groupedComponents: Record<string, typeof components> = {};
  for (const component of components) {
    if (!groupedComponents[component.category]) {
      groupedComponents[component.category] = [];
    }
    groupedComponents[component.category].push(component);
  }

  // Category order and colors
  const categoryConfig: Record<string, { color: string; order: number }> = {
    Analytics: { color: '#52c41a', order: 2 },
    Content: { color: '#722ed1', order: 5 },
    Incidents: { color: '#fa8c16', order: 3 },
    Management: { color: '#13c2c2', order: 6 },
    Metrics: { color: '#1890ff', order: 1 },
    Offenders: { color: '#f5222d', order: 4 },
    'Retail Dashboard': { color: '#faad14', order: 8 },
    'Store Dashboard': { color: '#eb2f96', order: 7 },
  };

  const sortedCategories = Object.keys(groupedComponents).sort(
    (a, b) =>
      (categoryConfig[a]?.order || 999) - (categoryConfig[b]?.order || 999)
  );

  return (
    <Drawer
      bodyStyle={{ padding: '16px' }}
      closeIcon={null}
      extra={
        <Space>
          <Button onClick={onClose} type="primary">
            {intl.formatMessage({ defaultMessage: 'Close' })}
          </Button>
        </Space>
      }
      mask={false}
      onClose={onClose}
      open={open}
      placement="left"
      title={
        <Space direction="vertical" size={4}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {intl.formatMessage({ defaultMessage: 'Dashboard Components' })}
          </Typography.Title>
          <Typography.Text style={{ fontSize: 13 }} type="secondary">
            {intl.formatMessage({
              defaultMessage: 'Drag components to add them to your dashboard',
            })}
          </Typography.Text>
        </Space>
      }
      width={420}
    >
      {sortedCategories.map((category) => (
        <div key={category} style={{ marginBottom: 28 }}>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              gap: 8,
              marginBottom: 12,
            }}
          >
            <Typography.Title level={4} style={{ fontSize: 18, margin: 0 }}>
              {category}
            </Typography.Title>
            <Typography.Text style={{ fontSize: 13 }} type="secondary">
              {intl.formatMessage(
                { defaultMessage: '({count})' },
                { count: groupedComponents[category].length }
              )}
            </Typography.Text>
          </div>

          <Row gutter={[12, 12]}>
            {groupedComponents[category].map((component) => (
              <Col key={component.id} span={24}>
                <Card
                  bodyStyle={{
                    padding: '12px 16px',
                  }}
                  className="dashboard-component-card"
                  draggable
                  hoverable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', '');
                    const uniqueId = generateUniqueId(component.id);
                    setDroppingItem({
                      h: component.defaultSize.h,
                      i: uniqueId,
                      maxH: component.maxH,
                      maxW: component.maxW,
                      minH: component.minH,
                      minW: component.minW,
                      w: component.defaultSize.w,
                    });
                  }}
                  style={{
                    cursor: 'grab',
                    transition: 'all 0.3s',
                  }}
                >
                  <Row align="middle" gutter={12}>
                    <Col flex="none">
                      <FontAwesomeIcon
                        icon={faGripVertical}
                        style={{
                          color: '#bfbfbf',
                          fontSize: 14,
                        }}
                      />
                    </Col>
                    <Col flex="none">
                      <div
                        style={{
                          alignItems: 'center',
                          background: `${categoryConfig[category]?.color}15`,
                          borderRadius: 6,
                          display: 'flex',
                          height: 32,
                          justifyContent: 'center',
                          width: 32,
                        }}
                      >
                        <FontAwesomeIcon
                          icon={component.icon}
                          style={{
                            color: categoryConfig[category]?.color,
                            fontSize: 16,
                          }}
                        />
                      </div>
                    </Col>
                    <Col flex="auto">
                      <Space direction="vertical" size={0}>
                        <Typography.Text strong style={{ fontSize: 14 }}>
                          {component.name}
                        </Typography.Text>
                        <Typography.Text
                          style={{ fontSize: 12 }}
                          type="secondary"
                        >
                          {component.description}
                        </Typography.Text>
                      </Space>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .dashboard-component-card {
          border: 1px solid rgba(0, 0, 0, 0.06);
        }
        @media (prefers-color-scheme: dark) {
          .dashboard-component-card {
            border: 1px solid rgba(255, 255, 255, 0.12);
          }
        }
        .ant-theme-dark .dashboard-component-card {
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .dashboard-component-card:hover {
          border-color: #1890ff !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        .dashboard-component-card:active {
          cursor: grabbing;
          opacity: 0.8;
        }
      `,
        }}
      />
    </Drawer>
  );
};

export default DashboardSelectorDrawer;
