/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO Make similar to the business search with the debounce and fetch more if they have more than 1000
import type { SelectProps } from 'antd';
import { Typography, Select, Spin, Row, Col } from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import { useApolloClient } from '@apollo/client';
import { FormattedMessage } from 'react-intl';

import { QueryMode } from 'graphql/types';
import { useStoreState } from 'state';
import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';
import type {
  ListStockItemsQuery,
  ListStockItemsQueryVariables,
} from 'graphql/stock-item/stock-items-import.generated';
import { ListStockItemsDocument } from 'graphql/stock-item/stock-items-import.generated';

const useStyles = createUseStyles((theme: Theme) => ({
  option: {
    borderBottom: `1px solid ${theme.borderColor}`,
    padding: '15px 10px',
  },
}));

export interface DebounceSelectProps
  extends Omit<SelectProps<StockItemValue>, 'options' | 'children'> {
  debounceTimeout?: number;
  onAddItem: (data: StockItemValue) => void;
  division: string | undefined;
}

export interface StockItemValue {
  key: string;
  id: string;
  name?: string | null;
  brand?: string | null;
  sku?: string | null;
  barcode?: string | null;
  costPriceLocal?: number | null;
  salesPriceLocal?: number | null;
}

const StockItemSearch = ({
  debounceTimeout = 200,
  onAddItem,
  division,
  ...props
}: DebounceSelectProps) => {
  const styles = useStyles();
  const client = useApolloClient();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<StockItemValue[]>([]);
  const fetchRef = useRef(0);

  const onSearchStockItems = async (value: string) => {
    if (value.length < 2) {
      return undefined;
    }
    return client
      .query<ListStockItemsQuery, ListStockItemsQueryVariables>({
        query: ListStockItemsDocument,
        variables: {
          where: {
            scheme: {
              id: {
                equals: schemeId,
              },
            },
            division: {
              equals: division,
            },
            OR: [
              {
                name: {
                  contains: value,
                  mode: QueryMode.Insensitive,
                },
              },
              {
                brand: {
                  contains: value,
                  mode: QueryMode.Insensitive,
                },
              },
              {
                sku: {
                  contains: value,
                  mode: QueryMode.Insensitive,
                },
              },
              {
                barcode: {
                  contains: value,
                  mode: QueryMode.Insensitive,
                },
              },
            ],
          },
        },
      })
      .then((res) => res);
  };

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      setOptions([]);
      setFetching(true);
      void onSearchStockItems(value).then((res) => {
        if (res?.data.listStockItems.stockItems)
          setOptions(
            res.data.listStockItems.stockItems.map((item) => ({
              ...item,
              key: item.id,
            })) || []
          );
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, division]);

  const onSelect = (data: { key: string }) => {
    const item = options.find(({ id }) => id === data.key);
    if (item) onAddItem(item);
  };

  return (
    <Select<StockItemValue>
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      optionFilterProp="label"
      optionLabelProp="label"
      value={null}
      onSelect={onSelect}
      // options={options}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {options.map((option) => (
        <Select.Option
          className={styles.option}
          key={option.id}
          value={option.id}
          label={option.name}
        >
          <Row gutter={8}>
            <Col>
              <Row gutter={4}>
                <Col>
                  <Typography.Text type="secondary" strong>
                    <FormattedMessage defaultMessage="Description:" />
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text>{option.name}</Typography.Text>
                </Col>
              </Row>
            </Col>
            {option.costPriceLocal && (
              <Col>
                <Row gutter={4}>
                  <Col>
                    <Typography.Text type="secondary" strong>
                      <FormattedMessage defaultMessage="Cost:" />
                    </Typography.Text>
                  </Col>
                  <Col>
                    {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                    <Typography.Text>
                      £{option.costPriceLocal.toFixed(2)}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
            )}
            {option.salesPriceLocal && (
              <Col>
                <Row gutter={4}>
                  <Col>
                    <Typography.Text type="secondary" strong>
                      <FormattedMessage defaultMessage="Retail Price:" />
                    </Typography.Text>
                  </Col>
                  <Col>
                    {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                    <Typography.Text>
                      £{option.salesPriceLocal.toFixed(2)}
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
            )}
          </Row>
          <Row gutter={8} style={{ marginTop: 5 }}>
            {option.brand && (
              <Col>
                <Row gutter={4}>
                  <Col>
                    <Typography.Text type="secondary" strong>
                      <FormattedMessage defaultMessage="Brand:" />
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Typography.Text>{option.brand}</Typography.Text>
                  </Col>
                </Row>
              </Col>
            )}
            <Col>
              <Row gutter={4}>
                <Col>
                  <Typography.Text type="secondary" strong>
                    <FormattedMessage defaultMessage="SKU:" />
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text>{option.sku}</Typography.Text>
                </Col>
              </Row>
            </Col>
            {option.barcode && (
              <Col>
                <Row gutter={4}>
                  <Col>
                    <Typography.Text type="secondary" strong>
                      <FormattedMessage defaultMessage="Barcode:" />
                    </Typography.Text>
                  </Col>
                  <Col>
                    <Typography.Text>{option.barcode}</Typography.Text>
                  </Col>
                </Row>
              </Col>
            )}
          </Row>
        </Select.Option>
      ))}
    </Select>
  );
};

StockItemSearch.defaultProps = {
  debounceTimeout: 200,
};
export default StockItemSearch;
