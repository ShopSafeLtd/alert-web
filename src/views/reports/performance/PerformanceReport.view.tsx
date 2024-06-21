import React, { useMemo, useState } from 'react';
import { Badge, Button, Col, Drawer, Form, Row, Typography } from 'antd';
import { Page } from 'components/shared-components/AntD/Page/Page';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { margin, rowHeight } from 'components/reports/utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilters, faTrash } from '@fortawesome/pro-light-svg-icons';
import 'react-resizable/css/styles.css';
import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import GeneratePrintPage from '#/views/reports/GeneratePrintPage';
import IndustrySelect from '#/components/industry/IndustrySelect';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import BrandsSelect from '#/components/form-components/BrandsSelect/BrandsSelect.view';
import RolesSelect from '#/components/form-components/RolesSelect/RolesSelect.view';
import AddLogo from '../../../components/reports/addLogo';
import PerformanceReportLayout from './layout/PerformanceReportLayout';
import SaveAs from '../../../components/reports/saveAs';
import type { Props } from './hooks/types';
import { LayoutToReadable } from '../types';
import ComponentList from '#/components/reports/ComponentList/ComponentList.view';
import ReportsSideMenu from '#/components/reports/ReportsSideMenu/ReportsSideMenu.view';
import ReportToolbar from '#/components/reports/ReportToolbar/ReportToolbar.view';
import { useParams } from 'react-router-dom';
import DateSelect from '#/components/reports/DateSelect/DateSelect.view';

// const ReactGridLayout = WidthProvider(RGL);

const { Title } = Typography;

type FilterProps = Pick<
  Props,
  | 'groups'
  | 'setSelectedGroups'
  | 'selectedGroups'
  | 'dateRange'
  | 'setDateRange'
  | 'groupsLoading'
  | 'toggleFiltersOpen'
  | 'filterCount'
> & {
  intl: IntlShape;
};

