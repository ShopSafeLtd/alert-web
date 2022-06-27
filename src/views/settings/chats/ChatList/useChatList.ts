import { useState } from "react";
import {
  QueryMode,
  useSchemeChatsQuery,
  SchemeChatsQuery,
} from "graphql/generated";
import { useStoreState } from "state";

interface Return {
  data: SchemeChatsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
}

const useChatList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);

  const [search, setSearch] = useState("");

  const { data, loading } = useSchemeChatsQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      where: {
        scheme: { id: { equals: schemeId } },
        // schemes: {
        //   some: {
        //     scheme: {
        //       id: {
        //         equals: schemeId,
        //       },
        //     },
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

export default useChatList;
