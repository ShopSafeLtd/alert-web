import type { SearchOffenderReportsQuery } from '#/views/reports/offender-profile/Search/__generated__/search-offender-report.generated';

import { useSearchOffenderReportsQuery } from '#/views/reports/offender-profile/Search/__generated__/search-offender-report.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreState } from 'state';

interface Return {
  currentSearchPage: number;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchPageChange: (page: number, pageSize: number) => void;
  searchOffenderLoading: boolean;
  searchOffendersData: SearchOffenderReportsQuery | undefined;
  searchValue: string;
  setSelectedOffender: (value: string) => void;
}

const useOffenderProfile = (): Return => {
  const navigate = useNavigate();
  const userId = useStoreState((state) => state.user.id);

  const [searchValue, setSearchValue] = useState('');
  const [searchPage, setSearchPage] = useState(1);
  const [searchPageSize, setSearchPageSize] = useState(20);

  const currentScheme = useStoreState((state) => state.scheme.id);

  const { data: searchOffendersData, loading: searchOffenderLoading } =
    useSearchOffenderReportsQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        order: {
          updatedAt: SortOrder.Desc,
        },
        scheme: {
          id: currentScheme,
        },
        skip: searchPageSize * (searchPage - 1),
        take: searchPageSize,
        where: {
          groups: {
            some: {
              users: {
                some: {
                  id: {
                    equals: userId,
                  },
                },
              },
            },
          },
          name: {
            contains: searchValue,
            mode: QueryMode.Insensitive,
          },
        },
      },
    });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onSearchPageChange = (page: number, pageSize: number) => {
    if (page !== searchPage) setSearchPage(page);
    if (pageSize !== searchPageSize) setSearchPageSize(pageSize);
  };

  const setSelectedOffender = (offender: string) => {
    navigate(`${offender}`);
  };

  return {
    currentSearchPage: searchPage,
    handleSearchChange,
    onSearchPageChange,
    searchOffenderLoading,
    searchOffendersData,
    searchValue,
    setSelectedOffender,
  };
};

export default useOffenderProfile;
