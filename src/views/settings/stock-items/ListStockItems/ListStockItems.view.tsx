import type { StockItemsListQuery } from '#/views/settings/stock-items/ListStockItems/graphql/queries/__generated__/list-stock-items.generated';

import BrandsSelect from '#/components/form-components/BrandsSelect/BrandsSelect.view';
import BusinessesSelect from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import Loading from '#/components/shared-components/AntD/Loading';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import DebouncedInput from '#/utils/debounced-input';
import { useBrandsQuery } from '#/views/settings/brands/graphql/queries/__generated__/brands.generated';
import { faEdit } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Drawer, Input, Row, Space, Table } from 'antd';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai';
import React, { useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useIntl } from 'react-intl';

import EditStockItemContainer from '../EditStockItem/EditStockItem.container';

interface TableData {
  barcode: null | string;
  brand: null | string;
  currency: null | string | undefined;
  division: null | string;
  key: string;
  name: string;
  salesPrice: null | number;
  sku: null | string;
  variant: null | string;
}

interface Props {
  brandFilter: string[];
  businessFilter: string[];
  clearAllFilters: () => void;
  data: StockItemsListQuery | undefined;
  divisionFilter: string;
  hasMore: boolean;
  loadMore: () => void;
  loading: boolean;
  onSearchChange: (value: string) => void;
  searchValue: string;
  setBrandFilter: (value: string[]) => void;
  setBusinessFilter: (value: string[]) => void;
  setDivisionFilter: (value: string) => void;
}

const formatPrice = (price: null | number, currency = 'GBP'): string => {
  if (price === null) return '-';
  return new Intl.NumberFormat('en-GB', {
    currency,
    style: 'currency',
  }).format(price);
};

