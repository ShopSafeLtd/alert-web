import type { Node } from 'reactflow';

import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import { Button, Card, Col, Descriptions, Drawer } from 'antd';
import SelectVehicleNode from 'components/form-components/Investigation/AddExistingVehicleNode';
import { useAtomValue } from 'jotai/index';
import React, { memo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { Handle, NodeToolbar, Position, useStore } from 'reactflow';

import { useDrawerState } from '../../../hooks';
import { useWebRtcContext } from '../../../views/investigations/ViewInvestigation/views/Flow/hooks/useWebRtcProvidor';
import useStyles from './style.module';

export interface Vehicle {
  colour?: null | string | undefined;
  make?: null | string | undefined;
  model?: null | string | undefined;
}

interface Props {
  data: {
    color: string;
    vehicle: Vehicle | null | undefined;
  };
  id: string;
  isConnectable: boolean;
  selected: boolean;
}

const connectionNodeIdSelector = (state: { connectionNodeId: null | string }) =>
  state.connectionNodeId;

export default memo(({ data, id, isConnectable, selected }: Props) => {
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const { id: investigationId } = useParams();
  const isTarget = connectionNodeId && connectionNodeId !== id;
  const targetHandleStyle = { zIndex: isTarget ? 15 : 1 };
  const classes = useStyles();
  const provider = useWebRtcContext();
  const nodesMap = provider.doc.getMap<Node>('nodes');

  const { drawer } = useDrawerState();
  const fullName = useAtomValue(currentUserAtom)?.fullName ?? '';
  const onSelect = useCallback((vehicle: Vehicle) => {
    const currentNode = nodesMap.get(id);
    if (!currentNode) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nodesMap.set(id, {
      ...currentNode,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: {
        ...currentNode.data,
        isEditing: { editing: false, user: '' },
        vehicle,
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: { ...currentNode.data, isEditing: { editing: false, user: '' } },
      });
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nodesMap.set(id, {
      ...currentNode,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: { ...currentNode.data, isEditing: { editing, user: fullName } },
    });
  }, []);
  const intl = useIntl();
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
          {intl.formatMessage({
            defaultMessage: 'Select Vehicle',
          })}
        </Button>
      </NodeToolbar>
      <div className={classes.node}>
        <NodeResizer
          color="#ff0071"
          handleStyle={{ zIndex: 5 }}
          isVisible={selected}
          lineStyle={{
            borderRadius: 2,
            borderWidth: 2,
          }}
          minHeight={30}
          minWidth={100}
        />
        <div className={classes.nodeContainer}>
          {data.vehicle ? (
            <Col>
              <Card style={{ position: 'relative', zIndex: 6 }}>
                <Descriptions column={1} contentStyle={{ fontSize: 16 }}>
                  {/* <Descriptions.Item label="Make">
                {data?.vehicle?.make}
              </Descriptions.Item> */}

                  {data?.vehicle?.colour && (
                    <Descriptions.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Colour',
                      })}
                    >
                      {data?.vehicle?.colour}
                    </Descriptions.Item>
                  )}
                  {data?.vehicle?.model && (
                    <Descriptions.Item
                      label={intl.formatMessage({
                        defaultMessage: 'Model',
                      })}
                    >
                      {data?.vehicle?.model}
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </Card>
            </Col>
          ) : (
            <div style={{ height: '100%', position: 'relative', zIndex: 6 }}>
              {intl.formatMessage({
                defaultMessage: 'Vehicle: Please select a vehicle',
              })}
            </div>
          )}
        </div>
        <Handle
          className="targetHandle"
          isConnectable={isConnectable}
          position={Position.Right}
          style={{ zIndex: 2 }}
          type="source"
        />
        <Handle
          className="targetHandle"
          isConnectable={isConnectable}
          position={Position.Left}
          style={targetHandleStyle}
          type="target"
        />
      </div>
      <Drawer
        onClose={() => {
          setIsEditing(false);
          drawer.close();
        }}
        open={drawer.visible}
        title={drawer.defaultTitle}
        width={1000}
      >
        <SelectVehicleNode
          investigationId={investigationId || ''}
          onClose={() => {
            setIsEditing(false);
            drawer.close();
          }}
          onSubmit={onSelect}
        />
      </Drawer>
    </>
  );
});
