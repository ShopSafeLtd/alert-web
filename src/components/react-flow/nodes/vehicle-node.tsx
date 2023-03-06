import { Button, Card, Col, Descriptions, Drawer } from 'antd';
import React, { memo, useCallback } from 'react';
import { Handle, NodeToolbar, Position, useStore } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import { useParams } from 'react-router-dom';
import useStyles from './style.module';
import useFlow from '../../../views/investigations/ViewInvestigation/views/Flow/hooks/useFlow';
import { useDrawerState } from '../../../hooks';
import { useStoreState } from '../../../state';
import SelectVehicleNode from 'components/form-components/Investigation/AddExistingVehicleNode';

export interface Vehicle {
  colour?: string | null | undefined;
  make?: string | null | undefined;
  model?: string | null | undefined;
}

interface Props {
  data: {
    color: string;
    vehicle: Vehicle | null | undefined;
  };
  isConnectable: boolean;
  id: string;
  selected: boolean;
}
// @ts-ignore

const connectionNodeIdSelector = (state) => state.connectionNodeId;

export default memo(({ data, isConnectable, selected, id }: Props) => {
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const { id: investigationId } = useParams();
  const isTarget = connectionNodeId && connectionNodeId !== id;
  const targetHandleStyle = { zIndex: isTarget ? 5 : 1 };
  const classes = useStyles();
  const { nodesMap } = useFlow({
    investigationId: investigationId || '',
    importData: undefined,
  });

  const { drawer } = useDrawerState();
  const { fullName } = useStoreState((state) => state.user);
  const onSelect = useCallback((vehicle: Vehicle) => {
    const currentNode = nodesMap.get(id);
    if (!currentNode) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nodesMap.set(id, {
      ...currentNode,
      data: {
        ...currentNode.data,
        vehicle,
        isEditing: { user: '', editing: false },
      },
    });
  }, []);

  const setIsEditing = useCallback((editing: boolean) => {
    const currentNode = nodesMap.get(id);
    if (!currentNode) {
      return;
    }
    if (!editing) {
      nodesMap.set(id, {
        ...currentNode,
        data: { ...currentNode.data, isEditing: { user: '', editing: false } },
      });
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nodesMap.set(id, {
      ...currentNode,
      data: { ...currentNode.data, isEditing: { user: fullName, editing } },
    });
  }, []);

  return (
    <>
      <NodeToolbar isVisible={selected} position={Position.Top}>
        <Button
          onClick={() => {
            setIsEditing(true);
            drawer.open({
              defaultTitle: 'Select Vehicle',
              id: 'vehicleSelect',
            });
          }}
        >
          select vehicle
        </Button>
      </NodeToolbar>
      <div className={classes.node}>
        <NodeResizer
          color="#ff0071"
          isVisible={selected}
          minWidth={100}
          minHeight={30}
        />
        <div className={classes.nodeContainer}>
          {data.vehicle ? (
            <Col>
              <Card>
                <Descriptions contentStyle={{ fontSize: 16 }} column={1}>
                  {/* <Descriptions.Item label="Make">
                {data?.vehicle?.make}
              </Descriptions.Item> */}

                  {data?.vehicle?.colour && (
                    <Descriptions.Item label="Colour">
                      {data?.vehicle?.colour}
                    </Descriptions.Item>
                  )}
                  {data?.vehicle?.model && (
                    <Descriptions.Item label="Model">
                      {data?.vehicle?.model}
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </Card>
            </Col>
          ) : (
            <div style={{ height: '100%', zIndex: 4 }}>
              Vehicle: Please choose a vehicle
            </div>
          )}
        </div>
        <Handle
          className="targetHandle"
          type="source"
          position={Position.Right}
          style={{ zIndex: 2 }}
          isConnectable={isConnectable}
        />
        <Handle
          className="targetHandle"
          type="target"
          position={Position.Left}
          style={targetHandleStyle}
          isConnectable={isConnectable}
        />
      </div>
      <Drawer
        title={drawer.defaultTitle}
        width={1000}
        visible={drawer.visible}
        onClose={() => {
          setIsEditing(false);
          drawer.close();
        }}
      >
        <SelectVehicleNode
          onSubmit={onSelect}
          onClose={() => {
            setIsEditing(false);
            drawer.close();
          }}
          investigationId={investigationId || ''}
        />
      </Drawer>
    </>
  );
});
