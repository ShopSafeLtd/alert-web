import { useState } from 'react';

import type { Age, Build, Gender, Height, IdSource, Race } from 'graphql/types';
import { Model, Role } from 'graphql/types';
import { notification } from 'antd';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import type { OffenderSettingsType } from '#/types/DataType';
import { useGroupsContext } from '#/context/groups-context';
import type { EditOffenderQuery } from '#/components/form-components/offender/EditOffenderFeed/graphql/query/edit-offender.generated';
import { useEditOffenderQuery } from '#/components/form-components/offender/EditOffenderFeed/graphql/query/edit-offender.generated';
import { useListCustomGalleriesQuery } from 'graphql/customGallery/queries/list_custom_galleries.generated';
import { useTagsQuery } from 'graphql/tags/queries/tags.generated';
import { useUpdateOffenderMutation } from 'graphql/offenders/mutations/update-offender.generated';
import { useBusinessOffenderSettingsQuery } from 'graphql/businesses/queries/business-offender-settings.generated';

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
  adminRights: boolean;
  needJustification: boolean;
  offenderSettings: OffenderSettingsType | undefined;
}

const useEditOffender = ({ offenderId, onClose }: Props): Return => {
  const intl = useIntl();
  const { needJustification, id: schemeId } = useStoreState(
    (state) => state.scheme
  );
  const { role } = useStoreState((state) => state.user);

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
  const { groups, groupsLoading } = useGroupsContext();

  const { data: customGalleriesData, loading: customGalleriesLoading } =
    useListCustomGalleriesQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        take: 100,
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
        }),
        description: intl.formatMessage({
          defaultMessage: 'The offender has been updated!',
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
              }),
          },
          comment: { set: data.comment || '' },
          peculiarities: { set: data.peculiarities || '' },
          age: { set: data.age ? null : data.age || null },
          dateSource: { set: data.dateSource ? data.dateSource || null : null },
          dateOfBirth: {
            set: data.dateOfBirth ? data.dateOfBirth || null : null,
          },
          idSource: data.idSource ? { set: data.idSource } : undefined,
          idVerified: data.idVerified ? { set: data.idVerified } : undefined,
          groups: {
            set:
              groups.length > 1
                ? data.groups.map((id) => ({ id }))
                : groups.map(({ value: id }) => ({ id })),
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
    groups,
    groupsLoading,
    tags:
      tagsData?.tags.map((tag) => ({ value: tag.id, label: tag.name })) || [],
    tagsLoading,
    customGalleries:
      customGalleriesData?.customGalleriesRelay?.edges?.map(
        ({ node: tag }) => ({
          value: tag.id,
          label: tag.name,
        })
      ) || [],
    customGalleriesLoading,
    adminRights: role !== Role.User,
    needJustification,
    offenderSettings: businessData?.business.offenderSettings,
  };
};

export default useEditOffender;
