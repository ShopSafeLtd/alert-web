import type { IntlShape } from 'react-intl';

import GroupsSelect from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import ComponentList from '#/components/reports/ComponentList/ComponentList.view';
import DateSelect from '#/components/reports/DateSelect/DateSelect.view';
import ReportToolbar from '#/components/reports/ReportToolbar/ReportToolbar.view';
import AddLogo from '#/components/reports/addLogo';
import SaveAs from '#/components/reports/saveAs';
import { margin, rowHeight } from '#/components/reports/utils/utils';
import GeneratePrintPage from '#/views/reports/GeneratePrintPage';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Drawer, Row, Select, Typography } from 'antd';
import { Page } from 'components/shared-components/AntD/Page/Page';
import React, { useMemo } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { useIntl } from 'react-intl';

import type { Return as Props } from './hooks/types';

import { LayoutToReadable } from '../../types';
import CrimeGroupReport from './layout/CrimeGroupReportLayout';

const { Title } = Typography;

type FilterProps = { intl: IntlShape } & Pick<
  Props,
  | 'businesses'
  | 'dateRange'
  | 'groups'
  | 'groupsLoading'
  | 'selectedBusiness'
  | 'selectedGroups'
  | 'setDateRange'
  | 'setSelectedBusiness'
  | 'setSelectedGroups'
>;

const FilterOptions = ({
  businesses,
  intl,
  selectedBusiness,
  selectedGroups,
  setDateRange,
  setSelectedBusiness,
  setSelectedGroups,
}: FilterProps) => (
  <Row gutter={8}>
    <Col span={6}>
      <GroupsSelect
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
    <Col span={6}>
      <Select
        defaultValue={businesses.map((business) => business.value)}
        maxTagCount="responsive"
        mode="multiple"
        onChange={(value) => {
          setSelectedBusiness(value || []);
        }}
        placeholder={intl.formatMessage({
          defaultMessage: 'Select Business',
        })}
        style={{ width: '100%' }}
        value={selectedBusiness}
      >
        {businesses?.map((business) => (
          <Select.Option key={business.value} value={business.value}>
            {business.label}
          </Select.Option>
        ))}
      </Select>
    </Col>
    <Col>
      <DateSelect defaultRange="last30Days" onChange={setDateRange} />
    </Col>
  </Row>
);

const CrimeGroupReportView = ({
  addLogo,
  addLogoDrawer,
  businesses,
  changeSize,
  componentRef,
  data,
  dateRange,
  editMode,
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
  offendersTableData,
  removeItem,
  removeLogo,
  saveAsDrawer,
  saveTemplate,
  selectedBusiness,
  selectedGroups,
  setAddLogoDrawer,
  setDateRange,
  setEditMode,
  setLayout,
  setMetadata,
  setMinDrawer,
  setSaveAsDrawer,
  setSelectedBusiness,
  setSelectedGroups,
  targetedBusinessData,
  targetedGoodsData,
}: Props) => {
  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);
  const intl = useIntl();

  return (
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
            businesses={businesses}
            dateRange={dateRange}
            groups={groups}
            groupsLoading={groupsLoading}
            intl={intl}
            selectedBusiness={selectedBusiness}
            selectedGroups={selectedGroups}
            setDateRange={setDateRange}
            setSelectedBusiness={setSelectedBusiness}
            setSelectedGroups={setSelectedGroups}
          />
        </Col>
        <Col>
          <ReportToolbar
            editMode={editMode}
            handlePrint={handlePrint}
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
                      <FontAwesomeIcon color="red" icon={faTrash} size="lg" />
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
              {intl.formatMessage({ defaultMessage: 'Add Logo' })}
            </Button>
          </div>
          <Title className="print-title" level={2}>
            {intl.formatMessage(
              {
                defaultMessage:
                  'Crime Group Report: {alias}-{startDate}-{endDate}',
              },
              {
                alias:
                  data?.crimeGroup?.alias ??
                  `CG-${data?.crimeGroup?.reference || ''}`,
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
                {...CrimeGroupReport({
                  changeSize,
                  data,
                  editMode,
                  incidentsTableData,
                  isPrinting,
                  layout,
                  loading,
                  margin,
                  metadata,
                  offendersTableData,
                  removeItem,
                  rowHeight,
                  setMetadata,
                  targetedBusinessData,
                  targetedGoodsData,
                })}
              </ReactGridLayout>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ paddingTop: 60 }}>
          <GeneratePrintPage
            componentRef={componentRef}
            elements={CrimeGroupReport({
              changeSize,
              data,
              editMode,
              incidentsTableData,
              isPrinting,
              layout,
              loading,
              margin,
              metadata,
              offendersTableData,
              removeItem,
              rowHeight,
              setMetadata,
              targetedBusinessData,
              targetedGoodsData,
            })}
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
                      'Crime Group Report: {alias}-{startDate}-{endDate}',
                  },
                  {
                    alias:
                      data?.crimeGroup?.alias ??
                      `CG-${data?.crimeGroup?.reference || ''}`,
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
            .filter(({ reportViews }) => reportViews.includes('crime_group'))
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
        title={intl.formatMessage({ defaultMessage: 'Add Logo' })}
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
        title={intl.formatMessage({ defaultMessage: 'Save as' })}
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
  );
};

export default CrimeGroupReportView;
