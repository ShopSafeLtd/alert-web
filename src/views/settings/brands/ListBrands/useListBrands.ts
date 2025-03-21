import type { UpsertBrandMutation } from '#/views/settings/brands/graphql/mutations/__generated__/upsert-brand.generated';
import type {
  BrandsQuery,
  BrandsQueryVariables,
} from '#/views/settings/brands/graphql/queries/__generated__/brands.generated';
import type { MutationUpdaterFn } from '@apollo/client';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useDeleteBrandMutation } from '#/views/settings/brands/graphql/mutations/__generated__/delete-brand.generated';
import {
  BrandsDocument,
  useBrandsQuery,
} from '#/views/settings/brands/graphql/queries/__generated__/brands.generated';
import { notification } from 'antd';
import { QueryMode } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

interface Return {
  addBrand: boolean;
  brandId: string;
  data:
    | {
        node: {
          businesses: {
            __typename?: 'Business';
            id: string;
            name: string;
          }[];
          description?: null | string;
          id: string;
          name: string;
        };
      }[]
    | null
    | undefined;
  loading: boolean;
  onDelete: (value: string) => void;
  saving: boolean;
  search: string;
  setBrandId: (value: string) => void;
  setSearch: (value: string) => void;
  toggleAddBrand: () => void;
  updateNewBrandList: MutationUpdaterFn<UpsertBrandMutation>;
}

const useBrandList = (): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const schemeName = useStoreState((state) => state.scheme.name);
  const [search, setSearch] = useState('');
  const [brandId, setBrandId] = useState('');
  const [saving, setSaving] = useState(false);
  const [addBrand, setAddBrand] = useState(false);

  const variables = {
    where: {
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
        : undefined,

      schemeId: {
        equals: schemeId,
      },
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
        description: `The brand has been removed from ${schemeName}!`,
        message: 'Successfully Removed',
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
        data: {
          brands: {
            edges: existingData?.brands?.edges.filter(
              ({ node: brand }) => brand?.id !== res?.deleteBrand?.id
            ),
            totalCount: count,
          },
        },
        query: BrandsDocument,

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
      data: {
        brands: {
          edges: [...existingData.brands.edges, { node: res.upsertBrand }],
          totalCount: count,
        },
      },
      query: BrandsDocument,
      variables,
    });
  };

  const toggleAddBrand = () => {
    setAddBrand(!addBrand);
  };

  return {
    addBrand,
    brandId,
    data: data?.brands?.edges,
    loading: (data === null || data === undefined) && loading,
    onDelete,
    saving,
    search,
    setBrandId,
    setSearch,
    toggleAddBrand,
    updateNewBrandList,
  };
};

export default useBrandList;
