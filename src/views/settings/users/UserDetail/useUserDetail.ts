import { useState } from 'react';
import {
  useUserQuery,
  UserQuery,
  UpdateUserMutation,
  UserDocument,
} from 'graphql/generated';
import { MutationUpdaterFn } from '@apollo/client';
import { useStoreState } from 'state';
import { useParams } from 'react-router-dom';

interface Return {
  data: UserQuery | undefined;
  loading: boolean;
  editUser: boolean;
  toggleEditUser: () => void;
  // updateUserDetails: MutationUpdaterFn<UpdateUserMutation>;
}

const useUserDetail = (): Return => {
  const userId = useParams().id;
  const [editUser, setEditUser] = useState(false);

  const schemeId = useStoreState((state) => state.scheme.id);

  const { data, loading } = useUserQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: userId,
      },

      groupWhere: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
      chatWhere: {
        chat: {
          scheme: {
            id: {
              equals: schemeId,
            },
          },
        },
      },
    },
  });

  const toggleEditUser = () => {
    setEditUser(!editUser);
  };

  // const updateUserDetails: MutationUpdaterFn<UpdateUserMutation> = (
  //   store,
  //   { data: res }
  // ) => {
  //   if (res?.updateUser === null || res?.updateUser === undefined) return;

  //   // get existing group list data from Apollo store
  //   const existingData = store.readQuery<UserQuery>({
  //     query: UserDocument,
  //     variables: {
  //       where: {
  //         id: userId,
  //       },

  //       groupWhere: {
  //         scheme: {
  //           id: {
  //             equals: schemeId,
  //           },
  //         },
  //       },
  //       chatWhere: {
  //         chat: {
  //           scheme: {
  //             id: {
  //               equals: schemeId,
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });

  //   if (existingData === null) return;

  //   // write the new data to the Apollo store
  //   store.writeQuery<UserQuery>({
  //     query: UserDocument,
  //     data: {
  //       user: [...existingData.user, res.updateUser],
  //       __typename: 'Query',
  //     },
  //     variables: {
  //       where: {
  //         id: userId,
  //       },

  //       groupWhere: {
  //         scheme: {
  //           id: {
  //             equals: schemeId,
  //           },
  //         },
  //       },
  //       chatWhere: {
  //         chat: {
  //           scheme: {
  //             id: {
  //               equals: schemeId,
  //             },
  //           },
  //         },
  //       },
  //     },
  //   });
  // };

  return {
    data,
    loading,
    editUser,
    toggleEditUser,
    // updateUserDetails,
  };
};

export default useUserDetail;
