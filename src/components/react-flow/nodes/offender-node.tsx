import { Button, Drawer } from 'antd';
import React, { memo, useCallback } from 'react';
import { Handle, NodeToolbar, Position, useStore } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import '@reactflow/node-resizer/dist/style.css';
import { useParams } from 'react-router-dom';
import OffenderCard from './components/offender-details-card';
import { Age, Build, Gender, Race } from '../../../graphql/generated';
import useStyles from './style.module';
import useFlow from '../../../views/investigations/ViewInvestigation/views/Flow/hooks/useFlow';
import { useDrawerState } from '../../../hooks';
import { useStoreState } from '../../../state';
import SelectOffenderDetails from '../form/selectOffenderDetails';

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

// @ts-ignore

const connectionNodeIdSelector = (state) => state.connectionNodeId;

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

  return (
    <>
      <NodeToolbar isVisible={selected} position={Position.Top}>
        <Button
          onClick={() => {
            setIsEditing(true);
            drawer.open({
              defaultTitle: 'Select Offender',
              id: 'offenderSelect',
            });
          }}
        >
          select offender
        </Button>
      </NodeToolbar>
      <div className={classes.node}>
        <NodeResizer
          color="#ff0071"
          isVisible={selected}
          minWidth={290}
          minHeight={550}
        />
        <div className={classes.nodeContainer}>
          {data.offender && data.offender.name ? (
            <OffenderCard offender={data.offender!} />
          ) : (
            <div style={{ height: '100%', zIndex: 4, position: 'relative' }}>
              Offender: Please choose an offender
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
