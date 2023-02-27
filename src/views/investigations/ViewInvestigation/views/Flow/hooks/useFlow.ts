import React, {
  DragEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlowInstance,
  useReactFlow,
} from 'reactflow';
import moment from 'moment/moment';
import { useDebouncedCallback } from 'use-debounce';

import { YMap } from 'yjs/dist/src/internals';
import useWebRtcProvider from './useWebRtcProvidor';
import useNodesStateSynced from './useNodesStateSynced';
import useEdgesStateSynced from './useEdgesStateSynced';
import { useStoreState } from '../../../../../../state';
import useObservableListener from './useObservableListener';
import styles from '../style.module.css';
import {
  useUpdateFlowMutation,
  useViewInvestigationQuery,
} from '../../../../../../graphql/generated';

interface Return {
  nodes: Node[];
  onNodesChange: OnNodesChange;
  edges: Edge[];
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  clientCount: number;
  isSynced: boolean;
  setReactFlowInstance: (instance: ReactFlowInstance | null) => void;
  savedWhen: string | null;
  onSave: () => void;
  onNodeClick: (event: React.MouseEvent, node: Node) => void;
  onDrop: (
    event: DragEvent,
    data?: {
      url?: string;
    }
  ) => void;
  onDragOver: (event: DragEvent) => void;
  wrapperRef: React.RefObject<HTMLDivElement>;
  nodesMap: YMap<Node>;
  loading: boolean;
  offenders: {
    name: string;
    url: string[];
  }[];
  setSelected: (id: string) => void;
  saving: boolean;
}

const TIMEOUT = 3000 + Math.floor(Math.random() * 7000);

interface Props {
  investigationId: string;
}

interface InitData {
  nodes: Node[];
  edges: Edge[];
}

