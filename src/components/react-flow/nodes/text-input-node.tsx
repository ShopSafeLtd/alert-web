/* eslint-disable @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-assignment */
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import { Card, Input } from 'antd';
import React, { memo, useCallback } from 'react';
import { Handle, Position, useReactFlow, useStoreApi } from 'reactflow';

interface Props {
  data: {
    text: string;
  };
  id: string;
  isConnectable: boolean;
  selected: boolean;
}

export default memo(({ data, id, isConnectable, selected }: Props) => {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();
  const { nodeInternals } = store.getState();

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onChange = useCallback((v, id) => {
    setNodes(
      // eslint-disable-next-line unicorn/prefer-spread
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === id) {
          // eslint-disable-next-line no-param-reassign
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
        lineStyle={{
          borderRadius: 2,
          borderWidth: 2,
        }}
        minHeight={30}
        minWidth={100}
      />
      <Card bodyStyle={{ height: '100%' }} style={{ height: '100%' }}>
        <Handle
          isConnectable={isConnectable}
          position={Position.Left}
          style={{ background: '#555' }}
          type="target"
        />
        <TextArea
          defaultValue={data.text}
          onChange={(event) => {
            onChange(event.target.value, id);
          }}
          style={{ height: '100%', width: '100%' }}
        />

        <Handle
          isConnectable={isConnectable}
          position={Position.Right}
          style={{ background: '#555' }}
          type="source"
        />
      </Card>
    </>
  );
});
