/* eslint-disable react/no-unknown-property */
import type { AvailableDashboardElements } from '#/state/dashboard-model';
import type { Dispatch, SetStateAction } from 'react';
import type RGL from 'react-grid-layout';

import {
  faBoxCheck,
  faBoxes,
  faCalendarAlt,
  faChartBar,
  faClock,
  faDollarSign,
  faExclamationTriangle,
  faGripVertical,
  faHashtag,
  faListAlt,
  faNewspaper,
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
    SetStateAction<{ h: number; i: string; w: number } | undefined>
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
      name: intl.formatMessage({ defaultMessage: 'Day of Week' }),
    },
    {
      category: 'Analytics',
      defaultSize: { h: 3, w: 3 },
      description: intl.formatMessage({ defaultMessage: 'Incidents by hour' }),
      icon: faClock,
      id: 'timeOfDayBar',
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
      name: intl.formatMessage({ defaultMessage: 'My Stock Requests' }),
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