const useFlow = ({ investigationId }: Props): Return => {
  const [initData, setInitData] = useState<InitData | null>(null);
  const [offenders, setOffenders] = useState<{ name: string; url: string[] }[]>(
    []
  );
  const [selected, setSelected] = useState<string | null>(null);
  const { data: importData, loading } = useViewInvestigationQuery({
    skip: !investigationId,
    variables: {
      where: {
        id: investigationId,
      },
    },
  });

  const currentUser = useStoreState((state) => state.user);
  const provider = useWebRtcProvider(currentUser, investigationId);
  const [updateFlow, { loading: saving }] = useUpdateFlowMutation();

  const nodesMap = provider.doc.getMap<Node>('nodes');
  const edgesMap = provider.doc.getMap<Edge>('edges');
  const [nodes, onNodesChange] = useNodesStateSynced({ nodesMap, edgesMap });
  const [edges, onEdgesChange, onConnect] = useEdgesStateSynced({ edgesMap });
  const [clientCount, setClientCount] = useState<number>(0);
  const [isSynced, setIsSynced] = useState<boolean>(false);
  const usedFallbackRef = useRef<boolean>(false);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [savedWhen, setSavedWhen] = useState<string | null>(null);
  useEffect(() => {
    if (
      importData &&
      importData.investigation &&
      importData.investigation.flows &&
      importData.investigation.flows[0]
    ) {
      const { nodes: nodes2, edges: edges2 } =
        importData.investigation.flows[0];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setInitData({ nodes: nodes2, edges: edges2 });
    }

    setSavedWhen(
      moment(
        new Date(importData?.investigation?.flows[0].updatedAt || '')
      ).fromNow()
    );
    if (
      importData &&
      importData.investigation &&
      importData.investigation.offenders
    ) {
      setOffenders(
        importData.investigation.offenders.map((offender) => ({
          name: offender.name || '',
          url: offender.images?.map((image) => image?.optimised || ''),
        }))
      );
    }
  }, [importData]);
  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      const meta = provider.doc.getMap('meta');
      const date = new Date();
      meta.set('lastSaved', date.getTime());
      setSavedWhen(moment(date).fromNow());
      updateFlow({
        variables: {
          where: {
            id: importData?.investigation?.flows[0].id || '',
          },
          data: {
            nodes: flow.nodes.map((node: Node) => ({
              data: node.data,
              id: node.id,
              positionX: Math.round(node.position.x),
              positionY: Math.round(node.position.y),
              type: node.type || '',
              height: node.height || 0,
              width: node.width || 0,
              positionAbX: Math.round(node.positionAbsolute?.x || 0),
              positionAbY: Math.round(node.positionAbsolute?.y || 0),
            })),
            edges: flow.edges.map((edge: Edge) => ({
              id: edge.id,
              type: edge.type || '',
              markerEnd: edge.markerEnd || '',
              source: edge.source || '',
              sourceHandle: edge.sourceHandle || '',
              target: edge.target || '',
              targetHandle: edge.targetHandle || '',
            })),
          },
        },
      });
    }
  }, [reactFlowInstance]);
  const handleSave = useCallback(() => {
    if (isSynced || clientCount === 0) {
      onSave();
    }
  }, [onSave, investigationId, provider.doc, isSynced, clientCount]);
  const handleSaveDebounced = useDebouncedCallback(handleSave, TIMEOUT);

  const handlePeersChange = useCallback(
    ({ webrtcPeers }) => {
      setClientCount(webrtcPeers.length);
    },
    [setClientCount]
  );
  useObservableListener('peers', handlePeersChange, provider);

  const handleSynced = useCallback(
    ({ synced }) => {
      setIsSynced(synced);
    },
    [setIsSynced]
  );
  useObservableListener('synced', handleSynced, provider);

  const handleYDocUpdate = useCallback(() => {
    handleSaveDebounced.cancel();
  }, [handleSaveDebounced]);

  useObservableListener('update', handleYDocUpdate, provider.doc);

  useEffect(() => {
    if (usedFallbackRef.current) return;

    const fetchFallback = async () => {
      if (provider.connected && clientCount === 0) {
        initData?.nodes?.forEach((node: Node) => {
          nodesMap.set(node.id, node);
        });
        initData?.edges?.forEach((edge: Edge) => {
          edgesMap.set(edge.id, edge);
        });
      }

      usedFallbackRef.current = true;
    };
    const timeoutId = window.setTimeout(fetchFallback, 1000);

    // eslint-disable-next-line consistent-return
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [initData, investigationId, provider.connected, clientCount]);

  const getId = () => `dndnode_${Math.random() * 10000}_${investigationId}`;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const { project } = useReactFlow();
  // const fitViewOptions: FitViewOptions = {
  //   padding: 0.2,
  // };
  useEffect(() => {
    handleSaveDebounced();
  }, [handleSaveDebounced, nodes, edges]);

  const onChange = useCallback((value, id) => {
    const currentNode = nodesMap.get(id);

    if (!currentNode) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nodesMap.set(id, {
      ...currentNode,
      data: { ...currentNode.data, color: value },
    });
  }, []);

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    if (wrapperRef.current) {
      const wrapperBounds = wrapperRef.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) {
        return;
      }
      const position = project({
        x: event.clientX - wrapperBounds.x - 80,
        y: event.clientY - wrapperBounds.top - 20,
      });
      const id = getId();
      const newNode: Node = {
        id,
        type,
        position,
        height: 100,
        width: 100,
        data: {
          label: `${type}`,
          id,
          onChange,
          color: '#FFCC00',
          imageUrl: selected,
          text: '',
        },
      };
      setSelected(null);
      nodesMap.set(newNode.id, newNode);
    }
  };

  const onNodeClick = useCallback((_, node) => {
    const currentNode = nodesMap.get(node.id);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nodesMap.set(node.id, {
      ...currentNode,
      className: styles.blink,
    });

    window.setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const currentNode = nodesMap.get(node.id);
      if (currentNode) {
        nodesMap.set(node.id, {
          ...currentNode,
          className: undefined,
        });
      }
    }, 3000);
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    // eslint-disable-next-line no-param-reassign
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // const data = {};
  // const onSave = useCallback(() => {
  //   if (rfInstance) {
  //     const flow = rfInstance.toObject();
  //     localStorage.setItem(flowKey, JSON.stringify(flow));
  //   }
  // }, [rfInstance]);
  //
  // const onRestore = useCallback(() => {
  //   const restoreFlow = async () => {
  //     const flow = JSON.parse(localStorage.getItem(flowKey));
  //
  //     if (flow) {
  //       const { x = 0, y = 0, zoom = 1 } = flow.viewport;
  //       setNodes(flow.nodes || []);
  //       setEdges(flow.edges || []);
  //       setViewport({ x, y, zoom });
  //     }
  //   };
  //
  //   restoreFlow();
  // }, [setNodes, setViewport]);
  return {
    nodes,
    onNodesChange,
    edges,
    onEdgesChange,
    onConnect,
    clientCount,
    isSynced,
    setReactFlowInstance,
    savedWhen,
    onSave,
    onNodeClick,
    onDrop,
    onDragOver,
    wrapperRef,
    nodesMap,
    loading: initData ? false : loading,
    offenders,
    setSelected,
    saving,
  };
};

export default useFlow;
