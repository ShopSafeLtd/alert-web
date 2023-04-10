import { useState } from 'react';
import type { ListBusinessesQuery } from 'graphql/generated';
import {
  QueryMode,
  SortOrder,
  useListBusinessesQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';

interface Return {
  data: ListBusinessesQuery | undefined;
  loading: boolean;
  searchValue: string;
  onSearchChange: (value: string) => void;
  addVisible: boolean;
  toggleAddVisible: () => void;
  linkVisible: boolean;
  toggleLinkVisible: () => void;
}

const useListBusinesses = (): Return => {
  const currentScheme = useStoreState((state) => state.scheme.id);

  const [searchValue, onSearchChange] = useState('');
  const [addVisible, setAddVisible] = useState(false);
  const [linkVisible, setLinkVisible] = useState(false);

  const { data } = useListBusinessesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
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
      orderBy: {
        name: SortOrder.Asc,
      },
    },
  });

  const toggleAddVisible = () => {
    setAddVisible(!addVisible);
  };

  const toggleLinkVisible = () => {
    setLinkVisible(!linkVisible);
  };

  return {
    data,
    loading: !data,
    onSearchChange,
    searchValue,
    addVisible,
    toggleAddVisible,
    linkVisible,
    toggleLinkVisible,
  };
};

export default useListBusinesses;
