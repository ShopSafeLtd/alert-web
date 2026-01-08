import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type {
  DefaultOptionType,
  LabeledValue,
  SelectProps,
} from 'antd/lib/select';
import type { Currency } from 'graphql/types';

import {
  currencyAtom,
  CurrencyCodeMap,
  currentSchemeIdAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { Col, Row, Select, Typography } from 'antd';
import { useAtomValue } from 'jotai/index';
import { debounce } from 'lodash-es';
import React, { useCallback, useState } from 'react';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';

import { useStockItemsSearchQuery } from './graphql/queries/__generated__/stockselect.generated';

export type ValueType =
  | LabeledValue
  | LabeledValue[]
  | number
  | number[]
  | string
  | string[];

export interface StockItemValue {
  barcode?: null | string;
  brand?: null | string;
  costPriceLocal?: null | number;
  id: string;
  key: string;
  name?: null | string;
  salesPriceLocal?: null | number;
  sku?: null | string;
  variant?: string;
  styleCode?: null | string;
}

interface Props {
  allowClear?: boolean;
  className?: string;
  currency?: Currency;
  division?: string;
  maxTagCount?: 'responsive' | number;
  mode?: 'multiple' | 'tags';
  onChange?: (value: StockItemValue) => void;
  placeholder?: string;
  size?: SizeType;
  style?: React.CSSProperties;
}

const OptionLabel = ({
  option,
}: {
  filterValue: string;
  option: {
    barcode?: null | string;
    brand?: null | string;
    costPriceLocal?: null | number;
    currency: string;
    name?: null | string;
    salesPriceLocal?: null | number;
    sku?: null | string;
    variant?: null | string;
    styleCode?: null | string;
  };
}) => (
  <>
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
              {}
              <Typography.Text>
                <FormattedNumber
                  currency={option.currency}
                  currencyDisplay={'symbol'}
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
              {}
              <Typography.Text>
                <FormattedNumber
                  currency={option.currency}
                  currencyDisplay={'symbol'}
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
      {option.variant && (
        <Col>
          <Row gutter={4}>
            <Col>
              <Typography.Text strong type="secondary">
                <FormattedMessage defaultMessage="Variant:" />
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text>{option.variant}</Typography.Text>
            </Col>
          </Row>
        </Col>
      )}
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
      {option.styleCode && (
        <Col>
          <Row gutter={4}>
            <Col>
              <Typography.Text strong type="secondary">
                <FormattedMessage defaultMessage="Style Code:" />
              </Typography.Text>
            </Col>
            <Col>
              <Typography.Text>{option.styleCode}</Typography.Text>
            </Col>
          </Row>
        </Col>
      )}
    </Row>
  </>
);

// this only needed as label isn't just a string, if it is just a string it won't be necessary. if label is complex object then change to fit
const filterOption = (inputValue: string, option?: DefaultOptionType) => {
  if (!option?.label) {
    return false;
  }
  if (React.isValidElement(option.label)) {
    const labelProps = option.label.props as { filterValue: string };
    const labelText = labelProps.filterValue || '';

    return labelText.toLowerCase().includes(inputValue.toLowerCase());
  }
  return false;
};

/*
 TODO Return value is always a string[]. think it is because the onchange is set to always be string[]. Need to look at more
 */
const StockItemSelect: React.FC<Omit<SelectProps, keyof Props> & Props> = ({
  allowClear = true,
  className,
  currency,
  division,
  maxTagCount,
  mode,
  onChange,
  placeholder,
  size,
  style,
  ...props
}) => {
  const intl = useIntl();
  const take = 30;
  const currentSchemeId = useAtomValue(currentSchemeIdAtom);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const fallbackCurrency = useAtomValue(currencyAtom);

  const { data, fetchMore, loading, variables } = useStockItemsSearchQuery({
    onCompleted: () => {
      setFetchingMore(false);
    },
    onError: () => {
      setFetchingMore(false);
    },
    variables: {
      take,
      where: {
        currency,
        divisionIds: division ? [division] : undefined,
        schemeIds: [currentSchemeId],
      },
    },
  });

  console.log('StockItemSelect data:', data);
  console.log('StockItemSelect variables:', variables);

  const next = () => {
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        setFetchingMore(false);

        if (!fetchMoreResult) return prev;
        const prevIds = prev.stockItemsSearch?.stock.map((node) => node.id);
        return {
          stockItemsSearch: {
            ...fetchMoreResult.stockItemsSearch,
            stock: [
              ...(prev.stockItemsSearch?.stock || []),
              ...(fetchMoreResult.stockItemsSearch?.stock.filter(
                (node) => !prevIds?.includes(node.id)
              ) || []),
            ],
          },
        };
      },
      variables: {
        after: data?.stockItemsSearch?.hasMore,
        take,
        where: {
          currency,
          divisionIds: division ? [division] : undefined,
          schemeIds: [currentSchemeId],
          search: searchTerm,
        },
      },
    });
  };

  const onScroll = (event: React.UIEvent<HTMLDivElement>): void => {
    const target = event.target as HTMLDivElement;
    if (
      !loading &&
      target.scrollTop + target.offsetHeight === target.scrollHeight &&
      data?.stockItemsSearch?.hasMore
    ) {
      next();
      target.scrollTo({ top: target.scrollHeight });
    }
  };

  const handleChange = (searchValueInput: string) => {
    setFetchingMore(true);

    setSearchTerm(searchValueInput);
    if (
      !data?.stockItemsSearch?.hasMore &&
      variables?.where.search === searchValueInput
    ) {
      setFetchingMore(false);
      return;
    }
    setFetchingMore(true);

    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        setFetchingMore(false);
        if (!fetchMoreResult) return prev;
        const prevIds = prev.stockItemsSearch?.stock.map((n) => n.id);
        return {
          stockItemsSearch: {
            ...fetchMoreResult.stockItemsSearch,
            stock: [
              ...(prev.stockItemsSearch?.stock || []),
              ...(fetchMoreResult.stockItemsSearch?.stock.filter(
                (node) => !prevIds?.includes(node.id)
              ) || []),
            ],
          },
        };
      },
      variables: {
        // after: data?.stockItemsSearch?.hasMore,
        take: 30,
        where: {
          currency,
          divisionIds: division ? [division] : undefined,
          schemeIds: [currentSchemeId],
          search: searchValueInput,
        },
      },
    });
  };

  // Use useCallback to memoize the debounced function
  const changeHandler = useCallback(
    debounce(handleChange, 500), // 800ms delay
    [debounce, handleChange]
  );

  const options: SelectProps['options'] = data?.stockItemsSearch?.stock.map(
    (option) => {
      const fixedCurrency: string =
        (currency ? CurrencyCodeMap[currency] : null) ||
        fallbackCurrency ||
        'GBP';

      return {
        key: option.id,
        label: (
          <OptionLabel
            filterValue={`${option.sku} ${option.barcode} ${option.brand} ${option.name} ${option.variant} ${option.styleCode}`}
            option={{
              ...option,
              currency: fixedCurrency,
            }}
          />
        ),
        value: option.id,
      };
    }
  );
  const handleOnChange = (selected: string[]) => {
    if (onChange) {
      const item = data?.stockItemsSearch?.stock.find((node) =>
        selected.includes(node.id)
      );
      if (item)
        onChange({
          barcode: item.barcode,
          brand: item.brand,
          costPriceLocal: item.costPriceLocal,
          id: item.id,
          key: item.id,
          name: item.name,
          salesPriceLocal: item.salesPriceLocal,
          sku: item.sku,
          variant: item.variant ?? undefined,
          styleCode: item.styleCode,
        });
    }
  };

  return (
    <Select
      allowClear={allowClear}
      className={className}
      filterOption={filterOption}
      loading={loading || fetchingMore}
      maxTagCount={maxTagCount}
      mode={mode}
      notFoundContent={
        loading || fetchingMore
          ? intl.formatMessage({ defaultMessage: 'loading' })
          : null
      }
      onChange={handleOnChange}
      onPopupScroll={onScroll}
      onSearch={(v: string) => {
        changeHandler(v);
      }}
      optionFilterProp="label"
      options={options}
      placeholder={placeholder}
      size={size}
      style={style}
      value={null}
      {...props}
    />
  );
};

export default StockItemSelect;
