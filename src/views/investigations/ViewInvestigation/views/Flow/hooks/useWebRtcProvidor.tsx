import React, { createContext, useContext, useMemo } from 'react';
import { Doc } from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { useParams } from 'react-router-dom';
import type { User } from './useYjsAwareness';
import { useStoreState } from '../../../../../../state';

export const WebRtcProviderContext = createContext<WebsocketProvider | null>(
  null
);

function useWebRtcProvider(user: User, documentId: string) {
  const ydoc = useMemo(() => new Doc({ guid: documentId }), [documentId]);
  const roomName = documentId;

  return useMemo(
    () =>
      new WebsocketProvider(
        'wss://yjs-signaling.herokuapp.com/',
        roomName,
        ydoc
      ),
    [roomName, ydoc]
  );
}

const WebRtcProviderContextProvider: React.FC = ({ children }) => {
  const user = useStoreState((state) => state.user);
  const { id: documentId } = useParams();
  const webRtcProvider = useWebRtcProvider(user, documentId || '');

  return (
    <WebRtcProviderContext.Provider value={webRtcProvider}>
      {children}
    </WebRtcProviderContext.Provider>
  );
};

// Custom hook to access the WebRTC provider from any component
function useWebRtcContext() {
  const webRtcProvider = useContext(WebRtcProviderContext);
  if (!webRtcProvider) {
    throw new Error(
      'useWebRtcContext must be used within a WebRtcProviderContextProvider'
    );
  }
  return webRtcProvider;
}

export { WebRtcProviderContextProvider, useWebRtcProvider, useWebRtcContext };
