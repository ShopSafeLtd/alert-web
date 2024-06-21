import { useState } from 'react';

import { useStoreState } from 'state';
import { notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import type { MutationUpdaterFn } from '@apollo/client';
import type { UpsertBrandMutation } from '#/views/settings/brands/graphql/mutations/upsert-brand.generated';
import { QueryMode } from 'graphql/types';
import type {
  BrandsQuery,
  BrandsQueryVariables,
} from '#/views/settings/brands/graphql/queries/brands.generated';
import {
  BrandsDocument,
  useBrandsQuery,
} from '#/views/settings/brands/graphql/queries/brands.generated';
import { useDeleteBrandMutation } from '#/views/settings/brands/graphql/mutations/delete-brand.generated';

interface Return {
  data:
    | {
        node: {
          id: string;
          name: string;
          description?: string | null;
          businesses: Array<{
            __typename?: 'Business';
            id: string;
            name: string;
          }>;
        };
      }[]
    | null
    | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addBrand: boolean;
  toggleAddBrand: () => void;
  saving: boolean;
  onDelete: (value: string) => void;
  updateNewBrandList: MutationUpdaterFn<UpsertBrandMutation>;
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

      OR: search
        ? [
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
          ]
        : [],
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
      let count = existingData?.brands?.totalCount || 1;
      count -= 1;
      store.writeQuery<BrandsQuery>({
        query: BrandsDocument,
        data: {
          brands: {
            totalCount: count,
            edges: existingData?.brands?.edges.filter(
              ({ node: brand }) => brand?.id !== res?.deleteBrand?.id
            ),
          },
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
  const updateNewBrandList: MutationUpdaterFn<UpsertBrandMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<BrandsQuery, BrandsQueryVariables>({
      query: BrandsDocument,
      variables,
    });

    if (existingData === null) return;

    let count = existingData?.brands?.totalCount || 0;
    count += 1;
    store.writeQuery<BrandsQuery, BrandsQueryVariables>({
      query: BrandsDocument,
      data: {
        brands: {
          totalCount: count,
          edges: [...existingData.brands.edges, { node: res.upsertBrand }],
        },
      },
      variables,
    });
  };

  const toggleAddBrand = () => {
    setAddBrand(!addBrand);
  };

  return {
    data: data?.brands?.edges,
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
