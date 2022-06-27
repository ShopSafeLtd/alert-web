import { useState } from "react";
import { useGroupQuery, GroupQuery } from "graphql/generated";
import { useStoreState } from "state";
import { useParams } from "react-router-dom";

interface Return {
  data: GroupQuery | undefined;
  loading: boolean;
}

const useGroupDetail = (): Return => {
  const params = useParams();

  const { data, loading } = useGroupQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      where: {
        id: params.id,
        // id: { equals: params.id },
      },
    },
  });

  return {
    data,
    loading,
  };
};

export default useGroupDetail;
