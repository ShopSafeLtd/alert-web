import React, { useMemo } from 'react';
import { Button, Col, Drawer, Row, Select, Typography } from 'antd';
import DatePicker from 'components/util-components/DatePicker';
import Page from 'components/shared-components/AntD/Page/Page';
import RGL, { WidthProvider } from 'react-grid-layout';
import { margin, rowHeight } from 'components/reports/utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import GeneratePrintPage from '#/views/reports/GeneratePrintPage';
import OffenderReportLayout from './layout/OffenderReportLayout';
import OffenderLayout from './hooks/initLayout';
import type { Props } from './hooks/types';
import AddLogo from '../../../components/reports/addLogo';
import SaveAs from '../../../components/reports/saveAs';
import { layoutMap } from '../types';
import ReportToolbar from '#/components/reports/ReportToolbar/ReportToolbar.view';

const { Title } = Typography;

type FilterType = Pick<
  Props,
  | 'groups'
  | 'dateRange'
  | 'setDateRange'
  | 'setSelectedGroups'
  | 'groupsLoading'
  | 'selectedGroups'
  | 'selectedBusiness'
  | 'setSelectedBusiness'
  | 'businesses'
> & { intl: IntlShape };

const FilterOptions = ({
  intl,
  groups,
  dateRange,
  setDateRange,
  setSelectedGroups,
  groupsLoading,
  selectedGroups,
  selectedBusiness,
  setSelectedBusiness,
  businesses,
}: FilterType) => (
  <Row gutter={8} className="no-print" wrap={false}>
    <Col span={7}>
      <Select
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
        placeholder={intl.formatMessage({
          defaultMessage: 'Select Businesses',
          id: 'MZynHZ',
        })}
        mode="multiple"
        maxTagCount="responsive"
        onChange={(value) => {
          setSelectedBusiness(value || []);
        }}
        value={selectedBusiness}
        defaultValue={businesses.map((business) => business.value)}
        style={{ width: '100%' }}
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

    <Col span={7}>
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
    </Col>
  </Row>
);

const PerformanceReport = ({
  loading,
  data,
  groups,
  dateRange,
  setDateRange,
  setSelectedGroups,
  groupsLoading,
  selectedGroups,
  selectedBusiness,
  setSelectedBusiness,
  businesses,
  componentRef,
  handlePrint,
  isPrinting,
  layout,
  setLayout,
  minDrawer,
  setMinDrawer,
  removeItem,
  changeSize,
  targetedBusinessData,
  targetedGoodsData,
  incidentsTableData,
  editMode,
  setEditMode,
  addLogo,
  addLogoDrawer,
  logos,
  metadata,
  removeLogo,
  saveAsDrawer,
  saveTemplate,
  setMetadata,
  setAddLogoDrawer,
  setSaveAsDrawer,
}: Omit<Props, 'selectedOffender'>) => {
  const intl = useIntl();
  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);

  return (
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
            setSelectedBusiness={setSelectedBusiness}
            selectedBusiness={selectedBusiness}
            businesses={businesses}
          />
        </Col>
        <Col>
          <ReportToolbar
            handlePrint={handlePrint}
            setMinDrawer={setMinDrawer}
            editMode={editMode}
            minDrawer={minDrawer}
            saveTemplate={saveTemplate}
            setEditMode={setEditMode}
            setSaveAsDrawer={setSaveAsDrawer}
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
                defaultMessage: 'Offender Report: {startDate} - {endDate}',
                id: 'tsUrpI',
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
                  metadata,
                  setMetadata,
                })}
              </ReactGridLayout>
            </div>
          </div>
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
                    {layoutMap.get(item.i) || ''}
                  </Button>
                </Col>
              ))}
              {layout.length === OffenderLayout.length && (
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
                    defaultMessage: 'Offender Report: {startDate} - {endDate}',
                    id: 'tsUrpI',
                  },
                  {
                    startDate: dateRange.startDate.toLocaleDateString(),
                    endDate: dateRange.endDate.toLocaleDateString(),
                  }
                )}
              </Title>
            }
            elements={OffenderReportLayout({
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
              metadata,
              setMetadata,
            })}
            layout={layout}
          />
        </div>
      )}
    </Page>
  );
};

export default PerformanceReport;
