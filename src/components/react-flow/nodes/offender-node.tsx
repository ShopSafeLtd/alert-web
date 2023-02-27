import { Card } from 'antd';
import React, { memo, useCallback } from 'react';
import { Handle, Position, useStore } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import { useParams } from 'react-router-dom';
import useFlow from '../../../views/investigations/ViewInvestigation/views/Flow/hooks/useFlow';

interface Props {
  data: {
    color: string;
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
    console.log('test');
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

  return (
    <>
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      <Card style={{ height: '100%' }}>
        <Handle
          type="target"
          position={Position.Left}
          style={{ background: '#555' }}
          isConnectable={isConnectable}
        />
        <div>
          Custom Color Picker Node: <strong>{data.color}</strong>
        </div>
        <input
          className="nodrag"
          type="color"
          onChange={(event) => {
            onChange(event.target.value, id);
          }}
          defaultValue={data.color}
          value={data.color}
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
