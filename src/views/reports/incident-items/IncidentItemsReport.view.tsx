import type { TableProps } from 'antd';

import GroupsSelect, {
  useUserGroups,
} from '#/components/form-components/GroupsSelect/GroupsSelect.view';
import DateSelect from '#/components/reports/DateSelect/DateSelect.view';
import ReportsSideMenu from '#/components/reports/ReportsSideMenu/ReportsSideMenu.view';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useIncidentItemsReportQuery } from '#/views/reports/incident-items/__generated__/IncidentItemsReport.generated';
import { useExportIncidentItemsCsvMutation } from '#/views/reports/incident-items/mutations/__generated__/generate-csv-items-export.generated';
import { Button, Col, Form, Row, Table } from 'antd';
import dayjs from 'dayjs';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

interface TableItem {
  incidentDate: string;
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
  const [exporting, setExporting] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [sort, setSort] = useState<{
    createdAt?: SortOrder;
    incidentDate?: SortOrder;
  }>({ createdAt: SortOrder.Desc });

  const { selectOptions: groups } = useUserGroups({});

  const { data, loading } = useIncidentItemsReportQuery({
    variables: {
      orderby: sort,
      skip,
      take,
      where: {
        createdAtRange: dateRange,
        groupIds: selectedGroups.length > 0 ? selectedGroups : undefined,
        schemeId: currentScheme,
      },
    },
  });

  const [generateCsv] = useExportIncidentItemsCsvMutation({
    onCompleted: (data) => {
      if (data?.incidentItemsCsv) {
        const link = document.createElement('a');
        link.href = data.incidentItemsCsv;
        link.download = 'incident-items-report.csv';
        document.body.append(link);
        link.click();
        link.remove();
      }
      setExporting(false);
    },
    onError: (error) => {
      console.error('Error generating CSV:', error);
      setExporting(false);
    },
    variables: {
      where: {
        createdAtRange: dateRange,
        groupIds: selectedGroups.length > 0 ? selectedGroups : undefined,
        schemeId: currentScheme,
      },
    },
  });

  const handleExportCsv = () => {
    setExporting(true);
    void generateCsv();
  };
  const onPageChange = (page: number, pageSize: number) => {
    if (take !== pageSize) setTake(pageSize);
    setSkip(page * pageSize - pageSize);
  };

  const onTableChange: TableProps<TableItem>['onChange'] = (
    _pagination,
    _filters,
    sorter
  ) => {
    const currentSorter = Array.isArray(sorter) ? sorter[0] : sorter;
    setSort({
      [currentSorter.columnKey as string]:
        currentSorter.order === 'descend' ? SortOrder.Desc : SortOrder.Asc,
    });
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
      <Col flex={1} style={{ height: '100vh', overflow: 'auto', padding: 20 }}>
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
            <Button
              disabled={exporting}
              loading={exporting}
              onClick={handleExportCsv}
            >
              <FormattedMessage defaultMessage="Download CSV" />
            </Button>
          </Col>
        </Row>
        <Table<TableItem>
          columns={[
            {
              dataIndex: 'createdAt',
              defaultSortOrder: 'descend',
              key: 'createdAt',
              sortDirections: ['descend', 'ascend'],
              sorter: true,
              title: <FormattedMessage defaultMessage="Created Date" />,
            },
            {
              dataIndex: 'incidentDate',
              key: 'incidentDate',
              sortDirections: ['descend', 'ascend'],
              sorter: true,
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
            incidentDate: dayjs(node.incident.date).format('DD/MM/YYYY'),
            itemName: node.name ?? '',
            itemType: node.stockItem?.goodsType?.name ?? '',
            quantity: (node.quantity ?? 0) - (node.recoveredQuantity ?? 0),
            shopName: node.incident.business?.name ?? '',
            siteNumber: node.incident.business?.siteNumber ?? '',
            sku: node.sku ?? '',
            variant: node.stockItem?.variant ?? '',
          }))}
          loading={loading}
          onChange={onTableChange}
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
