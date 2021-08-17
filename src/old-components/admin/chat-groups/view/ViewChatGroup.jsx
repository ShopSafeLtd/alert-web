import React, { useEffect } from "react";
import MediaQuery from "react-responsive";
import { useQuery } from "@apollo/client";
import { APP_PREFIX_PATH } from "configs/AppConfig";

import Mobile from "./mobile/Mobile/Mobile";
import Desktop from "./desktop/Desktop/Desktop";
import { ViewChat } from "graphql-src/chat/queries";
// import query from '../../../../graphql/admin/queries/ChatGroup';
import { useStoreActions } from "../../../../state";

const ViewChatGroup = ({
  match: {
    params: { id },
  },
}) => {
  const setTitle = useStoreActions((actions) => actions.theme.setTitle);
  // const setNavbarAction = useStoreActions(
  //   (actions) => actions.theme.setNavbarAction
  // );
  const setBackLinkTo = useStoreActions(
    (actions) => actions.theme.setBackLinkTo
  );

  // effects
  useEffect(() => {
    // setNavbarAction("backLink");
    setBackLinkTo(`${APP_PREFIX_PATH}/scheme-settings/chat-groups`);
    setTitle("View Chat Group");
    return () => {
      setTitle("");
      // setNavbarAction("default");
      setBackLinkTo("");
    };
    // eslint-disable-next-line
  }, []);

  // queries
  const { data, loading } = useQuery(ViewChat, {
    variables: {
      where: {
        id,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  return (
    // <MediaQuery minDeviceWidth={1024}>
    //   {(matches) =>
    //     matches ? (
    <Desktop chat={!!data ? data?.chat : {}} loading={loading} chatId={id} />
    //     ) : (
    //       <Mobile
    //         chat={!!data ? data.chat : {}}
    //         loading={loading}
    //         chatId={id}
    //       />
    //     )
    //   }
    // </MediaQuery>
  );
};

export default ViewChatGroup;
