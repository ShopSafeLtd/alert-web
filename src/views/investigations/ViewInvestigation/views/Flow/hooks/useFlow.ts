import type React from 'react';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { DragEvent, useCallback, useEffect, useRef, useState } from 'react';
import type {
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlowInstance,
} from 'reactflow';
import { useReactFlow } from 'reactflow';
import moment from 'moment/moment';
import { useDebouncedCallback } from 'use-debounce';

import type { YMap } from 'yjs/dist/src/internals';
import { useUsers } from 'y-presence';
import type { FullScreenHandle } from 'react-full-screen';
import { useFullScreenHandle } from 'react-full-screen';
import useObservableListener from './useObservableListener';
import styles from '../style.module.css';
import type { ViewInvestigationQuery } from '../../../../../../graphql/generated';
import { useUpdateFlowMutation } from '../../../../../../graphql/generated';
import useDownloadImage from './useDownloadImage';
import useGraphStateSynced from './useNodesEdgesStateSynced';
import { useWebRtcContext } from './useWebRtcProvidor';

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

  // eslint-disable-next-line
  users: Map<number, { [p: string]: any }>;
  handlePointMove: (e: React.PointerEvent) => void;
  reactFlowInstance: ReactFlowInstance | null;
  downloadImage: () => void;
  flowScreen: FullScreenHandle;
  isFullScreen: boolean;
  setFullScreen: () => void;
}

const TIMEOUT = 3000 + Math.floor(Math.random() * 7000);

interface Props {
  investigationId: string;
  importData: ViewInvestigationQuery | undefined;
}

