import type { SizeType } from 'antd/lib/config-provider/SizeContext';
import type {
  DefaultOptionType,
  LabeledValue,
  SelectProps,
} from 'antd/lib/select';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Col, Row, Select, Typography } from 'antd';
import { useAtomValue } from 'jotai/index';
import debounce from 'lodash/debounce';
import React, { useCallback, useState } from 'react';
import { FormattedMessage, FormattedNumber, useIntl } from 'react-intl';

import { useStockItemSelectQuery } from './graphql/queries/__generated__/stockselect.generated';

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
}

interface Props {
  allowClear?: boolean;
  className?: string;
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
    name?: null | string;
    salesPriceLocal?: null | number;
    sku?: null | string;
    variant?: null | string;
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

  const { data, fetchMore, loading, variables } = useStockItemSelectQuery({
    onCompleted: () => {
      setFetchingMore(false);
    },
    onError: () => {
      setFetchingMore(false);
    },
    variables: {
      first: take,
      where: {
        schemeIds: [currentSchemeId],
      },
    },
  });

  const next = () => {
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        setFetchingMore(false);

        if (!fetchMoreResult) return prev;
        const prevIds = prev.stockItemsRelay?.edges.map(({ node }) => node.id);
        return {
          stockItemsRelay: {
            ...fetchMoreResult.stockItemsRelay,
            edges: [
              ...(prev.stockItemsRelay?.edges || []),
              ...(fetchMoreResult.stockItemsRelay?.edges.filter(
                ({ node }) => !prevIds?.includes(node.id)
              ) || []),
            ],
          },
        };
      },
      variables: {
        after: data?.stockItemsRelay.pageInfo.endCursor,
        first: 30,
        where: {
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
      data?.stockItemsRelay.pageInfo.hasNextPage
    ) {
      next();
      target.scrollTo({ top: target.scrollHeight });
    }
  };

  const handleChange = (searchValueInput: string) => {
    setFetchingMore(true);

    setSearchTerm(searchValueInput);
    if (
      !data?.stockItemsRelay.pageInfo?.hasNextPage &&
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
        const prevIds = prev.stockItemsRelay?.edges.map(({ node }) => node.id);
        return {
          stockItemsRelay: {
            ...fetchMoreResult.stockItemsRelay,
            edges: [
              ...(prev.stockItemsRelay?.edges || []),
              ...(fetchMoreResult.stockItemsRelay?.edges.filter(
                ({ node }) => !prevIds?.includes(node.id)
              ) || []),
            ],
          },
        };
      },
      variables: {
        first: 30,
        where: {
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

  const options: SelectProps['options'] = data?.stockItemsRelay.edges.map(
    ({ node: option }) => ({
      key: option.id,
      label: (
        <OptionLabel
          filterValue={`${option.sku} ${option.barcode} ${option.brand} ${option.name}`}
          option={option}
        />
      ),
      value: option.id,
    })
  );
  const handleOnChange = (selected: string[]) => {
    if (onChange) {
      const item = data?.stockItemsRelay.edges.find(({ node }) =>
        selected.includes(node.id)
      );
      if (item)
        onChange({
          barcode: item.node.barcode,
          brand: item.node.brand,
          costPriceLocal: item.node.costPriceLocal,
          id: item.node.id,
          key: item.node.id,
          name: item.node.name,
          salesPriceLocal: item.node.salesPriceLocal,
          sku: item.node.sku,
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
