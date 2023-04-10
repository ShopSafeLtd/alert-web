/* eslint-disable */
import { useCallback, useEffect } from 'react';
import {
  applyNodeChanges,
  Edge,
  Node,
  OnNodesChange,
  useNodesState,
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
  // const [nodes, setNodes] = useState<Node[]>([]);
  const [nodes, _setNodes] = useNodesState([]);

  const setNodes = useCallback((data) => {
    _setNodes(data);
  }, []);
  const onNodesChanges = useCallback((changes) => {
    const allNodes = Array.from(nodesMap.values());
    const nextNodes = applyNodeChanges(changes, allNodes);
    // @ts-ignore
    changes.forEach((change) => {
      const node = nextNodes.find((n) => n.id === change.id);
      if (change.type !== 'remove') {
        // @ts-ignore
        nodesMap.set(change.id, node);
      } else if (change.type === 'remove') {
        nodesMap.delete(change.id);
        const edges = Array.from(edgesMap.values());
        // map all edges with a source or target with an id of change.id
        const edgesToDelete = edges.filter(
          (edge) => edge.source === change.id || edge.target === change.id
        );
        edgesToDelete.forEach((edge) => edgesMap.delete(edge.id));
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
