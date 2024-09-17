import type { IntlShape } from 'react-intl';

import BrandsSelect from '#/components/form-components/BrandsSelect/BrandsSelect.view';
import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import CrimeGroupSelect from '#/components/form-components/CrimeGroupSelect/CrimeGroupSelect.view';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import IndustrySelect from '#/components/industry/IndustrySelect';
import ComponentList from '#/components/reports/ComponentList/ComponentList.view';
import DateSelect from '#/components/reports/DateSelect/DateSelect.view';
import ReportToolbar from '#/components/reports/ReportToolbar/ReportToolbar.view';
import ReportsSideMenu from '#/components/reports/ReportsSideMenu/ReportsSideMenu.view';
import GeneratePrintPage from '#/views/reports/GeneratePrintPage';
import { faFilters, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Badge,
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
} from 'antd';
import { margin, rowHeight } from 'components/reports/utils/utils';
import { Page } from 'components/shared-components/AntD/Page/Page';
import React, { useMemo, useState } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { useIntl } from 'react-intl';
import 'react-resizable/css/styles.css';
import { useParams } from 'react-router-dom';

import type { Props } from './hooks/types';

import AddLogo from '../../../components/reports/addLogo';
import SaveAs from '../../../components/reports/saveAs';
import { LayoutToReadable } from '../types';
import OffenderTableLayout from './layout/OffenderTableLayout';

// const ReactGridLayout = WidthProvider(RGL);

type FilterProps = {
  intl: IntlShape;
} & Pick<
  Props,
  | 'filterCount'
  | 'groups'
  | 'search'
  | 'selectedGroups'
  | 'setSearch'
  | 'setSelectedGroups'
  | 'toggleFiltersOpen'
>;

