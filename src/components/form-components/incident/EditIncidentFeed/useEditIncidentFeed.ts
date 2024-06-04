import { useState } from 'react';
import { useStoreState } from 'state';
import { useApolloClient } from '@apollo/client';
import type {
  EditIncidentFeedQuery,
  IncidentPriority,
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
} from 'graphql/generated';
import {
  Model,
  QueryMode,
  SearchBusinessesDocument,
  TagType,
  useEditIncidentFeedQuery,
  useTagsQuery,
  useUpdateIncidentMutation,
  useUpdateIncidentBusinessMutation,
} from 'graphql/generated';
import { notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import { useGroupsContext } from '#/context/groups-context';

export interface FormData {
  subject: string;
  description: string;
  customerRef: string;
  date: Date;
  value?: number;
  recoveredValue?: number;
  policeReported?: boolean;
  policeInvolved?: boolean;
  policeRef?: string;
  policeNo?: string;
  priority: IncidentPriority;
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
  const [saving, setSaving] = useState(false);

  const { data: incidentData, loading } = useEditIncidentFeedQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: incidentId,
      },
    },
  });
  const { groups, groupsLoading } = useGroupsContext();
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
      // eslint-disable-next-line no-confusing-arrow
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
  const [updateIncidentBusiness] = useUpdateIncidentBusinessMutation();
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
    if (incidentId) {
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
            customerRef: data.customerRef
              ? { set: data.customerRef }
              : undefined,
            priority: { set: data.priority },
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
            policeInvolved: { set: data.policeInvolved || false },
            policeRef: { set: data.policeRef || '' },
            policeNo: { set: data.policeNo || '' },
            policeReported: { set: data.policeReported || false },
          },
        },
      });
    }
    if (
      incidentData?.incident.business &&
      incidentData?.incident.business.id !== data.business?.value
    ) {
      void updateIncidentBusiness({
        variables: {
          data: {
            business: {
              connect: data.business?.value
                ? {
                    id: data.business.value,
                  }
                : undefined,
              // ???
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              disconnect:
                incidentData?.incident?.business?.id &&
                data.business?.value === undefined
                  ? {
                      id: data.business?.value,
                    }
                  : undefined,
            },
          },
          where: {
            id: incidentId,
          },
        },
      });
    }
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
    groups,
    groupsLoading,
    saving,
    onSearchBusiness,
  };
};

export default useEditIncidentFeed;
