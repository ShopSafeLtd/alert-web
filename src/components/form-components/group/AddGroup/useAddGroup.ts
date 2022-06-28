import { useState } from "react";
import {
  useCreateGroupMutation,
  ListSchemeUsersQuery,
  useListSchemeUsersQuery,
  SortOrder,
  SchemeGroupsQuery,
  SchemeGroupsDocument,
  CreateGroupMutation
} from "graphql/generated";
import { useStoreState } from "state";
import { MutationUpdaterFn } from "@apollo/client";

interface FormData {
  name: string;
  description: string;
}

interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateGroupMutation>;
}

interface Return {
  onSubmit: (value: FormData) => void;
  usersData: ListSchemeUsersQuery | undefined;
  usersLoading: boolean;
  saving: boolean;
  setSaving: (value: boolean) => void;
}

const useAddGroup = ({ onClose, update }: Props): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);

  const { data: usersData, loading: usersLoading } = useListSchemeUsersQuery({
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
          },
        },
      },
      groupWhere: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
      orderBy: {
        fullName: SortOrder.Desc,
      },
    },
  });

  const [createGroup] = useCreateGroupMutation({
    onCompleted: () => {
      // false
      setSaving(false);
      onClose();
    },
    update
  });
  // const [inviteExistingUser] = useInviteExistingUserMutation()

  const onSubmit = (data: FormData) => {
    // ture
    setSaving(true);
    createGroup({
      variables: {
        data: {
          name: data.name,
          description: data.description,
          scheme: {
            connect: {
              id: schemeId,
            },
          },
        },
      },
    });
  };

  return {
    onSubmit,
    usersData,
    usersLoading,
    saving,
    setSaving,
  };
};
export default useAddGroup;
