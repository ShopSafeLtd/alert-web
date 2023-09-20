import { useEffect, useState } from 'react';

import type { ListOffendersQuery } from 'graphql/generated';
import {
  Role,
  QueryMode,
  SortOrder,
  useListOffendersQuery,
  useUpdateInvestigationMutation,
} from 'graphql/generated';
import { useStoreActions, useStoreState } from 'state';
import { notification } from 'antd';
import { useParams } from 'react-router';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';

interface Props {
  onClose: () => void;
  offenderIds: string[] | undefined;
}

interface Return {
  onSubmit: (value: string | undefined) => void;
  saving: boolean;
  data: ListOffendersQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  setCurrentId: (value: string | undefined) => void;
  selectedOffender:
    | Exclude<
        ListOffendersQuery['listOffenders'],
        undefined | null
      >['offenders'][0]
    | null
    | undefined;
  openLightbox: (index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  publicOffenderDOB: boolean;
}

const useAddExistingOffender = ({ onClose, offenderIds }: Props): Return => {
  const params = useParams();
  const intl = useIntl();
  const role = useStoreState((state) => state.user.role);
  const publicOffenderDOB =
    useStoreState((state) => state.scheme.defaultPublicOffenderDOB) ||
    role !== Role.User;

  const [saving, setSaving] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);

  const [selectedOffender, setSelectedOffender] = useState<
    | Exclude<
        ListOffendersQuery['listOffenders'],
        undefined | null
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
    open: false,
    index: 0,
  });
  const { data, loading } = useListOffendersQuery({
    variables: {
      scheme: {
        id: schemeId,
      },
      order: {
        updatedAt: SortOrder.Desc,
      },
      take: pagination.pageSize,
      skip: (pagination.page - 1) * pagination.pageSize,
      where: {
        id: {
          notIn: offenderIds,
        },
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
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const onPaginationChange = (page: number) => {
    setOffendersState({
      pagination: {
        ...pagination,
        page,
      },
      variables,
      order,
    });
  };
  const setSearch = (value: string) => {
    setOffendersState({
      pagination,
      variables: {
        ...variables,
        search: value,
      },
      order,
    });
  };
  const [updateInvestigation] = useUpdateInvestigationMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
          id: 'w5Yfkf',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The offender has been added to the investigation! ',
          id: 'ioLnSH',
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
          where: {
            id: params.id || '',
          },
          data: {
            offenderIds: [selectedOffender.id],
          },
        },
      });
    }
    setSaving(false);
    onClose();
  };

  const openLightbox = (index: number) => {
    setLightBoxOpen({ open: !lightBoxOpen.open, index });
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
    onSubmit,
    saving,
    data,
    loading: data?.listOffenders ? false : loading,
    search: variables.search,
    setSearch,
    onPaginationChange,
    setCurrentId,
    openLightbox,
    lightBoxOpen,
    selectedOffender,
    publicOffenderDOB,
  };
};

export default useAddExistingOffender;
