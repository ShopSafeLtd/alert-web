import type React from 'react';

import { useRecycleDemEvidenceMutation } from '#/components/tables/DemEvidenceTable/graphql/__generated__/recycle-dem-evidence.generated';
import errorNotification from '#/types/mutation_notifications/error_notification';
import { notification } from 'antd';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';

import type {
  ListDemEvidenceExtendedWithoutUserQuery,
  ListDemEvidenceExtendedWithoutUserQueryVariables,
} from '../../grapqhl/queries/__generated__/list-evidence.generated';
import type { EvidenceType } from '../EvidenceList.view';

import {
  ListDemEvidenceExtendedWithoutUserDocument,
  useListDemEvidenceExtendedWithoutUserQuery,
} from '../../grapqhl/queries/__generated__/list-evidence.generated';

interface Return {
  data: ListDemEvidenceExtendedWithoutUserQuery | undefined;
  demIds: { id: string; name: string }[];
  loading: boolean;
  onDelete: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  selectedData: EvidenceType | undefined;
  setSelectedData: React.Dispatch<
    React.SetStateAction<EvidenceType | undefined>
  >;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}

const useViewEvidenceList = (): Return => {
  const intl = useIntl();

  const demIds = useStoreState((state) => state.user.dem);
  const [selectedId, setSelectedId] = useState<string>(demIds[0].id);
  const [selectedData, setSelectedData] = useState<EvidenceType | undefined>(
    undefined
  );
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
  });
  const variables = {
    skip: (pagination.page - 1) * pagination.pageSize,
    take: pagination.pageSize,
    where: selectedId,
  };

  const { data, loading } = useListDemEvidenceExtendedWithoutUserQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const onPaginationChange = (page: number) => {
    setPagination({
      ...pagination,
      page,
    });
  };
  const [recycleDemEvidence] = useRecycleDemEvidenceMutation({
    onCompleted: () => {
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The evidence has been Removed from DEM!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Removed!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
  });
  const onDelete = (value: string) => {
    void recycleDemEvidence({
      update: (store, { data: res }) => {
        if (
          res?.recycleDemEvidence === null ||
          res?.recycleDemEvidence === undefined
        )
          return;

        const existingData = store.readQuery<
          ListDemEvidenceExtendedWithoutUserQuery,
          ListDemEvidenceExtendedWithoutUserQueryVariables
        >({
          query: ListDemEvidenceExtendedWithoutUserDocument,
          variables,
        });

        if (!existingData?.listDemEvidenceExtendedWithoutUser.total) return;

        store.writeQuery<
          ListDemEvidenceExtendedWithoutUserQuery,
          ListDemEvidenceExtendedWithoutUserQueryVariables
        >({
          data: {
            listDemEvidenceExtendedWithoutUser: {
              demEvidence:
                existingData?.listDemEvidenceExtendedWithoutUser.demEvidence.filter(
                  (item) => item.id !== value
                ),
              total: existingData?.listDemEvidenceExtendedWithoutUser.total - 1,
            },
          },
          query: ListDemEvidenceExtendedWithoutUserDocument,
          variables,
        });
      },
      variables: {
        id: value || '',
      },
    }).finally(() => {
      setSelectedData(undefined);
      // setSaving(false);
    });
  };

  return {
    data,
    demIds,
    loading: !data?.listDemEvidenceExtendedWithoutUser.demEvidence || loading,
    onDelete,
    onPaginationChange,
    selectedData,
    setSelectedData,
    setSelectedId,
  };
};
export default useViewEvidenceList;