const FilterOptions = ({
  filterCount,
  groups,
  intl,
  search,
  selectedGroups,
  setSearch,
  setSelectedGroups,
  toggleFiltersOpen,
}: FilterProps) => (
  <Form layout="vertical">
    <Row className="no-print" gutter={8} wrap={false}>
      <Col span={6}>
        <Input
          allowClear
          onChange={(e) => setSearch(e.target.value)}
          placeholder={intl.formatMessage({
            defaultMessage: 'Search offenders...',
          })}
          value={search}
        />
      </Col>
      <Col span={4}>
        <Form.Item style={{ marginBottom: 0 }}>
          <GroupsSelect
            defaultValue={groups.map((group) => group.value)}
            maxTagCount="responsive"
            mode="multiple"
            onChange={(value) => {
              setSelectedGroups(value || []);
            }}
            placeholder={intl.formatMessage({
              defaultMessage: 'Select Groups',
            })}
            style={{ width: '100%' }}
            value={selectedGroups}
          />
        </Form.Item>
      </Col>
      <Col>
        <Button onClick={toggleFiltersOpen}>
          <FontAwesomeIcon icon={faFilters} style={{ marginRight: 10 }} />
          <Badge count={filterCount} offset={[8, 0]} showZero={false}>
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
  addLogo,
  addLogoDrawer,
  businessesIds,
  changeSize,
  componentRef,
  crimeGroupIds,
  data,
  dateRange,
  dateRangeMode,
  editMode,
  filterCount,
  filtersOpen,
  groups,
  handlePrint,
  incidentCount,
  isPrinting,
  layout,
  loading,
  logoMetaData,
  logos,
  metadata,
  minDrawer,
  offendersTableData,
  redactOnPrint,
  removeItem,
  removeLogo,
  saveAsDrawer,
  saveTemplate,
  saving,
  schemeId,
  search,
  selectedBrands,
  selectedGroups,
  selectedIndustries,
  selectedRoles,
  setAddLogoDrawer,
  setBusinessesIds,
  setCrimeGroupIds,
  setDateRange,
  setEditMode,
  setIncidentCount,
  setLayout,
  setMetadata,
  setMinDrawer,
  setRedactOnPrint,
  setSaveAsDrawer,
  setSearch,
  setSelectedBrands,
  setSelectedGroups,
  setSelectedIndustries,
  setTotalValue,
  toggleFiltersOpen,
  totalValue,
}: Props) => {
  const { reportId } = useParams();
  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);
  const [collapsed, setCollapsed] = useState(false);
  const intl = useIntl();
  return (
    <Row wrap={false}>
      <Col style={{ width: collapsed ? 0 : undefined }}>
        <ReportsSideMenu
          collapsed={collapsed}
          selectedId={reportId ?? ''}
          setCollapsed={setCollapsed}
        />
      </Col>
      <Col flex={1}>
        <Page>
          <Row
            className="no-print"
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'flex-end',
              left: 20,
              position: 'absolute',
              right: 20,
              top: 20,
              zIndex: 1000,
            }}
          >
            <Col flex={1}>
              <FilterOptions
                filterCount={filterCount}
                groups={groups}
                intl={intl}
                search={search}
                selectedGroups={selectedGroups}
                setSearch={setSearch}
                setSelectedGroups={setSelectedGroups}
                toggleFiltersOpen={toggleFiltersOpen}
              />
            </Col>
            <Col>
              <ReportToolbar
                editMode={editMode}
                handlePrint={handlePrint}
                isPrinting={isPrinting}
                minDrawer={minDrawer}
                redactOnPrint={redactOnPrint}
                saveTemplate={saveTemplate}
                saving={saving}
                setEditMode={setEditMode}
                setMinDrawer={setMinDrawer}
                setRedactOnPrint={setRedactOnPrint}
                setSaveAsDrawer={setSaveAsDrawer}
              />
            </Col>
          </Row>

          {editMode ? (
            <div className="print-page" style={{ paddingTop: 60 }}>
              <div className="logo">
                {metadata
                  ?.find((item) => item.key === 'logo')
                  ?.urls?.map((url, _i, array) => (
                    <>
                      <Button
                        className="no-print"
                        hidden={!editMode}
                        icon={
                          <FontAwesomeIcon
                            color="red"
                            icon={faTrash}
                            size="lg"
                          />
                        }
                        onClick={() => removeLogo(_i)}
                        type="text"
                      />
                      <img
                        // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                        alt="logo"
                        src={url || ''}
                        style={{
                          height: '100%',
                          marginRight: array.length - 1 === _i ? 0 : 10,
                          width: '25 %',
                        }}
                      />
                    </>
                  ))}
                <Button
                  className="no-print"
                  hidden={!editMode}
                  onClick={() => setAddLogoDrawer(true)}
                  style={{ marginLeft: 10 }}
                  type="primary"
                >
                  {intl.formatMessage({
                    defaultMessage: 'Add Logo',
                  })}
                </Button>
              </div>

              <div className="print-container">
                <div className="print-body">
                  <ReactGridLayout
                    autoSize
                    cols={2}
                    isDraggable={editMode}
                    isResizable={editMode}
                    layout={layout}
                    margin={margin}
                    onLayoutChange={(newLayout) => setLayout(newLayout)}
                    rowHeight={rowHeight}
                    useCSSTransforms={!isPrinting}
                    width={400}
                  >
                    {...OffenderTableLayout({
                      changeSize,
                      data,
                      editMode,
                      filters: {
                        dateRange,
                        schemeId,
                        selectedBrands,
                        selectedGroups,
                        selectedIndustries,
                        selectedRoles,
                      },
                      isPrinting,
                      layout,
                      loading,
                      metadata,
                      offendersTableData,
                      removeItem,
                      setMetadata,
                    })}
                  </ReactGridLayout>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="no-print" style={{ paddingTop: 60 }} />
              <GeneratePrintPage
                componentRef={componentRef}
                elements={OffenderTableLayout({
                  changeSize,
                  data,
                  editMode,
                  filters: {
                    dateRange,
                    schemeId,
                    selectedBrands,
                    selectedGroups,
                    selectedIndustries,
                    selectedRoles,
                  },
                  isPrinting,
                  layout,
                  loading,
                  metadata,
                  offendersTableData,
                  removeItem,
                  setMetadata,
                })}
                isPrinting={isPrinting}
                layout={layout}
                logo={
                  logoMetaData ? (
                    <>
                      <div className="logo">
                        {logoMetaData?.urls?.map((url, _i, array) => (
                          <>
                            <Button
                              className="no-print"
                              hidden={!editMode}
                              icon={
                                <FontAwesomeIcon
                                  color="red"
                                  icon={faTrash}
                                  size="lg"
                                />
                              }
                              onClick={() => removeLogo(_i)}
                              type="text"
                            />
                            <img
                              // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                              alt="logo"
                              src={url || ''}
                              style={{
                                height: '100%',
                                marginRight: array.length - 1 === _i ? 0 : 10,
                                width: '25 %',
                              }}
                            />
                          </>
                        ))}
                      </div>
                    </>
                  ) : undefined
                }
              />
            </div>
          )}

          <Drawer
            bodyStyle={{ padding: 0 }}
            closable
            onClose={() => setMinDrawer(!minDrawer)}
            open={editMode && minDrawer}
            placement="right"
            title={intl.formatMessage({
              defaultMessage: 'Components available to add',
            })}
            width={600}
          >
            <ComponentList
              components={LayoutToReadable.filter(
                (item) =>
                  !layout.some((i) => i.i === item.i) || item.allowDuplicates
              )
                .filter(({ reportViews }) =>
                  reportViews.includes('offender_table')
                )
                .map((item) => ({
                  description: item.description,
                  key: item.i,
                  name: item.readable,
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
                  reportItemTypes: item.reportItemTypes,
                }))}
            />
          </Drawer>
          <Drawer
            closable
            destroyOnClose
            onClose={() => setAddLogoDrawer(!addLogoDrawer)}
            open={editMode && addLogoDrawer}
            placement="right"
            title={intl.formatMessage({
              defaultMessage: 'Add Logo',
            })}
            width={700}
          >
            <AddLogo
              logos={logos}
              onClose={() => setAddLogoDrawer(false)}
              onSubmit={addLogo}
            />
          </Drawer>
          <Drawer
            closable
            destroyOnClose
            onClose={() => setSaveAsDrawer(false)}
            open={saveAsDrawer}
            placement="right"
            title={intl.formatMessage({
              defaultMessage: 'Save As',
            })}
            width={700}
          >
            <div>
              <SaveAs
                onClose={() => setSaveAsDrawer(false)}
                onSubmit={saveTemplate}
              />
            </div>
          </Drawer>

          <Drawer
            onClose={toggleFiltersOpen}
            open={filtersOpen}
            title={intl.formatMessage({
              defaultMessage: 'Report Filters',
            })}
          >
            <Form layout="vertical">
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Incidents in date range',
                })}
              >
                <DateSelect
                  defaultRange={dateRangeMode}
                  onChange={setDateRange}
                />
              </Form.Item>
              <Row>
                <Col flex={1}>
                  <Form.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Incidents count over',
                    })}
                  >
                    <InputNumber
                      onChange={(value) =>
                        setIncidentCount(value ? Number(value) : undefined)
                      }
                      value={incidentCount}
                    />
                  </Form.Item>
                </Col>
                <Col flex={1}>
                  <Form.Item
                    label={intl.formatMessage({
                      defaultMessage: 'Total loss value over',
                    })}
                  >
                    <InputNumber
                      onChange={(value) =>
                        setTotalValue(value ? Number(value) : undefined)
                      }
                      value={totalValue}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Incidents in businesses',
                })}
              >
                <BusinessesSelect
                  maxTagCount="responsive"
                  mode="multiple"
                  onChange={(value) => {
                    setBusinessesIds(value || []);
                  }}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select Businesses',
                  })}
                  style={{ width: '100%' }}
                  value={businessesIds}
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Crime Groups',
                })}
              >
                <CrimeGroupSelect
                  maxTagCount="responsive"
                  mode="multiple"
                  onChange={(value) => {
                    setCrimeGroupIds(value);
                  }}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select Crime Group',
                  })}
                  style={{ width: '100%' }}
                  value={crimeGroupIds}
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Incidents in brands',
                })}
              >
                <BrandsSelect
                  maxTagCount="responsive"
                  mode="multiple"
                  onChange={(value) => {
                    setSelectedBrands(value || []);
                  }}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select Brands',
                  })}
                  style={{ width: '100%' }}
                  value={selectedBrands}
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Incidents in industries',
                })}
              >
                <IndustrySelect
                  maxTagCount="responsive"
                  mode="multiple"
                  onChange={(value) => {
                    setSelectedIndustries(value || []);
                  }}
                  style={{ width: '100%' }}
                  value={selectedIndustries}
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
