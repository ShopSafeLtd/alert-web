import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import { fromPromise, useMutation } from "@apollo/client";
import MediaQuery from "react-responsive";
// import TextareaAutosize from "react-autosize-textarea";

import { CreateMessage } from "graphql-src/chat/mutations";
import { Messages } from "graphql-src/chat/queries";
// import query from '../../../../graphql/chat/queries/MessagesQuery';
// import SendMessageMutation from '../../../../graphql/chat/SendMessageMutation';
import { useStoreState } from "../../../../state";

const Container = styled.form`
  position: absolute;
  bottom: ${({ bottomNav }) => (bottomNav ? "57px" : "0px")};
  ${({ height }) => `height: ${height + 2}px`};
  background: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  @media (min-width: 1024px) {
    position: static;
    padding: 10px 20px 10px;
    background: #fff;
    height: auto;
  }
`;
const MobileContainer = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 84%;
`;
//const TextField = styled(TextareaAutosize)`
const TextField = styled.div`
  height: auto;
  min-height: 60px;
  flex: 1;
  outline: none;
  resize: none;
  font-size: 15px;
  font-family: "Roboto", sans-serif;
  padding: 10px 10px;
  width: 100%;
  -webkit-appearance: none;
  border-radius: 0;
  border: none;
`;
const DesktopTextField = styled.textarea`
  border: 1px solid #e0e0e0;
  height: auto;
  min-height: 45px;
  flex: 1;
  border-radius: 5px;
  padding: 15px 20px;
  outline: none;
  resize: none;
  position: static;
  bottom: 8px;
  left: 1%;
  width: 84%;
  font-size: 15px;
  font-family: "Roboto", sans-serif;
`;
const Send = styled(Button)`
  margin-left: 15px;
`;
const MobileSend = styled.div`
  margin-left: 5px;
  height: 45px;
  width: 45px;
  position: absolute;
  bottom: 10px;
  right: 3%;
  color: #ef5350;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const NewMessage = React.forwardRef((props, ref) => {
  const {
    refetch,
    chatId,
    onSend,
    onFocus,
    onBlur,
    message,
    handleChange,
    onResize,
  } = props;

  const bottomNav = useStoreState((state) => state.theme.bottomNav);
  const user = useStoreState((state) => state.user);
  const fromId = useStoreState((state) => state.user.id);
  const schemeId = useStoreState((state) => state.scheme.id);

  const [sendMessage] = useMutation(CreateMessage, {
    update: (store, { data: { createMessage } }) => {
      let data = store.readQuery({
        query: Messages,
        variables: {
          chat: chatId,
        },
      });
      store.writeQuery({
        query: Messages,
        data: {
          ...data,
          messages: [...data.messages, createMessage],
        },
        variables: {
          chat: chatId,
        },
      });
    },
  });

  const onSubmit = async (e) => {
    e && e.preventDefault();
    if (message !== "") {
      onSend();
      const newMessage = message;
      handleChange("");
      await sendMessage({
        variables: {
          data: {
            chat: {
              connect: {
                id: chatId,
              },
            },
            scheme: {
              connect: {
                id: schemeId,
              },
            },
            from: {
              connect: {
                id: fromId,
              },
            },
            content: newMessage,
          },
        },
        optimisticResponse: {
          createMessage: {
            content: newMessage,
            sent: false,
            from: {
              fullName: user.fullName,
              id: fromId,
              initials: user.initials,
              organisation: user.organisation,
              __typename: "User",
            },
            id: 0,
            createdAt: new Date(),
            __typename: "Message",
          },
        },
      });
      refetch();
    }
  };

  const handleKeyPress = (e) => {
    e.key === "Enter" && onSubmit(e);
  };
  return (
    // <MediaQuery minDeviceWidth={1024}>
    //   {(matches) => (
    //     <Mutation
    //       mutation={SendMessageMutation}
    //       update={(store, { data: { createMessage } }) => {
    //         let data = store.readQuery({
    //           query: query,
    //           variables: {
    //             chatId: chatId,
    //           },
    //         });
    //         data.messages = [...data.messages, createMessage];
    //         store.writeQuery({
    //           query: query,
    //           data,
    //           variables: {
    //             chatId: chatId,
    //           },
    //         });
    //       }}
    //     >
    //       {(sendMessage) => {
    //         const onSubmit = async (e) => {
    //           e !== undefined && e.preventDefault();
    //           if (message !== "") {
    //             onSend();
    //             const newMessage = message;
    //             handleChange("");
    //             await sendMessage({
    //               variables: {
    //                 content: newMessage,
    //                 from: fromId,
    //                 scheme: window.localStorage.getItem("currentScheme"),
    //                 chat: chatId,
    //               },
    //               optimisticResponse: {
    //                 createMessage: {
    //                   content: newMessage,
    //                   sent: false,
    //                   from: {
    //                     fullName: user.fullName,
    //                     id: fromId,
    //                     initials: user.initials,
    //                     organisation: user.organisation,
    //                     __typename: "User",
    //                   },
    //                   id: 0,
    //                   createdAt: new Date(),
    //                   __typename: "Message",
    //                 },
    //               },
    //             });
    //             refetch();
    //           }
    //         };
    //         const handleKeyPress = (e) => {
    //           e.key === "Enter" && onSubmit(e);
    //         };
    // return (
    <Container
      // onSubmit={() => onSubmit}
      bottomNav={bottomNav}
      height={!!ref.current && ref.current.clientHeight}
    >
      {/* {matches ? ( */}
      <DesktopTextField
        onKeyPress={(e) => handleKeyPress(e)}
        value={message}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Type a message"
        ref={(el) => (ref = el)}
      />
      {/* ) : (
        <MobileContainer ref={ref}>
          <TextField
            onKeyPress={(e) => handleKeyPress(e)}
            value={message}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            async
            placeholder="Type a message"
            maxRows={6}
            onResize={onResize}
          />
        </MobileContainer>
      )}
      {matches ? ( */}
      <Send variant="contained" color="primary" onClick={() => onSubmit()}>
        <SendIcon />
        Send
      </Send>
      {/* ) : (
        <MobileSend size="small" aria-label="Send" onClick={onSubmit}>
          <SendIcon />
        </MobileSend>
      )} */}
    </Container>
    //           );
    //         }}
    //       </Mutation>
    //     )}
    //   </MediaQuery>
  );
});

export default NewMessage;
