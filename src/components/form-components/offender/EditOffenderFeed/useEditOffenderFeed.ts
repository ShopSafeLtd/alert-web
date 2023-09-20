/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-misused-promises,@typescript-eslint/no-unsafe-member-access */
import { useState } from 'react';
import type {
  Age,
  Build,
  Gender,
  Height,
  IdSource,
  Race,
  ViewOffenderQuery,
} from 'graphql/generated';
import {
  useListCustomGalleriesQuery,
  Model,
  Role,
  useSchemeGroupsQuery,
  useTagsQuery,
  useUpdateOffenderMutation,
  useViewOffenderQuery,
} from 'graphql/generated';
import { notification } from 'antd';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

import { useIntl } from 'react-intl';

interface Props {
  onClose: () => void;
  offenderId: string;
}
export interface FormData {
  name: string;
  alias?: string[];
  age: Age;
  gender: Gender;
  race: Race;
  build: Build;
  height: Height;
  hair: string;
  peculiarities: string;
  comment: string;
  dateSource?: string;
  dateOfBirth?: Date;
  groups: string[];
  tags: string[];
  customGalleries: string[];
  idVerified?: boolean;
  idSource?: IdSource;
}

interface Return {
  onSubmit: (value: FormData) => void;
  data: ViewOffenderQuery | undefined;
  loading: boolean;
  saving: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  customGalleries: { value: string; label: string }[];
  customGalleriesLoading: boolean;
  ageCheck: boolean;
  setAgeCheck: (value: boolean) => void;
  idVerified: boolean;
  onValuesChange?: (changedValues: FormData, values: FormData) => void;
  adminRights: boolean;
}

const useEditOffender = ({ offenderId, onClose }: Props): Return => {
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const groups = useStoreState((state) => state.user.groups);
  const role = useStoreState((state) => state.user.role);
  const [saving, setSaving] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [idVerified, setIDVerified] = useState(false);

  const { data: offenderData, loading } = useViewOffenderQuery({
    variables: {
      where: {
        id: offenderId,
      },
    },

    onCompleted: ({ offender }) => {
      setAgeCheck(!!offender?.dateOfBirth);
      if (offender?.idVerified) setIDVerified(true);
    },
  });
  const { data: groupData, loading: groupsLoading } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
        users:
          role === Role.User
            ? {
                some: {
                  id: {
                    equals: userId,
                  },
                },
              }
            : undefined,
      },
    },
    fetchPolicy: 'cache-and-network',
  });
  const { data: customGalleriesData, loading: customGalleriesLoading } =
    useListCustomGalleriesQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        where: {
          schemes: {
            some: {
              id: {
                equals: schemeId,
              },
            },
          },
        },
      },
    });
  const { data: tagsData, loading: tagsLoading } = useTagsQuery({
    variables: {
      where: {
        schemes: {
          some: {
            id: {
              in: [schemeId],
            },
          },
        },
        dataType: {
          equals: Model.Offender,
        },
      },
    },
  });

  const [updateOffender] = useUpdateOffenderMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated',
          id: 'ryTk34',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The offender has been updated!',
          id: 'aRw1jd',
        }),
        placement: 'bottomRight',
      });
      onClose();
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    void updateOffender({
      variables: {
        where: {
          id: offenderId,
        },
        data: {
          approved: { set: true },
          name: { set: data.name },
          gender: { set: data.gender || null },
          race: { set: data.race || null },
          build: { set: data.build || null },
          height: { set: data.height || null },
          hair: {
            set:
              data.hair ||
              intl.formatMessage({
                defaultMessage: 'Unknown',
                id: '5jeq8P',
              }),
          },
          comment: { set: data.comment || '' },
          peculiarities: { set: data.peculiarities || '' },
          age: { set: ageCheck ? null : data.age || null },
          dateSource: { set: ageCheck ? data.dateSource || null : null },
          idSource: data.idSource ? { set: data.idSource } : undefined,
          idVerified: data.idVerified ? { set: data.idVerified } : undefined,
          dateOfBirth: { set: ageCheck ? data.dateOfBirth || null : null },
          groups: {
            set:
              groups.length > 1
                ? data.groups.map((id) => ({ id }))
                : groups.map(({ id }) => ({ id })),
          },
          tags: {
            set: data.tags.map((id) => ({ id })) || undefined,
          },
          customGalleries: {
            set: data.customGalleries.map((id) => ({ id })) || undefined,
          },
          scheme: { connect: { id: schemeId } },
        },
      },
    });
  };

  // function
  const onValuesChange = (changedValues: FormData) => {
    if (changedValues.idVerified !== undefined) {
      setIDVerified(changedValues.idVerified);
    }
  };
  return {
    onSubmit,
    data: offenderData,
    loading,
    saving,
    groups:
      groupData?.groups.map((group) => ({
        value: group.id,
        label: group.name,
      })) || [],
    groupsLoading,
    tags:
      tagsData?.tags.map((tag) => ({ value: tag.id, label: tag.name })) || [],
    tagsLoading,
    customGalleries:
      customGalleriesData?.listCustomGalleries.customGalleries.map((tag) => ({
        value: tag.id,
        label: tag.name,
      })) || [],
    customGalleriesLoading,
    ageCheck,
    setAgeCheck,
    idVerified,
    onValuesChange,
    adminRights: role !== Role.User,
  };
};

export default useEditOffender;
