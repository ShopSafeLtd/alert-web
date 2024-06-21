import errorNotification from '#/types/mutation_notifications/error_notification';
import type { MutationUpdaterFn } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import type { FormInstance } from 'antd';
import { Form, notification } from 'antd';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import type { SelectOptions } from 'types/DataType';
import type { UpsertBrandMutation } from '#/views/settings/brands/graphql/mutations/upsert-brand.generated';
import { useUpsertBrandMutation } from '#/views/settings/brands/graphql/mutations/upsert-brand.generated';
import { QueryMode } from 'graphql/types';
import type {
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
} from 'graphql/businesses/queries/search-businesses.generated';
import { SearchBusinessesDocument } from 'graphql/businesses/queries/search-businesses.generated';

const { useForm } = Form;

export interface FormData {
  name: string;
  description: string;
  businesses: SelectOptions[];
}

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<UpsertBrandMutation>;
}

interface Return {
  onSubmit: (value: FormData) => void;
  form: FormInstance<FormData>;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: string; value: string; location?: string }[]>;
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

  const [createBrand] = useUpsertBrandMutation({
    onCompleted: () => {
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The brand has been added.',
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
          name: data.name,
          description: data.description,
          schemeId,
          businesses: [...businessIds],
        },
      },
    }).finally(() => {
      setSaving(false);
      onClose();
    });
  };

  return {
    onSubmit,
    form,
    onSearchBusiness,
    saving,
  };
};
export default useAddBrand;
