import { useState } from 'react';
import type {
  Age,
  Build,
  Gender,
  Height,
  IdSource,
  Race,
  EditOffenderQuery,
} from 'graphql/generated';
import {
  useBusinessOffenderSettingsQuery,
  useEditOffenderQuery,
  useListCustomGalleriesQuery,
  Model,
  Role,
  useSchemeGroupsQuery,
  useTagsQuery,
  useUpdateOffenderMutation,
} from 'graphql/generated';
import { notification, Form } from 'antd';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import type { OffenderSettingsType } from '#/types/DataType';

interface Props {
  onClose: () => void;
  offenderId: string;
}
export interface FormData {
  name: string;
  alias?: string[];
  ageCheck: boolean;
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
  infoSource: string;
  knownFor: string[];
  targetedGoods: string[];
  justification: string;
}

interface Return {
  onSubmit: (value: FormData) => void;
  data: EditOffenderQuery | undefined;
  loading: boolean;
  saving: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  tags: { value: string; label: string }[];
  tagsLoading: boolean;
  customGalleries: { value: string; label: string }[];
  customGalleriesLoading: boolean;
  ageCheck: boolean | undefined;
  idVerified: boolean | undefined;
  adminRights: boolean;
  needJustification: boolean;
  offenderSettings: OffenderSettingsType | undefined;
}

const useEditOffender = ({ offenderId, onClose }: Props): Return => {
  const intl = useIntl();
  const [form] = Form.useForm<FormData>();
  const ageCheck = Form.useWatch('ageCheck', form);
  const idVerified = Form.useWatch('idVerified', form);
  const { needJustification, id: schemeId } = useStoreState(
    (state) => state.scheme
  );
  const {
    id: userId,
    groups: userGroups,
    role,
  } = useStoreState((state) => state.user);

  const businessId = useStoreState((state) => state.user.businesses[0].id);

  const [saving, setSaving] = useState(false);

  const { data: offenderData, loading } = useEditOffenderQuery({
    variables: {
      where: {
        id: offenderId,
      },
    },
  });
  const { data: businessData, loading: businessLoading } =
    useBusinessOffenderSettingsQuery({
      fetchPolicy: 'network-only',
      variables: {
        where: {
          id: businessId,
        },
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
          name:
            data.name === offenderData?.offender?.name
              ? undefined
              : { set: data.name },
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
          dateOfBirth: { set: ageCheck ? data.dateOfBirth || null : null },
          idSource: data.idSource ? { set: data.idSource } : undefined,
          idVerified: data.idVerified ? { set: data.idVerified } : undefined,
          groups: {
            set:
              userGroups.length > 1
                ? data.groups.map((id) => ({ id }))
                : userGroups.map(({ id }) => ({ id })),
          },
          tags: {
            set: data.tags.map((id) => ({ id })) || undefined,
          },
          customGalleries: {
            set: data.customGalleries.map((id) => ({ id })) || undefined,
          },
          scheme: { connect: { id: schemeId } },
          infoSource: { set: data.infoSource || '' },
          knownFor: { set: data.knownFor },
          targetedGoods: { set: data.targetedGoods },
          alias: { set: data.alias },
          justification: { set: data.justification || '' },
        },
      },
    });
  };

  return {
    onSubmit,
    data: offenderData,
    loading: loading || businessLoading,
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
    idVerified,
    adminRights: role !== Role.User,
    needJustification,
    offenderSettings: businessData?.business.offenderSettings,
  };
};

export default useEditOffender;
