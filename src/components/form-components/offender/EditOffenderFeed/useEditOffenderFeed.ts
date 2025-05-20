import type { EditOffenderQuery } from '#/components/form-components/offender/EditOffenderFeed/graphql/query/__generated__/edit-offender.generated';
import type { OffenderSettingsType } from '#/types/DataType';
import type { Age, Build, Gender, Height, IdSource, Race } from 'graphql/types';

import { useUpdateOffenderDetailsMutation } from '#/components/form-components/offender/EditOffenderFeed/graphql/mutation/__generated__/update-offender-details.generated';
import { useEditOffenderQuery } from '#/components/form-components/offender/EditOffenderFeed/graphql/query/__generated__/edit-offender.generated';
import { useGroupsContext } from '#/context/groups-context';
import {
  currentSchemeAtom,
  currentSchemeBusinessesAtom,
  currentSchemeIdAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { notification } from 'antd';
import { useBusinessOffenderSettingsQuery } from 'graphql/businesses/queries/__generated__/business-offender-settings.generated';
import { useListCustomGalleriesQuery } from 'graphql/customGallery/queries/__generated__/list_custom_galleries.generated';
import { useTagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import { Model } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

interface Props {
  offenderId: string;
  onClose: () => void;
}
export interface FormData {
  age: Age;
  ageCheck: boolean;
  alias?: string[];
  build: Build;
  comment: string;
  customGalleries: string[];
  dateOfBirth?: Date;
  dateSource?: string;
  gender: Gender;
  groups: string[];
  hair: string;
  height: Height;
  idSource?: IdSource;
  idVerified?: boolean;
  infoSource: string;
  justification: string;
  knownFor: string[];
  name: string;
  peculiarities: string;
  race: Race;
  tags: string[];
  targetedGoods: string[];
}

interface Return {
  customGalleries: { label: string; value: string }[];
  customGalleriesLoading: boolean;
  data: EditOffenderQuery | undefined;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  loading: boolean;
  needJustification: boolean;
  offenderSettings: OffenderSettingsType | undefined;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  tags: { label: string; value: string }[];
  tagsLoading: boolean;
}

const useEditOffender = ({ offenderId, onClose }: Props): Return => {
  const intl = useIntl();
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const needJustification = useAtomValue(currentSchemeAtom)?.needJustification;
  const businessId = useAtomValue(currentSchemeBusinessesAtom)?.at(0)?.id;

  const [saving, setSaving] = useState(false);

  const { data: offenderData, loading } = useEditOffenderQuery({
    // TODO remove and update cache - tmp fix for quick fix
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: offenderId,
      },
    },
  });
  const { data: businessData, loading: businessLoading } =
    useBusinessOffenderSettingsQuery({
      fetchPolicy: 'network-only',
      skip: !businessId,
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
        dataType: {
          equals: Model.Offender,
        },
        schemes: {
          some: {
            id: {
              in: [schemeId],
            },
          },
        },
      },
    },
  });

  const [updateOffender] = useUpdateOffenderDetailsMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The offender has been updated!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated',
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
        data: {
          age: data.age,
          alias: data.alias,
          build: data.build,
          comment: data.comment,
          customGalleryIds: data.customGalleries,
          dateOfBirth: data.dateOfBirth,
          dateSource: data.dateSource,
          gender: data.gender,
          groupIds:
            groups.length > 1 ? data.groups : groups.map(({ value: id }) => id),
          hair:
            data.hair ??
            intl.formatMessage({
              defaultMessage: 'Unknown',
            }),
          height: data.height,
          idSource: data.idSource,
          idVerified: data.idVerified,
          infoSource: data.infoSource,
          justification: data.justification,
          name: data.name,
          peculiarities: data.peculiarities,
          race: data.race,
          tagIds: data.tags,
        },
        where: offenderId,
      },
    });
  };

  return {
    customGalleries:
      customGalleriesData?.customGalleriesRelay?.edges?.map(
        ({ node: tag }) => ({
          label: tag.name,
          value: tag.id,
        })
      ) || [],
    customGalleriesLoading,
    data: offenderData,
    groups,
    groupsLoading,
    loading: loading || businessLoading,
    needJustification,
    offenderSettings: businessData?.business.offenderSettings ?? {
      age: true,
      alias: true,
      build: true,
      comment: true,
      dateOfBirth: true,
      dateOfBirthSource: true,
      ethnicity: true,
      gender: true,
      hair: true,
      height: true,
      idVerified: true,
      images: true,
      name: true,
      peculiarities: true,
    },
    onSubmit,
    saving,
    tags:
      tagsData?.tags.map((tag) => ({ label: tag.name, value: tag.id })) || [],
    tagsLoading,
  };
};

export default useEditOffender;
