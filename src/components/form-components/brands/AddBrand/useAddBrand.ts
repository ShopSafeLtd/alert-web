import type {
  CreateBrandInput,
  CreateBrandMutation,
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
} from '#/graphql/generated';
import {
  useCreateBrandMutation,
  QueryMode,
  SearchBusinessesDocument,
} from '#/graphql/generated';
import errorNotification from '#/types/mutation_notifications/error_notification';
import type { MutationUpdaterFn } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import type { FormInstance } from 'antd';
import { Form, notification } from 'antd';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import type { BusinessData, SelectOptions } from 'types/DataType';

const { useForm } = Form;

export interface FormData {
  name: string;
  description: string;
  businesses: SelectOptions[];
}

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateBrandMutation>;
}

interface Return {
  onSubmit: (value: FormData) => void;
  form: FormInstance<FormData>;
  addBusinessVisible: boolean;
  toggleAddBusinessVisible: () => void;
  updateNewBusinessData: (values: BusinessData) => void;
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
  const [addBusinessVisible, setAddBusinessVisible] = useState(false);
  const [businessesData, setBusinessesData] = useState<BusinessData[]>([]);
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
          ? [...response.data.listBusinesses.businesses, ...businessesData].map(
              (item) => ({
                label: item.name || '',
                value: item?.id || '',
                location: item?.locations[0].full || '',
              })
            )
          : [
              {
                label: 'No results found',
                value: '',
                disabled: true,
              },
            ]
      );

  const [createBrand] = useCreateBrandMutation({
    onCompleted: () => {
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
          id: '5Hvk21',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The brand has been added.',
          id: 'jdfhCx',
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
    const newBusinesses = businessesData
      ?.filter(({ isNew }) => isNew)
      .filter(({ id }) => [...businessIds].includes(id));
    const updatedBusinesses = businessesData
      ?.filter(({ isConnected }) => isConnected)
      .filter(({ id }) => [...businessIds].includes(id));
    const connectedBusinesses = data.businesses.filter(
      ({ value }) =>
        !newBusinesses?.some(
          ({ id: newBusinessId }) => newBusinessId === value
        ) &&
        !updatedBusinesses?.some(
          ({ id: updatedBusinessId }) => updatedBusinessId === value
        )
    );

    const getBusiness = (): CreateBrandInput['businesses'] => ({
      connect:
        connectedBusinesses && connectedBusinesses.length > 0
          ? connectedBusinesses.map(({ value }) => ({ id: value }))
          : undefined,
      create:
        newBusinesses && newBusinesses.length > 0
          ? newBusinesses.map((el) => ({
              name: el.name,
              publicName: el.publicName || false,
              schemes: {
                connect: [
                  {
                    id: schemeId,
                  },
                ],
              },
              parent: el.parent
                ? {
                    connect: {
                      id: el.parent.id,
                    },
                  }
                : undefined,

              locations: {
                create:
                  el?.locations && el?.locations.length > 0
                    ? el?.locations.map((location) => ({
                        building: location.building,
                        county: location.county,
                        postcode: location.postcode || '',
                        street: location.street || '',
                        townCity: location.townCity || '',
                        geoLat: location.geoLat,
                        geoLng: location.geoLng,
                      }))
                    : undefined,
              },
            }))
          : undefined,
    });

    void createBrand({
      variables: {
        data: {
          name: data.name,
          description: data.description || '',
          schemeId,
          businesses: getBusiness(),
        },
      },
    }).finally(() => {
      setSaving(false);
      onClose();
    });
  };

  const toggleAddBusinessVisible = () => {
    setAddBusinessVisible(!addBusinessVisible);
  };
  const updateNewBusinessData = (values: BusinessData) => {
    setAddBusinessVisible(false);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const selectedBusinesses = form.getFieldValue('businesses');
    form.setFieldsValue({
      businesses: [
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        ...selectedBusinesses,
        { value: values.id, label: values.name },
      ],
    });
    setBusinessesData([...businessesData, { ...values, isNew: true }]);
  };

  return {
    onSubmit,
    form,
    addBusinessVisible,
    toggleAddBusinessVisible,
    updateNewBusinessData,
    onSearchBusiness,
    saving,
  };
};
export default useAddBrand;
