import { Button, Card, Col, Drawer, List } from 'antd';
import React, { memo, useCallback } from 'react';
import { Handle, NodeToolbar, Position, useStore } from 'reactflow';
import '@reactflow/node-resizer/dist/style.css';
import { useParams } from 'react-router-dom';
import useStyles from './style.module';
import useFlow from '../../../views/investigations/ViewInvestigation/views/Flow/hooks/useFlow';
import { useDrawerState } from '../../../hooks';
import { useStoreState } from '../../../state';
import LinkIncident from '../form/SelectManyIncidents';
import { NodeResizer } from '@reactflow/node-resizer';

export interface Incident {
  description?: string | null | undefined;
  dayTime?: string | null | undefined;
}

interface Props {
  data: {
    color: string;
    incidentsList: Incident[] | null | undefined;
  };
  isConnectable: boolean;
  id: string;
  selected: boolean;
}

const connectionNodeIdSelector = (state: { connectionNodeId: string | null }) =>
  state.connectionNodeId;

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
  const onSelect = useCallback((incidents: Incident[]) => {
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
        incidentsList: incidents,
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
              defaultTitle: 'Select Incidents',
              id: 'incidentsSelect',
            });
          }}
        >
          select incidents
        </Button>
      </NodeToolbar>
      <div className={classes.node}>
        <NodeResizer
          color="#ff0071"
          isVisible={selected}
          minWidth={100}
          minHeight={30}
          handleStyle={{ zIndex: 5 }}
        />
        <div className={classes.nodeContainerList}>
          {data.incidentsList ? (
            <Col>
              <Card style={{ zIndex: 4, position: 'relative' }}>
                <List
                  bordered
                  dataSource={data.incidentsList || []}
                  renderItem={(item) => (
                    <List.Item>
                      {item && item.description} - {item && item.dayTime}
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          ) : (
            <div style={{ height: '100%', zIndex: 4, position: 'relative' }}>
              Incident list: Please select incidents
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
        <LinkIncident
          onSelect={onSelect}
          onClose={() => {
            setIsEditing(false);
            drawer.close();
          }}
        />
      </Drawer>
    </>
  );
});
