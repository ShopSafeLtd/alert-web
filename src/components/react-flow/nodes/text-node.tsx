/* eslint-disable react/no-unused-prop-types */
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
import EditTextContainer from '../form/editText/EditText.container';
import useStyles from './style.module';

interface Props {
  data: {
    html: string;
    imageUrl: string;
    isEditing: {
      editing: boolean;
      user: string;
    };
  };
  height?: number;
  id: string;
  isConnectable: boolean;
  selected: boolean;
  width?: number;
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
  const onSelect = useCallback((html: string) => {
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
        html,
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
              defaultTitle: 'Edit Text',
              id: 'editText',
            });
          }}
        >
          {intl.formatMessage({
            defaultMessage: 'edit text',
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
          {/* add a div that says x is editing this component */}
          {data?.isEditing?.editing && (
            <div className={classes.editing}>
              {intl.formatMessage(
                {
                  defaultMessage: '{isEditing} is editing this component',
                },
                {
                  isEditing: data.isEditing.user,
                }
              )}
            </div>
          )}

          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: data?.html || '',
            }}
            style={{
              height: '100%',
              position: 'relative',
              width: '100%',
              zIndex: 3,
            }}
          />
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
        <EditTextContainer
          data={data?.html || null}
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
