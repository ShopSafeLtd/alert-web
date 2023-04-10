import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { Button, Card, Typography } from 'antd';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ReactGridLayout = WidthProvider(RGL);

interface Props {
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
}

const GridView = ({ editMode, setEditMode }: Props) => (
  <>
    <Button key="1" onClick={() => setEditMode(!editMode)}>
      {editMode ? 'Preview' : 'Edit'}
    </Button>
    <ReactGridLayout
      layout={Array.from({ length: 12 }).map((_, i) => ({
        x: (i * 2) % 12,
        y: Math.floor(i / 6),
        w: 2,
        h: 6,
        i: i.toString(),
      }))}
      cols={12}
      rowHeight={30}
      width={1200}
      isDraggable={editMode}
      isResizable={editMode}
      autoSize
    >
      {Array.from({ length: 6 }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div style={{ background: editMode ? '#ccc' : '' }} key={i}>
          {editMode ? (
            <div />
          ) : (
            <Card style={{ width: '100%', height: '100%' }}>
              <Typography.Title level={3}>Something</Typography.Title>
            </Card>
          )}
        </div>
      ))}
    </ReactGridLayout>
  </>
);

export default GridView;
