/* eslint-disable sonarjs/no-nested-template-literals */
import { useApolloClient } from '@apollo/client';
import type { FormInstance } from 'antd';
import { Form } from 'antd';
import type {
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
} from 'graphql/generated';
import {
  useSchemeGroupsQuery,
  Model,
  useTagsQuery,
  QueryMode,
  SearchBusinessesDocument,
} from 'graphql/generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import { useStoreState } from 'state';
import type { BusinessData, LocationData, TagData } from 'types/DataType';

export interface FormData {
  name: string;
  parent: {
    label: string;
    value: string;
  };
  tags?: Array<string | { value: string; label: string }>;
  groups?: string[];
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
  publicName: boolean;
  siteNumber: string;
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
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  addTag: boolean;
  toggleAddTag: () => void;
  updateNewTagData: (values: TagData) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
}

const useAddBusiness = ({ update }: Props): Return => {
  const intl = useIntl();
  const client = useApolloClient();
  const currentScheme = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);

  const [form] = Form.useForm<FormData>();
  const [location, setLocation] = useState<LocationData>();
  const [tagData, setTagData] = useState<TagData[]>([]);
  const [addTag, setAddTag] = useState(false);

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
  const onSubmit = (values: FormData) => {
    const tagsIds = values.tags?.map((el) => {
      if (typeof el === 'object') {
        return el.value;
      }
      return el;
    });
    const newTags = tagData.filter(
      (item) => item.isNew && tagsIds?.includes(item.id)
    );
    const connectTagIds = tagsIds?.filter(
      (id) => !newTags.map((el) => el.id).includes(id)
    );

    update({
      id: Math.floor(Math.random() * 1000).toString(),
      name: values.name,
      publicName: values.publicName,
      parent: values.parent
        ? { id: values.parent.value, name: values.parent.label }
        : undefined,
      tags: connectTagIds || [],
      newTags: newTags || [],
      groups: values.groups || [],
      siteNumber: values.siteNumber,
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
    onSearchBusiness,
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

export default useAddBusiness;
