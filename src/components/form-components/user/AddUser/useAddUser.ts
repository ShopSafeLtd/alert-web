import {
  Role,
  SchemeGroupsQuery,
  SortOrder,
  useCreateUserInDatabaseMutation,
  useInviteExistingUserMutation,
  useSchemeGroupsQuery,
} from "graphql/generated";
import { useStoreState } from "state";

interface FormData {
  fullName: string;
  email: string;
  organisation: string;
  role: Role;
}

interface Return {
  onSubmit: (value: FormData) => void;
  groupsData: SchemeGroupsQuery | undefined;
  groupsLoading: boolean;
}

const useAddUser = (onClose: () => void): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);

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

  const [createUserInDatabase] = useCreateUserInDatabaseMutation();
  const [inviteExistingUser] = useInviteExistingUserMutation();

  const onSubmit = (data: FormData) => {
    createUserInDatabase({
      onCompleted: () => {
        onClose();
      },
      variables: {
        data: {
          address: {
            postcode: "",
            street: "",
            townCity: "",
            building: "",
            county: "",
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
  };
};

export default useAddUser;
