import { useState } from 'react';
import { useStoreState } from 'state';
import { useNavigate } from 'react-router-dom';
import {
  QueryMode,
  useSearchBusinessesQuery,
  SearchBusinessesQuery,
} from 'graphql/generated';

interface Return {
  searchBusinessData: SearchBusinessesQuery | undefined;
  searchBusinessLoading: boolean;
  searchValue: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedBusiness: (value: string) => void;
  currentSearchPage: number;
  onSearchPageChange: (page: number, pageSize: number) => void;
}

const useOffenderProfile = (): Return => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');
  const [searchPage, setSearchPage] = useState(1);
  const [searchPageSize, setSearchPageSize] = useState(20);

  const currentScheme = useStoreState((state) => state.scheme.id);

  const { data: searchBusinessData, loading: searchBusinessLoading } =
    useSearchBusinessesQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        where: {
          schemes: {
            some: {
              id: {
                equals: currentScheme,
              },
            },
          },
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

  const setSelectedBusiness = (offender: string) => {
    navigate(`${offender}`);
  };

  return {
    searchBusinessData,
    searchBusinessLoading,
    searchValue,
    handleSearchChange,
    setSelectedBusiness,
    currentSearchPage: searchPage,
    onSearchPageChange,
  };
};

export default useOffenderProfile;
