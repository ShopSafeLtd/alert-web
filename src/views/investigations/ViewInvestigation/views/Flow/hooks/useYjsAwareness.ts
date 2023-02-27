import { useMemo } from 'react';
import { Doc } from 'yjs';
import * as awarenessProtocol from 'y-protocols/awareness';
import getRandomColor from '../../../../../../utils/getRandomColor';

export interface User {
  fullName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

function useYjsAwareness(user: User, doc: Doc): awarenessProtocol.Awareness {
  return useMemo(() => {
    const awareness = new awarenessProtocol.Awareness(doc);
    awareness.setLocalStateField('user', {
      name: user.fullName,
      color: getRandomColor(user.fullName),
    });

    return awareness;
  }, [user.fullName, doc]);
}

export default useYjsAwareness;
