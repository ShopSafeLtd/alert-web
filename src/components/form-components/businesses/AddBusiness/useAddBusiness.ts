import type { FormInstance } from 'antd';
import type { BusinessData, LocationData, TagData } from 'types/DataType';

import { useGroupsContext } from '#/context/groups-context';
import { Form } from 'antd';
import { useTagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import { Model } from 'graphql/types';
import { useState } from 'react';
import { useStoreState } from 'state';

export interface FormData {
  building: string;
  county: string;
  groups: string[];
  name: string;
  parent: string[];
  postcode: string;
  publicName: boolean;
  siteNumber: string;
  street: string;
  tags?: ({ label: string; value: string } | string)[];
  townCity: string;
}

interface Props {
  // onClose: () => void;
  update: (value: BusinessData) => void;
}

interface Return {
  addTag: boolean;
  form: FormInstance<FormData>;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  location: LocationData | undefined;
  onSubmit: (values: FormData) => void;
  setLocation: (value: LocationData) => void;
  tags: { label: string; value: string }[];
  tagsLoading: boolean;
  toggleAddTag: () => void;
  updateNewTagData: (values: TagData) => void;
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
        dataType: {
          equals: Model.Business,
        },
        schemes: {
          some: {
            id: {
              in: [currentScheme],
            },
          },
        },
      },
    },
  });

  const { groups, groupsLoading } = useGroupsContext();

  const onSetLocation = (value: LocationData) => {
    if (value) {
      setLocation(value);
      form.setFieldsValue({
        postcode: value.postcode || '',
        street: value.street || '',
        townCity: value.townCity || '',
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
      groups: values.groups,
      id: Math.floor(Math.random() * 1000).toString(),
      locations: [
        {
          building: values.building,
          county: values.county,
          // eslint-disable-next-line sonarjs/no-nested-template-literals
          full: `${values.building ? `${values.building}, ` : ''}${
            values.street ? `${values.street}, ` : ''
          }${values.townCity ? `${values.townCity}, ` : ''}${
            values.county ? `${values.county}, ` : ''
            // eslint-disable-next-line sonarjs/no-nested-template-literals
          }${values.postcode ? `${values.postcode} ` : ''}`,
          geoLat: location?.geoLat,
          geoLng: location?.geoLng,
          postcode: values.postcode,
          street: values.street,
          townCity: values.townCity,
        },
      ],
      name: values.name,
      newTags: newTags || [],
      parent:
        values.parent?.length > 0
          ? { id: values.parent[0], name: '' }
          : undefined,
      publicName: values.publicName,
      siteNumber: values.siteNumber,
      tags: connectTagIds || [],
    });
  };

  const updateNewTagData = (values: TagData) => {
    setAddTag(false);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const selectedTag = form.getFieldValue('tags');
    if (selectedTag) {
      form.setFieldsValue({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tags: [...selectedTag, { label: values.name, value: values.id }],
      });
    } else {
      form.setFieldsValue({
        tags: [{ label: values.name, value: values.id }],
      });
    }
    setTagData([...tagData, { ...values, isNew: true }]);
  };
  const toggleAddTag = () => {
    setAddTag(!addTag);
  };

  return {
    addTag,
    form,
    groups,
    groupsLoading,
    location,
    onSubmit,
    setLocation: onSetLocation,
    tags:
      tagsData?.tags.map((tag) => ({
        label: tag.name,
        value: tag.id,
      })) || [],
    tagsLoading,
    toggleAddTag,
    updateNewTagData,
  };
};

export default useAddBusiness;
