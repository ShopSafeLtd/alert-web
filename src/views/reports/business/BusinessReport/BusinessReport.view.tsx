import type { IntlShape } from 'react-intl';

import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
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
  Row,
  Select,
  Typography,
} from 'antd';
import { margin, rowHeight } from 'components/reports/utils/utils';
import { Page } from 'components/shared-components/AntD/Page/Page';
import React, { useMemo, useState } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { useIntl } from 'react-intl';
import 'react-resizable/css/styles.css';
import { useParams } from 'react-router-dom';

import type { Return as Props } from './hooks/types';

import AddLogo from '../../../../components/reports/addLogo';
import SaveAs from '../../../../components/reports/saveAs';
import { LayoutToReadable } from '../../types';
import BusinessReport from './layout/BusinessReportLayout';

const { Title } = Typography;

type FilterProps = {
  intl: IntlShape;
} & Pick<
  Props,
  | 'dateRange'
  | 'filterCount'
  | 'groups'
  | 'groupsLoading'
  | 'selectedGroups'
  | 'setDateRange'
  | 'setSelectedGroups'
  | 'toggleFiltersOpen'
>;

const FilterOptions = ({
  filterCount,
  groups,
  intl,
  selectedGroups,
  setDateRange,
  setSelectedGroups,
  toggleFiltersOpen,
}: FilterProps) => (
  <Row className="no-print" gutter={10}>
    <Col span={6}>
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
    </Col>
    <Col>
      <DateSelect defaultRange="last30Days" onChange={setDateRange} />
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
);

const BusinessReportView = ({
  addLogo,
  addLogoDrawer,
  businessName,
  changeSize,
  componentRef,
  crimeGroups,
  data,
  dateRange,
  editMode,
  filterCount,
  filtersOpen,
  groups,
  groupsLoading,
  handlePrint,
  incidentsTableData,
  isPrinting,
  layout,
  loading,
  logos,
  metadata,
  minDrawer,
  offenders,
  removeItem,
  removeLogo,
  saveAsDrawer,
  saveTemplate,
  selectedCrimeGroups,
  selectedGroups,
  selectedOffenders,
  setAddLogoDrawer,
  setDateRange,
  setEditMode,
  setLayout,
  setMetadata,
  setMinDrawer,
  setSaveAsDrawer,
  setSelectedCrimeGroups,
  setSelectedGroups,
  setSelectedOffenders,
  targetedGoodsData,
  toggleFiltersOpen,
}: Props) => {
  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);
  const [collapsed, setCollapsed] = useState(false);
  const { reportId } = useParams();
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
      <Col style={{ width: 'calc(100vw - 371px)' }}>
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
                dateRange={dateRange}
                filterCount={filterCount}
                groups={groups}
                groupsLoading={groupsLoading}
                intl={intl}
                selectedGroups={selectedGroups}
                setDateRange={setDateRange}
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
                saveTemplate={saveTemplate}
                setEditMode={setEditMode}
                setMinDrawer={setMinDrawer}
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
              <Title className="print-title" level={2}>
                {intl.formatMessage(
                  {
                    defaultMessage:
                      'Business Report: {businessName} {startDate} - {endDate}',
                  },
                  {
                    businessName,
                    endDate: dateRange?.endDate.toLocaleDateString(),
                    startDate: dateRange?.startDate.toLocaleDateString(),
                  }
                )}
              </Title>
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
                    {...BusinessReport({
                      changeSize,
                      data,
                      editMode,
                      incidentsTableData,
                      isPrinting,
                      layout,
                      loading,
                      margin,
                      metadata,
                      removeItem,
                      rowHeight,
                      setMetadata,
                      targetedGoodsData,
                    })}
                  </ReactGridLayout>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <GeneratePrintPage
                componentRef={componentRef}
                elements={BusinessReport({
                  changeSize,
                  data,
                  editMode,
                  incidentsTableData,
                  isPrinting,
                  layout,
                  loading,
                  margin,
                  metadata,
                  removeItem,
                  rowHeight,
                  setMetadata,
                  targetedGoodsData,
                })}
                isPrinting={isPrinting}
                layout={layout}
                logo={
                  <>
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
                    </div>
                  </>
                }
                title={
                  <Title className="print-title" level={2}>
                    {intl.formatMessage(
                      {
                        defaultMessage:
                          'Business Report: {businessName} {startDate} - {endDate}',
                      },
                      {
                        businessName,
                        endDate: dateRange?.endDate.toLocaleDateString(),
                        startDate: dateRange?.startDate.toLocaleDateString(),
                      }
                    )}
                  </Title>
                }
              />
            </div>
          )}

          <Drawer
            onClose={toggleFiltersOpen}
            open={filtersOpen}
            title={intl.formatMessage({
              defaultMessage: 'Filters',
            })}
          >
            <Form layout="vertical">
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Offenders',
                })}
              >
                <Select
                  maxTagCount="responsive"
                  mode="multiple"
                  onChange={(value) => {
                    setSelectedOffenders(value || []);
                  }}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select Offenders',
                  })}
                  style={{ width: '100%' }}
                  value={selectedOffenders}
                >
                  {offenders?.map((offender) => (
                    <Select.Option
                      key={offender.value}
                      loading={groupsLoading}
                      value={offender.value}
                    >
                      {offender.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Crime Groups',
                })}
              >
                <Select
                  allowClear
                  defaultValue={crimeGroups.map((group) => group.value)}
                  maxTagCount="responsive"
                  mode="multiple"
                  onChange={(value) => {
                    setSelectedCrimeGroups(value || []);
                  }}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select Crime Groups',
                  })}
                  style={{ width: '100%' }}
                  value={selectedCrimeGroups}
                >
                  {crimeGroups?.map((group) => (
                    <Select.Option
                      key={group.value}
                      loading={groupsLoading}
                      value={group.value}
                    >
                      {group.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Drawer>

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
                .filter(({ reportViews }) => reportViews.includes('business'))
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
        </Page>
      </Col>
    </Row>
  );
};

export default BusinessReportView;
