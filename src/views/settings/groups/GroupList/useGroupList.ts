import { useState } from "react";
import {
  QueryMode,
  useSchemeGroupsQuery,
  SchemeGroupsQuery,
  SchemeGroupsDocument,
  CreateGroupMutation,
} from "graphql/generated";
import { useStoreState } from "state";
import { MutationUpdaterFn } from "@apollo/client";

interface Return {
  data: SchemeGroupsQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addGroup: boolean;
  toggleAddGroup: () => void;
  updateGroupList: MutationUpdaterFn<CreateGroupMutation>;
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

  const updateGroupList: MutationUpdaterFn<CreateGroupMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    // get existing group list data from Apollo store
    const existingData = store.readQuery<SchemeGroupsQuery>({
      query: SchemeGroupsDocument,
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
    store.writeQuery<SchemeGroupsQuery>({
      query: SchemeGroupsDocument,
      data: {
        groups: [...existingData.groups, res.createGroup],
        __typename: "Query",
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
    addGroup,
    toggleAddGroup,
    updateGroupList
  };
};

export default useGroupList;
