import { useApolloClient } from '@apollo/client';
import { notification } from 'antd';
import {
  ListBusinessesDocument,
  ListBusinessesQuery,
  ListBusinessesQueryVariables,
  QueryMode,
  SearchBusinessesDocument,
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
  useCreateBusinessMutation,
} from 'graphql/generated';
import { useState } from 'react';
import { useStoreState } from 'state';

interface OnSubmitValues {
  name: string;
  parent: {
    label: string;
    value: string;
  };
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
}

interface Props {
  onClose: () => void;
}

interface Return {
  onSubmit: (values: OnSubmitValues) => void;
  saving: boolean;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: string; value: string }[]>;
}

const useAddBusiness = ({ onClose }: Props): Return => {
  const client = useApolloClient();
  const currentScheme = useStoreState((state) => state.scheme.id);

  const [saving, setSaving] = useState(false);

  const [createBusiness] = useCreateBusinessMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: 'Business has been created',
        description: 'You new business has been add to alert.',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Oops, something went wrong',
        description:
          'This error has been reported to our team, if it continues to happen reach out to our support team.',
        placement: 'bottomRight',
      });
    },
    update: (store, result) => {
      const existingData = store.readQuery<
        ListBusinessesQuery,
        ListBusinessesQueryVariables
      >({
        query: ListBusinessesDocument,
        variables: {
          where: {
            name: {
              contains: '',
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

      if (existingData && result.data)
        store.writeQuery<ListBusinessesQuery, ListBusinessesQueryVariables>({
          query: ListBusinessesDocument,
          variables: {
            where: {
              name: {
                contains: '',
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
          data: {
            listBusinesses: {
              total: existingData?.listBusinesses.total + 1,
              businesses: [
                ...existingData.listBusinesses.businesses,
                result.data?.createBusiness,
              ],
            },
          },
        });
    },
  });

  const onSubmit = (values: OnSubmitValues) => {
    createBusiness({
      variables: {
        data: {
          name: values.name,
          schemes: {
            connect: [
              {
                id: currentScheme,
              },
            ],
          },
          parent: values.parent
            ? {
                connect: {
                  id: values.parent.value,
                },
              }
            : undefined,
          location: {
            building: values.building,
            county: values.county,
            postcode: values.postcode,
            street: values.street,
            townCity: values.townCity,
          },
        },
      },
      optimisticResponse: {
        createBusiness: {
          id: `${Math.random()}`,
          name: values.name,
          totalUsers: 0,
          parent: values.parent
            ? {
                id: values.parent.value,
                name: values.parent.label,
              }
            : null,
          locations: [
            {
              id: `${Math.random()}`,
              full: `${values.building}, ${values.street}, ${values.townCity}, ${values.county}, ${values.postcode}`,
            },
          ],
        },
      },
    });
  };

  const onSearchBusiness = async (value: string) => {
    if (value.length < 2) {
      return [];
    }
    return client
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
                  equals: currentScheme,
                },
              },
            },
          },
        },
      })
      .then((response) =>
        response.data.listBusinesses.businesses.length
          ? response.data.listBusinesses.businesses.map((item) => ({
              label: item?.name || '',
              value: item?.id || '',
            }))
          : [
              {
                label: 'No results found',
                value: '',
                disabled: true,
              },
            ]
      );
  };

  return {
    onSubmit,
    saving,
    onSearchBusiness,
  };
};

export default useAddBusiness;
