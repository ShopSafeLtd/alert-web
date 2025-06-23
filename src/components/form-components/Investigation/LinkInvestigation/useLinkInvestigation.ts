import type { InvestigationData } from '#/types/DataType';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useStoreState } from 'state';

import type {
  LinkInvestigationsQuery,
  LinkInvestigationsQueryVariables,
} from './graphql/__generated__/list-investigations-link.generated';

import { useLinkInvestigationsQuery } from './graphql/__generated__/list-investigations-link.generated';

interface Props {
  investigationIds?: string[];
  onClose: () => void;
  update: (value: InvestigationData) => void;
}

interface Return {
  data:
    | Exclude<LinkInvestigationsQuery['investigationRelay'], null | undefined>
    | null
    | undefined;
  loading: boolean;
  onPaginationChange: (pageValue: number, sizeValue: number) => void;
  onSelect: (item: { key: string }) => void;
  onSubmit: () => void;
  saving: boolean;
}

const useLinkInvestigation = ({
  investigationIds,
  onClose,
  update,
}: Props): Return => {
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<string | undefined>();
  const schemeId = useAtomValue(currentSchemeIdAtom);

  const groupsFilter = useStoreState(
    (state) => state.data.investigations.variables.groups
  );
  const statusFilter = useStoreState(
    (state) => state.data.investigations.variables.status
  );
  const search = useStoreState(
    (state) => state.data.investigations.variables.search
  );

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const variables: LinkInvestigationsQueryVariables = {
    orderBy: {
      createdAt: SortOrder.Desc,
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      groupIds: groupsFilter,
      id: { notIn: investigationIds },
      schemeIds: [schemeId],
      search,
      status: statusFilter,
    },
  };
  const { data, loading } = useLinkInvestigationsQuery({
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const onSubmit = () => {
    setSaving(true);
    const selectedData = data?.investigationRelay?.edges.find(
      ({ node: { id } }) => id === selected
    )?.node;

    if (selectedData) {
      update(selectedData);
    }
    setSaving(false);
    onClose();
  };

  const onSelect = (item: { key: string }) => {
    setSelected(item.key);
  };
  const onPaginationChange = (pageValue: number, sizeValue: number) => {
    setPage(pageValue);
    setPageSize(sizeValue);
  };

  return {
    data: data?.investigationRelay,
    loading,
    onPaginationChange,
    onSelect,
    onSubmit,
    saving,
  };
};

export default useLinkInvestigation;
