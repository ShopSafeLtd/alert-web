import type { Doc } from 'yjs';

import { useMemo } from 'react';
import * as awarenessProtocol from 'y-protocols/awareness';

import getRandomColor from '../../../../../../utils/getRandomColor';

export interface User {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  fullName: string;
}

function useYjsAwareness(user: User, doc: Doc): awarenessProtocol.Awareness {
  return useMemo(() => {
    const awareness = new awarenessProtocol.Awareness(doc);
    awareness.setLocalStateField('user', {
      color: getRandomColor(user.fullName),
      name: user.fullName,
    });

    return awareness;
  }, [user.fullName, doc]);
}

export default useYjsAwareness;
