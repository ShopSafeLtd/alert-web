/* eslint-disable @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-assignment */

import { Button, Drawer } from 'antd';
import React, { memo, useCallback } from 'react';
import type { Node } from 'reactflow';
import { Handle, NodeToolbar, Position, useStore } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import OffenderCard from './components/offender-details-card';
import type { Age, Build, Gender, Race } from '../../../graphql/generated';
import useStyles from './style.module';
import { useDrawerState } from '../../../hooks';
import { useStoreState } from '../../../state';
import SelectOffenderDetails from '../form/selectOffenderDetails';
import { useWebRtcContext } from '../../../views/investigations/ViewInvestigation/views/Flow/hooks/useWebRtcProvidor';

interface Offender {
  images:
    | {
        id: string;
        optimised?: string;
        optimisedPersisted?: string;
      }[]
    | null
    | undefined;
  id: string;

  name?: string | null | undefined;
  totalIncidents?: number;
  reference?: number | null | undefined;
  updatedAt?: Date | null | undefined;
  age?: Age | null | undefined;
  dateOfBirth?: Date | null | undefined;
  build?: Build | null | undefined;
  gender?: Gender | null | undefined;
  race?: Race | null | undefined;
}

interface Props {
  data: {
    color: string;
    offender: Offender | null | undefined;
  };
  isConnectable: boolean;
  id: string;
  selected: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const connectionNodeIdSelector = (state) => state.connectionNodeId;

export default memo(({ data, isConnectable, selected, id }: Props) => {
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const { id: investigationId } = useParams();
  const isTarget = connectionNodeId && connectionNodeId !== id;
  const targetHandleStyle = { zIndex: isTarget ? 15 : 1 };
  const classes = useStyles();
  const provider = useWebRtcContext();
  const nodesMap = provider.doc.getMap<Node>('nodes');
  const { drawer } = useDrawerState();
  const { fullName } = useStoreState((state) => state.user);
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
        offender,
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
                defaultMessage: 'Select Offender',
                id: '8e5n4o',
              }),
              id: 'offenderSelect',
            });
          }}
        >
          {intl.formatMessage({
            defaultMessage: 'Select Offender',
            id: '8e5n4o',
          })}
        </Button>
      </NodeToolbar>
      <div className={classes.node}>
        <NodeResizer
          color="#ff0071"
          isVisible={selected}
          minWidth={290}
          minHeight={550}
          lineStyle={{
            borderWidth: 2,
            borderRadius: 2,
          }}
        />
        <div className={classes.nodeContainer}>
          {data.offender && data.offender.name ? (
            <OffenderCard offender={data.offender} />
          ) : (
            <div style={{ height: '100%', zIndex: 4, position: 'relative' }}>
              {intl.formatMessage({
                defaultMessage: 'Offender: Please choose an offender',
                id: 'KRHeRo',
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
        visible={drawer.visible}
        onClose={() => {
          setIsEditing(false);
          drawer.close();
        }}
      >
        <SelectOffenderDetails
          onSelect={onSelect}
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
