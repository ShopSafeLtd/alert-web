import type { ListCrimeGroupsQuery } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';
import type { CrimeGroupData } from 'types/DataType';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useListCrimeGroupsQuery } from 'graphql/crime-groups/queries/__generated__/list-crime-groups.generated';
import { QueryMode, SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useStoreState } from 'state';

// interface CrimeGroup {
//   crimeGroup: CrimeGroupData;
// }
interface Props {
  crimeGroupIds: string[] | undefined;
  getCrimeGroup?: (value: { crimeGroup: CrimeGroupData }) => void;
  onClose: () => void;
  takeAllSchemes?: boolean;
  update?: (value: CrimeGroupData) => void;
}

interface Return {
  data: ListCrimeGroupsQuery | undefined;
  loading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
  onSelect: (item: { key: string }) => void;
  onSubmit: () => void;
  saving: boolean;
  search: string;
  setSearch: (value: string) => void;
}

const useLinkCrimeGroup = ({
  crimeGroupIds,
  getCrimeGroup,
  onClose,
  takeAllSchemes,
  update,
}: Props): Return => {
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<string | undefined>();
  const schemeId = useAtomValue(currentSchemeIdAtom);
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
      skip: (pagination.page - 1) * pagination.pageSize,
      take: pagination.pageSize,
      where: {
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
        id: { notIn: crimeGroupIds },

        schemes: {
          some: {
            id: {
              in: takeAllSchemes ? userSchemeIds : [schemeId],
            },
          },
        },
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
          alias: selectedData.alias,
          id: selectedData.id,
          reference: selectedData.reference,
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
    data,
    loading: data?.listCrimeGroups ? false : loading,
    onPaginationChange,
    onSelect,
    onSubmit,
    saving,
    search,
    setSearch,
  };
};

export default useLinkCrimeGroup;
