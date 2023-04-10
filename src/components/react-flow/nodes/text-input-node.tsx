import { Card, Input } from 'antd';
import React, { memo, useCallback } from 'react';
import {
  Handle,
  Position,
  useReactFlow,
  useStore,
  useStoreApi,
} from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';

interface Props {
  data: {
    text: string;
  };
  isConnectable: boolean;
  id: string;
  selected: boolean;
}
// @ts-ignore

const connectionNodeIdSelector = (state) => state.connectionNodeId;

export default memo(({ data, isConnectable, selected, id }: Props) => {
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const isTarget = connectionNodeId && connectionNodeId !== id;
  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const onChange = useCallback((v, id) => {
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            text: v,
          };
        }

        return node;
      })
    );
  }, []);

  const { TextArea } = Input;

  return (
    <>
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      <Card style={{ height: '100%' }} bodyStyle={{ height: '100%' }}>
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: '#555' }}
          isConnectable={isConnectable}
        />
        <TextArea
          style={{ height: '100%', width: '100%' }}
          defaultValue={data.text}
          onChange={(event) => {
            onChange(event.target.value, id);
          }}
        />

        <Handle
          type="source"
          position={Position.Right}
          style={{ background: '#555' }}
          isConnectable={isConnectable}
        />
      </Card>
    </>
  );
});
