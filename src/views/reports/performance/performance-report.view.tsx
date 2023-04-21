import type { RefObject } from 'react';
import React, { useMemo } from 'react';
import { Button, Col, Drawer, Row, Select, Typography } from 'antd';
import type { PerformanceReportQuery } from 'graphql/generated';
import DatePicker from 'components/util-components/DatePicker';
import Page from 'components/shared-components/AntD/Page/Page';
import RGL, { WidthProvider } from 'react-grid-layout';
import type {
  BusinessTableData,
  ContributionTableData,
  CrimeGroupPerformanceTableData,
  OffenderTableData,
  TargetedBusinessTableData,
  TargetedGoodsTableData,
} from 'components/reports/tableColumns';
import type { SelectOptions } from './hooks/use-performance-report';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import PerformanceReportLayout from './layout/PerformanceReportLayout';
import {
  LayoutToReadable,
  margin,
  PerformanceLayout,
  rowHeight,
} from './hooks/utils';

// const ReactGridLayout = WidthProvider(RGL);

const { Title } = Typography;

interface Props {
  loading: boolean;
  data: PerformanceReportQuery | undefined;
  groups: SelectOptions[];
  groupsLoading: boolean;
  dateRange: { startDate: Date; endDate: Date };
  setDateRange: (dateRange: { startDate: Date; endDate: Date }) => void;
  setSelectedGroups: (groups: string[]) => void;
  selectedGroups: string[];
  componentRef: RefObject<HTMLDivElement>;
  handlePrint: () => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  businessContributionTableData: BusinessTableData[] | [];
  userContributionTableData: ContributionTableData[] | [];
  offendersTableData: OffenderTableData[] | [];
  crimeGroupPerformanceTableData: CrimeGroupPerformanceTableData[] | [];
  targetedBusinessData: TargetedBusinessTableData[] | [];
  targetedGoodsData: TargetedGoodsTableData[] | [];
  layout: RGL.Layout[];
  setLayout: (layout: RGL.Layout[]) => void;
  minDrawer: boolean;
  setMinDrawer: (arg0: boolean) => void;
  logo: string | null;
  removeItem: (arg0: string) => void;
  changeSize: (arg0: string, arg1: number) => void;
  isPrinting: boolean;
}

const PerformanceReport = ({
  data,
  loading,
  setDateRange,
  dateRange,
  groups,
  setSelectedGroups,
  groupsLoading,
  selectedGroups,
  componentRef,
  handlePrint,
  editMode,
  setEditMode,
  businessContributionTableData,
  userContributionTableData,
  offendersTableData,
  crimeGroupPerformanceTableData,
  targetedBusinessData,
  targetedGoodsData,
  minDrawer,
  setMinDrawer,
  layout,
  setLayout,
  logo,
  removeItem,
  changeSize,
  isPrinting,
}: Props) => {
  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);

  return (
    <Page>
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          top: 20,
          right: 20,
        }}
      >
        <Button
          style={{ marginRight: 10, zIndex: 1000 }}
          key="2"
          onClick={() => setMinDrawer(!minDrawer)}
          type="default"
          hidden={!editMode}
        >
          {minDrawer ? 'Hide Drawer' : 'Show Drawer'}
        </Button>
        <Button
          style={{ marginRight: 10 }}
          key="1"
          onClick={() => setEditMode(!editMode)}
          type={editMode ? 'primary' : 'default'}
        >
          {editMode ? 'Lock' : 'Edit'}
        </Button>
        <Button type="primary" onClick={handlePrint}>
          Print
        </Button>
      </div>
      <div ref={componentRef} className="print-page">
        <div className="logo">
          <img
            style={{ height: '100%', width: '25 %' }}
            src={logo || ''}
            alt="logo"
          />
        </div>
        <Title level={2} className="print-title">
          Performance Report: {dateRange.startDate.toLocaleDateString()} -{' '}
          {dateRange.endDate.toLocaleDateString()}
        </Title>
        <Row
          className="no-print"
          style={{ marginBottom: 10, justifyContent: 'center' }}
        >
          <Col span={8}>
            <Select
              placeholder="Select Groups"
              mode="multiple"
              maxTagCount="responsive"
              onChange={(value) => {
                setSelectedGroups(value || []);
              }}
              value={selectedGroups}
              defaultValue={groups.map((group) => group.value)}
              style={{ width: '100%' }}
            >
              {groups?.map((group) => (
                <Select.Option
                  loading={groupsLoading}
                  key={group.value}
                  value={group.value}
                >
                  {group.label}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col span={6}>
            <DatePicker.RangePicker
              style={{ marginLeft: 10 }}
              defaultValue={[dateRange.startDate, dateRange.endDate]}
              value={[dateRange.startDate, dateRange.endDate]}
              onChange={(value) => {
                setDateRange(
                  value
                    ? {
                        startDate:
                          value?.[0] ||
                          new Date(
                            new Date(
                              new Date().setMonth(new Date().getMonth() - 1)
                            ).setHours(0, 0, 59)
                          ),
                        endDate:
                          value?.[1] ||
                          new Date(new Date().setHours(23, 59, 59)),
                      }
                    : {
                        startDate: new Date(
                          new Date(
                            new Date().setMonth(new Date().getMonth() - 1)
                          ).setHours(0, 0, 59)
                        ),
                        endDate: new Date(new Date().setHours(23, 59, 59)),
                      }
                );
              }}
            />
          </Col>
        </Row>
        <div className="print-container">
          <div className="print-body">
            <ReactGridLayout
              layout={layout}
              cols={2}
              rowHeight={rowHeight}
              width={400}
              isDraggable={editMode}
              isResizable={editMode}
              autoSize
              margin={margin}
              onLayoutChange={(newLayout) => setLayout(newLayout)}
              useCSSTransforms={!isPrinting}
            >
              {...PerformanceReportLayout({
                data,
                loading,
                offendersTableData,
                businessContributionTableData,
                userContributionTableData,
                crimeGroupPerformanceTableData,
                targetedBusinessData,
                targetedGoodsData,
                removeItem,
                layout,
                margin,
                rowHeight,
                editMode,
                changeSize,
              })}
            </ReactGridLayout>
          </div>
        </div>
      </div>
      <Drawer
        title="Charts available"
        placement="bottom"
        mask={false}
        closable
        open={editMode && minDrawer}
        height={200}
        onClose={() => setMinDrawer(!minDrawer)}
      >
        <Row gutter={[6, 6]}>
          {PerformanceLayout.filter(
            (item) => !layout.some((i) => i.i === item.i)
          ).map((item) => (
            <Col key={item.i}>
              <Button
                type="primary"
                style={{ width: 'min-content' }}
                onClick={() => {
                  setLayout([...layout, item]);
                }}
              >
                {LayoutToReadable.find((i) => i.i === item.i)?.readable || ''}
              </Button>
            </Col>
          ))}
          {layout.length === PerformanceLayout.length && (
            <Col>
              <Typography.Title level={5}>
                All charts have been added
              </Typography.Title>
            </Col>
          )}
        </Row>
      </Drawer>
    </Page>
  );
};

export default PerformanceReport;
