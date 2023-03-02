import { Card } from 'antd';
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import styles from './style.module.css';

interface Props {
  data: {
    imageUrl: string;
  };
  isConnectable: boolean;
  id: string;
  selected: boolean;
}

export default memo(({ data, isConnectable, selected, id }: Props) => {
  return (
    <div className={styles.node}>
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={100}
        minHeight={30}
        onResizeEnd={(_drag, resized) =>
          !(resized.width > 250 || resized.height > 250)
        }
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      <Card
        style={{
          padding: 5,
          height: '100%',
          width: '100%',
          maxHeight: '250px',
        }}
        cover={
          <img
            src={data.imageUrl}
            alt="offender"
            style={{ objectFit: 'contain', maxHeight: '250px' }}
          />
        }
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
    </div>
  );
});
