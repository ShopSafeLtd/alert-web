import React, { useState } from 'react';
import { Typography, Row, Col, Table, Card, Button, notification } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import CSVReader from 'react-csv-reader';
import { useStoreState } from 'state';
import { useStockItemImportMutation } from 'graphql/generated';

export type CSVData = string[][];

interface StockItem {
  name: string;
  brand: string;
  sku: string;
  barcode: string;
  costPrice: string;
  division: string;
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
          name: value[2],
          sku: value[3],
          division: value[4],
          costPrice: value[5],
        }))
        .filter((_, i) => i !== 0)
    );
  };

  const [importStockItems] = useStockItemImportMutation({
    onCompleted: () => {
      notification.success({
        message: intl.formatMessage({
          id: 'A8Mbfh',
          defaultMessage: 'Items imported successfully',
        }),
        placement: 'bottomRight',
      });
      setSaving(false);
    },
    onError: () => {
      notification.error({
        message: intl.formatMessage({
          id: 'gVGsmW',
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
          division: item.division,
          sku: item.sku,
          name: item.name,
          costPriceLocal: item.costPrice,
          costPriceStandard: item.costPrice,
          goodsType: {
            id: 'clewopn4m000ipio8o3hcrhn8',
          },
          salesPriceLocal: '',
          scheme: {
            id: schemeId,
          },
          salesPriceStandard: '',
        })),
      },
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography.Title level={3}>
        <FormattedMessage id="RCrrbc" defaultMessage="Import Stock Items" />
      </Typography.Title>
      <Row>
        <Col>
          <Card>
            <Typography.Title level={5}>
              <FormattedMessage id="0t0g9d" defaultMessage="Stock Items CSV" />
            </Typography.Title>
            <CSVReader onFileLoaded={onItemsLoaded} />
          </Card>
        </Col>
      </Row>
      <Card>
        <Table
          dataSource={stockItems}
          size="small"
          columns={[
            {
              title: intl.formatMessage({
                defaultMessage: 'Name',
                id: 'HAlOn1',
              }),
              key: 'name',
              dataIndex: 'name',
            },
            {
              title: intl.formatMessage({
                defaultMessage: 'Brand',
                id: 'SOPEeg',
              }),
              key: 'brand',
              dataIndex: 'brand',
            },
            {
              key: 'sku',
              title: intl.formatMessage({
                defaultMessage: 'SKU',
                id: 'k4brJy',
              }),
              dataIndex: 'sku',
            },
            {
              key: 'barcode',
              title: intl.formatMessage({
                defaultMessage: 'Barcode',
                id: 'fM4JjM',
              }),
              dataIndex: 'barcode',
            },
            {
              key: 'costPrice',
              title: intl.formatMessage({
                defaultMessage: 'Cost Price',
                id: 'k6HOPg',
              }),
              dataIndex: 'costPrice',
            },
            {
              key: 'salePrice',
              title: intl.formatMessage({
                defaultMessage: 'Sale Price',
                id: '49sNcx',
              }),
              dataIndex: 'salePrice',
            },
            {
              key: 'division',
              title: intl.formatMessage({
                defaultMessage: 'Division',
                id: 'dETzL9',
              }),
              dataIndex: 'division',
            },
          ]}
        />
      </Card>
      <Row justify="end">
        <Col>
          <Button
            loading={saving}
            disabled={saving}
            onClick={onSubmit}
            type="primary"
          >
            <FormattedMessage id="RCrrbc" defaultMessage="Import Stock Items" />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ImportStockItems;
