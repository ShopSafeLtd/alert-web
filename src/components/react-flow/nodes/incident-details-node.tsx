/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button, Drawer } from 'antd';
import React, { memo, useCallback } from 'react';
import type { Node } from 'reactflow';
import { Handle, NodeToolbar, Position, useStore } from 'reactflow';
import '@reactflow/node-resizer/dist/style.css';
import { NodeResizer } from '@reactflow/node-resizer';
import { useIntl } from 'react-intl';
import useStyles from './style.module';
import { useDrawerState } from '../../../hooks';
import { useStoreState } from '../../../state';
import LinkIncident from '../form/SelectIncident';
// eslint-disable-next-line import/no-cycle
import IncidentCard from './components/incident-details-card.view';
import { useWebRtcContext } from '../../../views/investigations/ViewInvestigation/views/Flow/hooks/useWebRtcProvidor';

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
  const provider = useWebRtcContext();
  const nodesMap = provider.doc.getMap<Node>('nodes');

  const isTarget = connectionNodeId && connectionNodeId !== id;
  const targetHandleStyle = { zIndex: isTarget ? 15 : 1 };
  const classes = useStyles();

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
        incident,
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
  const intl = useIntl();
  return (
    <>
      <NodeToolbar isVisible={selected} position={Position.Top}>
        <Button
          onClick={() => {
            setIsEditing(true);
            drawer.open({
              defaultTitle: intl.formatMessage({
                defaultMessage: 'Select incident',
                id: 'Vea8nA',
              }),
              id: 'incidentSelect',
            });
          }}
        >
          {intl.formatMessage({
            defaultMessage: 'Select incident',
            id: 'Vea8nA',
          })}
        </Button>
      </NodeToolbar>
      <div className={classes.node}>
        <NodeResizer
          color="#ff0071"
          isVisible={selected}
          minWidth={290}
          minHeight={200}
          handleStyle={{ zIndex: 5 }}
          lineStyle={{
            borderWidth: 2,
            borderRadius: 2,
          }}
        />
        <div className={classes.nodeContainer}>
          {data.incident && data.incident.description ? (
            <IncidentCard incident={data.incident} />
          ) : (
            <div style={{ height: '100%', zIndex: 4, position: 'relative' }}>
              {intl.formatMessage({
                defaultMessage: 'Select incident',
                id: 'Vea8nA',
              })}
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
        open={drawer.visible}
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
