import { useState } from 'react';
import {
  QueryMode,
  useSchemeChatsQuery,
  SchemeChatsQuery,
  SchemeChatsDocument,
  CreateChatMutation,
} from 'graphql/generated';
import { useStoreState } from 'state';
import { MutationUpdaterFn } from '@apollo/client';

interface Return {
  data: SchemeChatsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addChat: boolean;
  toggleAddChat: () => void;
  updateChatList: MutationUpdaterFn<CreateChatMutation>;
}

const useChatList = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [addChat, setAddChat] = useState(false);
  const [search, setSearch] = useState('');

  const { data, loading } = useSchemeChatsQuery({
    fetchPolicy: 'cache-and-network',
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

  const toggleAddChat = () => {
    setAddChat(!addChat);
  };

  const updateChatList: MutationUpdaterFn<CreateChatMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    // get existing group list data from Apollo store
    const existingData = store.readQuery<SchemeChatsQuery>({
      query: SchemeChatsDocument,
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

    if (existingData === null) return;

    // write the new data to the Apollo store
    store.writeQuery<SchemeChatsQuery>({
      query: SchemeChatsDocument,
      data: {
        chats: [...existingData.chats, res.createChat],
        __typename: 'Query',
      },
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
  };

  return {
    data,
    loading,
    search,
    setSearch,
    addChat,
    toggleAddChat,
    updateChatList,
  };
};

export default useChatList;
