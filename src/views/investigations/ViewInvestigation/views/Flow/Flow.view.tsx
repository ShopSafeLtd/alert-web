import type { DragEvent } from 'react';
import type { FullScreenHandle } from 'react-full-screen';
import type {
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlowInstance,
} from 'reactflow';

import { LoadingOutlined } from '@ant-design/icons';
import { faExpandArrows } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Spin } from 'antd';
import FloatingEdge from 'components/react-flow/edges/floating-edge';
import ImageNode from 'components/react-flow/nodes/image-node';
import IncidentNode from 'components/react-flow/nodes/incident-details-node';
import IncidentListNode from 'components/react-flow/nodes/list-incidents-node';
import OffenderNode from 'components/react-flow/nodes/offender-node';
import TextNode from 'components/react-flow/nodes/text-node';
import VehicleNode from 'components/react-flow/nodes/vehicle-node';
import React, { useMemo } from 'react';
import { FullScreen } from 'react-full-screen';
import { useIntl } from 'react-intl';
import ReactFlow, {
  Background,
  ControlButton,
  Controls,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useStoreState } from '../../../../../state';
import { visualColours } from '../../../../../utils/node-colour';
import Sidebar from './sidebar/Sidebar';
import styles from './style.module.css';
import './styles.css';
// import Cursor from './Cursors/Cursor';
// import { WebsocketProvider } from 'y-websocket';

const Status = ({ success = false }: { success: boolean }) => (
  <span className={`status ${success ? 'success' : ''}`}>&nbsp;</span>
);

interface FlowProps {
  clientCount: number;
  // handlePointMove: (e: React.PointerEvent) => void;
  downloadImage: () => void;
  edges: Edge[];
  // reactFlowInstance: ReactFlowInstance | null;
  flowScreen: FullScreenHandle;
  isFullScreen: boolean;
  isSynced: boolean;
  loading: boolean;
  nodes: Node[];
  onConnect: OnConnect;
  onDragOver: (event: DragEvent) => void;
  onDrop: (
    event: DragEvent,
    data?: {
      url?: string;
    }
  ) => void;
  onEdgesChange: OnEdgesChange;
  onNodeClick: (event: React.MouseEvent, node: Node) => void;
  onNodesChange: OnNodesChange;
  onSave: () => void;
  savedWhen: null | string;
  // eslint-disable-next-line
  saving: boolean;
  // users: Map<number, { [p: string]: any }>;
  // provider: WebsocketProvider;
  setFullScreen: () => void;
  setReactFlowInstance: (instance: ReactFlowInstance | null) => void;
  wrapperRef: React.RefObject<HTMLDivElement>;
}

const antIcon = <LoadingOutlined spin style={{ fontSize: 24 }} />;

const ReactFlowView = ({
  clientCount,
  // handlePointMove,
  downloadImage,
  edges,
  flowScreen,
  isFullScreen,
  isSynced,
  loading,
  nodes,
  onConnect,
  onDragOver,
  onDrop,
  onEdgesChange,
  onNodeClick,
  onNodesChange,
  onSave,
  savedWhen,
  saving,
  setFullScreen,
  setReactFlowInstance,
  wrapperRef,
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
  const intl = useIntl();
  const darkTheme =
    useStoreState((state) => state.theme.currentTheme) === 'dark';

  const nodeTypes = useMemo(
    () => ({
      imageNode: ImageNode,
      incidentDetailsNode: IncidentNode,
      incidentList: IncidentListNode,
      offenderDetailsNode: OffenderNode,
      textNode: TextNode,
      vehicleNode: VehicleNode,
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
        bodyStyle={{
          height: '100%',
          width: '100%',
        }}
        style={{ height: '90vh', width: '100%' }}
      >
        <div className="dndflow">
          <div className={styles.wrapper}>
            <Button
              className="print-btn"
              onClick={downloadImage}
              type="default"
            >
              {intl.formatMessage({
                defaultMessage: 'Print',
              })}
            </Button>
            <Button className="download-btn" onClick={onSave} type="primary">
              {intl.formatMessage({
                defaultMessage: 'Save',
              })}
            </Button>
            <p className="info">
              {intl.formatMessage({
                defaultMessage: 'Synced: ',
              })}
              <Status success={isSynced || clientCount === 0} />
              {intl.formatMessage({
                defaultMessage: 'Last Saved: ',
              })}
              {saving || loading ? (
                <Spin indicator={antIcon} style={{ marginLeft: 5 }} />
              ) : (
                savedWhen || intl.formatMessage({ defaultMessage: 'never' })
              )}
            </p>
            <Sidebar />
            <FullScreen
              className={
                darkTheme
                  ? 'fullscreen-wrapper-dark'
                  : 'fullscreen-wrapper-light'
              }
              handle={flowScreen}
            >
              <div className={styles.rfWrapper} ref={wrapperRef}>
                <ReactFlow
                  edgeTypes={edgeTypes}
                  edges={edges}
                  elementsSelectable={!isFullScreen}
                  fitView
                  minZoom={0.1}
                  nodeTypes={nodeTypes}
                  nodes={nodes}
                  nodesConnectable={!isFullScreen}
                  nodesDraggable={!isFullScreen}
                  onConnect={onConnect}
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  onEdgesChange={onEdgesChange}
                  onInit={setReactFlowInstance}
                  onNodeClick={onNodeClick}
                  onNodesChange={onNodesChange}
                  proOptions={{ hideAttribution: true }}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                >
                  <Controls showInteractive={!isFullScreen}>
                    <ControlButton
                      onClick={setFullScreen}
                      title={intl.formatMessage({
                        defaultMessage: 'Full Screen',
                      })}
                    >
                      <FontAwesomeIcon
                        icon={faExpandArrows}
                        size="sm"
                        style={{
                          color: 'black',
                        }}
                      />
                    </ControlButton>
                  </Controls>
                  <MiniMap
                    nodeColor={(node: Node) => nodeColor(node.type as string)}
                    nodeStrokeWidth={3}
                    pannable
                    style={{
                      backgroundColor: darkTheme ? '#2b2b2b' : '#fff',
                    }}
                    zoomable
                  />
                  <Background
                    color="#99b3ec"
                    // variant={BackgroundVariant.Dots}
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
