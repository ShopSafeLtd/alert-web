import { useState } from 'react';
import {
  ListBusinessesQuery,
  QueryMode,
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
}

const useListBusinesses = (): Return => {
  const currentScheme = useStoreState((state) => state.scheme.id);

  const [searchValue, onSearchChange] = useState('');
  const [addVisible, setAddVisible] = useState(false);

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
    },
  });

  const toggleAddVisible = () => {
    setAddVisible(!addVisible);
  };

  return {
    data,
    loading: !data,
    onSearchChange,
    searchValue,
    addVisible,
    toggleAddVisible,
  };
};

export default useListBusinesses;
