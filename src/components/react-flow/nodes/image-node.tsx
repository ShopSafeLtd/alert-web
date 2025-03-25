/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Node } from 'reactflow';

import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import { Button, Drawer, Skeleton } from 'antd';
import { useAtomValue } from 'jotai/index';
import React, { memo, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { Handle, NodeToolbar, Position, useStore } from 'reactflow';

import { useDrawerState } from '../../../hooks';
import { useWebRtcContext } from '../../../views/investigations/ViewInvestigation/views/Flow/hooks/useWebRtcProvidor';
import SelectImageContainer from '../form/selectImage/SelectImage.container';
import useStyles from './style.module';

interface Props {
  data: {
    imageUrl: string;
    isEditing: {
      editing: boolean;
      user: string;
    };
  };
  // eslint-disable-next-line react/no-unused-prop-types
  height?: number;
  id: string;
  isConnectable: boolean;
  selected: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
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
  const currentUser = useAtomValue(currentUserAtom);
  const provider = useWebRtcContext();

  const nodesMap = provider.doc.getMap<Node>('nodes');
  const { drawer } = useDrawerState();
  const onSelect = useCallback((url: string) => {
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
        imageUrl: url,
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
        data: { ...currentNode.data, isEditing: { editing: false, user: '' } },
      });
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nodesMap.set(id, {
      ...currentNode,
      data: {
        ...currentNode.data,
        isEditing: { editing, user: currentUser?.fullName },
      },
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
                defaultMessage: 'Select Image',
              }),
              id: 'imageSelect',
            });
          }}
        >
          {intl.formatMessage({
            defaultMessage: 'Select Image',
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
          {data?.isEditing?.editing && (
            <div className={classes.editing}>
              {intl.formatMessage(
                {
                  defaultMessage: '{user} is editing this component',
                },
                {
                  user: data.isEditing.user,
                }
              )}
            </div>
          )}
          {data.imageUrl ? (
            <img
              // eslint-disable-next-line formatjs/no-literal-string-in-jsx
              alt="offender"
              className={classes.image}
              loading="eager"
              src={data.imageUrl}
            />
          ) : (
            <Skeleton.Image
              className={classes.image}
              style={{ height: '100%', width: '100%' }}
            />
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
        <SelectImageContainer
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
