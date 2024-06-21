import { useState } from 'react';
import type { FormInstance } from 'antd';
import { notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import type { SelectOptions } from '#/types/DataType';
import { useStoreState } from '#/state';
import { useApolloClient } from '@apollo/client';
import { useForm } from 'antd/lib/form/Form';
import type { BrandQuery } from '#/views/settings/brands/graphql/queries/brand.generated';
import { useBrandQuery } from '#/views/settings/brands/graphql/queries/brand.generated';
import type {
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
} from 'graphql/businesses/queries/search-businesses.generated';
import { SearchBusinessesDocument } from 'graphql/businesses/queries/search-businesses.generated';
import { QueryMode } from 'graphql/types';
import { useUpsertBrandMutation } from '#/views/settings/brands/graphql/mutations/upsert-brand.generated';

export interface FormData {
  name: string;
  description: string;
  businesses: SelectOptions[];
}
interface Props {
  onClose: () => void;
  brandId: string;
}
interface Return {
  onSubmit: (value: FormData) => void;
  data: Exclude<BrandQuery['brand'], undefined | null> | null | undefined;
  loading: boolean;
  saving: boolean;
  form: FormInstance<FormData>;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: string; value: string; location?: string }[]>;
}

const useEditBrand = ({ onClose, brandId }: Props): Return => {
  const client = useApolloClient();
  const [form] = useForm<FormData>();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const intl = useIntl();
  const { data: brandData, loading } = useBrandQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: brandId,
      },
    },
  });

  const onSearchBusiness = async (value: string) =>
    client
      .query<SearchBusinessesQuery, SearchBusinessesQueryVariables>({
        query: SearchBusinessesDocument,
        variables: {
          where: {
            schemes: {
              some: {
                id: {
                  equals: schemeId,
                },
              },
            },
            name: {
              contains: value,
              mode: QueryMode.Insensitive,
            },
          },
        },
      })
      .then((response) =>
        response.data.listBusinesses.businesses.length > 0
          ? [...response.data.listBusinesses.businesses].map((item) => ({
              label: item.name || '',
              value: item?.id || '',
              location: item?.locations[0].full || '',
            }))
          : [
              {
                label: 'No results found',
                value: '',
                disabled: true,
              },
            ]
      );

  const [updateBrand] = useUpsertBrandMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The brand has been updated.',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    if (brandId) {
      const businessIds = new Set(data.businesses.map(({ value }) => value));
      void updateBrand({
        variables: {
          data: {
            name: data.name,
            description: data.description,
            brandId,
            schemeId: brandData?.brand.scheme.id || '',
            businesses: [...businessIds],
          },
        },
      });
    }
  };
  return {
    onSubmit,
    data: brandData?.brand,
    loading,
    saving,
    form,
    onSearchBusiness,
  };
};

export default useEditBrand;
