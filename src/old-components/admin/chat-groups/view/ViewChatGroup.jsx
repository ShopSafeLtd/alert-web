import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { APP_PREFIX_PATH } from "configs/AppConfig";

import Desktop from "./desktop/Desktop/Desktop";
import { ViewChat } from "graphql-src/chat/queries";
// import query from '../../../../graphql/admin/queries/ChatGroup';
import { useStoreActions } from "../../../../state";
import { useParams } from "react-router-dom";

const ViewChatGroup = () => {
  const params = useParams()
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
        id: params.id,
      },
    },
    fetchPolicy: "cache-and-network",
  });

  return (
    <Desktop
      chat={!!data ? data?.chat : {}}
      loading={loading}
      chatId={params.id}
    />
  );
};

export default ViewChatGroup;
