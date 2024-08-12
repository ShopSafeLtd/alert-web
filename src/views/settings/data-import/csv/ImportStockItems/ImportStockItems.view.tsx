import { Button, Card, Col, Row, Table, Typography, notification } from 'antd';
import { useStockItemImportMutation } from 'graphql/imports/__generated__/import-stock-items.generated';
import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import { FormattedMessage, useIntl } from 'react-intl';
import { useStoreState } from 'state';

export type CSVData = string[][];

interface StockItem {
  barcode: string;
  brand: string;
  costPrice: string;
  division: string;
  name: string;
  sku: string;
}

const ImportStockItems = () => {
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [saving, setSaving] = useState(false);

  const onItemsLoaded = (data: CSVData) => {
    setStockItems(
      data
        .map((value) => ({
          barcode: value[0],
          brand: value[1],
          costPrice: value[5],
          division: value[4],
          name: value[2],
          sku: value[3],
        }))
        .filter((_, i) => i !== 0)
    );
  };

  const [importStockItems] = useStockItemImportMutation({
    onCompleted: () => {
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Items imported successfully',
        }),
        placement: 'bottomRight',
      });
      setSaving(false);
    },
    onError: () => {
      notification.error({
        message: intl.formatMessage({
          defaultMessage: 'An errer occurred while importing',
        }),
        placement: 'bottomRight',
      });
      setSaving(false);
    },
  });

  const onSubmit = () => {
    setSaving(true);
    void importStockItems({
      variables: {
        data: stockItems.map((item) => ({
          barcode: item.barcode,
          brand: item.brand,
          costPriceLocal: item.costPrice,
          costPriceStandard: item.costPrice,
          division: item.division,
          goodsType: {
            id: 'clewopn4m000ipio8o3hcrhn8',
          },
          name: item.name,
          salesPriceLocal: '',
          salesPriceStandard: '',
          scheme: {
            id: schemeId,
          },
          sku: item.sku,
        })),
      },
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography.Title level={3}>
        <FormattedMessage defaultMessage="Import Stock Items" />
      </Typography.Title>
      <Row>
        <Col>
          <Card>
            <Typography.Title level={5}>
              <FormattedMessage defaultMessage="Stock Items CSV" />
            </Typography.Title>
            <CSVReader onFileLoaded={onItemsLoaded} />
          </Card>
        </Col>
      </Row>
      <Card>
        <Table
          columns={[
            {
              dataIndex: 'name',
              key: 'name',
              title: intl.formatMessage({
                defaultMessage: 'Name',
              }),
            },
            {
              dataIndex: 'brand',
              key: 'brand',
              title: intl.formatMessage({
                defaultMessage: 'Brand',
              }),
            },
            {
              dataIndex: 'sku',
              key: 'sku',
              title: intl.formatMessage({
                defaultMessage: 'SKU',
              }),
            },
            {
              dataIndex: 'barcode',
              key: 'barcode',
              title: intl.formatMessage({
                defaultMessage: 'Barcode',
              }),
            },
            {
              dataIndex: 'costPrice',
              key: 'costPrice',
              title: intl.formatMessage({
                defaultMessage: 'Cost Price',
              }),
            },
            {
              dataIndex: 'salePrice',
              key: 'salePrice',
              title: intl.formatMessage({
                defaultMessage: 'Sale Price',
              }),
            },
            {
              dataIndex: 'division',
              key: 'division',
              title: intl.formatMessage({
                defaultMessage: 'Division',
              }),
            },
          ]}
          dataSource={stockItems}
          size="small"
        />
      </Card>
      <Row justify="end">
        <Col>
          <Button
            disabled={saving}
            loading={saving}
            onClick={onSubmit}
            type="primary"
          >
            <FormattedMessage defaultMessage="Import Stock Items" />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ImportStockItems;
