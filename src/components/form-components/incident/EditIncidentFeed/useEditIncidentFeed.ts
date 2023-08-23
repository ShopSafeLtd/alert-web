import { useState } from 'react';
import { useStoreState } from 'state';
import { useApolloClient } from '@apollo/client';
import type {
  EditIncidentFeedQuery,
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
} from 'graphql/generated';
import {
  QueryMode,
  SearchBusinessesDocument,
  TagType,
  Model,
  useSchemeGroupsQuery,
  useTagsQuery,
  useUpdateIncidentMutation,
  useEditIncidentFeedQuery,
  Role,
} from 'graphql/generated';
import { notification } from 'antd';
import errorNotification from 'types/error_notification';
import { useIntl } from 'react-intl';

export interface FormData {
  subject: string;
  description: string;
  date: Date;
  value?: number;
  recoveredValue?: number;
  policeReported?: boolean;
  policeInvolved?: boolean;
  policeRef?: string;
  policeNo?: string;
  goods: {
    id: string;
    goodsType?: string;
    value?: number;
    recoveredValue: number;
  }[];
  business?: {
    label: React.ReactNode;
    value: string;
  };
  groups: string[];
  tagsCrimeTypes: string[];
  tagsInvolved: string[];
  tagsImpact: string[];
  building: string;
  street: string;
  townCity: string;
  county: string;
  postcode: string;
}
interface Props {
  onClose: () => void;
  incidentId: string;
}
interface Return {
  onSubmit: (value: FormData) => void;
  data:
    | Exclude<EditIncidentFeedQuery['incident'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  saving: boolean;
  crimeTypes: { value: string; label: string }[];
  involvedTags: { value: string; label: string }[];
  impactTags: { value: string; label: string }[];
  tagsLoading: boolean;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
}

const useEditIncidentFeed = ({ onClose, incidentId }: Props): Return => {
  const intl = useIntl();
  const client = useApolloClient();
  const schemeId = useStoreState((state) => state.scheme.id);
  const userId = useStoreState((state) => state.user.id);
  const role = useStoreState((state) => state.user.role);
  const [saving, setSaving] = useState(false);

  const { data: incidentData, loading } = useEditIncidentFeedQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: incidentId,
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
    skip: role !== Role.SchemeAdmin,
  });

  const { data: tagsData, loading: tagsLoading } = useTagsQuery({
    fetchPolicy: 'cache-and-network',
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
          equals: Model.Incident,
        },
      },
    },
  });
  const onSearchBusiness = async (value: string) =>
    // if (value.length < 2) {
    //   return [];
    // }
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
                  equals: schemeId,
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
                  id: 'hX5PAb',
                  defaultMessage: 'No results found',
                }),
                value: '',
                disabled: true,
              },
            ]
      );
  const [updateIncident] = useUpdateIncidentMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
          id: 'w5Yfkf',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The Incident has been updated!',
          id: 'OkjwIC',
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
    if (incidentId)
      void updateIncident({
        variables: {
          where: {
            id: incidentId,
          },
          data: {
            approved: { set: true },
            subject: { set: data.subject },
            description: { set: data.description },
            date: { set: data.date },
            time: { set: data.date },
            groups: {
              set: data.groups.map((id) => ({ id })),
            },
            crimeTypes: {
              set: [
                ...data.tagsCrimeTypes.map((id) => ({ id })),
                ...data.tagsImpact.map((id) => ({ id })),
                ...data.tagsInvolved.map((id) => ({ id })),
              ],
            },
            business: {
              connect: data.business?.value
                ? {
                    id: data.business.value,
                  }
                : undefined,
              disconnect:
                incidentData?.incident?.business?.id &&
                data.business?.value === undefined
                  ? true
                  : undefined,
            },
            location: {
              // ???
              upsert: {
                update: {
                  premises: { set: '' },
                  building: { set: data.building || '' },
                  street: { set: data.street || '' },
                  townCity: { set: data.townCity || '' },
                  county: { set: data.county || '' },
                  postcode: { set: data.postcode || '' },
                },
                create: {
                  premises: '',
                  building: data.building || '',
                  street: data.street || '',
                  townCity: data.townCity || '',
                  county: data.county || '',
                  postcode: data.postcode || '',
                },
              },
            },
          },
        },
      });
  };

  return {
    onSubmit,
    data: incidentData?.incident,
    loading,
    crimeTypes:
      tagsData?.tags
        .filter((item) => item.type === TagType.IncidentCrimeType)
        .map((tag) => ({ value: tag.id, label: tag.name })) || [],
    impactTags:
      tagsData?.tags
        .filter((item) => item.type === TagType.IncidentImpact)
        .map((tag) => ({ value: tag.id, label: tag.name })) || [],
    involvedTags:
      tagsData?.tags
        .filter((item) => item.type === TagType.IncidentInvolved)
        .map((tag) => ({ value: tag.id, label: tag.name })) || [],
    tagsLoading,
    groups:
      groupData?.groups.map((group) => ({
        value: group.id,
        label: group.name,
      })) || [],
    groupsLoading,
    saving,
    onSearchBusiness,
  };
};

export default useEditIncidentFeed;
