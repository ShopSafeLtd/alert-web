import { useState } from "react";
import {
  Role,
  SchemeGroupsQuery,
  SchemeChatsQuery,
  SortOrder,
  useCreateUserInDatabaseMutation,
  useInviteExistingUserMutation,
  useSchemeGroupsQuery,
  useSchemeChatsQuery,
  CreateUserInDatabaseMutation,
} from "graphql/generated";
import { useStoreState } from "state";
import { MutationUpdaterFn } from "@apollo/client";
import { notification } from "antd";

interface FormData {
  fullName: string;
  email: string;
  organisation: string;
  role: Role;
  address: {
    postcode: string;
    street: string;
    townCity: string;
    building: string;
    county: string;
    primary: boolean;
  };
}
interface Props {
  onClose: () => void;
  update: MutationUpdaterFn<CreateUserInDatabaseMutation>;
}
interface Return {
  onSubmit: (value: FormData) => void;
  groupsData: SchemeGroupsQuery | undefined;
  groupsLoading: boolean;
  chatsData: SchemeChatsQuery | undefined;
  chatsLoading: boolean;
  saving: boolean;
  // setSaving: (value: boolean) => void;
}
type NotificationType = "success" | "info" | "warning" | "error";

const useAddUser = ({ onClose, update }: Props): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);

  const openNotification = (type: NotificationType) => {
    switch (type) {
      case "success":
        notification["success"]({
          message: "Success!",
          description: "Your invitation is successful! ",
        });
        break
      
      case "error":
        notification["error"]({
          message: "error!",
          description: "Whoops, there are some errors. Please try again. ",
        });
        break
    }
  };

  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
      orderBy: {
        name: SortOrder.Desc,
      },
    },
  });

  const { data: chatsData, loading: chatsLoading } = useSchemeChatsQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
      orderBy: {
        name: SortOrder.Desc,
      },
    },
  });

  const [createUserInDatabase] = useCreateUserInDatabaseMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      openNotification("success")
    },
    onError: () => {
      openNotification("error")
    },
    update,
  });
  const [inviteExistingUser] = useInviteExistingUserMutation();

  const onSubmit = (data: FormData) => {
    setSaving(true);
    createUserInDatabase({
      variables: {
        data: {
          address: {
            postcode: data.address?.postcode || "",
            street: data.address?.street || "",
            townCity: data.address?.townCity || "",
            building: data.address?.building || "",
            county: data.address?.county || "",
            primary: true,
          },
          email: data.email,
          fullName: data.fullName,
          groups: [
            {
              id: "",
            },
          ],
          organisation: data.organisation,
          role: data.role,
          scheme: {
            id: "",
          },
          chats: [
            {
              id: "",
            },
          ],
        },
      },
    });
  };

  return {
    onSubmit,
    groupsData,
    groupsLoading,
    chatsData,
    chatsLoading,
    saving,
    // setSaving,
  };
};

export default useAddUser;
