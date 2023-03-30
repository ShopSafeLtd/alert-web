import { useMemo } from 'react';
import { Doc } from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import type { User } from './useYjsAwareness';
import useYjsAwareness from './useYjsAwareness';

// import ydoc from '../../../../../../components/react-flow/yDoc/yDoc';

function useWebRtcProvider(user: User, documentId: string) {
  const ydoc = useMemo(() => new Doc({ guid: documentId }), [documentId]);
  const roomName = documentId;

  const awareness = useYjsAwareness(user, ydoc);

  return useMemo(
    () =>
      new WebsocketProvider(
        'wss://yjs-signaling.herokuapp.com/',
        roomName,
        ydoc,
        {
          awareness,
        }
      ),
    // return new WebrtcProvider(roomName, ydoc, {
    //   awareness,
    //   signaling: ['wss://yjs-signaling.herokuapp.com'],
    // });
    [awareness, ydoc, documentId]
  );
}

export default useWebRtcProvider;
