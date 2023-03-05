/* eslint-disable  */
import { Skeleton, Typography } from 'antd';
import React, { DragEvent } from 'react';

export enum NodeTypes {
  OffenderDetailsNode = 'offenderDetailsNode',
  ImageNode = 'imageNode',
  Default = 'default',
  TextInputNode = 'textNode',
}

const onDragStart = (event: DragEvent, nodeType: NodeTypes) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

const Sidebar = () => (
  <aside>
    <Typography.Text>
      You can drag these nodes to the pane on the right.
    </Typography.Text>

    <Typography.Title level={4}>Text Input</Typography.Title>

    <div
      className="react-flow__node-text"
      onDragStart={(event: DragEvent) =>
        onDragStart(event, NodeTypes.TextInputNode)
      }
      draggable
      style={{ height: 40 }}
    >
      Text Input Box
    </div>

    <Typography.Title level={4}>Image</Typography.Title>

    <div
      onDragStart={(event: DragEvent) => {
        onDragStart(event, NodeTypes.ImageNode);
      }}
      draggable
      style={{ width: 'fit-content' }}
    >
      <Skeleton.Image />
    </div>

    <Typography.Title level={4}>Offender Details</Typography.Title>

    <div
      onDragStart={(event: DragEvent) => {
        onDragStart(event, NodeTypes.OffenderDetailsNode);
      }}
      draggable
      style={{ width: 'fit-content' }}
    >
      <Skeleton.Image />
    </div>
  </aside>
);

export default Sidebar;
