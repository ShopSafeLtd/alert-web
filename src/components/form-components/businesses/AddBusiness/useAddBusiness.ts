/* eslint-disable sonarjs/no-nested-template-literals */
import { useApolloClient } from '@apollo/client';
import type { FormInstance } from 'antd';
import { Form } from 'antd';
import type {
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
} from 'graphql/generated';
import { QueryMode, SearchBusinessesDocument } from 'graphql/generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import { useStoreState } from 'state';
import type { BusinessData, LocationData } from 'types/DataType';

export interface FormData {
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
  onSubmit: (values: FormData) => void;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: string; value: string }[]>;
  form: FormInstance<FormData>;
  location: LocationData | undefined;
  setLocation: (value: LocationData) => void;
}

const useAddBusiness = ({ update }: Props): Return => {
  const intl = useIntl();
  const client = useApolloClient();
  const currentScheme = useStoreState((state) => state.scheme.id);
  const [form] = Form.useForm<FormData>();
  const [location, setLocation] = useState<LocationData>();

  const onSetLocation = (value: LocationData) => {
    if (value) {
      setLocation(value);
      form.setFieldsValue({
        street: value.street || '',
        townCity: value.townCity || '',
        postcode: value.postcode || '',
      });
    }
  };
  const onSubmit = (values: FormData) => {
    update({
      id: Math.floor(Math.random() * 1000).toString(),
      name: values.name,
      publicName: values.publicName,
      parent: values.parent
        ? { id: values.parent.value, name: values.parent.label }
        : undefined,
      locations: [
        {
          // id: Math.floor(Math.random() * 1000).toString(),
          building: values.building,
          county: values.county,
          postcode: values.postcode,
          street: values.street,
          townCity: values.townCity,
          geoLat: location?.geoLat,
          geoLng: location?.geoLng,
          full: `${values.building ? `${values.building}, ` : ''}${
            values.street ? `${values.street}, ` : ''
          }${values.townCity ? `${values.townCity}, ` : ''}${
            values.county ? `${values.county}, ` : ''
          }${values.postcode ? `${values.postcode} ` : ''}`,
        },
      ],
    });
  };

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
              location: item?.locations[0].full || '',
            }))
          : [
              {
                label: intl.formatMessage({
                  defaultMessage: 'No results found',
                  id: 'hX5PAb',
                }),
                value: '',
                disabled: true,
              },
            ]
      );

  return {
    onSubmit,
    onSearchBusiness,
    form,
    location,
    setLocation: onSetLocation,
  };
};

export default useAddBusiness;
