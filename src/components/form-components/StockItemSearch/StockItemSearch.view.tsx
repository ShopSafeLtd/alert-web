/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SelectProps } from 'antd';
import type { Theme } from 'configs/ThemeConfig';
import type {
  ListStockItemsQuery,
  ListStockItemsQueryVariables,
} from 'graphql/stock-item/__generated__/stock-items-import.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useApolloClient } from '@apollo/client';
import { Col, Row, Select, Spin, Typography } from 'antd';
import { ListStockItemsDocument } from 'graphql/stock-item/__generated__/stock-items-import.generated';
import { QueryMode } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { debounce } from 'lodash-es';
import React, { useMemo, useRef, useState } from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  option: {
    borderBottom: `1px solid ${theme.borderColor}`,
    padding: '15px 10px',
  },
}));

export interface DebounceSelectProps
  extends Omit<SelectProps<StockItemValue>, 'children' | 'options'> {
  debounceTimeout?: number;
  division: string | undefined;
  onAddItem: (data: StockItemValue) => void;
}

export interface StockItemValue {
  barcode?: null | string;
  brand?: null | string;
  costPriceLocal?: null | number;
  id: string;
  key: string;
  name?: null | string;
  salesPriceLocal?: null | number;
  sku?: null | string;
}

const StockItemSearch = ({
  debounceTimeout = 200,
  division,
  onAddItem,
  ...props
}: DebounceSelectProps) => {
  const styles = useStyles();
  const client = useApolloClient();
  const schemeId = useAtomValue(currentSchemeIdAtom);
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
          take: 100,
          where: {
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
            division: division
              ? {
                  equals: division,
                }
              : undefined,
            scheme: {
              id: {
                equals: schemeId,
              },
            },
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
      filterOption={false}
      labelInValue
      notFoundContent={fetching ? <Spin size="small" /> : null}
      onSearch={debounceFetcher}
      onSelect={onSelect}
      optionFilterProp="label"
      optionLabelProp="label"
      value={null}
      // options={options}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {options.map((option) => (
        <Select.Option
          className={styles.option}
          key={option.id}
          label={option.name}
          value={option.id}
        >
          <Row gutter={8}>
            <Col>
              <Row gutter={4}>
                <Col>
                  <Typography.Text strong type="secondary">
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
                    <Typography.Text strong type="secondary">
                      <FormattedMessage defaultMessage="Cost:" />
                    </Typography.Text>
                  </Col>
                  <Col>
                    {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                    <Typography.Text>
                      <FormattedNumber
                        currency={'GBP'}
                        style={'currency'}
                        value={option.costPriceLocal || 0}
                      />
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
            )}
            {option.salesPriceLocal && (
              <Col>
                <Row gutter={4}>
                  <Col>
                    <Typography.Text strong type="secondary">
                      <FormattedMessage defaultMessage="Retail Price:" />
                    </Typography.Text>
                  </Col>
                  <Col>
                    {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                    <Typography.Text>
                      <FormattedNumber
                        currency={'GBP'}
                        style={'currency'}
                        value={option.salesPriceLocal || 0}
                      />
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
                    <Typography.Text strong type="secondary">
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
                  <Typography.Text strong type="secondary">
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
                    <Typography.Text strong type="secondary">
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
