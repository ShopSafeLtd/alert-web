import type { DragEvent } from 'react';
import React, { useMemo } from 'react';
import type {
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlowInstance,
} from 'reactflow';
import ReactFlow, {
  Background,
  BackgroundVariant,
  ControlButton,
  Controls,
  MiniMap,
} from 'reactflow';
import { Button, Card, Spin } from 'antd';
import OffenderNode from 'components/react-flow/nodes/offender-node';
import IncidentNode from 'components/react-flow/nodes/incident-details-node';

import ImageNode from 'components/react-flow/nodes/image-node';
import TextNode from 'components/react-flow/nodes/text-node';
import VehicleNode from 'components/react-flow/nodes/vehicle-node';
import IncidentListNode from 'components/react-flow/nodes/list-incidents-node';
import FloatingEdge from 'components/react-flow/edges/floating-edge';
import { LoadingOutlined } from '@ant-design/icons';
import type { FullScreenHandle } from 'react-full-screen';
import { FullScreen } from 'react-full-screen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpandArrows } from '@fortawesome/pro-light-svg-icons';
import Sidebar from './sidebar/Sidebar';
import 'reactflow/dist/style.css';
import './styles.css';
import styles from './style.module.css';
import { visualColours } from '../../../../../utils/node-colour';
import { useStoreState } from '../../../../../state';
// import Cursor from './Cursors/Cursor';
// import { WebsocketProvider } from 'y-websocket';

const Status = ({ success = false }: { success: boolean }) => (
  <span className={`status ${success ? 'success' : ''}`}>&nbsp;</span>
);

interface FlowProps {
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
  loading: boolean;
  saving: boolean;
  // eslint-disable-next-line
  // handlePointMove: (e: React.PointerEvent) => void;
  downloadImage: () => void;
  // users: Map<number, { [p: string]: any }>;
  // provider: WebsocketProvider;
  // reactFlowInstance: ReactFlowInstance | null;
  flowScreen: FullScreenHandle;
  isFullScreen: boolean;
  setFullScreen: () => void;
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ReactFlowView = ({
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
  loading,
  wrapperRef,
  saving,
  // handlePointMove,
  downloadImage,
  isFullScreen,
  setFullScreen,
  flowScreen,
}: // users,
// provider,
// reactFlowInstance,
FlowProps) => {
  const edgeTypes = useMemo(
    () => ({
      floating: FloatingEdge,
    }),
    []
  );

  const darkTheme =
    useStoreState((state) => state.theme.currentTheme) === 'dark';

  const nodeTypes = useMemo(
    () => ({
      offenderDetailsNode: OffenderNode,
      imageNode: ImageNode,
      textNode: TextNode,
      vehicleNode: VehicleNode,
      incidentList: IncidentListNode,
      incidentDetailsNode: IncidentNode,
    }),
    []
  );

  const nodeColor = (node: string) => {
    const nodeIndex = Object.keys(nodeTypes).indexOf(node) || 0;
    return visualColours[nodeIndex];
  };

  return (
    <div className={styles.pageView}>
      <Card
        style={{ width: '100%', height: '90vh' }}
        bodyStyle={{
          width: '100%',
          height: '100%',
        }}
      >
        <div className="dndflow">
          <div className={styles.wrapper}>
            <Button
              className="print-btn"
              onClick={downloadImage}
              type="default"
            >
              Print
            </Button>
            <Button className="download-btn" onClick={onSave} type="primary">
              Save
            </Button>
            <p className="info">
              Synced: <Status success={isSynced || clientCount === 0} />
              Last Saved:{' '}
              {saving || loading ? (
                <Spin style={{ marginLeft: 5 }} indicator={antIcon} />
              ) : (
                savedWhen || 'never'
              )}
            </p>
            <Sidebar />
            <FullScreen handle={flowScreen} className="fullscreen-wrapper">
              <div className={styles.rfWrapper} ref={wrapperRef}>
                <ReactFlow
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  elementsSelectable={!isFullScreen}
                  nodesConnectable={!isFullScreen}
                  nodesDraggable={!isFullScreen}
                  onInit={setReactFlowInstance}
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onNodeClick={onNodeClick}
                  onConnect={onConnect}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  fitView
                  edgeTypes={edgeTypes}
                  nodeTypes={nodeTypes}
                  // onPointerMove={handlePointMove}
                  proOptions={{ hideAttribution: true }}
                  minZoom={0.1}
                >
                  {/* {Array.from(users.entries()).map(([key, value]) => { */}
                  {/*  if (!value) return null; */}
                  {/*  if (key === provider.awareness.clientID) return null; */}
                  {/*  if ( */}
                  {/*    !value.cursor || */}
                  {/*    !value.user || */}
                  {/*    !value.user.color || */}
                  {/*    !value.user.name */}
                  {/*  ) */}
                  {/*    return null; */}
                  {/*  return ( */}
                  {/*    <Cursor */}
                  {/*      key={key} */}
                  {/*      cursor={ */}
                  {/*        value.cursor as ComponentProps<typeof Cursor>['cursor'] */}
                  {/*      } */}
                  {/*      color={ */}
                  {/*        value.user.color as ComponentProps< */}
                  {/*          typeof Cursor */}
                  {/*        >['color'] */}
                  {/*      } */}
                  {/*      name={ */}
                  {/*        value.user.name as ComponentProps<typeof Cursor>['name'] */}
                  {/*      } */}
                  {/*    /> */}
                  {/*  ); */}
                  {/* })} */}
                  <Controls showInteractive={!isFullScreen}>
                    <ControlButton onClick={setFullScreen} title="fullscreen">
                      <FontAwesomeIcon
                        size="sm"
                        icon={faExpandArrows}
                        style={{
                          color: 'black',
                        }}
                      />
                    </ControlButton>
                  </Controls>
                  <MiniMap
                    style={{
                      backgroundColor: darkTheme ? '#2b2b2b' : '#fff',
                    }}
                    nodeColor={(node: Node) => nodeColor(node.type as string)}
                    nodeStrokeWidth={3}
                    zoomable
                    pannable
                  />
                  <Background
                    color="#99b3ec"
                    variant={BackgroundVariant.Dots}
                  />
                </ReactFlow>
              </div>
            </FullScreen>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReactFlowView;
