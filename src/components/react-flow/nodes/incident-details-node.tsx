import { Button, Drawer } from 'antd';
import React, { memo, useCallback } from 'react';
import { Handle, NodeToolbar, Position, useStore } from 'reactflow';
import '@reactflow/node-resizer/dist/style.css';
import { useParams } from 'react-router-dom';
import useStyles from './style.module';
import useFlow from '../../../views/investigations/ViewInvestigation/views/Flow/hooks/useFlow';
import { useDrawerState } from '../../../hooks';
import { useStoreState } from '../../../state';
import LinkIncident from '../form/SelectIncident';
import { NodeResizer } from '@reactflow/node-resizer';
import IncidentCard from './components/incident-details-card.view';

export interface Incident {
  description?: string | null | undefined;
  dayTime?: string | null | undefined;
  reference?: number | null | undefined;
  location?: string | null | undefined;
  offenders?: string | null | undefined;
  type?: string | null | undefined;
  id?: string | null | undefined;
}

interface Props {
  data: {
    color: string;
    incident: Incident | null | undefined;
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
  const onSelect = useCallback((incident: Incident) => {
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
        incident: incident,
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
              defaultTitle: 'Select Incident',
              id: 'incidentSelect',
            });
          }}
        >
          select incident
        </Button>
      </NodeToolbar>
      <div className={classes.node}>
        <NodeResizer
          color="#ff0071"
          isVisible={selected}
          minWidth={290}
          minHeight={200}
          handleStyle={{ zIndex: 5 }}
        />
        <div className={classes.nodeContainer}>
          {data.incident && data.incident.description ? (
            <IncidentCard incident={data.incident!} />
          ) : (
            <div style={{ height: '100%', zIndex: 4, position: 'relative' }}>
              Incident: Please choose an incident
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
