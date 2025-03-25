/* eslint-disable @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-assignment */

import type { Age, Build, Gender, Race } from 'graphql/types';
import type { Node } from 'reactflow';

import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import { Button, Drawer } from 'antd';
import { useAtomValue } from 'jotai/index';
import React, { memo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { Handle, NodeToolbar, Position, useStore } from 'reactflow';

import { useDrawerState } from '../../../hooks';
import { useWebRtcContext } from '../../../views/investigations/ViewInvestigation/views/Flow/hooks/useWebRtcProvidor';
import SelectOffenderDetails from '../form/selectOffenderDetails';
import OffenderCard from './components/offender-details-card';
import useStyles from './style.module';

interface Offender {
  age?: Age | null | undefined;
  build?: Build | null | undefined;

  dateOfBirth?: Date | null | undefined;
  gender?: Gender | null | undefined;
  id: string;
  images:
    | {
        id: string;
        optimised?: string;
        optimisedPersisted?: string;
      }[]
    | null
    | undefined;
  name?: null | string | undefined;
  race?: Race | null | undefined;
  reference?: null | number | undefined;
  totalIncidents?: number;
  updatedAt?: Date | null | undefined;
}

interface Props {
  data: {
    color: string;
    offender: Offender | null | undefined;
  };
  id: string;
  isConnectable: boolean;
  selected: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const connectionNodeIdSelector = (state) => state.connectionNodeId;

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
  const onSelect = useCallback((offender: Offender) => {
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
        isEditing: { editing: false, user: '' },
        offender,
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
        data: { ...currentNode.data, isEditing: { editing: false, user: '' } },
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
                defaultMessage: 'Select Offender',
              }),
              id: 'offenderSelect',
            });
          }}
        >
          {intl.formatMessage({
            defaultMessage: 'Select Offender',
          })}
        </Button>
      </NodeToolbar>
      <div className={classes.node}>
        <NodeResizer
          color="#ff0071"
          isVisible={selected}
          lineStyle={{
            borderRadius: 2,
            borderWidth: 2,
          }}
          minHeight={550}
          minWidth={290}
        />
        <div className={classes.nodeContainer}>
          {data.offender && data.offender.name ? (
            <OffenderCard offender={data.offender} />
          ) : (
            <div style={{ height: '100%', position: 'relative', zIndex: 4 }}>
              {intl.formatMessage({
                defaultMessage: 'Offender: Please choose an offender',
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
        <SelectOffenderDetails
          investigationId={investigationId || ''}
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
