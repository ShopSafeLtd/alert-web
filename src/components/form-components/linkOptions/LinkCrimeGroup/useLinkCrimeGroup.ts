import { useState } from 'react';

import type { ListCrimeGroupsQuery } from 'graphql/generated';
import {
  QueryMode,
  SortOrder,
  useListCrimeGroupsQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';
import type { CrimeGroupData } from 'types/DataType';

// interface CrimeGroup {
//   crimeGroup: CrimeGroupData;
// }
interface Props {
  onClose: () => void;
  update?: (value: CrimeGroupData) => void;
  crimeGroupIds: string[] | undefined;
  takeAllSchemes?: boolean;
  getCrimeGroup?: (value: { crimeGroup: CrimeGroupData }) => void;
}

interface Return {
  onSubmit: () => void;
  saving: boolean;
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  onSelect: (item: { key: string }) => void;
}

const useLinkCrimeGroup = ({
  onClose,
  update,
  crimeGroupIds,
  getCrimeGroup,
  takeAllSchemes,
}: Props): Return => {
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<string | undefined>();
  const schemeId = useStoreState((state) => state.scheme.id);
  const userSchemeIds = useStoreState((state) => state.user.schemes).map(
    (el) => el.scheme.id
  );
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 24,
  });
  const [search, setSearch] = useState('');
  const { data, loading } = useListCrimeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      order: {
        updatedAt: SortOrder.Desc,
      },
      take: pagination.pageSize,
      skip: (pagination.page - 1) * pagination.pageSize,
      where: {
        id: { notIn: crimeGroupIds },
        schemes: {
          some: {
            id: {
              in: takeAllSchemes ? userSchemeIds : [schemeId],
            },
          },
        },

        OR: [
          {
            alias: {
              contains: search,
              mode: QueryMode.Insensitive,
            },
          },
          {
            offenders: {
              some: {
                OR: [
                  {
                    name: {
                      contains: search,
                      mode: QueryMode.Insensitive,
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  });

  const onSubmit = () => {
    setSaving(true);
    const selectedData = data?.listCrimeGroups?.crimeGroups.find(
      ({ id }) => id === selected
    );
    if (selectedData) {
      if (update) {
        update({
          id: selectedData.id,
          reference: selectedData.reference,
          alias: selectedData.alias,
          totalOffenders: selectedData.totalOffenders || 0,
        });
      }
      if (getCrimeGroup) {
        const crimeGroup = data?.listCrimeGroups?.crimeGroups?.find(
          (item) => item.id === selected
        );
        if (crimeGroup) {
          getCrimeGroup({ crimeGroup });
        }
      }
    }
    setSaving(false);
    onClose();
  };

  const onSelect = (item: { key: string }) => {
    setSelected(item.key);
  };
  const onPaginationChange = (page: number) => {
    setPagination({
      ...pagination,
      page,
    });
  };
  return {
    onSubmit,
    saving,
    data,
    loading: data?.listCrimeGroups ? false : loading,
    search,
    setSearch,
    onPaginationChange,
    onSelect,
  };
};

export default useLinkCrimeGroup;
