import type { CreateChatMutation } from '#/graphql/chats/mutations/__generated__/create-chat.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { SchemeChatsQuery } from 'graphql/chats/queries/__generated__/scheme-chats.generated';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  SchemeChatsDocument,
  useSchemeChatsQuery,
} from 'graphql/chats/queries/__generated__/scheme-chats.generated';
import { QueryMode } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';

interface Return {
  addChat: boolean;
  data: SchemeChatsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  toggleAddChat: () => void;
  updateChatList: MutationUpdaterFn<CreateChatMutation>;
}

const useChatList = (): Return => {
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const [addChat, setAddChat] = useState(false);
  const [search, setSearch] = useState('');

  const { data, loading } = useSchemeChatsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
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
        scheme: { id: { equals: schemeId } },
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
          scheme: { id: { equals: schemeId } },
        },
      },
    });

    if (existingData === null) return;

    // write the new data to the Apollo store
    store.writeQuery<SchemeChatsQuery>({
      data: {
        __typename: 'Query',
        chats: [...existingData.chats, res.createChat],
      },
      query: SchemeChatsDocument,
      variables: {
        where: {
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
          scheme: { id: { equals: schemeId } },
        },
      },
    });
  };

  return {
    addChat,
    data,
    loading,
    search,
    setSearch,
    toggleAddChat,
    updateChatList,
  };
};

export default useChatList;