const FilterOptions = ({
  groups,
  intl,
  setSelectedGroups,
  selectedGroups,
  setDateRange,
  toggleFiltersOpen,
  filterCount,
}: FilterProps) => (
  <Form layout="vertical">
    <Row className="no-print" gutter={8} wrap={false}>
      <Col span={8}>
        <Form.Item style={{ marginBottom: 0 }}>
          <GroupsSelect
            placeholder={intl.formatMessage({
              defaultMessage: 'Select Groups',
            })}
            mode="multiple"
            maxTagCount="responsive"
            onChange={(value) => {
              setSelectedGroups(value || []);
            }}
            value={selectedGroups}
            defaultValue={groups.map((group) => group.value)}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Col>
      <Col>
        <Form.Item style={{ marginBottom: 0 }}>
          <DateSelect onChange={setDateRange} defaultRange="last30Days" />
        </Form.Item>
      </Col>
      <Col>
        <Button onClick={toggleFiltersOpen}>
          <FontAwesomeIcon icon={faFilters} style={{ marginRight: 10 }} />
          <Badge count={filterCount} showZero={false} offset={[8, 0]}>
            {intl.formatMessage({
              defaultMessage: 'More Filters',
            })}
          </Badge>
        </Button>
      </Col>
    </Row>
  </Form>
);

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
  removeItem,
  changeSize,
  isPrinting,
  metadata,
  setMetadata,
  removeLogo,
  setAddLogoDrawer,
  addLogoDrawer,
  addLogo,
  logos,
  saveTemplate,
  setSaveAsDrawer,
  saveAsDrawer,
  setSelectedBrands,
  selectedBrands,
  investigationsData,
  setSelectedIndustries,
  selectedIndustries,
  setRedactOnPrint,
  redactOnPrint,
  filtersOpen,
  toggleFiltersOpen,
  setSelectedRoles,
  selectedRoles,
  filterCount,
  schemeId,
  saving,
}: Props) => {
  const { reportId } = useParams();
  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);
  const [collapsed, setCollapsed] = useState(false);

  const intl = useIntl();

  return (
    <Row wrap={false}>
      <Col style={{ width: collapsed ? 0 : undefined }}>
        <ReportsSideMenu
          selectedId={reportId ?? ''}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </Col>
      <Col flex={1}>
        <Page>
          <Row
            className="no-print"
            style={{
              position: 'absolute',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              top: 20,
              left: 20,
              right: 20,
              zIndex: 1000,
            }}
          >
            <Col flex={1}>
              <FilterOptions
                groups={groups}
                intl={intl}
                setSelectedGroups={setSelectedGroups}
                selectedGroups={selectedGroups}
                dateRange={dateRange}
                setDateRange={setDateRange}
                groupsLoading={groupsLoading}
                toggleFiltersOpen={toggleFiltersOpen}
                filterCount={filterCount}
              />
            </Col>
            <Col>
              <ReportToolbar
                handlePrint={handlePrint}
                setMinDrawer={setMinDrawer}
                editMode={editMode}
                minDrawer={minDrawer}
                redactOnPrint={redactOnPrint}
                saveTemplate={saveTemplate}
                setEditMode={setEditMode}
                setRedactOnPrint={setRedactOnPrint}
                setSaveAsDrawer={setSaveAsDrawer}
                saving={saving}
              />
            </Col>
          </Row>

          {editMode ? (
            <div style={{ paddingTop: 60 }} className="print-page">
              <div className="logo">
                {metadata
                  ?.find((item) => item.key === 'logo')
                  ?.urls?.map((url, _i, array) => (
                    <>
                      <Button
                        type="text"
                        className="no-print"
                        hidden={!editMode}
                        icon={
                          <FontAwesomeIcon
                            icon={faTrash}
                            color="red"
                            size="lg"
                          />
                        }
                        onClick={() => removeLogo(_i)}
                      />
                      <img
                        style={{
                          height: '100%',
                          width: '25 %',
                          marginRight: array.length - 1 === _i ? 0 : 10,
                        }}
                        src={url || ''}
                        // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                        alt="logo"
                      />
                    </>
                  ))}
                <Button
                  className="no-print"
                  hidden={!editMode}
                  onClick={() => setAddLogoDrawer(true)}
                  type="primary"
                  style={{ marginLeft: 10 }}
                >
                  {intl.formatMessage({
                    defaultMessage: 'Add Logo',
                  })}
                </Button>
              </div>
              <Title level={2} className="print-title">
                {intl.formatMessage(
                  {
                    defaultMessage: 'Summary Report: {startDate} - {endDate}',
                  },
                  {
                    startDate: dateRange.startDate.toLocaleDateString(),
                    endDate: dateRange.endDate.toLocaleDateString(),
                  }
                )}
              </Title>

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
                      isPrinting,
                      metadata,
                      setMetadata,
                      investigationsData,
                      filters: {
                        selectedBrands,
                        selectedIndustries,
                        selectedRoles,
                        dateRange,
                        selectedGroups,
                        schemeId,
                      },
                    })}
                  </ReactGridLayout>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <GeneratePrintPage
                componentRef={componentRef}
                logo={
                  <>
                    <div className="logo">
                      {metadata
                        ?.find((item) => item.key === 'logo')
                        ?.urls?.map((url, _i, array) => (
                          <>
                            <Button
                              type="text"
                              className="no-print"
                              hidden={!editMode}
                              icon={
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  color="red"
                                  size="lg"
                                />
                              }
                              onClick={() => removeLogo(_i)}
                            />
                            <img
                              style={{
                                height: '100%',
                                width: '25 %',
                                marginRight: array.length - 1 === _i ? 0 : 10,
                              }}
                              src={url || ''}
                              // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                              alt="logo"
                            />
                          </>
                        ))}
                    </div>
                  </>
                }
                title={
                  <Title level={2} className="print-title">
                    {intl.formatMessage(
                      {
                        defaultMessage:
                          'Summary Report: {startDate} - {endDate}',
                      },
                      {
                        startDate: dateRange.startDate.toLocaleDateString(),
                        endDate: dateRange.endDate.toLocaleDateString(),
                      }
                    )}
                  </Title>
                }
                elements={PerformanceReportLayout({
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
                  isPrinting,
                  metadata,
                  setMetadata,
                  investigationsData,
                  filters: {
                    selectedBrands,
                    selectedIndustries,
                    selectedRoles,
                    dateRange,
                    selectedGroups,
                    schemeId,
                  },
                })}
                layout={layout}
              />
            </div>
          )}

          <Drawer
            title={intl.formatMessage({
              defaultMessage: 'Components available to add',
            })}
            placement="right"
            closable
            open={editMode && minDrawer}
            width={600}
            onClose={() => setMinDrawer(!minDrawer)}
            bodyStyle={{ padding: 0 }}
          >
            <ComponentList
              components={LayoutToReadable.filter(
                (item) =>
                  !layout.some((i) => i.i === item.i) || item.allowDuplicates
              )
                .filter(({ reportViews }) => reportViews.includes('summary'))
                .map((item) => ({
                  key: item.i,
                  onAdd: () => {
                    setLayout([
                      ...layout,
                      {
                        ...item.item,
                        i: item.item.allowDuplicates
                          ? `${item.item.i}_${
                              layout
                                .map(({ i }) => i)
                                .filter((i) => i.includes(item.item.i)).length
                            }`
                          : item.i,
                      },
                    ]);
                    setMetadata([
                      ...metadata,
                      { key: item.i, type: item.reportItemTypes[0] },
                    ]);
                  },
                  description: item.description,
                  name: item.readable,
                  reportItemTypes: item.reportItemTypes,
                }))}
            />
          </Drawer>
          <Drawer
            title={intl.formatMessage({
              defaultMessage: 'Add Logo',
            })}
            placement="right"
            closable
            open={editMode && addLogoDrawer}
            width={700}
            onClose={() => setAddLogoDrawer(!addLogoDrawer)}
            destroyOnClose
          >
            <AddLogo
              logos={logos}
              onClose={() => setAddLogoDrawer(false)}
              onSubmit={addLogo}
            />
          </Drawer>
          <Drawer
            title={intl.formatMessage({
              defaultMessage: 'Save As',
            })}
            placement="right"
            closable
            open={saveAsDrawer}
            width={700}
            onClose={() => setSaveAsDrawer(false)}
            destroyOnClose
          >
            <div>
              <SaveAs
                onSubmit={saveTemplate}
                onClose={() => setSaveAsDrawer(false)}
              />
            </div>
          </Drawer>

          <Drawer
            title={intl.formatMessage({
              defaultMessage: 'Report Filters',
            })}
            open={filtersOpen}
            onClose={toggleFiltersOpen}
          >
            <Form layout="vertical">
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Brands',
                })}
              >
                <BrandsSelect
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select Brands',
                  })}
                  mode="multiple"
                  maxTagCount="responsive"
                  onChange={(value) => {
                    setSelectedBrands(value || []);
                  }}
                  value={selectedBrands}
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Industries',
                })}
              >
                <IndustrySelect
                  value={selectedIndustries}
                  onChange={(value) => {
                    setSelectedIndustries(value || []);
                  }}
                  mode="multiple"
                  maxTagCount="responsive"
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'User Role',
                })}
              >
                <RolesSelect
                  value={selectedRoles}
                  onChange={(value) => {
                    setSelectedRoles(value || []);
                  }}
                  mode="multiple"
                  maxTagCount="responsive"
                  style={{ width: '100%' }}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select User Roles',
                  })}
                />
              </Form.Item>
            </Form>
          </Drawer>
        </Page>
      </Col>
    </Row>
  );
};

export default PerformanceReport;
