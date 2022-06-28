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
  addChatGroup: boolean;
  toggleAddChatGroup: () => void;
}

const useChatList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [addChatGroup, setAddChatGroup] = useState(false);
  const [search, setSearch] = useState("");

  const { data, loading } = useSchemeChatsQuery({
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
  const toggleAddChatGroup = () => {
    setAddChatGroup(!addChatGroup);
  };
  return {
    data,
    loading,
    search,
    setSearch,
    addChatGroup,
    toggleAddChatGroup,
  };
};

export default useChatList;
