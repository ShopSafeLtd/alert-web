import React, { useMemo } from 'react';
import type { MenuProps } from 'antd';
import { Button, Col, Drawer, Dropdown, Row, Select, Typography } from 'antd';
import DatePicker from 'components/util-components/DatePicker';
import { Page } from 'components/shared-components/AntD/Page/Page';
import RGL, { WidthProvider } from 'react-grid-layout';
import { margin, rowHeight } from 'components/reports/utils/utils';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import GeneratePrintPage from '#/views/reports/GeneratePrintPage';
import { ReportType } from 'graphql/generated';
import BusinessReport from './layout/BusinessReportLayout';
import BusinessReportLayout from './hooks/initLayout';
import type { Return as Props } from './hooks/types';
import AddLogo from '../../../../components/reports/addLogo';
import SaveAs from '../../../../components/reports/saveAs';
import { layoutMap } from '../../types';

const { Title } = Typography;

type FilterProps = Pick<
  Props,
  | 'setDateRange'
  | 'dateRange'
  | 'groups'
  | 'setSelectedGroups'
  | 'groupsLoading'
  | 'selectedGroups'
  | 'crimeGroups'
  | 'setSelectedCrimeGroups'
  | 'selectedCrimeGroups'
  | 'offenders'
  | 'setSelectedOffenders'
  | 'selectedOffenders'
> & {
  intl: IntlShape;
};

const FilterOptions = ({
  setDateRange,
  dateRange,
  groups,
  setSelectedGroups,
  groupsLoading,
  selectedGroups,
  intl,
  crimeGroups,
  setSelectedCrimeGroups,
  selectedCrimeGroups,
  offenders,
  setSelectedOffenders,
  selectedOffenders,
}: FilterProps) => (
  <Row
    className="no-print"
    style={{ marginBottom: 10, justifyContent: 'center' }}
    gutter={10}
  >
    <Col span={6}>
      <Select
        placeholder={intl.formatMessage({
          defaultMessage: 'Select Content Groups',
          id: '5D6XJu',
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
          defaultMessage: 'Select Crime Groups',
          id: 'Ze/CG9',
        })}
        mode="multiple"
        allowClear
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
        placeholder={intl.formatMessage({
          defaultMessage: 'Select Offenders',
          id: 'nNFHrE',
        })}
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
        style={{ marginLeft: 10, width: '100%' }}
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

const BusinessReportView = ({
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
  incidentsTableData,
  targetedGoodsData,
  crimeGroups,
  setSelectedCrimeGroups,
  selectedCrimeGroups,
  offenders,
  setSelectedOffenders,
  selectedOffenders,
  businessName,
  addLogo,
  addLogoDrawer,
  logos,
  metadata,
  removeLogo,
  saveAsDrawer,
  saveTemplate,
  selectTemplate,
  selectedTemplate,
  setMetadata,
  setAddLogoDrawer,
  setSaveAsDrawer,
  templates,
  setAsDefault,
}: Props) => {
  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);

  const intl = useIntl();
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '1') {
      setSaveAsDrawer(true);
    }
    if (e.key === '2') {
      saveTemplate('', 'update');
    }
    if (e.key === '3') {
      setAsDefault({
        templateId: selectedTemplate,
        type: ReportType.Business,
        default: true,
      });
    }
  };
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
    {
      key: '3',
      label: intl.formatMessage({
        defaultMessage: 'Set as default',
        id: 'z+Zrln',
      }),
      disabled:
        templates.find((template) => template.id === selectedTemplate)
          ?.default ||
        selectedTemplate === 'default' ||
        false,
    },
  ];
  return (
    <Page>
      {!groupsLoading && selectedTemplate !== '' && (
        <>
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
            <Button type="primary" onClick={handlePrint}>
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
              style={{
                width: 200,
                marginLeft: 10,
                marginRight: 10,
                zIndex: 1000,
              }}
              onChange={(value) => selectTemplate(value)}
              defaultValue={templates[0]?.id}
              value={selectedTemplate}
            >
              {templates.map((template) => (
                <Select.Option value={template.id}>
                  {template.name}
                  {template.default
                    ? intl.formatMessage({
                        defaultMessage: ' (Default)',
                        id: 'G16X1c',
                      })
                    : ''}
                </Select.Option>
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
        </>
      )}
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
                defaultMessage:
                  'Business Report: {businessName} {startDate} - {endDate}',
                id: 'URt/QV',
              },
              {
                businessName,
                startDate: dateRange.startDate.toLocaleDateString(),
                endDate: dateRange.endDate.toLocaleDateString(),
              }
            )}
          </Title>
          <FilterOptions
            setDateRange={setDateRange}
            dateRange={dateRange}
            groups={groups}
            setSelectedGroups={setSelectedGroups}
            groupsLoading={groupsLoading}
            selectedGroups={selectedGroups}
            intl={intl}
            crimeGroups={crimeGroups}
            setSelectedCrimeGroups={setSelectedCrimeGroups}
            selectedCrimeGroups={selectedCrimeGroups}
            offenders={offenders}
            setSelectedOffenders={setSelectedOffenders}
            selectedOffenders={selectedOffenders}
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
                  metadata,
                  setMetadata,
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
                  setDateRange={setDateRange}
                  dateRange={dateRange}
                  groups={groups}
                  setSelectedGroups={setSelectedGroups}
                  groupsLoading={groupsLoading}
                  selectedGroups={selectedGroups}
                  intl={intl}
                  crimeGroups={crimeGroups}
                  setSelectedCrimeGroups={setSelectedCrimeGroups}
                  selectedCrimeGroups={selectedCrimeGroups}
                  offenders={offenders}
                  setSelectedOffenders={setSelectedOffenders}
                  selectedOffenders={selectedOffenders}
                />
              </>
            }
            title={
              <Title level={2} className="print-title">
                {intl.formatMessage(
                  {
                    defaultMessage:
                      'Business Report: {businessName} {startDate} - {endDate}',
                    id: 'URt/QV',
                  },
                  {
                    businessName,
                    startDate: dateRange.startDate.toLocaleDateString(),
                    endDate: dateRange.endDate.toLocaleDateString(),
                  }
                )}
              </Title>
            }
            elements={BusinessReport({
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
              metadata,
              setMetadata,
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
                {layoutMap.get(item.i) || ''}
              </Button>
            </Col>
          ))}
          {layout.length === BusinessReportLayout.length && (
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
    </Page>
  );
};

export default BusinessReportView;
