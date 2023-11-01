import { useApolloClient } from '@apollo/client';
import type { FormInstance } from 'antd';
import { notification, Form } from 'antd';
import type {
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
  BusinessUpdateInput,
} from 'graphql/generated';
import {
  Model,
  useSchemeGroupsQuery,
  useTagsQuery,
  QueryMode,
  SearchBusinessesDocument,
  useEditBusinessQuery,
  useUpdateBusinessMutation,
} from 'graphql/generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import type { LocationData, TagData } from 'types/DataType';
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
  tags?: Array<string | { value: string; label: string }>;
  groups?: string[];
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
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  addTag: boolean;
  toggleAddTag: () => void;
  updateNewTagData: (values: TagData) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
}

const useEditBusiness = ({ onClose, businessId }: Props): Return => {
  const client = useApolloClient();
  const userId = useStoreState((state) => state.user.id);
  const currentScheme = useStoreState((state) => state.scheme.id);
  const intl = useIntl();
  const [form] = Form.useForm<OnSubmitValues>();

  const [saving, setSaving] = useState(false);

  const [location, setLocation] = useState<LocationData>();
  const [tagData, setTagData] = useState<TagData[]>([]);
  const [addTag, setAddTag] = useState(false);

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
        groups: res.business?.groups.map(({ id }) => id),
        tags: res.business?.tags.map((el) => ({
          label: el.name,
          value: el.id,
        })),
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

  const { data: tagsData, loading: tagsLoading } = useTagsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        schemes: {
          some: {
            id: {
              in: [currentScheme],
            },
          },
        },
        dataType: {
          equals: Model.Business,
        },
      },
    },
  });

  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: currentScheme,
          },
        },
        users: {
          some: {
            id: {
              equals: userId,
            },
          },
        },
      },
    },
    fetchPolicy: 'cache-and-network',
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
    const getTags = (): BusinessUpdateInput['tags'] => {
      const existingTagIds = data?.business?.tags?.map(({ id }) => id);

      const tagIds = values?.tags?.map((el) => {
        if (typeof el === 'object') {
          return el.value;
        }
        return el;
      });

      const newTags = tagData?.filter(
        (item) => item.isNew && tagIds?.includes(item.id)
      );

      const connectedTags = tagIds?.filter(
        (id) =>
          !(
            newTags.map((el) => el.id).includes(id) ||
            existingTagIds?.includes(id)
          )
      );
      const disconnectedTags = existingTagIds?.filter(
        (id) => !tagIds?.includes(id)
      );
      return {
        disconnect:
          disconnectedTags && disconnectedTags.length > 0
            ? disconnectedTags.map((id) => ({ id }))
            : undefined,
        connect:
          connectedTags && connectedTags.length > 0
            ? connectedTags.map((id) => ({ id }))
            : undefined,
        create:
          newTags.length > 0
            ? newTags.map((value) => ({
                name: value.name,
                description: value.description || '',
                schemes: {
                  connect: value.schemes.map((id) => ({ id })),
                },
                createdBy: { connect: { id: value.createdById } },
                // schemes: value.schemes.includes(currentScheme)
                //   ? {
                //       connect: value.schemes.map((id) => ({
                //         id,
                //       })),
                //     }
                //   : {
                //       connect: [
                //         ...value.schemes.map((id) => ({
                //           id,
                //         })),
                //         { id: currentScheme },
                //       ],
                //     },
                dataType: Model.Business,
              }))
            : undefined,
      };
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
          tags: getTags(),
          groups: {
            set: values.groups?.map((id: string) => ({ id })) || [],
          },
          locations: {
            update: [
              {
                where: {
                  id: data?.business?.locations[0]?.id,
                },
                data: {
                  building: { set: values.building },
                  county: { set: values.county },
                  postcode: { set: values.postcode },
                  street: { set: values.street },
                  townCity: { set: values.townCity },
                  geoLat: location?.geoLat
                    ? { set: location?.geoLat }
                    : undefined,
                  geoLng: location?.geoLng
                    ? { set: location?.geoLng }
                    : undefined,
                },
              },
            ],
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
  const updateNewTagData = (values: TagData) => {
    setAddTag(false);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const selectedTag = form.getFieldValue('tags');
    if (selectedTag) {
      form.setFieldsValue({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tags: [...selectedTag, { value: values.id, label: values.name }],
      });
    } else {
      form.setFieldsValue({
        tags: [{ value: values.id, label: values.name }],
      });
    }
    setTagData([...tagData, { ...values, isNew: true }]);
  };
  const toggleAddTag = () => {
    setAddTag(!addTag);
  };
  return {
    onSubmit,
    saving,
    onSearchBusiness,
    loading: !data && loading,
    form,
    location,
    setLocation: onSetLocation,
    tags:
      tagsData?.tags.map((tag) => ({
        value: tag.id,
        label: tag.name,
      })) || [],
    tagsLoading,
    addTag,
    toggleAddTag,
    updateNewTagData,
    groups:
      groupsData?.groups.map((group) => ({
        value: group.id,
        label: group.name,
      })) || [],
    groupsLoading,
  };
};

export default useEditBusiness;
