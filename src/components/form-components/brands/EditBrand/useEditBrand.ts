import { useState } from 'react';
import type {
  BrandQuery,
  BrandUpdateInput,
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
} from 'graphql/generated';
import {
  Model,
  QueryMode,
  SearchBusinessesDocument,
  useBrandQuery,
  useUpdateBrandMutation,
} from 'graphql/generated';
import type { FormInstance } from 'antd';
import { notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import type { BusinessData, SelectOptions } from '#/types/DataType';
import { useStoreState } from '#/state';
import { useApolloClient } from '@apollo/client';
import { useForm } from 'antd/lib/form/Form';

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
  addBusinessVisible: boolean;
  toggleAddBusinessVisible: () => void;
  updateNewBusinessData: (values: BusinessData) => void;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: string; value: string; location?: string }[]>;
}

const useEditBrand = ({ onClose, brandId }: Props): Return => {
  const client = useApolloClient();
  const [form] = useForm<FormData>();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [addBusinessVisible, setAddBusinessVisible] = useState(false);
  const [businessesData, setBusinessesData] = useState<BusinessData[]>([]);
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

  const [updateBrand] = useUpdateBrandMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
          id: 'w5Yfkf',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The brand has been updated.',
          id: 'u8xFGL',
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
      const getBusiness = (): BrandUpdateInput['businesses'] => {
        if (data.businesses) {
          const businessIds = new Set(
            data.businesses.map(({ value }) => value)
          );

          const newBusinesses = businessesData
            ?.filter(({ isNew }) => isNew)
            .filter(({ id }) => businessIds.has(id));

          const connectedBusinesses = data.businesses.filter(
            ({ value }) =>
              !newBusinesses?.some(
                ({ id: newBusinessId }) => newBusinessId === value
              )
          );
          const disconnectedBusinesses = brandData?.brand?.businesses.filter(
            ({ id }) => !businessIds.has(id)
          );
          return {
            disconnect:
              disconnectedBusinesses && disconnectedBusinesses.length > 0
                ? disconnectedBusinesses.map(({ id }) => ({ id }))
                : undefined,
            connect:
              connectedBusinesses && connectedBusinesses.length > 0
                ? connectedBusinesses.map(({ value }) => ({ id: value }))
                : undefined,
            create:
              newBusinesses && newBusinesses.length > 0
                ? newBusinesses.map((el) => ({
                    name: el.name,
                    siteNumber: el.siteNumber,
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
                    tags: {
                      connect:
                        el.tags && el.tags.length > 0
                          ? el.tags.map((id) => ({ id }))
                          : undefined,
                      create:
                        el.newTags && el.newTags.length > 0
                          ? el.newTags.map((value) => ({
                              name: value.name,
                              description: value.description || '',
                              schemes: {
                                connect: value.schemes.map((id) => ({ id })),
                              },
                              createdBy: {
                                connect: { id: value.createdById },
                              },
                              dataType: Model.Business,
                            }))
                          : undefined,
                    },
                    groups: el?.groups
                      ? { connect: el?.groups?.map((id) => ({ id })) }
                      : undefined,
                    locations: {
                      create: [
                        {
                          building: el.locations[0].building || null,
                          county: el.locations[0].county || null,
                          postcode: el.locations[0].postcode || '',
                          street: el.locations[0].street || '',
                          townCity: el.locations[0].townCity || '',
                        },
                      ],
                    },
                  }))
                : undefined,
          };
        }
        return {
          connect: undefined,
          create: undefined,
          disconnect:
            brandData?.brand?.businesses &&
            brandData?.brand?.businesses.length > 0
              ? brandData?.brand?.businesses.map(({ id }) => ({ id }))
              : undefined,
        };
      };
      void updateBrand({
        variables: {
          where: {
            id: brandId,
          },
          data: {
            name: data.name,
            description: data.description,
            businesses: getBusiness(),
          },
        },
      });
    }
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
    data: brandData?.brand,
    loading,
    saving,
    form,
    addBusinessVisible,
    toggleAddBusinessVisible,
    updateNewBusinessData,
    onSearchBusiness,
  };
};

export default useEditBrand;
