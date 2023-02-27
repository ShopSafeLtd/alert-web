import React, { ComponentProps, DragEvent } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlowInstance,
} from 'reactflow';
import { Button, Card, Spin } from 'antd';
import OffenderNode from 'components/react-flow/nodes/offender-node';
import OffenderImageNode from 'components/react-flow/nodes/offender-image-node';
import TextInputNode from 'components/react-flow/nodes/text-input-node';

import FloatingEdge from 'components/react-flow/edges/floating-edge';
import { LoadingOutlined } from '@ant-design/icons';
import { WebrtcProvider } from 'y-webrtc';
import Sidebar from './sidebar/Sidebar';
import 'reactflow/dist/style.css';
import './styles.css';
import styles from './style.module.css';
import Cursor from './Cursors/Cursor';

const Status = ({ success = false }: { success: boolean }) => (
  <span className={`status ${success ? 'success' : ''}`}>&nbsp;</span>
);

const edgeTypes = {
  floating: FloatingEdge,
};

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
  offenders: {
    name: string;
    url: string[];
  }[];
  setSelected: (selected: string) => void;
  saving: boolean;
  // eslint-disable-next-line
  users: Map<number, { [p: string]: any }>;
  handlePointMove: (e: React.PointerEvent) => void;
  provider: WebrtcProvider;
}

const nodeTypes = {
  selectorNode: OffenderNode,
  offenderImageNode: OffenderImageNode,
  textInputNode: TextInputNode,
};

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
  offenders,
  setSelected,
  saving,
  users,
  handlePointMove,
  provider,
}: FlowProps) => (
  <div className="page-view">
    <div className="info-box">
      <p className="info">
        Synced: <Status success={isSynced || clientCount === 0} />
        Last Saved:{' '}
        {saving ? (
          <Spin style={{ marginLeft: 5 }} indicator={antIcon} />
        ) : (
          savedWhen || 'never'
        )}
      </p>
      <Button onClick={onSave} type="primary">
        Save
      </Button>
    </div>

    <Card
      style={{ width: '100%', height: '80vh' }}
      bodyStyle={{
        width: '100%',
        height: '100%',
      }}
      loading={loading}
    >
      <div className="dndflow">
        <div className={styles.wrapper}>
          <Sidebar
            data={{
              offenders,
            }}
            setSelected={setSelected}
          />
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <div
            className={styles.rfWrapper}
            ref={wrapperRef}
            onPointerMove={handlePointMove}
          >
            {Array.from(users.entries()).map(([key, value]) => {
              if (key === provider.awareness.clientID) return null;
              console.log(key, value);
              console.log(value.cursor, value.user.color, value.user.name);
              if (!value.cursor || !value.user.color || !value.user.name)
                return null;
              return (
                <Cursor
                  key={key}
                  cursor={
                    value.cursor as ComponentProps<typeof Cursor>['cursor']
                  }
                  color={
                    value.user.color as ComponentProps<typeof Cursor>['color']
                  }
                  name={
                    value.user.name as ComponentProps<typeof Cursor>['name']
                  }
                />
              );
            })}
            <ReactFlow
              style={{
                width: '100%',
                height: '100%',
              }}
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
            >
              <Controls />
              <MiniMap />
              <Background color="#99b3ec" variant={BackgroundVariant.Dots} />
            </ReactFlow>
          </div>
        </div>
      </div>
    </Card>
  </div>
);

export default ReactFlowView;
