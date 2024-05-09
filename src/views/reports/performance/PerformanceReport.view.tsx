import React, { useMemo } from 'react';
import type { MenuProps } from 'antd';
import {
  Button,
  Col,
  Drawer,
  Dropdown,
  Row,
  Select,
  Switch,
  Typography,
  Form,
  Badge,
} from 'antd';
import DatePicker from 'components/util-components/DatePicker';
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
import { PerformanceDrawerLayout } from './hooks/initLayout';
import SaveAs from '../../../components/reports/saveAs';
import type { Props } from './hooks/types';
import { layoutMap } from '../types';

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
  dateRange,
  setDateRange,
  toggleFiltersOpen,
  filterCount,
}: FilterProps) => (
  <Form layout="vertical">
    <Row
      className="no-print"
      style={{ marginBottom: 10, justifyContent: 'center' }}
      gutter={8}
    >
      <Col span={6}>
        <Form.Item
          label={intl.formatMessage({
            defaultMessage: 'Groups',
            id: 'hzmswI',
          })}
        >
          <GroupsSelect
            placeholder={intl.formatMessage({
              defaultMessage: 'Select Groups',
              id: 'q2cuIU',
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
      <Col span={4}>
        <Form.Item
          label={intl.formatMessage({
            defaultMessage: 'Date Range',
            id: '52QtMe',
          })}
        >
          <DatePicker.RangePicker
            style={{ width: '100%' }}
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
                        value?.[1] || new Date(new Date().setHours(23, 59, 59)),
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
        </Form.Item>
      </Col>
      <Col>
        <Button onClick={toggleFiltersOpen} style={{ marginTop: 29 }}>
          <FontAwesomeIcon icon={faFilters} style={{ marginRight: 10 }} />
          <Badge count={filterCount} showZero={false} offset={[8, 0]}>
            {intl.formatMessage({
              defaultMessage: 'More Filters',
              id: 'stWNQ/',
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
  templates,
  selectTemplate,
  saveTemplate,
  selectedTemplate,
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
}: Props) => {
  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '1') {
      setSaveAsDrawer(true);
    }
    if (e.key === '2') {
      saveTemplate('', 'update');
    }
  };

  const intl = useIntl();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: intl.formatMessage({
        defaultMessage: 'Save as',
        id: 'nCsL6d',
      }),
    },
    {
      key: '2',
      disabled: selectedTemplate === 'default',
      label: intl.formatMessage({
        defaultMessage: 'Update template',
        id: 'jS/UOn',
      }),
    },
  ];

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
        <div
          style={{
            display: editMode ? 'block' : 'none',
            zIndex: 1000,
          }}
        >
          {intl.formatMessage({
            defaultMessage: 'Redact on print?',
            id: '7D0dTR',
          })}
        </div>

        <Switch
          style={{
            marginRight: 10,
            marginLeft: 10,
            zIndex: 1000,
            display: editMode ? 'block' : 'none',
          }}
          key="3"
          checked={redactOnPrint}
          onChange={(checked) => setRedactOnPrint(checked)}
        />
        <Button
          style={{ marginRight: 10, zIndex: 1000 }}
          key="2"
          onClick={() => setMinDrawer(!minDrawer)}
          type="default"
          hidden={!editMode}
        >
          {minDrawer
            ? intl.formatMessage({
                defaultMessage: 'Hide Drawer',
                id: 'bfZEmd',
              })
            : intl.formatMessage({
                defaultMessage: 'Show Drawer',
                id: 'Ri86Tj',
              })}
        </Button>
        <Button
          style={{ marginRight: 10, zIndex: 1000 }}
          key="1"
          onClick={() => setEditMode(!editMode)}
          type={editMode ? 'primary' : 'default'}
        >
          {editMode
            ? intl.formatMessage({
                defaultMessage: 'Lock',
                id: 'Zl4/y9',
              })
            : intl.formatMessage({
                defaultMessage: 'Edit',
                id: 'wEQDC6',
              })}
        </Button>
        <Button type="primary" onClick={handlePrint} disabled={editMode}>
          {intl.formatMessage({
            defaultMessage: 'Print',
            id: 'CXRlIo',
          })}
        </Button>
      </div>
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          top: 80,
          right: 20,
        }}
      >
        <Select
          style={{ width: 200, marginLeft: 10, marginRight: 10, zIndex: 1000 }}
          onChange={(value) => selectTemplate(value)}
          defaultValue={templates[0]?.id}
          value={selectedTemplate}
        >
          {templates.map((template) => (
            <Select.Option value={template.id}>{template.name}</Select.Option>
          ))}
        </Select>
      </div>
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          top: 130,
          right: 20,
        }}
      >
        <Dropdown
          menu={{ items, onClick: handleMenuClick }}
          placement="bottomLeft"
          overlayStyle={{ zIndex: 1000 }}
          className="no-print overlay"
        >
          <Button>
            {intl.formatMessage({
              defaultMessage: 'Save',
              id: 'jvo0vs',
            })}
          </Button>
        </Dropdown>
      </div>

      {editMode ? (
        <div className="print-page">
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
                      <FontAwesomeIcon icon={faTrash} color="red" size="lg" />
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
                id: 'pn9DSF',
              })}
            </Button>
          </div>
          <Title level={2} className="print-title">
            {intl.formatMessage(
              {
                defaultMessage: 'Summary Report: {startDate} - {endDate}',
                id: 'CT8UPX',
              },
              {
                startDate: dateRange.startDate.toLocaleDateString(),
                endDate: dateRange.endDate.toLocaleDateString(),
              }
            )}
          </Title>
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
              </>
            }
            title={
              <Title level={2} className="print-title">
                {intl.formatMessage(
                  {
                    defaultMessage: 'Summary Report: {startDate} - {endDate}',
                    id: 'CT8UPX',
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
            })}
            layout={layout}
          />
        </div>
      )}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Charts available to add',
          id: 'zNsljc',
        })}
        placement="bottom"
        mask={false}
        closable
        open={editMode && minDrawer}
        height={200}
        onClose={() => setMinDrawer(!minDrawer)}
      >
        <Row gutter={[6, 6]}>
          {PerformanceDrawerLayout.filter(
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
                {layoutMap.get(item.i) || ''}
              </Button>
            </Col>
          ))}
          {layout.length === PerformanceDrawerLayout.length && (
            <Col>
              <Typography.Title level={5}>
                {intl.formatMessage({
                  defaultMessage: 'No more charts to add',
                  id: '2vcxv5',
                })}
              </Typography.Title>
            </Col>
          )}
        </Row>
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add Logo',
          id: 'pn9DSF',
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
          id: '/XPfp1',
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
          id: 'QxpB9+',
        })}
        open={filtersOpen}
        onClose={toggleFiltersOpen}
      >
        <Form layout="vertical">
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Brands',
              id: 'jWfWEA',
            })}
          >
            <BrandsSelect
              placeholder={intl.formatMessage({
                defaultMessage: 'Select Brands',
                id: 'XfiiaU',
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
              id: 'lINmqu',
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
              id: 'lBxkBr',
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
                id: 'q0cO2B',
              })}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </Page>
  );
};

export default PerformanceReport;
