import { useState } from 'react';
import { useStoreState } from 'state';
import { useNavigate } from 'react-router-dom';
import {
  useSearchOffendersQuery,
  SortOrder,
  SearchOffendersQuery,
  QueryMode,
} from 'graphql/generated';

interface Return {
  searchOffendersData: SearchOffendersQuery | undefined;
  searchOffenderLoading: boolean;
  searchValue: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedOffender: (value: string) => void;
  currentSearchPage: number;
  onSearchPageChange: (page: number, pageSize: number) => void;
}

const useOffenderProfile = (): Return => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');
  const [searchPage, setSearchPage] = useState(1);
  const [searchPageSize, setSearchPageSize] = useState(20);

  const currentScheme = useStoreState((state) => state.scheme.id);

  const { data: searchOffendersData, loading: searchOffenderLoading } =
    useSearchOffendersQuery({
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
