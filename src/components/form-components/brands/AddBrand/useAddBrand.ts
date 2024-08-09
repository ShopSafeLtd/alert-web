import type { UpsertBrandMutation } from '#/views/settings/brands/graphql/mutations/__generated__/upsert-brand.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { FormInstance } from 'antd';
import type {
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
} from 'graphql/businesses/queries/__generated__/search-businesses.generated';
import type { SelectOptions } from 'types/DataType';

import errorNotification from '#/types/mutation_notifications/error_notification';
import { useUpsertBrandMutation } from '#/views/settings/brands/graphql/mutations/__generated__/upsert-brand.generated';
import { useApolloClient } from '@apollo/client';
import { Form, notification } from 'antd';
import { SearchBusinessesDocument } from 'graphql/businesses/queries/__generated__/search-businesses.generated';
import { QueryMode } from 'graphql/types';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';

const { useForm } = Form;

export interface FormData {
  businesses: SelectOptions[];
  description: string;
  name: string;
}

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<UpsertBrandMutation>;
}

interface Return {
  form: FormInstance<FormData>;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: string; location?: string; value: string }[]>;
  onSubmit: (value: FormData) => void;
  saving: boolean;
}

const useAddBrand = ({ onClose, update }: Props): Return => {
  const client = useApolloClient();
  const intl = useIntl();

  const [form] = useForm<FormData>();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);

  const onSearchBusiness = async (value: string) =>
    client
      .query<SearchBusinessesQuery, SearchBusinessesQueryVariables>({
        query: SearchBusinessesDocument,
        variables: {
          where: {
            name: {
              contains: value,
              mode: QueryMode.Insensitive,
            },
            schemes: {
              some: {
                id: {
                  equals: schemeId,
                },
              },
            },
          },
        },
      })
      .then((response) =>
        response.data.listBusinesses.businesses.length > 0
          ? [...response.data.listBusinesses.businesses].map((item) => ({
              label: item.name || '',
              location: item?.locations[0].full || '',
              value: item?.id || '',
            }))
          : [
              {
                disabled: true,
                label: 'No results found',
                value: '',
              },
            ]
      );

  const [createBrand] = useUpsertBrandMutation({
    onCompleted: () => {
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The brand has been added.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
    update,
  });
  const onSubmit = (data: FormData) => {
    setSaving(true);

    const businessIds = new Set(data.businesses.map(({ value }) => value));

    void createBrand({
      variables: {
        data: {
          businesses: [...businessIds],
          description: data.description,
          name: data.name,
          schemeId,
        },
      },
    }).finally(() => {
      setSaving(false);
      onClose();
    });
  };

  return {
    form,
    onSearchBusiness,
    onSubmit,
    saving,
  };
};
export default useAddBrand;
