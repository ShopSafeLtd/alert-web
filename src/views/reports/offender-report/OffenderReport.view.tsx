import type { RefObject } from 'react';
import React, { useMemo } from 'react';
import { Button, Col, Drawer, Row, Select, Typography } from 'antd';
import type { OffenderReportQuery } from 'graphql/generated';
import DatePicker from 'components/util-components/DatePicker';
import Page from 'components/shared-components/AntD/Page/Page';
import RGL, { WidthProvider } from 'react-grid-layout';
import {
  LayoutToReadable,
  margin,
  rowHeight,
} from 'components/reports/utils/utils';
import type { SelectOptions } from './hooks/useOffenderReport';
import type {
  IncidentsTableData,
  TargetedBusinessTableData,
  TargetedGoodsTableData,
} from '../../../components/reports/tableColumns';
import OffenderReportLayout from './layout/OffenderReportLayout';
import OffenderLayout from './hooks/utils';

const { Title } = Typography;

interface Props {
  loading: boolean;
  data: OffenderReportQuery | undefined;
  groups: SelectOptions[];
  dateRange: { startDate: Date; endDate: Date };
  setDateRange: (dateRange: { startDate: Date; endDate: Date }) => void;
  setSelectedGroups: (groups: string[]) => void;
  groupsLoading: boolean;
  selectedGroups: string[];
  selectedBusiness: string[];
  setSelectedBusiness: (businesses: string[]) => void;
  businesses: SelectOptions[];
  componentRef: RefObject<HTMLDivElement>;
  handlePrint: () => void;
  isPrinting: boolean;
  layout: RGL.Layout[];
  setLayout: (layout: RGL.Layout[]) => void;
  minDrawer: boolean;
  setMinDrawer: (arg0: boolean) => void;
  logo: string | null | undefined;
  removeItem: (arg0: string) => void;
  changeSize: (arg0: string, arg1: number) => void;
  targetedBusinessData: TargetedBusinessTableData[] | [];
  targetedGoodsData: TargetedGoodsTableData[] | [];
  incidentsTableData: IncidentsTableData[] | [];
  editMode: boolean;
  setEditMode: (arg0: boolean) => void;
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
  businesses,
  selectedBusiness,
  setSelectedBusiness,
  componentRef,
  handlePrint,
  isPrinting,
  layout,
  setLayout,
  minDrawer,
  setMinDrawer,
  logo,
  removeItem,
  changeSize,
  targetedGoodsData,
  incidentsTableData,
  targetedBusinessData,
  editMode,
  setEditMode,
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
          zIndex: 1000,
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
          Offender Report: {data?.offenderReport?.offenderSummary?.name} -{' '}
          {dateRange.startDate.toLocaleDateString()} -{' '}
          {dateRange.endDate.toLocaleDateString()}
        </Title>
        <Row
          gutter={16}
          className="no-print"
          style={{ marginBottom: 10, justifyContent: 'center' }}
        >
          <Col span={6}>
            <Select
              placeholder="Select Groups"
              mode="multiple"
              maxTagCount="responsive"
              onChange={(value) => {
                setSelectedGroups(value || []);
              }}
              value={selectedGroups}
              defaultValue={groups.map((group) => group.value)}
              style={{ width: '100%', marginRight: 10 }}
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
            <Select
              placeholder="Select Business"
              mode="multiple"
              maxTagCount="responsive"
              onChange={(value) => {
                setSelectedBusiness(value || []);
              }}
              value={selectedBusiness}
              defaultValue={businesses.map((business) => business.value)}
              style={{ width: '100%', marginLeft: 10 }}
            >
              {businesses?.map((business) => (
                <Select.Option
                  loading={groupsLoading}
                  key={business.value}
                  value={business.value}
                >
                  {business.label}
                </Select.Option>
              ))}
            </Select>
          </Col>

          <Col span={4}>
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
              verticalCompact
            >
              {...OffenderReportLayout({
                data,
                loading,
                incidentsTableData,
                targetedBusinessData,
                targetedGoodsData,
                removeItem,
                layout,
                margin,
                rowHeight,
                editMode,
                changeSize,
                isPrinting,
              })}
            </ReactGridLayout>
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
            {OffenderLayout.filter(
              (item) => !layout.some((i) => i.i === item.i)
            ).map((item) => (
              <Col key={item.i}>
                <Button
                  type="primary"
                  style={{ width: 'min-content' }}
                  onClick={() => {
                    setLayout([
                      ...layout,
                      {
                        ...item,
                        x: 0,
                        y: 0,
                      },
                    ]);
                  }}
                >
                  {LayoutToReadable.find((i) => i.i === item.i)?.readable || ''}
                </Button>
              </Col>
            ))}
            {layout.length === OffenderLayout.length && (
              <Col>
                <Typography.Title level={5}>
                  All charts have been added
                </Typography.Title>
              </Col>
            )}
          </Row>
        </Drawer>
      </div>
    </Page>
  );
};

export default PerformanceReport;
