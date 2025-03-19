import GroupsSelect, {
  useUserGroups,
} from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import DateSelect from '#/components/reports/DateSelect/DateSelect.view';
import ReportsSideMenu from '#/components/reports/ReportsSideMenu/ReportsSideMenu.view';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useIncidentItemsReportQuery } from '#/views/reports/incident-items/__generated__/IncidentItemsReport.generated';
import { Button, Col, Form, Row, Table } from 'antd';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai/index';
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { FormattedMessage, useIntl } from 'react-intl';

interface TableItem {
  date: string;
  itemName: string;
  itemType: string;
  quantity: number;
  shopName: string;
  siteNumber: string;
  sku: string;
  variant: string;
}

const StockItems = () => {
  const intl = useIntl();
  const currentScheme = useAtomValue(currentSchemeIdAtom);

  const [dateRange, setDateRange] = useState<
    | {
        endDate: Date;
        startDate: Date;
      }
    | undefined
  >({
    endDate: new Date(),
    startDate: new Date(),
  });
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [take, setTake] = useState(50);
  const [skip, setSkip] = useState(0);
  const [csv, setCsv] = useState<string[][]>([]);
  const [collapsed, setCollapsed] = useState(false);

  const { selectOptions: groups } = useUserGroups({});

  const { data, loading } = useIncidentItemsReportQuery({
    onCompleted: () => {
      if (data)
        setCsv([
          [
            'Created Date',
            'Incident Date',
            'Item Name',
            'Item Type',
            'Quantity',
            'Shop Name',
            'Shop Number',
            'SKU',
            'Variant',
          ],
          ...data.incidentItems.edges.map(({ node }) => [
            dayjs(node.incident.createdAt).format('DD/MM/YYYY'),
            dayjs(node.incident.date).format('DD/MM/YYYY'),
            `${node.name}`,
            `${node.stockItem?.goodsType?.name}`,
            `${(node.quantity ?? 0) - (node.recoveredQuantity ?? 0)}`,
            `${node.incident.business?.name}`,
            `${node.incident.business?.siteNumber}`,
            `${node.sku}`,
            `${node.stockItem?.variant}`,
          ]),
        ]);
    },
    variables: {
      skip,
      take,
      where: {
        createdAtRange: dateRange,
        groupIds: selectedGroups.length > 0 ? selectedGroups : undefined,
        schemeId: currentScheme,
      },
    },
  });

  const onPageChange = (page: number, pageSize: number) => {
    if (take !== pageSize) setTake(pageSize);
    setSkip(page * pageSize - pageSize);
  };

  return (
    <Row>
      <Col style={{ width: collapsed ? 0 : undefined }}>
        <ReportsSideMenu
          collapsed={collapsed}
          selectedId="incident-items"
          setCollapsed={setCollapsed}
        />
      </Col>
      <Col flex={1} style={{ padding: 20 }}>
        <Row gutter={16} style={{ marginBottom: 15 }}>
          <Col>
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
                style={{ width: 350 }}
                value={selectedGroups}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item style={{ marginBottom: 0 }}>
              <DateSelect defaultRange="last7Days" onChange={setDateRange} />
            </Form.Item>
          </Col>
          <Col flex={1} />
          <Col>
            <CSVLink data={csv} filename="Stock Item Adjustment Report">
              <Button>
                <FormattedMessage defaultMessage="Download CSV" />
              </Button>
            </CSVLink>
          </Col>
        </Row>
        <Table<TableItem>
          columns={[
            {
              dataIndex: 'createdAt',
              key: 'createdAt',
              title: <FormattedMessage defaultMessage="Created Date" />,
            },
            {
              dataIndex: 'date',
              key: 'date',
              title: <FormattedMessage defaultMessage="Incident Date" />,
            },
            {
              dataIndex: 'itemName',
              key: 'itemName',
              title: <FormattedMessage defaultMessage="Item Name" />,
            },
            {
              dataIndex: 'itemType',
              key: 'itemType',
              title: <FormattedMessage defaultMessage="Item Type" />,
            },
            {
              dataIndex: 'sku',
              key: 'sku',
              title: <FormattedMessage defaultMessage="SKU" />,
            },
            {
              dataIndex: 'variant',
              key: 'variant',
              title: <FormattedMessage defaultMessage="Variant" />,
            },
            {
              dataIndex: 'quantity',
              key: 'quantity',
              title: <FormattedMessage defaultMessage="Quantity" />,
            },
            {
              dataIndex: 'shopName',
              key: 'shopName',
              title: <FormattedMessage defaultMessage="Shop Name" />,
            },
            {
              dataIndex: 'siteNumber',
              key: 'siteNumber',
              title: <FormattedMessage defaultMessage="Site Number" />,
            },
          ]}
          dataSource={data?.incidentItems.edges.map(({ node }) => ({
            createdAt: dayjs(node.incident.createdAt).format('DD/MM/YYYY'),
            date: dayjs(node.incident.date).format('DD/MM/YYYY'),
            itemName: node.name ?? '',
            itemType: node.stockItem?.goodsType?.name ?? '',
            quantity: (node.quantity ?? 0) - (node.recoveredQuantity ?? 0),
            shopName: node.incident.business?.name ?? '',
            siteNumber: node.incident.business?.siteNumber ?? '',
            sku: node.sku ?? '',
            variant: node.stockItem?.variant ?? '',
          }))}
          loading={loading}
          pagination={{
            defaultPageSize: 50,
            onChange: onPageChange,
            pageSizeOptions: [50, 100, 200, 500, 1000],
            total: data?.incidentItems.totalCount ?? 0,
          }}
          size="small"
        />
      </Col>
    </Row>
  );
};

export default StockItems;
