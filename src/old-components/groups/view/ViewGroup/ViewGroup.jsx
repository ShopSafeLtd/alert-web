import React from "react";
import { useQuery } from "@apollo/client";

import ViewGroupDesktop from "../desktop/ViewGroupDesktop/ViewGroupDesktop";
import { Groups } from "graphql-src/groups/queries";

const ViewGroup = ({ history, match }) => {
  // queries
  const { data, loading } = useQuery(Groups, {
    variables: {
      where: {
        id: { equals: match.params.id },
      },
    },
    fetchPolicy: "cache-and-network",
  });

  // mutations
  // const [deleteGroup] = useMutation(DeleteGroup, {
  //   update: (store, { data: { deleteGroup } }) => {
  //     let data = store.readQuery({
  //       query: AllGroups,
  //       variables: {
  //         schemeId: window.localStorage.getItem("currentScheme"),
  //         search: "",
  //       },
  //     });
  //     data.allGroups = data.allGroups.filter(({ id }) => id !== deleteGroup.id);
  //     store.writeQuery({
  //       query: AllGroups,
  //       data,
  //       variables: {
  //         schemeId: window.localStorage.getItem("currentScheme"),
  //         search: "",
  //       },
  //     });
  //   },
  // });

  // functions
  const handleDelete = async () => {
    // await deleteGroup({
    //   variables: {
    //     id: data.group.id,
    //   },
    //   optimisticResponse: {
    //     addToUserOnGroup: {
    //       id: data.group.id,
    //       __typename: "Group",
    //     },
    //   },
    // });
  };

  return (
    // <MediaQuery minDeviceWidth={1024}>
    //   {(matches) =>
    //     matches ? (
    <ViewGroupDesktop
      history={history}
      group={!!data ? data.groups : {}}
      groupId={match.params.id}
      loading={loading}
      handleDelete={handleDelete}
    />
    // ) : (
    //   <ViewGroupMobile
    //     group={!!data ? data.group : {}}
    //     groupId={match.params.id}
    //     loading={loading}
    //     setTitle={setTitle}
    //     setNavbarAction={setNavbarAction}
    //     setMultiAppBar={setMultiAppBar}
    //     setBackLinkTo={setBackLinkTo}
    //   />
    // )
    //   }
    // </MediaQuery>
  );
};

export default ViewGroup;
