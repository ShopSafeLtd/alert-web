import type React from 'react';

import { useState } from 'react';
import { useStoreState } from 'state';

import type { ListDemEvidenceExtendedWithoutUserQuery } from '../../grapqhl/queries/__generated__/list-evidence.generated';
import type { TableItem } from '../EvidenceList.view';

import { useListDemEvidenceExtendedWithoutUserQuery } from '../../grapqhl/queries/__generated__/list-evidence.generated';

interface Return {
  data: ListDemEvidenceExtendedWithoutUserQuery | undefined;
  demIds: { id: string; name: string }[];
  loading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
  selectedData: TableItem | undefined;
  setSelectedData: React.Dispatch<React.SetStateAction<TableItem | undefined>>;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}

const useViewEvidenceList = (): Return => {
  const demIds = useStoreState((state) => state.user.dem);
  const [selectedId, setSelectedId] = useState<string>(demIds[0].id);
  const [selectedData, setSelectedData] = useState<TableItem | undefined>(
    undefined
  );
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
  });

  const { data, loading } = useListDemEvidenceExtendedWithoutUserQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      skip: (pagination.page - 1) * pagination.pageSize,
      take: pagination.pageSize,
      where: selectedId,
    },
  });

  const onPaginationChange = (page: number) => {
    setPagination({
      ...pagination,
      page,
    });
  };

  return {
    data,
    demIds,
    loading: !data?.listDemEvidenceExtendedWithoutUser.demEvidence || loading,
    onPaginationChange,
    selectedData,
    setSelectedData,
    setSelectedId,
  };
};
export default useViewEvidenceList;
