/* eslint-disable react/no-unused-prop-types */
import React, { memo, useCallback } from 'react';
import type { Node } from 'reactflow';
import { Handle, NodeToolbar, Position, useStore } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import { Button, Drawer } from 'antd';
import { useParams } from 'react-router-dom';
import { useStoreState } from 'state';
import { useIntl } from 'react-intl';
import useStyles from './style.module';
import { useDrawerState } from '../../../hooks';
import EditTextContainer from '../form/editText/EditText.container';
import { useWebRtcContext } from '../../../views/investigations/ViewInvestigation/views/Flow/hooks/useWebRtcProvidor';

interface Props {
  data: {
    imageUrl: string;
    isEditing: {
      user: string;
      editing: boolean;
    };
    html: string;
  };
  isConnectable: boolean;
  id: string;
  selected: boolean;
  width?: number;
  height?: number;
}

const connectionNodeIdSelector = (state: { connectionNodeId: string | null }) =>
  state.connectionNodeId;

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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: { ...currentNode.data, isEditing: { user: '', editing: false } },
      });
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nodesMap.set(id, {
      ...currentNode,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
              defaultTitle: 'Edit Text',
              id: 'editText',
            });
          }}
        >
          {intl.formatMessage({
            defaultMessage: 'edit text',
            id: '7sFfvN',
          })}
        </Button>
      </NodeToolbar>
      <div className={classes.node}>
        <NodeResizer
          color="#ff0071"
          isVisible={selected}
          minWidth={100}
          minHeight={30}
          handleStyle={{ zIndex: 5 }}
          lineStyle={{
            borderWidth: 2,
            borderRadius: 2,
          }}
        />
        <div className={classes.nodeContainer}>
          {/* add a div that says x is editing this component */}
          {data?.isEditing?.editing && (
            <div className={classes.editing}>
              {intl.formatMessage(
                {
                  defaultMessage: '{isEditing} is editing this component',
                  id: 'fYh1cJ',
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
              width: '100%',
              height: '100%',
              zIndex: 3,
              position: 'relative',
            }}
          />
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
        <EditTextContainer
          onSelect={onSelect}
          onClose={() => {
            setIsEditing(false);
            drawer.close();
          }}
          investigationId={investigationId || ''}
          data={data?.html || null}
        />
      </Drawer>
    </>
  );
});
