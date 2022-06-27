import { useState } from "react";
import {
  useListSchemeUsersQuery,
  ListSchemeUsersQuery,
  QueryMode,
  useSchemeGroupsQuery,
  SchemeGroupsQuery,
} from "graphql/generated";
import { useStoreState } from "state";

interface Return {
  data: ListSchemeUsersQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  groupsData: SchemeGroupsQuery | undefined;
  groupsLoading: boolean;
  selectedGroups: string[];
  setSelectedGroups: (value: string[]) => void;
}

const useUserList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);

  const [search, setSearch] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const { data, loading } = useListSchemeUsersQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      where: {
        schemes: {
          some: {
            scheme: {
              id: {
                equals: schemeId,
              },
            },
            recycled: {
              equals: false,
            },
          },
        },
        recycled: {
          equals: false,
        },
        groups:
          selectedGroups.length > 0
            ? {
                some: {
                  id: {
                    in: selectedGroups,
                  },
                },
              }
            : undefined,
        OR: [
          {
            fullName: {
              contains: search,
              mode: QueryMode.Insensitive,
            },
          },
          {
            email: {
              contains: search,
              mode: QueryMode.Insensitive,
            },
          },
          {
            organisation: {
              contains: search,
              mode: QueryMode.Insensitive,
            },
          },
        ],
      },
      groupWhere: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
    },
  });

  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
    },
  });

  return {
    data,
    loading,
    search,
    setSearch,
    groupsData,
    groupsLoading,
    selectedGroups,
    setSelectedGroups,
  };
};

export default useUserList;
