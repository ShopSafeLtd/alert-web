import { QueryMode, SortOrder } from 'graphql/types';
import { useListSchemeUsersQuery } from 'graphql/users/queries/__generated__/list-scheme-users.generated';
import { useState } from 'react';
import { useStoreState } from 'state';

interface FormData {
  user: string[];
}
interface MemberData {
  businesses: { id: string; name: string }[];
  firstLetter?: null | string;
  fullName: string;
  id: string;
}
interface Props {
  addMemberUpdate: (value: FormData) => void;
  membersData: MemberData[] | undefined;
  onClose: () => void;
}

interface Return {
  loading: boolean;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  search: string;
  setSearch: (value: string) => void;
  usersData: MemberData[] | undefined;
}

const useAddUserToChat = ({
  addMemberUpdate,
  membersData,
  onClose,
}: Props): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  const { data: usersData, loading } = useListSchemeUsersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      groupWhere: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
      orderBy: {
        fullName: SortOrder.Asc,
      },
      schemesWhere: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
      where: {
        OR: [
          {
            fullName: {
              contains: search,
              mode: QueryMode.Insensitive,
            },
          },
          {
            businesses: {
              some: {
                name: {
                  contains: search,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          },
        ],
        schemes: {
          some: {
            scheme: {
              id: {
                equals: schemeId,
              },
            },
          },
        },
      },
    },
  });
  const onSubmit = (data: FormData) => {
    setSaving(true);
    addMemberUpdate(data);
    setSaving(false);
    onClose();
  };

  return {
    loading,
    onSubmit,
    saving,
    search,
    setSearch,
    usersData: usersData?.users
      .filter((user) => !membersData?.map((el) => el.id).includes(user.id))
      .map((user) => user),
  };
};

export default useAddUserToChat;
