import { useState } from "react";
import {
  QueryMode,
  useSchemeGroupsQuery,
  SchemeGroupsQuery,
} from "graphql/generated";
import { useStoreState } from "state";

interface Return {
  data: SchemeGroupsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addGroup: boolean;
  toggleAddGroup: () => void;
}

const useGroupList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [addGroup, setAddGroup] = useState(false);
  const [search, setSearch] = useState("");

  const { data, loading } = useSchemeGroupsQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      where: {
        scheme: { id: { equals: schemeId } },
        OR: [
          {
            name: {
              contains: search,
              mode: QueryMode.Insensitive,
            },
          },
          {
            description: {
              contains: search,
              mode: QueryMode.Insensitive,
            },
          },
        ],
      },
    },
  });
  const toggleAddGroup = () => {
    setAddGroup(!addGroup);
  };
  return {
    data,
    loading,
    search,
    setSearch,
    addGroup,
    toggleAddGroup,
  };
};

export default useGroupList;
