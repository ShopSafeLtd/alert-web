/* eslint-disable */
import { useCallback, useEffect } from 'react';
import {
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import { YMap } from 'yjs/dist/src/internals';

function useGraphStateSynced({
  nodesMap,
  edgesMap,
}: {
  nodesMap: YMap<Node>;
  edgesMap: YMap<Edge>;
}): [Node[], Edge[], OnNodesChange, OnEdgesChange, OnConnect] {
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  const onNodesChange = useCallback((changes) => {
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
        const edgesToDelete = edges.filter(
          (edge) => edge.source === change.id || edge.target === change.id
        );
        edgesToDelete.forEach((edge) => edgesMap.delete(edge.id));
      }
    });
  }, []);

  const onEdgesChange = useCallback((changes) => {
    const nextEdges = applyEdgeChanges(changes, Array.from(edgesMap.values()));
    // @ts-ignore
    changes.forEach((change) => {
      if (change.type !== 'remove') {
        edgesMap.set(
          change.id,
          edgesMap.set(
            change.id,
            // @ts-ignore
            nextEdges.find((n) => n.id === change.id)
          )
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
    }`;
    edgesMap.set(id, {
      id,
      ...params,
      type: 'floating',
      style: { stroke: 'red', color: 'red' },
      // @ts-ignore
      markerEnd: { type: 'arrow', height: 50, width: 50, color: 'red' },
    });
  }, []);

  useEffect(() => {
    const nodesObserver = () => {
      setNodes(Array.from(nodesMap.values()));
    };

    const edgesObserver = () => {
      setEdges(
        Array.from(edgesMap.values()).map((edge) => ({
          ...edge,
          style: {
            stroke: 'red',
            color: 'red',
          },
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          markerEnd: {
            // eslint-disable-next-line
            // @ts-ignore
            ...edge.markerEnd,
            color: 'red',
          },
        }))
      );
    };

    setNodes(Array.from(nodesMap.values()));
    setEdges(
      Array.from(edgesMap.values()).map((edge) => ({
        ...edge,
        style: {
          stroke: 'red',
          color: 'red',
        },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        markerEnd: {
          // eslint-disable-next-line
          // @ts-ignore
          ...edge.markerEnd,
          color: 'red',
        },
      }))
    );

    nodesMap.observe(nodesObserver);
    edgesMap.observe(edgesObserver);

    return () => {
      nodesMap.unobserve(nodesObserver);
      edgesMap.unobserve(edgesObserver);
    };
  }, [setNodes, setEdges]);

  return [nodes, edges, onNodesChange, onEdgesChange, onConnect];
}

export default useGraphStateSynced;
