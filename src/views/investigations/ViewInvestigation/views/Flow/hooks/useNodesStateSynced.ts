/* eslint-disable */
import { useCallback, useEffect, useState } from 'react';
import {
  applyNodeChanges,
  Edge,
  getConnectedEdges,
  Node,
  OnNodesChange,
} from 'reactflow'; // import ydoc from 'components/react-flow/yDoc/yDoc';
import { YMap } from 'yjs/dist/src/internals'; // import { edgesMap } from './useEdgesStateSynced';

// import { edgesMap } from './useEdgesStateSynced';

function useNodesStateSynced({
  nodesMap,
  edgesMap,
}: {
  nodesMap: YMap<Node>;
  edgesMap: YMap<Edge>;
}): [Node[], OnNodesChange] {
  const [nodes, setNodes] = useState<Node[]>([]);

  const onNodesChanges = useCallback((changes) => {
    const nodes = Array.from(nodesMap.values());
    const nextNodes = applyNodeChanges(changes, nodes);
    // @ts-ignore
    changes.forEach((change) => {
      const node = nextNodes.find((n) => n.id === change.id);

      if (change.type !== 'remove') {
        // @ts-ignore
        nodesMap.set(change.id, node);
      } else if (change.type === 'remove') {
        nodesMap.delete(change.id);
        const edges = Array.from(edgesMap.values());
        const connectedEdges = getConnectedEdges(nodes, edges);
        connectedEdges.forEach((edge) => edgesMap.delete(edge.id));
      }
    });
  }, []);

  useEffect(() => {
    const observer = () => {
      setNodes(Array.from(nodesMap.values()));
    };

    setNodes(Array.from(nodesMap.values()));

    nodesMap.observe(observer);

    return () => nodesMap.unobserve(observer);
  }, [setNodes]);

  return [nodes, onNodesChanges];
}

export default useNodesStateSynced;
