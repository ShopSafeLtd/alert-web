import type {
  StockItemsListQuery,
  StockItemsListQueryVariables,
} from '#/views/settings/stock-items/ListStockItems/graphql/queries/__generated__/list-stock-items.generated';

import { useBusinessQuery } from '#/graphql/businesses/queries/__generated__/business.generated';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useStockItemsListQuery } from '#/views/settings/stock-items/ListStockItems/graphql/queries/__generated__/list-stock-items.generated';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

interface Return {
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

const useListStockItems = (): Return => {
  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const [searchValue, onSearchChange] = useState('');
  const [divisionFilter, setDivisionFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState<string[]>([]);
  const [businessFilter, setBusinessFilter] = useState<string[]>([]);
  const [fetchingMore, setFetchingMore] = useState(false);
  const take = 100;

  // Fetch business data when a business is selected
  const { data: businessData } = useBusinessQuery({
    skip: businessFilter.length === 0,
    variables: {
      where: {
        id: businessFilter[0] || '',
      },
    },
  });

  const variables: StockItemsListQueryVariables = {
    take,
    where: {
      currency: businessData?.business?.currency,
      divisionIds: divisionFilter ? [divisionFilter] : undefined,
      schemeIds: [currentScheme],
      search: searchValue || undefined,
    },
  };

  const { data, fetchMore, loading } = useStockItemsListQuery({
    nextFetchPolicy: 'cache-first',
    onCompleted: () => {
      setFetchingMore(false);
    },
    onError: () => {
      setFetchingMore(false);
    },
    variables,
  });

  // Auto-update division filter when business is selected or cleared
  useEffect(() => {
    if (businessFilter.length === 0) {
      // Clear division filter when business is deselected
      setDivisionFilter('');
    } else if (businessData?.business) {
      // Set division from selected business
      const division = (businessData.business as { division?: string })
        .division;
      if (division) {
        setDivisionFilter(String(division));
      }
    }
  }, [businessData, businessFilter]);

  const clearAllFilters = () => {
    setDivisionFilter('');
    setBrandFilter([]);
    setBusinessFilter([]);
    onSearchChange('');
  };

  const loadMore = () => {
    if (!data?.stockItemsSearch?.hasMore || fetchingMore) return;

    setFetchingMore(true);
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
        after: data.stockItemsSearch.hasMore,
        take,
        where: {
          currency: businessData?.business?.currency,
          divisionIds: divisionFilter ? [divisionFilter] : undefined,
          schemeIds: [currentScheme],
          search: searchValue || undefined,
        },
      },
    });
  };

  return {
    brandFilter,
    businessFilter,
    clearAllFilters,
    data,
    divisionFilter,
    hasMore: !!data?.stockItemsSearch?.hasMore,
    loadMore,
    loading,
    onSearchChange,
    searchValue,
    setBrandFilter,
    setBusinessFilter,
    setDivisionFilter,
  };
};

export default useListStockItems;
