import React, { useMemo } from 'react';
import type { MenuProps } from 'antd';
import { Button, Col, Drawer, Dropdown, Row, Select, Typography } from 'antd';
import DatePicker from 'components/util-components/DatePicker';
import Page from 'components/shared-components/AntD/Page/Page';
import RGL, { WidthProvider } from 'react-grid-layout';
import { margin, rowHeight } from 'components/reports/utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import OffenderReportLayout from './layout/OffenderReportLayout';
import OffenderLayout from './hooks/initLayout';
import type { Props } from './hooks/types';
import AddLogo from '../../../components/reports/addLogo';
import SaveAs from '../../../components/reports/saveAs';
import { layoutMap } from '../types';

const { Title } = Typography;

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
  selectTemplate,
  selectedTemplate,
  setMetadata,
  setAddLogoDrawer,
  setSaveAsDrawer,
  templates,
}: Omit<Props, 'selectedOffender'>) => {
  const ReactGridLayout = useMemo(() => WidthProvider(RGL), []);
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '1') {
      setSaveAsDrawer(true);
    }
    if (e.key === '2') {
      saveTemplate('', 'update');
    }
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Save As',
    },
    {
      key: '2',
      disabled: selectedTemplate === 'default',
      label: 'Update current template',
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
          style={{ marginRight: 10, zIndex: 1000 }}
          key="1"
          onClick={() => setEditMode(!editMode)}
          type={editMode ? 'primary' : 'default'}
        >
          {editMode ? 'Lock' : 'Edit'}
        </Button>
        <Button type="primary" style={{ zIndex: 1000 }} onClick={handlePrint}>
          Print
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
        {' '}
        <Dropdown
          menu={{ items, onClick: handleMenuClick }}
          placement="bottomLeft"
          overlayStyle={{ zIndex: 1000 }}
          className="no-print overlay"
        >
          <Button>Save</Button>
        </Dropdown>
      </div>
      <div ref={componentRef} className="print-page">
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
            Add Logo
          </Button>
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
          <Col span={5}>
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
          <Col span={5}>
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

          <Col span={5}>
            <DatePicker.RangePicker
              style={{ width: '100%', marginLeft: 10 }}
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
                metadata,
                setMetadata,
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
                  {layoutMap.get(item.i) || ''}
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
        <Drawer
          title="Add Logo"
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
          title="Save As"
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
    </Page>
  );
};

export default PerformanceReport;
