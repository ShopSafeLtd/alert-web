/* eslint-disable  */
import { Avatar, Col, Row, Typography } from 'antd';
import React, { DragEvent } from 'react';

export enum NodeTypes {
  SelectorNode = 'selectorNode',
  OffenderImageNode = 'offenderImageNode',
  Default = 'default',
  TextInputNode = 'textInputNode',
}

const onDragStart = (event: DragEvent, nodeType: NodeTypes) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

interface Props {
  data: {
    offenders: {
      name: string;
      url: string[];
    }[];
  };
  setSelected: (selected: string) => void;
}

const Sidebar = ({ data, setSelected }: Props) => (
  <aside>
    <div className="description">
      You can drag these nodes to the pane on the right.
    </div>
    <Typography.Title
      style={{
        color: 'black',
      }}
      level={4}
    >
      Text Input
    </Typography.Title>

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

    <Typography.Title
      style={{
        color: 'black',
      }}
      level={4}
    >
      Offenders
    </Typography.Title>

    {data.offenders.map((offender, index) => (
      <>
        <Row>
          <Col span={24}>
            <Typography.Title level={4}>{offender.name}</Typography.Title>
            {offender.url.map((url, index) => (
              <div
                className="react-flow__node-input"
                onDragStart={(event: DragEvent) => {
                  setSelected(url);
                  onDragStart(event, NodeTypes.OffenderImageNode);
                }}
                draggable
              >
                <Avatar src={url} shape="square" size={64} />
              </div>
            ))}
          </Col>
        </Row>
      </>
    ))}
  </aside>
);

export default Sidebar;
