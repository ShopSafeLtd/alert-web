import { useState } from 'react';
import { useStoreState } from 'state';
import { useNavigate } from 'react-router-dom';
import type { SearchOffenderReportsQuery } from '#/views/reports/offender-profile/Search/search-offender-report.generated';
import { useSearchOffenderReportsQuery } from '#/views/reports/offender-profile/Search/search-offender-report.generated';
import { QueryMode, SortOrder } from 'graphql/types';

interface Return {
  searchOffendersData: SearchOffenderReportsQuery | undefined;
  searchOffenderLoading: boolean;
  searchValue: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedOffender: (value: string) => void;
  currentSearchPage: number;
  onSearchPageChange: (page: number, pageSize: number) => void;
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
        scheme: {
          id: currentScheme,
        },
        order: {
          updatedAt: SortOrder.Desc,
        },
        where: {
          name: {
            contains: searchValue,
            mode: QueryMode.Insensitive,
          },
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
        },
        skip: searchPageSize * (searchPage - 1),
        take: searchPageSize,
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
    searchOffendersData,
    searchOffenderLoading,
    searchValue,
    handleSearchChange,
    setSelectedOffender,
    currentSearchPage: searchPage,
    onSearchPageChange,
  };
};

export default useOffenderProfile;
