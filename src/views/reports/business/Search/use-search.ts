import type { SearchBusinessesQuery } from 'graphql/businesses/queries/__generated__/search-businesses.generated';

import { useSearchBusinessesQuery } from 'graphql/businesses/queries/__generated__/search-businesses.generated';
import { QueryMode } from 'graphql/types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStoreState } from 'state';

interface Return {
  currentSearchPage: number;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchPageChange: (page: number, pageSize: number) => void;
  searchBusinessData: SearchBusinessesQuery | undefined;
  searchBusinessLoading: boolean;
  searchValue: string;
  setSelectedBusiness: (value: string) => void;
}

const useOffenderProfile = (): Return => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');
  const [searchPage, setSearchPage] = useState(1);
  const [searchPageSize, setSearchPageSize] = useState(20);

  const currentScheme = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);

  const { data: searchBusinessData, loading: searchBusinessLoading } =
    useSearchBusinessesQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
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
          schemes: {
            some: {
              id: {
                equals: currentScheme,
              },
            },
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

  const setSelectedBusiness = (offender: string) => {
    navigate(`${offender}`);
  };

  return {
    currentSearchPage: searchPage,
    handleSearchChange,
    onSearchPageChange,
    searchBusinessData,
    searchBusinessLoading,
    searchValue,
    setSelectedBusiness,
  };
};

export default useOffenderProfile;
