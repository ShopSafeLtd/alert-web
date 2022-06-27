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
}

const useGroupList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);

  const [search, setSearch] = useState("");

  const { data, loading } = useSchemeGroupsQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      where: {
        scheme: { id: { equals: schemeId } },
        // schemes: {
        //   // some: {
        //     scheme: {
        //       id: {
        //         equals: schemeId,
        //       },
        //     // },
        //     recycled: {
        //       equals: false,
        //     },
        //   },
        // },
        // recycled: {
        //   equals: false,
        // },
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

  return {
    data,
    loading,
    search,
    setSearch,
  };
};

export default useGroupList;
