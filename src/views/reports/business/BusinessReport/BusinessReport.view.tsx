import type { RefObject } from 'react';
import React, { useMemo } from 'react';
import { Button, Col, Drawer, Row, Select, Typography } from 'antd';
import type { PerformanceReportQuery } from 'graphql/generated';
import DatePicker from 'components/util-components/DatePicker';
import Page from 'components/shared-components/AntD/Page/Page';
import RGL, { WidthProvider } from 'react-grid-layout';
import type {
  IncidentsTableData,
  TargetedGoodsTableData,
} from 'components/reports/tableColumns';
import {
  LayoutToReadable,
  margin,
  rowHeight,
} from 'components/reports/utils/utils';
import type { SelectOptions } from './hooks/useBusinessReport';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import BusinessReport from './layout/BusinessReportLayout';
import BusinessReportLayout from './hooks/utils';
// const ReactGridLayout = WidthProvider(RGL);

const { Title } = Typography;

interface Props {
  loading: boolean;
  data: PerformanceReportQuery | undefined;
  groupsLoading: boolean;
  dateRange: { startDate: Date; endDate: Date };
  setDateRange: (dateRange: { startDate: Date; endDate: Date }) => void;
  groups: SelectOptions[];
  setSelectedGroups: (groups: string[]) => void;
  crimeGroups: SelectOptions[];
  setSelectedCrimeGroups: (crimeGroups: string[]) => void;
  selectedGroups: string[];
  componentRef: RefObject<HTMLDivElement>;
  handlePrint: () => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  offenders: SelectOptions[];
  setSelectedOffenders: (offenders: string[]) => void;
  targetedGoodsData: TargetedGoodsTableData[] | [];
  layout: RGL.Layout[];
  setLayout: (layout: RGL.Layout[]) => void;
  minDrawer: boolean;
  setMinDrawer: (arg0: boolean) => void;
  logo: string | null | undefined;
  removeItem: (arg0: string) => void;
  changeSize: (arg0: string, arg1: number) => void;
  isPrinting: boolean;
  businessName: string;
  selectedOffenders: string[];
  selectedCrimeGroups: string[];
  incidentsTableData: IncidentsTableData[] | [];
}

const BusinessReportView = ({
  removeItem,
  changeSize,
  minDrawer,
  setMinDrawer,
  layout,
  setLayout,
  logo,
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
  isPrinting,
  editMode,
  setEditMode,
  incidentsTableData,
  targetedGoodsData,
  crimeGroups,
  setSelectedCrimeGroups,
  selectedCrimeGroups,
  offenders,
  setSelectedOffenders,
  selectedOffenders,
  businessName,
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
          Business Report: {businessName}{' '}
          {dateRange.startDate.toLocaleDateString()} -{' '}
          {dateRange.endDate.toLocaleDateString()}
        </Title>
        <Row
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
            <Select
              placeholder="Select Crime Groups"
              mode="multiple"
              maxTagCount="responsive"
              onChange={(value) => {
                setSelectedCrimeGroups(value || []);
              }}
              value={selectedCrimeGroups}
              defaultValue={crimeGroups.map((group) => group.value)}
              style={{ width: '100%' }}
            >
              {crimeGroups?.map((group) => (
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
              placeholder="Select Offenders"
              mode="multiple"
              maxTagCount="responsive"
              onChange={(value) => {
                setSelectedOffenders(value || []);
              }}
              value={selectedOffenders}
              style={{ width: '100%' }}
            >
              {offenders?.map((offender) => (
                <Select.Option
                  loading={groupsLoading}
                  key={offender.value}
                  value={offender.value}
                >
                  {offender.label}
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
              {...BusinessReport({
                data,
                loading,
                targetedGoodsData,
                removeItem,
                layout,
                margin,
                rowHeight,
                editMode,
                changeSize,
                isPrinting,
                incidentsTableData,
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
          {BusinessReportLayout.filter(
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
          {layout.length === BusinessReportLayout.length && (
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

export default BusinessReportView;
