import type { FormInstance } from 'antd';
import { Form } from 'antd';
import { useState } from 'react';

import { useStoreState } from 'state';
import type {
  BusinessData,
  LocationData,
  SelectOptions,
  TagData,
} from 'types/DataType';
import { useGroupsContext } from '#/context/groups-context';
import { useTagsQuery } from 'graphql/tags/queries/tags.generated';
import { Model } from 'graphql/types';

export interface FormData {
  name: string;
  parent:
    | {
        label: string;
        value: string;
      }
    | string;
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

const stringOrOption = (inputOb: string | SelectOptions) => {
  if (typeof inputOb === 'string') {
    return inputOb;
  }
  return inputOb.value;
};

interface Return {
  onSubmit: (values: FormData) => void;
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
  const currentScheme = useStoreState((state) => state.scheme.id);

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

  const { groups, groupsLoading } = useGroupsContext();

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

    console.log('values', values);
    update({
      id: Math.floor(Math.random() * 1000).toString(),
      name: values.name,
      publicName: values.publicName,
      parent: values.parent
        ? { id: stringOrOption(values.parent), name: '' }
        : undefined,
      tags: connectTagIds || [],
      newTags: newTags || [],
      groups: values.groups || [],
      siteNumber: values.siteNumber,
      locations: [
        {
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
    groups,
    groupsLoading,
  };
};

export default useAddBusiness;
