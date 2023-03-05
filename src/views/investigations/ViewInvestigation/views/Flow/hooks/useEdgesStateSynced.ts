/* eslint-disable */

import { useCallback, useEffect } from 'react';
import {
  applyEdgeChanges,
  Connection,
  Edge,
  MarkerType,
  OnConnect,
  OnEdgesChange,
  useEdgesState,
} from 'reactflow';
import { YMap } from 'yjs/dist/src/internals';
// import ydoc from '../../../../../../components/react-flow/yDoc/yDoc';

// export const edgesMap = ydoc.getMap<Edge>('edges');

export function useNodesStateSynced({
  edgesMap,
}: {
  edgesMap: YMap<Edge>;
}): [Edge[], OnEdgesChange, OnConnect] {
  // const [edges, setEdges] = useState<Edge[]>([]);
  const [edges, setEdges] = useEdgesState([]);

  const onEdgesChange = useCallback((changes) => {
    const nextEdges = applyEdgeChanges(changes, Array.from(edgesMap.values()));
    // @ts-ignore
    changes.forEach((change) => {
      if (change.type !== 'remove') {
        edgesMap.set(
          change.id,
          // @ts-ignore
          nextEdges.find((n) => n.id === change.id)
        );
      } else {
        edgesMap.delete(change.id);
      }
    });
  }, []);

  const onConnect = useCallback((params: Connection | Edge) => {
    const { source, sourceHandle, target, targetHandle } = params;
    const id = `edge-${source}${sourceHandle || ''}-${target}${
      targetHandle || ''
    }`; // @ts-ignore

    edgesMap.set(id, {
      id,
      ...params,
      type: 'floating',
      markerEnd: { type: MarkerType.Arrow },
    });
  }, []);

  useEffect(() => {
    const observer = () => {
      setEdges(Array.from(edgesMap.values()));
    };

    setEdges(Array.from(edgesMap.values()));
    edgesMap.observe(observer);

    return () => edgesMap.unobserve(observer);
  }, [setEdges]);

  return [edges, onEdgesChange, onConnect];
}

export default useNodesStateSynced;
