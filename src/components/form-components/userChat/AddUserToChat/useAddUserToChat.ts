import { useStoreState } from 'state';
import { useState } from 'react';
import { QueryMode, SortOrder } from 'graphql/types';
import { useListSchemeUsersQuery } from 'graphql/users/queries/list-scheme-users.generated';

interface FormData {
  user: string[];
}
interface MemberData {
  id: string;
  fullName: string;
  businesses: { name: string; id: string }[];
  firstLetter?: string | null;
}
interface Props {
  onClose: () => void;
  addMemberUpdate: (value: FormData) => void;
  membersData: MemberData[] | undefined;
}

interface Return {
  onSubmit: (value: FormData) => void;
  usersData: MemberData[] | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  saving: boolean;
}

const useAddUserToChat = ({
  onClose,
  membersData,
  addMemberUpdate,
}: Props): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  const { data: usersData, loading } = useListSchemeUsersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        schemes: {
          some: {
            scheme: {
              id: {
                equals: schemeId,
              },
            },
          },
        },
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
      },
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
    },
  });
  const onSubmit = (data: FormData) => {
    setSaving(true);
    addMemberUpdate(data);
    setSaving(false);
    onClose();
  };

  return {
    onSubmit,
    usersData: usersData?.users
      .filter((user) => !membersData?.map((el) => el.id).includes(user.id))
      .map((user) => user),
    loading,
    search,
    setSearch,
    saving,
  };
};

export default useAddUserToChat;
