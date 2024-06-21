import type React from 'react';
import { useState } from 'react';
import { useStoreState } from 'state';

import type { TableItem } from '../EvidenceList.view';
import type { ListDemEvidenceExtendedWithoutUserQuery } from '#/views/evidence/grapqhl/queries/list-evidence.generated';
import { useListDemEvidenceExtendedWithoutUserQuery } from '#/views/evidence/grapqhl/queries/list-evidence.generated';

interface Return {
  data: ListDemEvidenceExtendedWithoutUserQuery | undefined;
  loading: boolean;
  selectedData: TableItem | undefined;
  setSelectedData: React.Dispatch<React.SetStateAction<TableItem | undefined>>;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  demIds: { id: string; name: string }[];
  onPaginationChange: (page: number, pageSize: number) => void;
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
    variables: {
      where: selectedId,
      take: pagination.pageSize,
      skip: (pagination.page - 1) * pagination.pageSize,
    },
    fetchPolicy: 'cache-and-network',
  });

  const onPaginationChange = (page: number) => {
    setPagination({
      ...pagination,
      page,
    });
  };

  return {
    data,
    loading: !data?.listDemEvidenceExtendedWithoutUser.demEvidence || loading,
    selectedData,
    setSelectedData,
    demIds,
    setSelectedId,
    onPaginationChange,
  };
};
export default useViewEvidenceList;
