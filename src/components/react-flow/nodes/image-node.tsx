/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { memo, useCallback } from 'react';
import { Handle, NodeToolbar, Position, useStore } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import { Button, Drawer, Skeleton } from 'antd';
import { useParams } from 'react-router-dom';
import { useStoreState } from 'state';
import { useIntl } from 'react-intl';
import useStyles from './style.module';
import { useDrawerState } from '../../../hooks';
import SelectImageContainer from '../form/selectImage/SelectImage.container';
import useFlow from '../../../views/investigations/ViewInvestigation/views/Flow/hooks/useFlow';

interface Props {
  data: {
    imageUrl: string;
    isEditing: {
      user: string;
      editing: boolean;
    };
  };
  isConnectable: boolean;
  id: string;
  selected: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  width?: number;
  // eslint-disable-next-line react/no-unused-prop-types
  height?: number;
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
                id: 'XmcDl5',
                defaultMessage: 'Select Image',
              }),
              id: 'imageSelect',
            });
          }}
        >
          {intl.formatMessage({
            id: 'XmcDl5',
            defaultMessage: 'Select Image',
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
        />
        <div className={classes.nodeContainer}>
          {data?.isEditing?.editing && (
            <div className={classes.editing}>
              {intl.formatMessage(
                {
                  id: 'QmCmt6',
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
              src={data.imageUrl}
              // eslint-disable-next-line formatjs/no-literal-string-in-jsx
              alt="offender"
              className={classes.image}
              loading="eager"
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
        <SelectImageContainer
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
