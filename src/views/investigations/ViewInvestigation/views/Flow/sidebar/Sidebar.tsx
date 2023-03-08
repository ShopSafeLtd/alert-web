/* eslint-disable  */
import { CarOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Card, Skeleton, Typography } from 'antd';
import React, { DragEvent } from 'react';

export enum NodeTypes {
  OffenderDetailsNode = 'offenderDetailsNode',
  ImageNode = 'imageNode',
  Default = 'default',
  TextInputNode = 'textNode',
  VehicleNode = 'vehicleNode',
  IncidentList = 'incidentList',
  IncidentDetailsNode = 'incidentDetailsNode',
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
      onDragStart={(event: DragEvent) =>
        onDragStart(event, NodeTypes.TextInputNode)
      }
      draggable
      style={{ width: 'fit-content' }}
    >
      <Card>Text Input Box</Card>
    </div>

    <Typography.Title level={4}>Offender</Typography.Title>
    <Typography.Title level={5}>Offender Image</Typography.Title>

    <div
      onDragStart={(event: DragEvent) => {
        onDragStart(event, NodeTypes.ImageNode);
      }}
      draggable
      style={{ width: 'fit-content' }}
    >
      <Card>
        <Skeleton.Image />
      </Card>
    </div>

    <Typography.Title level={5}>Offender Details</Typography.Title>

    <div
      onDragStart={(event: DragEvent) => {
        onDragStart(event, NodeTypes.OffenderDetailsNode);
      }}
      draggable
      style={{ width: 'fit-content' }}
    >
      <Card style={{ display: 'flex', flexDirection: 'column' }}>
        <Skeleton.Image />
        <Skeleton />
      </Card>
    </div>
    <Typography.Title level={4}>Vehicle</Typography.Title>

    <div
      onDragStart={(event: DragEvent) => {
        onDragStart(event, NodeTypes.VehicleNode);
      }}
      draggable
      style={{ width: 'fit-content' }}
    >
      <Card
        style={{
          height: 136,
          width: 136,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CarOutlined style={{ fontSize: '64px' }} />
      </Card>
    </div>
    <Typography.Title level={4}>Incidents</Typography.Title>
    <Typography.Title level={5}>List</Typography.Title>
    <div
      onDragStart={(event: DragEvent) => {
        onDragStart(event, NodeTypes.IncidentList);
      }}
      draggable
      style={{ width: 'fit-content' }}
    >
      <Card
        style={{
          height: 136,
          width: 136,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <UnorderedListOutlined style={{ fontSize: '64px' }} />
      </Card>
    </div>
    <Typography.Title level={5}>Details</Typography.Title>

    <div
      onDragStart={(event: DragEvent) => {
        onDragStart(event, NodeTypes.IncidentDetailsNode);
      }}
      draggable
      style={{ width: 'fit-content' }}
    >
      <Card
        bodyStyle={{ width: '100%' }}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <Skeleton style={{ width: 90 }} />
      </Card>
    </div>

    {/*<Typography.Title level={4}>Crime group</Typography.Title>*/}

    {/*<div*/}
    {/*  onDragStart={(event: DragEvent) => {*/}
    {/*    onDragStart(event, NodeTypes.OffenderDetailsNode);*/}
    {/*  }}*/}
    {/*  draggable*/}
    {/*  style={{ width: 'fit-content' }}*/}
    {/*>*/}
    {/*  <Card*/}
    {/*    bodyStyle={{ width: '100%' }}*/}
    {/*    style={{ display: 'flex', flexDirection: 'column' }}*/}
    {/*  >*/}
    {/*    <Skeleton style={{ width: 90 }} />*/}
    {/*  </Card>*/}
    {/*</div>*/}
  </aside>
);

export default Sidebar;
