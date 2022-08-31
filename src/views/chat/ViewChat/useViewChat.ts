import { useState } from 'react';
// import {
//   NewMessageDocument,
//   useMessagesQuery,
//   useNewMessageSubscription,
//   UserChatsQuery,
//   useUpdateUserChatMutation,
//   useUserChatsQuery,
// } from 'graphql/generated';

// import { useStoreState } from 'state';

interface Return {
  // data: UserChatsQuery | undefined;
  // loading: boolean;
  // saving: boolean;
  currentId: string;
  onChangeId: (id: string) => void;
  // subscribeToNewMessage: () => void;
}

const useViewChat = (): Return => {
  // const userId = useStoreState((state) => state.user.id);
  // const schemeId = useStoreState((state) => state.scheme.id);
  // const [saving, setSaving] = useState(false);
  const [currentId, setCurrentId] = useState('');

  const onChangeId = (id: string) => setCurrentId(id);

  // const {
  //   // data: messagesData,
  //   // loading: messagesLoading,
  //   subscribeToMore,
  // } = useMessagesQuery({
  //   fetchPolicy: 'cache-and-network',
  //   variables: {
  //     chat:  currentId,
  //   },
  // });

  // const subscribeToNewMessage = () => {
  //   subscribeToMore({
  //     document: NewMessageDocument,
  //     variables: {
  //       chat:  currentId,
  //     },
  //     updateQuery: (prev, { subscriptionData }) => {
  //       // setReceived(true);
  //       //  if (!subscriptionData.data) return prev;
  //       const test = prev.messages.find(
  //         ({ id }) => id === subscriptionData.data.newMessage.id
  //       );
  //       if (test === undefined) {
  //         return {
  //           ...prev,
  //           messages: [...prev.messages, subscriptionData.data.newMessage],
  //         };
  //       }
  //     },
  //   });
  // };

  return {
    // data: chatData,
    // loading,
    // saving,
    currentId,
    onChangeId,
    // subscribeToNewMessage,
  };
};

export default useViewChat;
