import React from "react";
// import MediaQuery from "react-responsive";
// import { useQuery, useMutation } from '@apollo/react-hooks';
import { useQuery, useMutation } from "@apollo/client";

import ViewGroupDesktop from "../desktop/ViewGroupDesktop/ViewGroupDesktop";
import { Groups } from "graphql-src/groups/queries";
// import ViewGroupMobile from "../mobile/ViewGroupMobile/ViewGroupMobile";
// import GroupQuery from '../../../../graphql/groups/queries/Group';
// import DeleteGroup from '../../../../graphql/groups/mutations/DeleteGroup';
// import AllGroups from '../../../../graphql/groups/AllGroupsQuery';
import { useStoreActions } from "../../../../state";

const ViewGroup = ({ match }) => {
  const setTitle = useStoreActions((actions) => actions.setTitle);
  const setNavbarAction = useStoreActions((actions) => actions.setNavbarAction);
  const setMultiAppBar = useStoreActions((actions) => actions.setMultiAppBar);
  const setBackLinkTo = useStoreActions((actions) => actions.setBackLinkTo);

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
