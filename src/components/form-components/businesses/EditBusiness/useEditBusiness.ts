import { useApolloClient } from '@apollo/client';
import type { FormInstance } from 'antd';
import { notification, Form } from 'antd';
import type {
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
} from 'graphql/generated';
import {
  QueryMode,
  SearchBusinessesDocument,
  useEditBusinessQuery,
  useUpdateBusinessMutation,
} from 'graphql/generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import type { LocationData } from 'types/DataType';
import errorNotification from 'types/mutation_notifications/error_notification';

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
  onClose: () => void;
  businessId: string | undefined;
}

interface Return {
  onSubmit: (values: OnSubmitValues) => void;
  saving: boolean;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: string; value: string }[]>;
  form: FormInstance<OnSubmitValues>;
  loading: boolean;
  location: LocationData | undefined;
  setLocation: (value: LocationData) => void;
}

const useEditBusiness = ({ onClose, businessId }: Props): Return => {
  const client = useApolloClient();
  const currentScheme = useStoreState((state) => state.scheme.id);
  const intl = useIntl();
  const [form] = Form.useForm<OnSubmitValues>();

  const [saving, setSaving] = useState(false);
  // const [locationLocading, setLocationLoading] = useState(false);

  const [location, setLocation] = useState<LocationData>();
  // const [loading, setLoading] = useState(true);

  const { data, loading } = useEditBusinessQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: businessId,
      },
    },
    onCompleted: (res) => {
      form.setFieldsValue({
        building: res.business?.locations[0]?.building || '',
        county: res.business?.locations[0]?.county || '',
        name: res.business?.name || '',
        publicName: res.business?.publicName,
        parent: res.business
          ? {
              label: res.business?.parent?.name,
              value: res.business?.parent?.id,
            }
          : undefined,
        postcode: res.business?.locations[0]?.postcode || '',
        street: res.business?.locations[0]?.street || '',
        townCity: res.business?.locations[0]?.townCity || '',
      });
      if (
        res.business?.locations[0]?.geoLat &&
        res.business?.locations[0]?.geoLng
      ) {
        setLocation({
          geoLat: res.business?.locations[0]?.geoLat,
          geoLng: res.business?.locations[0]?.geoLng,
        });
      }
    },
  });
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

  const [updateBusiness] = useUpdateBusinessMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Shop has been updated',
          id: 'SxquWc',
        }),

        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onSubmit = (values: OnSubmitValues) => {
    const getParent = () => {
      if (values.parent.value)
        return {
          connect: {
            id: values.parent.value,
          },
        };
      if (data?.business?.parent?.id) return { disconnect: true };
      return undefined;
    };

    void updateBusiness({
      variables: {
        where: {
          id: businessId,
        },
        data: {
          name: { set: values.name },
          publicName: values.publicName,
          parent: getParent(),
          location: {
            where: {
              id: data?.business?.locations[0]?.id,
            },
            data: {
              building: { set: values.building },
              county: { set: values.county },
              postcode: { set: values.postcode },
              street: { set: values.street },
              townCity: { set: values.townCity },
              geoLat: location?.geoLat ? { set: location?.geoLat } : undefined,
              geoLng: location?.geoLng ? { set: location?.geoLng } : undefined,
            },
          },
        },
      },
      // optimisticResponse: {
      //   updateBusiness: {
      //     id: `${Math.random()}`,
      //     name: values.name,
      //     fullName: values.name,
      //     publicName: values.publicName,
      //     totalUsers: 0,
      //     parent: values.parent
      //       ? {
      //           id: values.parent.value,
      //           name: values.parent.label,
      //           fullName: values.parent.label,
      //           publicName: values.publicName,
      //         }
      //       : undefined,
      //     locations: [
      //       {
      //         id: `${Math.random()}`,
      //         geoLat:,
      //         full: `${values.building}, ${values.street}, ${values.townCity}, ${values.county}, ${values.postcode}`,
      //       },
      //     ],
      //   },
      // },
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
            id: {
              not: {
                equals: businessId,
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
  };

  return {
    onSubmit,
    saving,
    onSearchBusiness,
    loading: !data && loading,
    form,
    location,
    setLocation: onSetLocation,
  };
};

export default useEditBusiness;