const ListStockItems = ({
  brandFilter,
  businessFilter,
  clearAllFilters,
  data,
  divisionFilter,
  hasMore,
  loadMore,
  loading,
  onSearchChange,
  searchValue,
  setBrandFilter,
  setBusinessFilter,
  setDivisionFilter,
}: Props) => {
  const intl = useIntl();
  const currentSchemeId = useAtomValue(currentSchemeIdAtom);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedStockItem, setSelectedStockItem] = useState<
    StockItemsListQuery['stockItemsSearch']['stock'][number] | null
  >(null);

  // Fetch brands to map IDs to names
  const { data: brandsData } = useBrandsQuery({
    variables: {
      orderBy: {
        name: SortOrder.Asc,
      },
      where: {
        scheme: {
          id: {
            equals: currentSchemeId,
          },
        },
      },
    },
  });

  // Create brand ID to name mapping
  const brandIdToName = useMemo(() => {
    const mapping: Record<string, string> = {};
    if (brandsData?.brands.edges) {
      for (const { node: brand } of brandsData.brands.edges) {
        mapping[brand.id] = brand.name;
      }
    }
    return mapping;
  }, [brandsData]);

  // Apply client-side brand filtering (by brand name from selected brand IDs)
  const filteredData = useMemo(() => {
    if (brandFilter.length === 0) {
      return data?.stockItemsSearch?.stock;
    }
    const selectedBrandNames = new Set(
      brandFilter.map((id) => brandIdToName[id])
    );
    return data?.stockItemsSearch?.stock.filter((node) =>
      node.brand ? selectedBrandNames.has(node.brand) : false
    );
  }, [data, brandFilter, brandIdToName]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (divisionFilter) count += 1;
    if (brandFilter.length > 0) count += 1;
    if (businessFilter.length > 0) count += 1;
    if (searchValue) count += 1;
    return count;
  }, [divisionFilter, brandFilter, businessFilter, searchValue]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: '24px',
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Row gutter={[16, 16]}>
          <Col style={{ width: 350 }}>
            <DebouncedInput
              allowClear
              defaultValue={searchValue || ''}
              onChange={(e) => {
                onSearchChange(e.target.value);
              }}
              placeholder={intl.formatMessage({
                defaultMessage: 'Search stock items...',
              })}
              style={{ width: '100%' }}
            />
          </Col>
          <Col style={{ width: 250 }}>
            <BusinessesSelect
              allowClear
              onChange={(value) => {
                setBusinessFilter(value || []);
              }}
              placeholder={intl.formatMessage({
                defaultMessage: 'Business',
              })}
              showSearch
              style={{ width: '100%' }}
              value={businessFilter}
            />
          </Col>
          <Col style={{ width: 200 }}>
            <Input
              allowClear
              onChange={(e) => {
                setDivisionFilter(e.target.value);
              }}
              placeholder={intl.formatMessage({
                defaultMessage: 'Division',
              })}
              value={divisionFilter}
            />
          </Col>
          <Col style={{ width: 250 }}>
            <BrandsSelect
              allowClear
              maxTagCount={1}
              mode="multiple"
              onChange={(value) => {
                setBrandFilter(value || []);
              }}
              placeholder={intl.formatMessage({
                defaultMessage: 'Brand(s)',
              })}
              style={{ width: '100%' }}
              value={brandFilter}
            />
          </Col>
          {activeFilterCount > 0 && (
            <Col>
              <Button onClick={clearAllFilters}>
                {intl.formatMessage({ defaultMessage: 'Clear Filters' })}
              </Button>
            </Col>
          )}
        </Row>
      </Space>

      <div
        id="stock-items-scroll-container"
        style={{
          flex: 1,
          marginTop: 16,
          overflow: 'auto',
        }}
      >
        <InfiniteScroll
          dataLength={filteredData?.length || 0}
          hasMore={hasMore}
          loader={<Loading />}
          next={loadMore}
          scrollableTarget="stock-items-scroll-container"
          style={{
            overflow: 'hidden',
          }}
        >
          <Table<TableData>
            columns={[
              {
                dataIndex: 'name',
                key: 'name',
                title: intl.formatMessage({
                  defaultMessage: 'Name',
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
                dataIndex: 'brand',
                key: 'brand',
                title: intl.formatMessage({
                  defaultMessage: 'Brand',
                }),
              },
              {
                dataIndex: 'division',
                key: 'division',
                title: intl.formatMessage({
                  defaultMessage: 'Division',
                }),
              },
              {
                dataIndex: 'variant',
                key: 'variant',
                title: intl.formatMessage({
                  defaultMessage: 'Variant',
                }),
              },
              {
                dataIndex: 'currency',
                key: 'currency',
                render: (value: null | string | undefined) => value || '-',
                title: intl.formatMessage({
                  defaultMessage: 'Currency',
                }),
              },
              {
                dataIndex: 'salesPrice',
                key: 'salesPrice',
                render: (value: null | number, record: TableData) =>
                  formatPrice(value, record.currency || undefined),
                title: intl.formatMessage({
                  defaultMessage: 'Sales Price',
                }),
              },
              {
                key: 'actions',
                render: (_: unknown, record: TableData) => {
                  const stockItem = filteredData?.find(
                    (item) => item.id === record.key
                  );
                  return (
                    <Button
                      icon={<FontAwesomeIcon icon={faEdit} />}
                      onClick={() => {
                        setSelectedStockItem(stockItem || null);
                        setDrawerOpen(true);
                      }}
                      size="small"
                      type="text"
                    />
                  );
                },
                title: intl.formatMessage({
                  defaultMessage: 'Actions',
                }),
                width: 80,
              },
            ]}
            dataSource={filteredData?.map((node) => ({
              barcode: node.barcode,
              brand: node.brand,
              currency: node.currency,
              division: node.division,
              key: node.id,
              name: node.name || '-',
              salesPrice: node.salesPriceLocal,
              sku: node.sku,
              variant: node.variant,
            }))}
            loading={loading}
            pagination={false}
            size="small"
          />
        </InfiniteScroll>
      </div>

      <Drawer
        onClose={() => {
          setDrawerOpen(false);
          setSelectedStockItem(null);
        }}
        open={drawerOpen}
        title={intl.formatMessage({ defaultMessage: 'Edit Stock Item' })}
        width={600}
      >
        <EditStockItemContainer
          onCancel={() => {
            setDrawerOpen(false);
            setSelectedStockItem(null);
          }}
          onSuccess={() => {
            setDrawerOpen(false);
            setSelectedStockItem(null);
          }}
          stockItem={selectedStockItem}
        />
      </Drawer>
    </div>
  );
};

export default ListStockItems;
