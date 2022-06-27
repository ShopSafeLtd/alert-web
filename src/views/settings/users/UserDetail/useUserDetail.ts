import { useState } from "react";
import { useUserQuery, UserQuery } from "graphql/generated";
import { useStoreState } from "state";
import { useParams } from "react-router-dom";

interface Return {
  data: UserQuery | undefined;
  loading: boolean;
}

const useUserDetail = (): Return => {
  // const params = useParams();
  const userId = useParams().id;

  const schemeId = useStoreState((state) => state.scheme.id);

  const { data, loading } = useUserQuery({
    fetchPolicy: "cache-and-network",
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
      //   chatWhere: {
      //     scheme: {
      //       id: {
      //         equals: schemeId,
      //       },
      //     },
      //   },
    },
  });

  return {
    // userId,
    data,
    loading,
  };
};

export default useUserDetail;
