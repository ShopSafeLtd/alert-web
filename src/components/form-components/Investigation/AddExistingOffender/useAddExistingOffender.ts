import type { ListOffendersQuery } from 'graphql/offenders/queries/__generated__/list-offenders.generated';

import publicOffenderDob from '#/utils/public-offender-dob';
import { notification } from 'antd';
import { useUpdateInvestigationMutation } from 'graphql/investigations/mutations/__generated__/update-investigation.generated';
import { useListOffendersQuery } from 'graphql/offenders/queries/__generated__/list-offenders.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router';
import { useStoreActions, useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

interface Props {
  offenderIds: string[] | undefined;
  onClose: () => void;
}

interface Return {
  data: ListOffendersQuery | undefined;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  loading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
  onSubmit: (value: string | undefined) => void;
  openLightbox: (index: number) => void;
  publicOffenderDOB: boolean;
  saving: boolean;
  search: string;
  selectedOffender:
    | Exclude<
        ListOffendersQuery['listOffenders'],
        null | undefined
      >['offenders'][0]
    | null
    | undefined;
  setCurrentId: (value: string | undefined) => void;
  setSearch: (value: string) => void;
}

const useAddExistingOffender = ({ offenderIds, onClose }: Props): Return => {
  const params = useParams();
  const intl = useIntl();
  const publicOffenderDOB = publicOffenderDob();

  const [saving, setSaving] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);

  const [selectedOffender, setSelectedOffender] = useState<
    | Exclude<
        ListOffendersQuery['listOffenders'],
        null | undefined
      >['offenders'][0]
    | null
    | undefined
  >(undefined);
  const schemeId = useStoreState((state) => state.scheme.id);
  const order = useStoreState((state) => state.data.offenders.order);
  const pagination = useStoreState((state) => state.data.offenders.pagination);
  const variables = useStoreState((state) => state.data.offenders.variables);
  const setOffendersState = useStoreActions(
    (actions) => actions.data.setOffenders
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    index: 0,
    open: false,
  });
  const { data, loading } = useListOffendersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        updatedAt: SortOrder.Desc,
      },
      scheme: {
        id: schemeId,
      },
      skip: (pagination.page - 1) * pagination.pageSize,
      take: pagination.pageSize,
      where: {
        OR: [
          {
            name: {
              contains: variables.search,
              mode: QueryMode.Insensitive,
            },
          },
          {
            alias: {
              hasSome: [variables.search],
            },
          },
        ],
        id: {
          notIn: offenderIds,
        },
      },
    },
  });

  const onPaginationChange = (page: number) => {
    setOffendersState({
      order,
      pagination: {
        ...pagination,
        page,
      },
      variables,
    });
  };
  const setSearch = (value: string) => {
    setOffendersState({
      order,
      pagination,
      variables: {
        ...variables,
        search: value,
      },
    });
  };
  const [updateInvestigation] = useUpdateInvestigationMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The offender has been added to the investigation! ',
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
  const onSubmit = () => {
    setSaving(true);
    if (
      data?.listOffenders?.offenders &&
      data.listOffenders.offenders.length > 0 &&
      selectedOffender
    ) {
      void updateInvestigation({
        variables: {
          data: {
            offenderIds: [selectedOffender.id],
          },
          where: {
            id: params.id || '',
          },
        },
      });
    }
    setSaving(false);
    onClose();
  };

  const openLightbox = (index: number) => {
    setLightBoxOpen({ index, open: !lightBoxOpen.open });
  };

  useEffect(() => {
    if (currentId) {
      setSelectedOffender(
        data?.listOffenders?.offenders.find(
          (offender) => offender.id === currentId
        )
      );
    }
  }, [currentId]);
  return {
    data,
    lightBoxOpen,
    loading: data?.listOffenders ? false : loading,
    onPaginationChange,
    onSubmit,
    openLightbox,
    publicOffenderDOB,
    saving,
    search: variables.search,
    selectedOffender,
    setCurrentId,
    setSearch,
  };
};

export default useAddExistingOffender;
