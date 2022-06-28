import { useCreateChatMutation } from "graphql/generated";

import { useStoreState } from "state";

interface FormData {
  name: string;
  description: string;
}

interface Return {
  onSubmit: (value: FormData) => void;
}

const useAddChatGroup = (): Return => {
  const schemeId = useStoreState((state) => state.scheme.id);

  const [CreateChat] = useCreateChatMutation();
  // const [inviteExistingUser] = useInviteExistingUserMutation()

  const onSubmit = (data: FormData) => {
    CreateChat({
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
  };
};
export default useAddChatGroup;
