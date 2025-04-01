import type { LabeledValue } from 'antd/lib/select';
import type {
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
} from 'graphql/businesses/queries/__generated__/search-businesses.generated';
import type { EditIncidentFeedQuery } from 'graphql/incidents/queries/__generated__/edit-incident-feed.generated';
import type { IncidentPriority } from 'graphql/types';

import { businessSelectValueFormatter } from '#/components/form-components/BusinessesSelect/BusinessesSelect.view';
import { useGroupsContext } from '#/context/groups-context';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useApolloClient } from '@apollo/client';
import { notification } from 'antd';
import { SearchBusinessesDocument } from 'graphql/businesses/queries/__generated__/search-businesses.generated';
import { useUpdateIncidentMutation } from 'graphql/incidents/mutations/__generated__/update-incident.generated';
import { useUpdateIncidentBusinessMutation } from 'graphql/incidents/mutations/update/__generated__/update-incident-business.generated';
import { useEditIncidentFeedQuery } from 'graphql/incidents/queries/__generated__/edit-incident-feed.generated';
import { useTagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import { Model, QueryMode, TagType } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

export interface FormData {
  business?: LabeledValue | string | string[];
  customerRef: string;
  date: Date;
  description: string;
  goods: {
    goodsType?: string;
    id: string;
    recoveredValue: number;
    value?: number;
  }[];
  groups: string[];
  policeInvolved?: boolean;
  policeNo?: string;
  policeRef?: string;
  policeReported?: boolean;
  priority: IncidentPriority;
  recoveredValue?: number;
  subject: string;
  tagsCrimeTypes: string[];
  tagsImpact: string[];
  tagsInvolved: string[];
  value?: number;
}

interface Props {
  incidentId: string;
  onClose: () => void;
}

interface Return {
  crimeTypes: { label: string; value: string }[];
  data:
    | Exclude<EditIncidentFeedQuery['incident'], null | undefined>
    | null
    | undefined;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  impactTags: { label: string; value: string }[];
  involvedTags: { label: string; value: string }[];
  loading: boolean;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: React.ReactNode; value: string }[]>;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  tagsLoading: boolean;
}

const useEditIncidentFeed = ({ incidentId, onClose }: Props): Return => {
  const intl = useIntl();
  const client = useApolloClient();
  const schemeId = useAtomValue(currentSchemeIdAtom);
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
        dataType: {
          equals: Model.Incident,
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
              location: item?.locations[0].full || '',
              value: item?.id || '',
            }))
          : [
              {
                disabled: true,
                label: intl.formatMessage({
                  defaultMessage: 'No results found',
                }),
                value: '',
              },
            ]
      );
  const [updateIncidentBusiness] = useUpdateIncidentBusinessMutation();
  const [updateIncident] = useUpdateIncidentMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The Incident has been updated!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
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
          data: {
            approved: { set: true },
            crimeTypes: {
              set: [
                ...data.tagsCrimeTypes.map((id) => ({ id })),
                ...data.tagsImpact.map((id) => ({ id })),
                ...data.tagsInvolved.map((id) => ({ id })),
              ],
            },
            customerRef: data.customerRef
              ? { set: data.customerRef }
              : undefined,
            date: { set: data.date },
            description: { set: data.description },
            groups: {
              set: data.groups.map((id) => ({ id })),
            },
            policeInvolved: { set: data.policeInvolved || false },
            policeNo: { set: data.policeNo || '' },
            policeRef: { set: data.policeRef || '' },
            policeReported: { set: data.policeReported || false },
            priority: { set: data.priority },
            subject: { set: data.subject },
            time: { set: data.date },
          },
          where: {
            id: incidentId,
          },
        },
      });
    }

    const businessId = data.business
      ? businessSelectValueFormatter(data.business || '', '')
      : undefined;

    const shouldUpdate =
      (businessId !== incidentData?.incident.business?.id && businessId) ||
      (incidentData?.incident.business?.id && !businessId);
    if (shouldUpdate) {
      void updateIncidentBusiness({
        variables: {
          data: {
            business: {
              connect: businessId
                ? {
                    id: businessId,
                  }
                : undefined,
              disconnect: true,
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
    crimeTypes:
      tagsData?.tags
        .filter((item) => item.type === TagType.IncidentCrimeType)
        .map((tag) => ({ label: tag.name, value: tag.id })) || [],
    data: incidentData?.incident,
    groups,
    groupsLoading,
    impactTags:
      tagsData?.tags
        .filter((item) => item.type === TagType.IncidentImpact)
        .map((tag) => ({ label: tag.name, value: tag.id })) || [],
    involvedTags:
      tagsData?.tags
        .filter((item) => item.type === TagType.IncidentInvolved)
        .map((tag) => ({ label: tag.name, value: tag.id })) || [],
    loading,
    onSearchBusiness,
    onSubmit,
    saving,
    tagsLoading,
  };
};

export default useEditIncidentFeed;
