import { Card, Input } from 'antd';
import React, { memo, useCallback } from 'react';
import { Handle, Position, useStore } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import { useParams } from 'react-router-dom';
import useFlow from '../../../views/investigations/ViewInvestigation/views/Flow/hooks/useFlow';

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
  const { id: investigationId } = useParams();
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const isTarget = connectionNodeId && connectionNodeId !== id;
  const { nodesMap } = useFlow({
    investigationId: investigationId || '',
  });
  const onChange = useCallback((value, id) => {
    const currentNode = nodesMap.get(id);
    if (!currentNode) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nodesMap.set(id, {
      ...currentNode,
      data: { ...currentNode.data, text: value },
    });
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
