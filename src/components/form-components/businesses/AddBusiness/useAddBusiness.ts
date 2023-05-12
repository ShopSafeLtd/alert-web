/* eslint-disable sonarjs/no-nested-template-literals */
import { useApolloClient } from '@apollo/client';
import type {
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
} from 'graphql/generated';
import { QueryMode, SearchBusinessesDocument } from 'graphql/generated';

import { useStoreState } from 'state';
import type { BusinessData } from 'types/DataType';

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
  publicName: boolean;
}

interface Props {
  // onClose: () => void;
  update: (value: BusinessData) => void;
}

interface Return {
  onSubmit: (values: OnSubmitValues) => void;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: string; value: string }[]>;
}

const useAddBusiness = ({ update }: Props): Return => {
  const client = useApolloClient();
  const currentScheme = useStoreState((state) => state.scheme.id);

  const onSubmit = (values: OnSubmitValues) => {
    // console.log('values.parent.value', values.parent.value);

    update({
      id: Math.floor(Math.random() * 1000).toString(),
      name: values.name,
      publicName: values.publicName,
      parent: values.parent
        ? { id: values.parent.value, name: values.parent.label }
        : undefined,
      locations: [
        {
          id: Math.floor(Math.random() * 1000).toString(),
          building: values.building,
          county: values.county,
          postcode: values.postcode,
          street: values.street,
          townCity: values.townCity,
          full: `${values.building ? `${values.building}, ` : ''}${
            values.street ? `${values.street}, ` : ''
          }${values.townCity ? `${values.townCity}, ` : ''}${
            values.county ? `${values.county}, ` : ''
          }${values.postcode ? `${values.postcode} ` : ''}`,
        },
      ],
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
        response.data.listBusinesses.businesses.length > 0
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
    onSearchBusiness,
  };
};

export default useAddBusiness;
