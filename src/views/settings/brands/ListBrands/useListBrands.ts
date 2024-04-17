import { useState } from 'react';
import type {
  CreateBrandMutation,
  BrandsQuery,
  BrandsQueryVariables,
} from 'graphql/generated';
import {
  useDeleteBrandMutation,
  BrandsDocument,
  useBrandsQuery,
  QueryMode,
} from 'graphql/generated';
import { useStoreState } from 'state';
import { notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import type { MutationUpdaterFn } from '@apollo/client';

interface Return {
  data: Exclude<BrandsQuery['brands'], undefined | null> | null | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addBrand: boolean;
  toggleAddBrand: () => void;
  saving: boolean;
  onDelete: (value: string) => void;
  updateNewBrandList: MutationUpdaterFn<CreateBrandMutation>;
  brandId: string;
  setBrandId: (value: string) => void;
}

const useBrandList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const schemeName = useStoreState((state) => state.scheme.name);
  const [search, setSearch] = useState('');
  const [brandId, setBrandId] = useState('');
  const [saving, setSaving] = useState(false);
  const [addBrand, setAddBrand] = useState(false);

  const variables = {
    where: {
      schemeId: {
        equals: schemeId,
      },

      OR: [
        {
          name: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
        {
          description: {
            contains: search,
            mode: QueryMode.Insensitive,
          },
        },
      ],
    },
  };
  const { data, loading } = useBrandsQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });
  // delete
  const [deleteBrand] = useDeleteBrandMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Removed',
        description: `The brand has been removed from ${schemeName}!`,
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res === null || res === undefined) return;
      const existingData = store.readQuery<BrandsQuery>({
        query: BrandsDocument,
        variables,
      });

      if (existingData === null) return;

      store.writeQuery<BrandsQuery>({
        query: BrandsDocument,
        data: {
          brands: existingData?.brands?.filter(
            (brand) => brand?.id !== res?.deleteBrand?.id
          ),
          __typename: 'Query',
        },

        variables,
      });
    },
  });

  const onDelete = (currentId: string) => {
    void deleteBrand({
      variables: {
        id: currentId,
      },
    }).finally(() => setSaving(false));
  };

  // createBrand
  const updateNewBrandList: MutationUpdaterFn<CreateBrandMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<BrandsQuery, BrandsQueryVariables>({
      query: BrandsDocument,
      variables,
    });

    if (existingData === null) return;

    store.writeQuery<BrandsQuery, BrandsQueryVariables>({
      query: BrandsDocument,
      data: {
        brands: [...existingData.brands, res.createBrand],
      },
      variables,
    });
  };

  const toggleAddBrand = () => {
    setAddBrand(!addBrand);
  };

  return {
    data: data?.brands,
    loading: (data === null || data === undefined) && loading,
    search,
    setSearch,
    addBrand,
    toggleAddBrand,

    saving,
    onDelete,
    updateNewBrandList,
    brandId,
    setBrandId,
  };
};

export default useBrandList;
