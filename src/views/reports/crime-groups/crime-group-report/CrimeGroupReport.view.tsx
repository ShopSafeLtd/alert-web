import React, { useMemo } from 'react';
import type { MenuProps } from 'antd';
import { Button, Col, Drawer, Dropdown, Row, Select, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import DatePicker from 'components/util-components/DatePicker';
import { Page } from 'components/shared-components/AntD/Page/Page';
import RGL, { WidthProvider } from 'react-grid-layout';
import { useIntl } from 'react-intl';
import { margin, rowHeight } from '../../../../components/reports/utils/utils';
import AddLogo from '../../../../components/reports/addLogo';
import SaveAs from '../../../../components/reports/saveAs';
import CrimeGroupLayout from './hooks/initLayout';
import type { Return as Props } from './hooks/types';
import CrimeGroupReport from './layout/CrimeGroupReportLayout';
import { layoutMap } from '../../types';

const { Title } = Typography;

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
  selectTemplate,
  selectedTemplate,
  setMetadata,
  setAddLogoDrawer,
  setSaveAsDrawer,
  templates,
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
      label: intl.formatMessage({ defaultMessage: 'Save As', id: '/XPfp1' }),
    },
    {
      key: '2',
      disabled: selectedTemplate === 'default',
      label: intl.formatMessage({
        defaultMessage: 'Update current template',
        id: 'ej3o9X',
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
          style={{ marginRight: 10 }}
          key="1"
          onClick={() => setEditMode(!editMode)}
          type={editMode ? 'primary' : 'default'}
        >
          {editMode
            ? intl.formatMessage({ defaultMessage: 'Lock', id: 'Zl4/y9' })
            : intl.formatMessage({ defaultMessage: 'Edit', id: 'wEQDC6' })}
        </Button>
        <Button type="primary" onClick={handlePrint}>
          {intl.formatMessage({ defaultMessage: 'Print', id: 'CXRlIo' })}
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
            {intl.formatMessage({ defaultMessage: 'Save', id: 'jvo0vs' })}
          </Button>
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
            {intl.formatMessage({ defaultMessage: 'Add Logo', id: 'pn9DSF' })}
          </Button>
        </div>
        <Title level={2} className="print-title">
          {intl.formatMessage(
            {
              defaultMessage:
                'Crime Group Report: {alias}-{startDate}-{endDate}',
              id: 'IE/cxz',
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
        <Row
          className="no-print"
          style={{ marginBottom: 10, justifyContent: 'center' }}
        >
          <Col span={6}>
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
              style={{ marginRight: 10, width: '100%' }}
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
                defaultMessage: 'Select Business',
                id: 'Hdg31+',
              })}
              mode="multiple"
              maxTagCount="responsive"
              onChange={(value) => {
                setSelectedBusiness(value || []);
              }}
              value={selectedBusiness}
              defaultValue={businesses.map((business) => business.value)}
              style={{ marginLeft: 10, marginRight: 10, width: '100%' }}
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
          <Col span={4}>
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
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Charts Available',
          id: 'GB09hj',
        })}
        placement="bottom"
        mask={false}
        closable
        open={editMode && minDrawer}
        height={200}
        onClose={() => setMinDrawer(!minDrawer)}
      >
        <Row gutter={[6, 6]}>
          {CrimeGroupLayout.filter(
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
          {layout.length === CrimeGroupLayout.length && (
            <Col>
              <Typography.Title level={5}>
                {intl.formatMessage({
                  defaultMessage: 'All charts have been added',
                  id: '0Bn8Ax',
                })}
              </Typography.Title>
            </Col>
          )}
        </Row>
      </Drawer>
      <Drawer
        title={intl.formatMessage({ defaultMessage: 'Add Logo', id: 'pn9DSF' })}
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
        title={intl.formatMessage({ defaultMessage: 'Save as', id: 'nCsL6d' })}
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
