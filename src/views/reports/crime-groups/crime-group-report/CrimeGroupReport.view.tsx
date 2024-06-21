import React, { useMemo } from 'react';
import { Button, Col, Drawer, Row, Select, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { Page } from 'components/shared-components/AntD/Page/Page';
import RGL, { WidthProvider } from 'react-grid-layout';
import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import GeneratePrintPage from '#/views/reports/GeneratePrintPage';
import { margin, rowHeight } from '../../../../components/reports/utils/utils';
import AddLogo from '../../../../components/reports/addLogo';
import SaveAs from '../../../../components/reports/saveAs';
import type { Return as Props } from './hooks/types';
import CrimeGroupReport from './layout/CrimeGroupReportLayout';
import { LayoutToReadable } from '../../types';
import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import DateSelect from '#/components/reports/DateSelect/DateSelect.view';
import ReportToolbar from '#/components/reports/ReportToolbar/ReportToolbar.view';
import ComponentList from '#/components/reports/ComponentList/ComponentList.view';

const { Title } = Typography;

type FilterProps = Pick<
  Props,
  | 'setDateRange'
  | 'dateRange'
  | 'groups'
  | 'setSelectedGroups'
  | 'groupsLoading'
  | 'selectedGroups'
  | 'selectedBusiness'
  | 'setSelectedBusiness'
  | 'businesses'
> & { intl: IntlShape };

const FilterOptions = ({
  setDateRange,
  setSelectedGroups,
  selectedGroups,
  selectedBusiness,
  setSelectedBusiness,
  businesses,
  intl,
}: FilterProps) => (
  <Row gutter={8}>
    <Col span={6}>
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
        style={{ width: '100%' }}
      />
    </Col>
    <Col span={6}>
      <Select
        placeholder={intl.formatMessage({
          defaultMessage: 'Select Business',
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
          <Select.Option key={business.value} value={business.value}>
            {business.label}
          </Select.Option>
        ))}
      </Select>
    </Col>
    <Col>
      <DateSelect onChange={setDateRange} defaultRange="last30Days" />
    </Col>
  </Row>
);

const CrimeGroupReportView = ({
  removeItem,
  changeSize,
  minDrawer,
  setMinDrawer,
  layout,
  setLayout,
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
  selectedBusiness,
  setSelectedBusiness,
  businesses,
  offendersTableData,
  targetedGoodsData,
  incidentsTableData,
  targetedBusinessData,
}: Props) => {
  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);
  const intl = useIntl();

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
            businesses={businesses}
            selectedBusiness={selectedBusiness}
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
              {intl.formatMessage({ defaultMessage: 'Add Logo' })}
            </Button>
          </div>
          <Title level={2} className="print-title">
            {intl.formatMessage(
              {
                defaultMessage:
                  'Crime Group Report: {alias}-{startDate}-{endDate}',
              },
              {
                alias:
                  data?.crimeGroup?.alias ??
                  `CG-${data?.crimeGroup?.reference || ''}`,
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
                {...CrimeGroupReport({
                  data,
                  loading,
                  removeItem,
                  layout,
                  margin,
                  rowHeight,
                  editMode,
                  changeSize,
                  isPrinting,
                  metadata,
                  setMetadata,
                  offendersTableData,
                  targetedGoodsData,
                  incidentsTableData,
                  targetedBusinessData,
                })}
              </ReactGridLayout>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ paddingTop: 60 }}>
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
                      'Crime Group Report: {alias}-{startDate}-{endDate}',
                  },
                  {
                    alias:
                      data?.crimeGroup?.alias ??
                      `CG-${data?.crimeGroup?.reference || ''}`,
                    startDate: dateRange.startDate.toLocaleDateString(),
                    endDate: dateRange.endDate.toLocaleDateString(),
                  }
                )}
              </Title>
            }
            elements={CrimeGroupReport({
              data,
              loading,
              removeItem,
              layout,
              margin,
              rowHeight,
              editMode,
              changeSize,
              isPrinting,
              metadata,
              setMetadata,
              offendersTableData,
              targetedGoodsData,
              incidentsTableData,
              targetedBusinessData,
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
            .filter(({ reportViews }) => reportViews.includes('crime_group'))
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
        title={intl.formatMessage({ defaultMessage: 'Add Logo' })}
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
        title={intl.formatMessage({ defaultMessage: 'Save as' })}
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
    </Page>
  );
};

export default CrimeGroupReportView;
