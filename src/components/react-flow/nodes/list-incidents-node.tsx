/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Node } from 'reactflow';

import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import { Button, Card, Col, Drawer, List } from 'antd';
import { useAtomValue } from 'jotai/index';
import React, { memo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Handle, NodeToolbar, Position, useStore } from 'reactflow';

import { useDrawerState } from '../../../hooks';
import { useWebRtcContext } from '../../../views/investigations/ViewInvestigation/views/Flow/hooks/useWebRtcProvidor';
import LinkIncident from '../form/SelectManyIncidents';
import useStyles from './style.module';

export interface Incident {
  dayTime?: null | string | undefined;
  description?: null | string | undefined;
  id?: null | string | undefined;
}

interface Props {
  data: {
    color: string;
    incidentsList: Incident[] | null | undefined;
  };
  id: string;
  isConnectable: boolean;
  selected: boolean;
}

const connectionNodeIdSelector = (state: { connectionNodeId: null | string }) =>
  state.connectionNodeId;

export default memo(({ data, id, isConnectable, selected }: Props) => {
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const provider = useWebRtcContext();
  const nodesMap = provider.doc.getMap<Node>('nodes');
  const isTarget = connectionNodeId && connectionNodeId !== id;
  const targetHandleStyle = { zIndex: isTarget ? 15 : 1 };
  const classes = useStyles();

  const { drawer } = useDrawerState();
  const fullName = useAtomValue(currentUserAtom)?.fullName ?? '';
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
        isEditing: { editing: false, user: '' },
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
        data: {
          ...currentNode.data,
          isEditing: { editing: false, user: '' },
        },
      });
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nodesMap.set(id, {
      ...currentNode,
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
              defaultTitle: intl.formatMessage({
                defaultMessage: 'Select Incidents',
              }),
              id: 'incidentsSelect',
            });
          }}
        >
          {intl.formatMessage({
            defaultMessage: 'Select Incidents',
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
        <div className={classes.nodeContainerList}>
          {data.incidentsList ? (
            <Col>
              <Card style={{ position: 'relative', zIndex: 4 }}>
                <List
                  bordered
                  dataSource={data.incidentsList || []}
                  renderItem={(item) => (
                    <List.Item>
                      {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                      {item && item.description} - {item && item.dayTime}
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          ) : (
            <div style={{ height: '100%', position: 'relative', zIndex: 4 }}>
              {intl.formatMessage({
                defaultMessage: 'Incident list: Please select incidents',
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
        <LinkIncident
          ids={
            data.incidentsList?.map((incident) => incident.id || '') ||
            undefined
          }
          onClose={() => {
            setIsEditing(false);
            drawer.close();
          }}
          onSelect={onSelect}
        />
      </Drawer>
    </>
  );
});