const useFlow = ({ investigationId, importData }: Props): Return => {
  const provider = useWebRtcContext();

  // const provider: WebsocketProvider = useWebRtcProvider(
  //   currentUser,
  //   investigationId
  // );
  const [selected, setSelected] = useState<string | null>(null);
  const [savedWhen, setSavedWhen] = useState<string | null>(
    importData?.investigation?.flows[0].updatedAt
      ? moment(importData?.investigation?.flows[0].updatedAt).fromNow()
      : null
  );
  const [updateFlow, { loading: saving }] = useUpdateFlowMutation();
  const { downloadImage: handleDownload } = useDownloadImage();
  const nodesMap = provider.doc.getMap<Node>('nodes');
  const edgesMap = provider.doc.getMap<Edge>('edges');
  const [nodes, edges, onNodesChange, onEdgesChange, onConnect] =
    useGraphStateSynced({ nodesMap, edgesMap });
  // const [edges, onEdgesChange, onConnect] = useEdgesStateSynced({ edgesMap });
  const [clientCount, setClientCount] = useState<number>(0);
  const [isSynced, setIsSynced] = useState<boolean>(false);
  const [usedFallbackRef, setUsedFallbackRef] = useState<boolean>(false);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const offenders =
    importData?.investigation?.offenders.map((offender) => ({
      name: offender.name || '',
      url: offender.images?.map((image) => image?.optimised || ''),
    })) || [];

  const onSave = useCallback(() => {
    if (reactFlowInstance && usedFallbackRef) {
      const flow = reactFlowInstance.toObject();
      if (
        flow.nodes.length <= 0 &&
        importData?.investigation?.flows &&
        importData?.investigation?.flows[0].nodes.length > 0
      ) {
        return;
      }

      const meta = provider.doc.getMap('meta');
      const date = new Date();

      meta.set('lastSaved', date.getTime());
      setSavedWhen(moment(date).fromNow());

      void updateFlow({
        variables: {
          where: {
            id: importData?.investigation?.flows[0].id || '',
          },
          data: {
            nodes: flow.nodes.map((node: Node) => ({
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
              markerEnd: edge.markerEnd || {},
              source: edge.source || '',
              sourceHandle: edge.sourceHandle || '',
              target: edge.target || '',
              targetHandle: edge.targetHandle || '',
            })),
          },
        },
      });
    }
  }, [reactFlowInstance, usedFallbackRef]);
  const handleSave = useCallback(() => {
    if (isSynced || clientCount === 0) {
      onSave();
    }
  }, [
    onSave,
    investigationId,
    provider.doc,
    isSynced,
    clientCount,
    usedFallbackRef,
  ]);
  const handleSaveDebounced = useDebouncedCallback(handleSave, TIMEOUT);
  const handlePeersChange = useCallback(
    ({ bcconnected }) => {
      setClientCount(bcconnected ? 1 : 0);
    },
    [setClientCount]
  );
  useObservableListener('peers', handlePeersChange, provider);

  const handleSynced = useCallback(
    ({ synced }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
    let isMounted = true;
    const fetchFallback = async () => {
      if (provider.wsconnected && clientCount === 0 && !usedFallbackRef) {
        // eslint-disable-next-line no-underscore-dangle
        if (nodesMap?._map.size === 0) {
          console.log('No Ydoc');
          const initData = importData?.investigation?.flows[0];
          if (initData?.nodes) {
            // eslint-disable-next-line no-restricted-syntax
            for (const node of initData.nodes) {
              nodesMap.set(node.id, node as Node);
            }
          }
          if (initData?.edges) {
            // eslint-disable-next-line no-restricted-syntax
            for (const edge of initData.edges) {
              const newEdge = {
                ...edge,
                style: {
                  stroke: 'red',
                  color: 'red',
                  strokeWidth: 2,
                },
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                markerEnd: {
                  // eslint-disable-next-line
                  // @ts-ignore
                  ...edge.markerEnd,
                  color: 'red',
                },
              };
              console.log(newEdge);
              edgesMap.set(edge.id, newEdge as Edge);
            }
          }
          console.log('Done creating Ydoc');
        } else {
          console.log('Ydoc found and used');
        }
        setUsedFallbackRef(true);
      }
    };

    if (isMounted) {
      void fetchFallback();
    }
    return () => {
      isMounted = false;
    };
  }, [
    // importData,
    provider.wsconnected,
    // clientCount,
    // usedFallbackRef,
    // nodesMap,
    // edgesMap,
  ]);

  const getId = () => `dndnode_${Math.random() * 10_000}_${investigationId}`;

  useEffect(() => {
    const updateSavedWhen = () => {
      const meta = provider.doc.getMap('meta');
      const lastSaved = meta.get('lastSaved') as number;

      if (
        lastSaved &&
        lastSaved >
          new Date(
            importData?.investigation?.flows[0]?.updatedAt?.toString() || ''
          ).getTime()
      ) {
        setSavedWhen(moment(new Date(lastSaved)).fromNow());
      } else {
        setSavedWhen(
          moment(importData?.investigation?.flows[0].updatedAt).fromNow()
        );
      }
    };

    const interval = setInterval(() => updateSavedWhen(), 10_000);

    return () => clearInterval(interval);
  }, []);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const { project } = useReactFlow();
  // const fitViewOptions: FitViewOptions = {
  //   padding: 0.2,
  // };
  useEffect(() => {
    handleSaveDebounced();
  }, [handleSaveDebounced, nodes, edges]);

  const onChange = useCallback((value, id) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const currentNode = nodesMap.get(id);
    if (!currentNode) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    nodesMap.set(id, {
      ...currentNode,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: { ...currentNode.data, color: value },
    });
  }, []);

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    if (wrapperRef.current) {
      const wrapperBounds = wrapperRef.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      if (type === undefined || !type) {
        return;
      }
      const position = project({
        x: event.clientX - wrapperBounds.x - 80,
        y: event.clientY - wrapperBounds.top - 20,
      });
      const id = getId();
      if (type === 'offenderDetailsNode') {
        const newNode: Node = {
          id,
          type,
          position,
          height: 550,
          width: 290,
          style: {
            height: 550,
            width: 290,
          },
          zIndex: 1,
          data: {
            label: `${type}`,
            id,
            onChange,
            imageUrl: selected,
            text: '',
          },
        };
        setSelected(null);
        nodesMap.set(newNode.id, newNode);
      } else if (type === 'incidentDetailsNode') {
        const newNode: Node = {
          id,
          type,
          position,
          height: 350,
          width: 290,
          style: {
            height: 350,
            width: 290,
          },
          zIndex: 1,
          data: {
            label: `${type}`,
            id,
            onChange,
            imageUrl: selected,
            text: '',
          },
        };
        setSelected(null);
        nodesMap.set(newNode.id, newNode);
      } else {
        const newNode: Node = {
          id,
          type,
          position,
          height: 200,
          width: 200,
          style: {
            height: 200,
            width: 200,
          },
          zIndex: 1,
          data: {
            label: `${type}`,
            id,
            onChange,
            imageUrl: selected,
            text: '',
          },
        };
        setSelected(null);
        nodesMap.set(newNode.id, newNode);
      }
    }
  };

  const onNodeClick = useCallback((_, node) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
    const currentNode = nodesMap.get(node.id);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
    nodesMap.set(node.id, {
      ...currentNode,
      className: styles.blink,
    });

    window.setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-shadow, @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
      const currentNode = nodesMap.get(node.id);
      if (currentNode) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
        nodesMap.set(node.id, {
          ...currentNode,
          className: undefined,
        });
      }
    }, 3000);
  }, []);

  useEffect(
    () => () => {
      provider.awareness.setLocalStateField('user', null);
    },
    []
  );
  const onDragOver = useCallback((event) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    event.preventDefault();
    // eslint-disable-next-line no-param-reassign,@typescript-eslint/no-unsafe-member-access
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const users = useUsers(provider.awareness);
  const handlePointMove = useCallback(
    (e: React.PointerEvent) => e, // TODO: fix this
    // const bounds = wrapperRef.current?.getBoundingClientRect();
    // if (wrapperRef?.current) {
    //   const wrapperBounds = wrapperRef.current.getBoundingClientRect();
    //   const position = project({
    //     x: e.clientX - wrapperBounds.left,
    //     y: e.clientY - wrapperBounds.top,
    //   });
    //   provider.awareness.setLocalStateField('cursor', {
    //     x: position?.x || 0,
    //     y: position?.y || 0,
    //   });
    // }
    []
  );

  const flowScreen = useFullScreenHandle();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const setFullScreen = useCallback(() => {
    setIsFullScreen(!isFullScreen);
    if (isFullScreen) {
      void flowScreen.exit();
    } else {
      void flowScreen.enter();
    }
  }, [isFullScreen]);

  const downloadImage = useCallback(() => {
    handleDownload();
  }, [handleDownload]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      importData?.investigation?.flows[0] &&
      provider.wsconnected &&
      usedFallbackRef
    ) {
      setLoading(false);
    } else if (provider.wsconnecting && !usedFallbackRef) {
      setLoading(true);
    }
  }, [
    importData?.investigation,
    provider.wsconnected,
    usedFallbackRef,
    provider.wsconnecting,
  ]);

  return {
    nodes,
    onNodesChange,
    edges,
    onEdgesChange,
    onConnect,
    clientCount,
    isSynced,
    reactFlowInstance,
    setReactFlowInstance,
    savedWhen,
    onSave,
    onNodeClick,
    onDrop,
    onDragOver,
    wrapperRef,
    nodesMap,
    loading,
    offenders,
    setSelected,
    saving,
    users,
    handlePointMove,
    downloadImage,
    flowScreen,
    isFullScreen,
    setFullScreen,
  };
};

export default useFlow;
