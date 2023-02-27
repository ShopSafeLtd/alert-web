import { useMemo } from 'react';
// import { Doc } from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import useYjsAwareness, { User } from './useYjsAwareness';
import ydoc from '../../../../../../components/react-flow/yDoc/yDoc';

function useWebRtcProvider(user: User, documentId: string) {
  // const ydoc = useMemo(() => new Doc({ guid: documentId }), [documentId]);
  const awareness = useYjsAwareness(user, ydoc);

  return useMemo(() => {
    const roomName = `yjs-room-${documentId}`;
    return new WebrtcProvider(roomName, ydoc, {
      awareness,
      signaling: ['wss://yjs-signaling.herokuapp.com'],
    });
  }, [awareness, ydoc, documentId]);
}

export default useWebRtcProvider;
